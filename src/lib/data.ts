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

export function makePersonData(): Person[] {
	return Array.from({ length: 100 }, () => {
		const sex = faker.person.sexType();
		const firstName = faker.person.firstName(sex);
		const lastName = faker.person.lastName(sex);
		const email = faker.internet.email({ firstName, lastName });

		return {
			firstName,
			lastName,
			email,
			age: faker.number.int({ min: 18, max: 70 }),
			visits: faker.number.int(100),
			status: faker.helpers.arrayElement(['Single', 'In Relationship', 'Complicated']),
			progress: faker.number.int(100)
		};
	});
}

export type City = {
	name: string;
	state: string;
};

export function makeCityData(): City[] {
	return Array.from({ length: 100 }, () => ({
		name: faker.location.city(),
		state: faker.location.state({ abbreviated: true })
	}));
}
