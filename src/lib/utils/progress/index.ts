export const progressData = {
	'2022-03': 9.05,
	'2022-04': 9.67,
	'2022-05': 11.67,
	'2022-06': 16.18,
	'2022-07': 17.61,
	'2022-08': 20.33,
	'2022-09': 23.64,
	'2022-10': 25.13,
	'2022-11': 30.39,
	'2022-12': 31.83,
	'2023-01': 32.6,
	'2023-02': 32.67,
	'2023-03': 34.94,
	'2023-04': 36.51,
	'2023-05': 36.46,
	'2023-06': 37.7,
	'2023-07': 37.81,
	'2023-08': 39.7,
	'2023-09': 40.55,
	'2023-10': 41.1,
	'2023-11': 40.77,
	'2023-12': 41.11,
	'2024-04': 46.49,
	'2024-05': 52.63,
	'2024-06': 54.05,
	'2024-07': 56.63,
	'2024-08': 60.87,
	'2024-09': 61.23,
	'2024-10': 66.71,
	'2024-11': 100.00,
};

if (!progressData) {
	throw new Error('Raw progress data cannot be empty!');
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const currentProgress = Object.entries(progressData).at(-1)!;
