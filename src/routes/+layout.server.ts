import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url }) => {
	return {
		url: {
			hostname: url.hostname,
			protocol: url.protocol,
			port: url.port,
			href: url.href
		}
	};
};
