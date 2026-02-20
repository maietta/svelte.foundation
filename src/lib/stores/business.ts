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
	tagline?: string;
	phone: string;
	fax?: string;
	email: string;
	hours: Record<string, BusinessHours>;
	addresses: Address[];
	timezone: string;
}

const defaultBusinessInfo: BusinessInfo = {
	name: 'PremoWeb LLC',
	tagline: 'Professional web presence, built to grow your business.',
	phone: '+1 888-PREMOWEB',
	email: 'hi@premoweb.com',
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
			street: '464-775 Main Street',
			city: 'Janesville',
			state: 'CA',
			zip: '96114',
			isPhysical: true,
			isMailing: false,
			walkIns: false,
			byAppointment: true
		},
		{
			name: 'Mailing Address',
			street: '460-280 Whispering Pines Drive',
			city: 'Janesville',
			state: 'CA',
			zip: '96114',
			isPhysical: false,
			isMailing: true,
			walkIns: false,
			byAppointment: true
		}

	],
	timezone: 'America/Los_Angeles'
};

export const businessInfo = writable<BusinessInfo>(defaultBusinessInfo);
