export const getLocalStorage = (key: string) => {
	try {
		const item = localStorage.getItem(key);
		if (!item) {
			return null;
		}

		const parsedItem = JSON.parse(atob(item));
		const { value, expiry } = parsedItem;

		const now = new Date();

		if (now.getTime() > expiry) {
			localStorage.removeItem(key);
			return null;
		}

		return value;
	} catch {
		console.info('LocalStorage está indisponível.')
	}
};

export const setLocalStorage = (
  key: string,
  value: unknown,
  expiry: number,
) => {
	try {
		const now = new Date();

		const item = {
			value,
			expiry: now.getTime() + expiry * 60 * 1000,
		};

		localStorage.setItem(key, btoa(JSON.stringify(item)));
	} catch {
		console.info('LocalStorage está indisponível.')
	}
};
