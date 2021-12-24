import {Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn} from "typeorm";
import { Company } from "./Company";

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;

    @ManyToMany(() => Company, company => company.services)
    @JoinTable({
        name: 'company_service',
        joinColumn: {
            name: 'service_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'company_id',
            referencedColumnName: 'id',
        },
    })
    companies: Company[];
}
