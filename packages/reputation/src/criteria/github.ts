import { ReputationCriteria } from "../types/criteria"

export default {
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
} as ReputationCriteria
