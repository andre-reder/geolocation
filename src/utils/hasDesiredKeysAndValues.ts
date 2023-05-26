export interface AnyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export default function hasDesiredKeysAndValues(arr: AnyObject[], desiredKeys: string[]): boolean {
	return arr.every(obj => {
		return desiredKeys.every(key => {
			return Object.keys(obj).includes(key) && obj[key] !== undefined && obj[key] !== '' && obj[key] !== null;
		});
	});
}
