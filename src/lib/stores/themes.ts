import { storable } from '$lib/utils/storable';

export type Theme = 'dark' | 'light';

export const themeData = storable<Theme | undefined>('theme', undefined);
