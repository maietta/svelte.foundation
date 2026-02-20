import { writable } from 'svelte/store';

export interface NavItem {
	id: string;
	label: string;
	href: string;
	showOnHeader?: boolean;
	showOnFooter?: boolean;
	showOnMobile?: boolean;
}

export const navigationItems = writable<NavItem[]>([
	{
		id: 'home',
		label: 'Home',
		href: '/',
		showOnHeader: true,
		showOnFooter: false,
		showOnMobile: true
	},
	{
		id: 'services',
		label: 'Services',
		href: '/services',
		showOnHeader: true,
		showOnFooter: true,
		showOnMobile: true
	},
	{
		id: 'about',
		label: 'About',
		href: '/about',
		showOnHeader: true,
		showOnFooter: true,
		showOnMobile: true
	},
	{
		id: 'blog',
		label: 'Blog',
		href: '/blog',
		showOnHeader: true,
		showOnFooter: true,
		showOnMobile: true
	},
	{
		id: 'contact',
		label: 'Contact',
		href: '/contact',
		showOnHeader: true,
		showOnFooter: true,
		showOnMobile: true
	},
	{
		id: 'faq',
		label: 'FAQ',
		href: '/faq',
		showOnHeader: false,
		showOnFooter: true,
		showOnMobile: true
	}
]);
