local json = require("json")

state = {
    owner = ao.id,
    pool = { yes = 0, no = 0 },
    bets = {}, 
    insurance_pool = 0, 
    insurance_fee_percent = 5, 
    insurance_coverage_percent = 80, 
    resolved = false, 
    outcome = "", 
    total_pool = 0, 
    mockusdc = "maAYW2mCi0dJZuJudHkgFMGIPO_nBv-0wXThdkJ-w3Y" -- MockUSDC contract process ID
}

-- Utility functions for safe math
local utils = {
    add = function(a, b) return a + b end,
    subtract = function(a, b) return a - b end
}

-- Place a bet
Handlers["placeBet"] = function(msg)
    assert(msg.Tags.Action == "PlaceBet", "Invalid Action!")
    local prediction = msg.Tags.Prediction -- "yes" or "no"
    local amount = tonumber(msg.Tags.Quantity) -- Amount to bet
    local insure = msg.Tags.Insure == "true" -- Insurance flag
    assert(prediction == "yes" or prediction == "no", "Prediction must be 'yes' or 'no'!")
    assert(amount > 0, "Bet amount must be greater than 0!")

    -- Query MockUSDC balance
    local balanceQuery = {
        Target = state.mockusdc,
        Action = "Balance",
        Tags = { Recipient = msg.From }
    }
    local balanceResponse = ao.sendAndWait(balanceQuery)
    local userBalance = tonumber(balanceResponse.Tags.Balance)

    -- Check if user has enough balance
    local totalCost = amount + ((insure and (amount * state.insurance_fee_percent / 100)) or 0)
    assert(userBalance >= totalCost, "Insufficient MockUSDC balance!")

    -- Initialize user's bets
    if not state.bets[msg.From] then
        state.bets[msg.From] = {}
    end

    -- Calculate insurance fee
    local insurance_fee = 0
    if insure then
        insurance_fee = (amount * state.insurance_fee_percent) / 100
        state.insurance_pool = utils.add(state.insurance_pool, insurance_fee)
    end

    -- Update pools
    state.pool[prediction] = utils.add(state.pool[prediction], amount)
    state.total_pool = utils.add(state.total_pool, amount + insurance_fee)

    -- Store user's bet
    if state.bets[msg.From] == nil then
        state.bets[msg.From] = {}
    end

    -- Store user's bet
    table.insert(state.bets[msg.From], {
        prediction = prediction,
        amount = amount,
        insured = insure,
        insurance_fee = insurance_fee
    })

    -- Notify user
    Send({
        Target = msg.From,
        Tags = {
            Action = "BetPlaced",
            Prediction = prediction,
            Quantity = tostring(amount),
            Insured = insure and "true" or "false"
        }
    })
end

-- Resolve the prediction
Handlers["resolve"] = function(msg)
    assert(msg.Tags.Action == "Resolve", "Invalid Action!")
    assert(msg.From == state.owner, "Only the owner can resolve the prediction!")
    local outcome = msg.Tags.Outcome -- "yes" or "no"
    assert(outcome == "yes" or outcome == "no", "Outcome must be 'yes' or 'no'!")

    state.resolved = true
    state.outcome = outcome

    -- Notify resolution
    Send({
        Target = msg.From,
        Tags = {
            Action = "PredictionResolved",
            Outcome = outcome
        }
    })
end

-- Claim payouts
Handlers["claim"] = function(msg)
    assert(msg.Tags.Action == "Claim", "Invalid Action!")
    assert(state.resolved, "Prediction not resolved yet!")

    local user_bets = state.bets[msg.From]
    if not user_bets or #user_bets == 0 then
        Send({
            Target = msg.From,
            Tags = {
                Action = "ClaimError",
                Message = "No bets found for user."
            }
        })
        return
    end

    local total_payout = 0

    for _, bet in ipairs(user_bets) do
        if bet.prediction == state.outcome then
            -- Calculate payout for winners
            local outcome_pool = state.pool[state.outcome]
            local odds = state.total_pool / outcome_pool
            total_payout = utils.add(total_payout, bet.amount * odds)
        elseif bet.insured then
            -- Refund insured users
            total_payout = utils.add(total_payout, (bet.amount * state.insurance_coverage_percent) / 100)
        end
    end

    -- Clear user's bets
    state.bets[msg.From] = nil

    -- Transfer payout using MockUSDC
    ao.send({
        Target = state.mockusdc,
        Action = "Transfer",
        Tags = {
            Recipient = msg.From,
            Quantity = tostring(total_payout)
        },
    })

    -- Notify user
    Send({
        Target = msg.From,
        Tags = {
            Action = "Payout",
            Amount = tostring(total_payout)
        }
    })
end

-- View pool information
Handlers["poolInfo"] = function(msg)
    assert(msg.Tags.Action == "PoolInfo", "Invalid Action!")
    Send({
        Target = msg.From,
        Tags = {
            Action = "PoolInfo",
            YesPool = tostring(state.pool.yes),
            NoPool = tostring(state.pool.no),
            TotalPool = tostring(state.total_pool),
            InsurancePool = tostring(state.insurance_pool)
        }
    })
end

-- View user bets
Handlers["viewBets"] = function(msg)
    assert(msg.Tags.Action == "ViewBets", "Invalid Action!")
    local user_bets = state.bets[msg.From]
    Send({
        Target = msg.From,
        Tags = {
            Action = "UserBets",
            Data = user_bets and json.encode(user_bets) or "No bets found."
        }
    })
end

-- View general information about the contract state
Handlers["info"] = function(msg)
    assert(msg.Tags.Action == "Info", "Invalid Action!")
    
    -- Respond with contract details
    Send({
        Target = msg.From,
        Tags = {
            Action = "Info",
            Owner = tostring(state.owner),
            YesPool = tostring(state.pool.yes),
            NoPool = tostring(state.pool.no),
            TotalPool = tostring(state.total_pool),
            InsurancePool = tostring(state.insurance_pool),
            InsuranceFeePercent = tostring(state.insurance_fee_percent),
            InsuranceCoveragePercent = tostring(state.insurance_coverage_percent),
            Resolved = state.resolved and "true" or "false",
            Outcome = state.resolved and state.outcome or "Not resolved"
        }
    })
end

