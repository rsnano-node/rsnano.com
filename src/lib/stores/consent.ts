import { storable } from '$lib/utils/storable';

export type ThirdPartyConsent = {
	youtube: boolean;
};

export const consent = storable<ThirdPartyConsent>('consent', { youtube: false });
