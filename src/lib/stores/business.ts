import { writable } from 'svelte/store';

export interface BusinessHours {
	open?: string;
	close?: string;
	closed?: boolean;
}

export interface Address {
	name: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	isMailing?: boolean;
	isPhysical?: boolean;
	walkIns?: boolean;
	byAppointment?: boolean;
}

export interface BusinessInfo {
	name: string;
	phone: string;
	email: string;
	hours: Record<string, BusinessHours>;
	addresses: Address[];
	timezone: string;
}

const defaultBusinessInfo: BusinessInfo = {
	name: 'PremoWeb LLC',
	phone: '+1 888-773-6693',
	email: 'support@premoweb.com',
	hours: {
		monday: { open: '9:00 AM', close: '5:00 PM' },
		tuesday: { open: '9:00 AM', close: '5:00 PM' },
		wednesday: { open: '9:00 AM', close: '5:00 PM' },
		thursday: { open: '9:00 AM', close: '5:00 PM' },
		friday: { open: '9:00 AM', close: '5:00 PM' },
		saturday: { closed: true },
		sunday: { closed: true }
	},
	addresses: [
		{
			name: 'Headquarters',
			street: '123 Main Street',
			city: 'San Diego',
			state: 'CA',
			zip: '92101',
			isPhysical: true,
			isMailing: true,
			walkIns: true,
			byAppointment: false
		}
	],
	timezone: 'America/Los_Angeles'
};

export const businessInfo = writable<BusinessInfo>(defaultBusinessInfo);
