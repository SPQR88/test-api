import {Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from 'class-validator';
import { getManager } from 'typeorm';
import { Service } from "./Service";

@Entity()
export class Company {

    @PrimaryGeneratedColumn()
    public id: number;

    @IsNotEmpty()
    @Column()
    public title: string;

    @ManyToMany(() => Service, service => service.companies, {
        eager: true
    })
    @JoinTable({
        name: 'company_service',
        joinColumn: {
            name: 'company_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'service_id',
            referencedColumnName: 'id',
        },
    })
    services: Service[];

    public async setServices(services: string[]) {
        this.services = [];

        for (let requestService of services) {
            let service = await getManager().findOne(Service, {title: requestService})

            if (!service) {
                service = new Service();
                service.title = requestService;

                await getManager().save(service)
            }

            this.services.push(service)
        }
    }
}
