// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function hasDuplicates(array: Array<any>) {
	const stringifiedArray = array.map((index) => JSON.stringify(index));
	return (new Set(stringifiedArray)).size !== stringifiedArray.length;
}
