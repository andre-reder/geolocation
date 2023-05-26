import { useEffect, useState } from 'react';

export default function useLocalState(key: string, initialValue: string | object = '') {
	const [state, setState] = useState(() => {
		const storedData = localStorage.getItem(key);

		if ((storedData && storedData !== 'undefined')) {
			return JSON.parse(storedData);
		}

		return initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState];
}
