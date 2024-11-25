import Coin from '../../assets/coin.png';
import MentionCards from '../../assets/mention-markets.png';
import Election from '../../assets/election.png';
export const TOP_CARDS = [
    { title: 'Trump won, now what?', img: Coin },
    { title: '2024 Election Results', img: Election },
    { title: 'Mention Markets', img: MentionCards },
    { title: 'Start Trading', img: Coin },
];
export const CARDS = [
    {
        title: 'Can Bitcoin reach $100k in Dec?',
        desc: 'As of November 22, 2024, Bitcoin is on the cusp of reaching $100,000. The cryptocurrency has recently hit a new all-time high, surpassing $97,000',
        outcomes: ['Yes', 'No'],
        yes: '60%',
        no: '40%',
        poolSize: '$100k',
    },
    {
        title: 'Trump ends Ukraine war by 90 days?',
        desc: 'Following Donald Trumps victory in the U.S. presidential election on November 5, concerns have risen regarding his impact on the Ukraine-Russia conflict',
        outcomes: ['Yes', 'No'],
        yes: '30%',
        no: '70%',
        poolSize: '$300k',
    },
    {
        title: 'What price will Ethereum hit in Nov?',
        desc: 'As of November 25, 2024, Ethereum is trading at around $3,375, with forecasts indicating a range of possible prices for the month.',
        outcomes: ['$4000', '$3750'],
        yes: '40%',
        no: '60%',
        poolSize: '$100k',
    },
    {
        title: 'Who will be part of Trumps cabinate?',
        desc: 'President-elect Donald Trump has announced several key appointments for his administration. Elon Musk and Vivek Ramaswamy will lead the newly created Department of Government Efficiency',
        outcomes: ['Elon', 'RFK jr.'],
        yes: '10%',
        no: '90%',
        poolSize: '$50k',
    },

    {
        title: 'La Liga Winner',
        desc: 'As of November 22, 2024, Bitcoin is on the cusp of reaching $100,000. The cryptocurrency has recently hit a new all-time high, surpassing $97,000',
        outcomes: ['Yes', 'No'],
        yes: '20%',
        no: '80%',
        poolSize: '$200k',
    },
    {
        title: 'NBA Champion',
        desc: 'The Boston Celtics are currently the favorites to win the 2024-25 NBA championship, with odds of +230 to +295, following their victory in the 2024 NBA Finals.',
        outcomes: ['Boston', 'Denver'],
        yes: '26%',
        no: '74%',
        poolSize: '$500k',
    },
    {
        title: 'Will ArMarket win this hackathon?',
        desc: 'We have worked hard to create a unique and innovative solution, so lets pray 🤞',
        outcomes: ['Yes', 'No'],
        yes: '90%',
        no: '10%',
        poolSize: '$1M',
    },
];
