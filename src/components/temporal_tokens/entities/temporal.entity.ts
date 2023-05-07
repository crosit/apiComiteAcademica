import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "temporal_tokens" })
export class TemporalE {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 255})
    description: string;

    @Column({length: 255})
    service: string;

    @Column({length: 255})
    token: string;

    @Column()
    recordId: number;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

    @DeleteDateColumn({type: 'timestamp', nullable: true})
    deletedAt?: Date;


}