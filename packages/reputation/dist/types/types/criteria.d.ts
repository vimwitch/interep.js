export declare enum OAuthProvider {
    TWITTER = "twitter",
    GITHUB = "github",
    REDDIT = "reddit"
}
export declare type ReputationParameterName = string;
export declare type ReputationParameterType = "number" | "boolean";
export declare type ReputationParameterValue = number | boolean | {
    "<"?: number;
    ">"?: number;
};
export declare type ReputationParameters = {
    name: ReputationParameterName;
    type: ReputationParameterType;
}[];
export declare enum ReputationLevel {
    GOLD = "gold",
    SILVER = "silver",
    BRONZE = "bronze",
    UNRATED = "unrated"
}
export declare type ReputationRule = {
    parameter: ReputationParameterName;
    value: ReputationParameterValue;
};
export declare type ReputationLevels = {
    name: ReputationLevel;
    rules: ReputationRule[];
}[];
export declare type ReputationCriteria = {
    provider: OAuthProvider;
    parameters: ReputationParameters;
    reputationLevels: ReputationLevels;
};
