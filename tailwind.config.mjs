export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    plugins: [],
    theme: {
        extend: {
            colors: {
                'kujira-black': '#161721',
                'kujira-blacker': 'rgb(14,15,20)',
                'kujira-dark-gray': '#22242f',
                'kujira-gray': '#607d8b',
                'kujira-light-gray': '#90a4ae',
                'kujira-teal': '#60fbd0',
                'kujira-blue': '#1e92e6',
                'kujira-dark-blue': '#1c6599',
                'kujira-red': '#e53935',
                'kujira-orange': '#f57c00',
                'kujira-green': '#00c853',
                'kujira-foreground': 'rgba(22,23,33,.75)',
                'kujira-border': 'rgba(96,125,139,.25)',
                'kujira-shadow': '#16172159'
            },
        },
    },
}