import { faker } from '@faker-js/faker';

export type Person = {
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	visits: number;
	status: string;
	progress: number;
};

export const data: Person[] = [
	{
		firstName: 'tanner',
		lastName: 'linsley',
		email: 'tanner.linsley@foomail.com',
		age: 24,
		visits: 100,
		status: 'In Relationship',
		progress: 50
	},
	{
		firstName: 'tandy',
		lastName: 'miller',
		email: 'tandy.miller@foomail.com',
		age: 40,
		visits: 40,
		status: 'Single',
		progress: 80
	},
	{
		firstName: 'joe',
		lastName: 'dirte',
		email: 'joe.dirte@foomail.com',
		age: 45,
		visits: 20,
		status: 'Complicated',
		progress: 10
	}
];

export type City = {
	name: string;
	state: string;
};

export function makeCityData() {
	return Array.from({ length: 100 }, () => ({
		name: faker.location.city(),
		state: faker.location.state({ abbreviated: true })
	}));
}
