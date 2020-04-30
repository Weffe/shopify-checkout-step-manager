/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    title: 'Shopify Checkout Step Manager',
    tagline: 'Easily execute code during Shopify Checkout',
    url: 'https://weffe.github.io',
    baseUrl: '/shopify-checkout-step-manager/',
    favicon: 'img/shopify-favicon.png',
    organizationName: 'Weffe', // Usually your GitHub org/user name.
    projectName: 'shopify-checkout-step-manager', // Usually your repo name.
    themeConfig: {
        navbar: {
            title: 'Shopify Checkout Step Manager',
            links: [
                { to: 'docs/welcome/getting-started', label: 'Getting Started', position: 'left' },
                { to: 'docs/guides/example', label: 'Guides', position: 'left' },
                { to: 'docs/api/CheckoutStepManager', label: 'Api', position: 'left' },
                {
                    href: 'https://github.com/Weffe/shopify-checkout-step-manager',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Quick Links',
                    items: [
                        {
                            label: 'Getting Started',
                            to: 'docs/getting_started',
                        },
                        {
                            label: 'Guides',
                            to: 'docs/guides/setup',
                        },
                    ],
                },
            ],
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    showLastUpdateTime: true,
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
};
