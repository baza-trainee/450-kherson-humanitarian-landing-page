import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export function useParams() {
	const router = useRouter();

	const [newParams, setNewParams] = useState<Record<string, string> | null>(null);

	useEffect(() => {
		if (newParams) {
			router.push({
				pathname: router.pathname,
				query: { slug: router.query.slug, ...newParams },
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newParams]);

	const { slug, ...params } = router.query;

	return { slug, params, setParams: setNewParams };
}
