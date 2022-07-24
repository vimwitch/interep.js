import { OAuthProvider, ReputationLevel } from "./types/criteria";
import { ProviderParameters } from "./types/providerParameters";
/**
 * Returns the reputation based on the parameters.
 * @param provider The provider.
 * @param paramaters The provider parameters to check.
 * @returns The reputation level found.
 */
export default function calculateReputation(provider: OAuthProvider, paramaters: ProviderParameters): ReputationLevel;
