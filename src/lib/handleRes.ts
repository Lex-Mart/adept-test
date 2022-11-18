export const handleRes = async <T = unknown>(res: Response) => {
	if (!res.ok) {
		throw new Error(`Error: ${res.status}`)
	}
	return {
		data: (await res.json()) as T,
		totalCount: Number(res.headers.get('x-total-count')),
	}
}
