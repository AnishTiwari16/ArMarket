/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            animation: {
                'shimmer-slide':
                    'shimmer-slide var(--speed) ease-in-out infinite alternate',
                'spin-around':
                    'spin-around calc(var(--speed) * 2) infinite linear',
                gradient: 'gradient 6s linear infinite',
            },
            keyframes: {
                'spin-around': {
                    '0%': {
                        transform: 'translateZ(0) rotate(0)',
                    },
                    '15%, 35%': {
                        transform: 'translateZ(0) rotate(90deg)',
                    },
                    '65%, 85%': {
                        transform: 'translateZ(0) rotate(270deg)',
                    },
                    '100%': {
                        transform: 'translateZ(0) rotate(360deg)',
                    },
                },
                'shimmer-slide': {
                    to: {
                        transform: 'translate(calc(100cqw - 100%), 0)',
                    },
                },
                gradient: {
                    to: {
                        backgroundPosition: 'var(--bg-size) 0',
                    },
                },
            },
            backgroundImage: {
                topCard1:
                    'linear-gradient(87deg, #FF6B65 -1.64%, #297EFF 111.87%)',
                topCard2:
                    'linear-gradient(85deg, #5D78BD 3.16%, #A4A8B5 110.87%)',
                topCard3:
                    'linear-gradient(87deg, #8F52BD -1.64%, #8A89AD 111.87%)',
                topCard4:
                    'linear-gradient(88deg, #0986B5 -7.45%, #07D07C 126.41%)',
            },
        },
    },
    plugins: [],
};
