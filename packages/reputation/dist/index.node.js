/**
 * @module @interep/reputation
 * @version 0.4.0
 * @file Definitions and utility functions of Interep reputation.
 * @copyright Omar Desogus 2022
 * @license MIT
 * @see [Github]{@link https://github.com/interep-project/interep.js/tree/main/packages/reputation}
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var githubCriteria = {
    provider: "github",
    parameters: [
        { name: "followers", type: "number" },
        { name: "receivedStars", type: "number" },
        { name: "proPlan", type: "boolean" }
    ],
    reputationLevels: [
        {
            name: "gold",
            rules: [
                {
                    parameter: "followers",
                    value: null
                },
                {
                    parameter: "receivedStars",
                    value: {
                        ">": 10
                    }
                },
                {
                    parameter: "proPlan",
                    value: null
                }
            ]
        },
        {
            name: "silver",
            rules: [
                {
                    parameter: "followers",
                    value: {
                        ">": 10
                    }
                },
                {
                    parameter: "receivedStars",
                    value: null
                },
                {
                    parameter: "proPlan",
                    value: null
                }
            ]
        },
        {
            name: "bronze",
            rules: [
                {
                    parameter: "followers",
                    value: null
                },
                {
                    parameter: "receivedStars",
                    value: null
                },
                {
                    parameter: "proPlan",
                    value: true
                }
            ]
        },
    ]
};

var redditCriteria = {
    provider: "reddit",
    parameters: [
        { name: "premiumSubscription", type: "boolean" },
        { name: "karma", type: "number" },
        { name: "coins", type: "number" },
        { name: "linkedIdentities", type: "number" }
    ],
    reputationLevels: []
};

var twitterCriteria = {
    provider: "twitter",
    parameters: [
        { name: "followers", type: "number" },
        { name: "botometerOverallScore", type: "number" },
        { name: "verifiedProfile", type: "boolean" }
    ],
    reputationLevels: [
        {
            name: "bronze",
            rules: [
                {
                    parameter: "followers",
                    value: {
                        ">": 500
                    }
                },
                {
                    parameter: "botometerOverallScore",
                    value: {
                        "<": 2
                    }
                },
                {
                    parameter: "verifiedProfile",
                    value: null
                }
            ]
        }
    ]
};

exports.OAuthProvider = void 0;
(function (OAuthProvider) {
    OAuthProvider["TWITTER"] = "twitter";
    OAuthProvider["GITHUB"] = "github";
    OAuthProvider["REDDIT"] = "reddit";
})(exports.OAuthProvider || (exports.OAuthProvider = {}));
exports.ReputationLevel = void 0;
(function (ReputationLevel) {
    ReputationLevel["GOLD"] = "gold";
    ReputationLevel["SILVER"] = "silver";
    ReputationLevel["BRONZE"] = "bronze";
    ReputationLevel["UNRATED"] = "unrated";
})(exports.ReputationLevel || (exports.ReputationLevel = {}));

/**
 * Returns the criteria used for a provider.
 * @param provider The provider.
 * @returns The provider criteria.
 */
function getReputationCriteria(provider) {
    switch (provider) {
        case exports.OAuthProvider.TWITTER:
            return twitterCriteria;
        case exports.OAuthProvider.GITHUB:
            return githubCriteria;
        case exports.OAuthProvider.REDDIT:
            return redditCriteria;
        default:
            throw new Error("Provider '".concat(provider, "' is not supported"));
    }
}

/**
 * Returns the reputation based on the parameters.
 * @param provider The provider.
 * @param paramaters The provider parameters to check.
 * @returns The reputation level found.
 */
function calculateReputation(provider, paramaters) {
    var criteria = getReputationCriteria(provider);
    var providerParameterNames = criteria.parameters.map(function (parameter) { return parameter.name; });
    var providerParameterTypes = criteria.parameters.map(function (parameter) { return parameter.type; });
    for (var parameterName in paramaters) {
        if (Object.prototype.hasOwnProperty.call(paramaters, parameterName)) {
            var parameterIndex = providerParameterNames.indexOf(parameterName);
            if (parameterIndex === -1) {
                throw new Error("Parameter '".concat(parameterName, "' is not supported"));
            }
            var paramaterValue = paramaters[parameterName];
            var expectedType = providerParameterTypes[parameterIndex];
            if (typeof paramaterValue !== expectedType) {
                throw new TypeError("Parameter '".concat(parameterName, "' is not a ").concat(expectedType));
            }
        }
    }
    for (var _i = 0, _a = criteria.reputationLevels; _i < _a.length; _i++) {
        var reputation = _a[_i];
        for (var _b = 0, _c = reputation.rules; _b < _c.length; _b++) {
            var rule = _c[_b];
            if (rule.value !== null) {
                var parameterValue = paramaters[rule.parameter];
                if (parameterValue !== undefined) {
                    if (typeof rule.value !== "object") {
                        if (parameterValue === rule.value) {
                            return reputation.name;
                        }
                    }
                    else if ((rule.value["<"] !== undefined || rule.value[">"] !== undefined) &&
                        (rule.value["<"] === undefined || parameterValue < rule.value["<"]) &&
                        (rule.value[">"] === undefined || parameterValue > rule.value[">"])) {
                        return reputation.name;
                    }
                }
            }
        }
    }
    return exports.ReputationLevel.UNRATED;
}

/**
 * Returns all the reputation levels (gold, silver, bronze).
 * @returns A list of reputation levels.
 */
function getReputationLevels() {
    return Object.values(exports.ReputationLevel);
}

/**
 * Returns all supported OAuth providers.
 * @returns A list of providers.
 */
function getOAuthProviders() {
    return Object.values(exports.OAuthProvider);
}

exports.calculateReputation = calculateReputation;
exports.getOAuthProviders = getOAuthProviders;
exports.getReputationCriteria = getReputationCriteria;
exports.getReputationLevels = getReputationLevels;
exports.githubCriteria = githubCriteria;
exports.redditCriteria = redditCriteria;
exports.twitterCriteria = twitterCriteria;
