export const fetchPOST = (data, URL) =>
	fetch(URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
