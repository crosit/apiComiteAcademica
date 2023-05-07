import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, ManyToOne } from 'typeorm';
import { CountryE } from './country.entity';

@Entity({ name: 'state' })
export class StateE {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    description: string;

    @Column()
    countryId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({nullable: true})
    deletedAt: Date;

    @ManyToOne(type => CountryE, country => country.states)
    country: CountryE;

}