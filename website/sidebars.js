/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const apiIds = ['CheckoutStepManager', 'Options', 'defaultOptions'].map((id) => 'api/' + id);
const welcomeIds = ['getting-started', 'usage'].map((id) => 'welcome/' + id);
const guideIds = [].map((id) => 'guide/' + id);

module.exports = {
    docs: {
        Welcome: welcomeIds,
        Guide: guideIds,
        Api: apiIds,
    },
};
