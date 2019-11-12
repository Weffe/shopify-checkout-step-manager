/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    title: 'Shopify Checkout Step Manager',
    tagline: 'Easily execute code during Shopify Checkout',
    url: 'https://weffe.github.io/shopify-checkout-step-manager',
    baseUrl: '/',
    favicon: 'img/favicon.ico',
    organizationName: 'Weffe', // Usually your GitHub org/user name.
    projectName: 'shopify-checkout-step-manager', // Usually your repo name.
    themeConfig: {
        navbar: {
            title: 'My Site',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },
            links: [
                { to: 'docs/doc1', label: 'Docs', position: 'left' },
                { to: 'blog', label: 'Blog', position: 'left' },
                {
                    href: 'https://weffe.github.io/shopify-checkout-step-manager',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Docs',
                            to: 'docs/doc1',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Discord',
                            href: 'https://discordapp.com/invite/docusaurus',
                        },
                    ],
                },
                {
                    title: 'Social',
                    items: [
                        {
                            label: 'Blog',
                            to: 'blog',
                        },
                    ],
                },
            ],
            logo: {
                alt: 'Facebook Open Source Logo',
                src: 'https://docusaurus.io/img/oss_logo.png',
            },
            copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc. Built with Docusaurus.`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            },
        ],
    ],
};
