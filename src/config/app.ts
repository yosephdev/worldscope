export const APP_CONFIG = {
    name: 'WorldScope',
    description: 'Explore countries worldwide with detailed insights, statistics, and beautiful visualizations',
    version: '1.0.0',
    author: 'Yoseph Berhane',
    url: 'https://worldscope.app',
    social: {
        twitter: '@yosephbet',
        github: 'https://github.com/yosephdev/worldscope'
    }
} as const;

export const SEO_CONFIG = {
    defaultTitle: 'WorldScope - Explore Countries Worldwide',
    titleTemplate: '%s | WorldScope',
    defaultDescription: 'Discover detailed information about countries around the world. Search, filter, and explore with our modern, fast, and accessible country explorer.',
    keywords: ['countries', 'world', 'geography', 'explorer', 'statistics', 'flags', 'population'],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://worldscope.app',
        siteName: 'WorldScope',
    }
} as const;