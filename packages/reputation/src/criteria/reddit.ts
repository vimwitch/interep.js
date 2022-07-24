import { ReputationCriteria } from "../types/criteria"

export default {
    provider: "reddit",
    parameters: [
        { name: "premiumSubscription", type: "boolean" },
        { name: "karma", type: "number" },
        { name: "coins", type: "number" },
        { name: "linkedIdentities", type: "number" }
    ],
    reputationLevels: [
    ]
} as ReputationCriteria
