import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: 'taxsystem' })
export class TaxSystemE {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    taxSystem: number;

    @Column({ length: 150 })
    description: string;

    @Column({nullable: true})
    fisica: boolean;

    @Column({ nullable: true })
    moral: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}