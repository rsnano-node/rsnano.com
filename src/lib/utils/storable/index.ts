import { writable, type Writable } from 'svelte/store';

export type Storable<T> = Writable<T> & {
	detach: () => void;
	load: () => T | undefined;
};

export const storable = <T>(key: string, value: T): Storable<T> => {
	if (key === undefined || key === '') {
		throw new Error('Storables require a non-empty key to safely interact with local storage');
	}

	const { set, subscribe, update } = writable(value);

	const storeValue = (value: T) => {
		const stringValue = JSON.stringify(value);
		localStorage.setItem(key, stringValue);
	};

	const loadValue = (): T | undefined => {
		const stringValue = localStorage.getItem(key);
		return stringValue ? (JSON.parse(stringValue) as T) : undefined;
	};

	return {
		set(value) {
			storeValue(value);
			set(value);
		},
		subscribe,
		update(updater) {
			update((data) => {
				const newData = updater(data);
				storeValue(newData);
				return newData;
			});
		},
		load() {
			const value = loadValue();
			if (value !== undefined) {
				set(value);
			}
			return value;
		},
		detach() {
			localStorage.removeItem(key);
		}
	};
};
