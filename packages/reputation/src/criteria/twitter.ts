import { ReputationCriteria } from "../types/criteria"

export default {
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
} as ReputationCriteria
