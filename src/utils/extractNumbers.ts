export default function extractNumbers(str: string): string {
	const numberPattern = /[0-9.]/g;
	const extractedNumbers = str.match(numberPattern)?.join('') || '';
	return extractedNumbers;
}
