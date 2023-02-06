import { faker } from '@faker-js/faker';
import { Mappable } from './CustomMap';

export class Company implements Mappable {
    companyName: string;
    location: {
        lat: number;
        lng: number;
    }
    catchPhrase: string;

    constructor() {
        this.companyName = faker.company.name()
        this.location = { 
            lat: parseFloat(faker.address.latitude()),
            lng: parseFloat(faker.address.longitude())
        }
        this.catchPhrase = faker.company.catchPhrase()
    }

    markerContent(): string {
        return this.companyName
    }
}