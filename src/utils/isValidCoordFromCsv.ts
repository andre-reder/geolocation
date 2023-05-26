export default function isValidCoordFromCsv(str: string): boolean {
	const pattern = /^[0-9_-]+$/;
	return pattern.test(str);
}
