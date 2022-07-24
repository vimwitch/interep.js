export declare type TwitterParameters = {
    followers?: number;
    botometerOverallScore?: number;
    verifiedProfile?: boolean;
};
export declare type GithubParameters = {
    followers?: number;
    receivedStars?: number;
    proPlan?: boolean;
};
export declare type RedditParameters = {
    premiumSubscription?: boolean;
    karma?: number;
    coins?: number;
    linkedIdentities?: number;
};
export declare type ProviderParameters = TwitterParameters | GithubParameters | RedditParameters;
