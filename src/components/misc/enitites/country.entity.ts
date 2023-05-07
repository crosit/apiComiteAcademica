import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { StateE } from './state.entity';

@Entity({ name: 'country' })
export class CountryE {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    description: string;

    @Column({ length: 20 })
    iso: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    
    @DeleteDateColumn({nullable: true})
    deletedAt: Date;

    @OneToMany(type => StateE, state => state.country)
    states: StateE[];

}