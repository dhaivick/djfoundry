import type { Preview } from '@storybook/react-vite'

const viewports = {
    mobileS: {
        name: 'Mobile S (320px)',
        styles: { width: '320px', height: '568px' },
        type: 'mobile' as const,
    },
    mobileM: {
        name: 'Mobile M (375px)',
        styles: { width: '375px', height: '812px' },
        type: 'mobile' as const,
    },
    mobileL: {
        name: 'Mobile L (425px)',
        styles: { width: '425px', height: '812px' },
        type: 'mobile' as const,
    },
    tablet: {
        name: 'Tablet (768px)',
        styles: { width: '768px', height: '1024px' },
        type: 'tablet' as const,
    },
    laptop: {
        name: 'Laptop (1024px)',
        styles: { width: '1024px', height: '768px' },
        type: 'desktop' as const,
    },
    desktop: {
        name: 'Desktop (1280px)',
        styles: { width: '1280px', height: '800px' },
        type: 'desktop' as const,
    },
    desktopL: {
        name: 'Desktop L (1440px)',
        styles: { width: '1440px', height: '900px' },
        type: 'desktop' as const,
    },
}

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        viewport: {
            options: viewports,
            defaultViewport: 'desktop',
        },
        // Fail stories in test mode when axe reports violations
        a11y: {
            test: 'error',
        },
    },
}

export default preview
