import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { DepartmentE } from '../../departments/entities/departments.entity';

@Entity({ name: "positions" })
export class PositionE {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({length: 255})
    description: string;

    @Column()
    departmentId: number;

    @CreateDateColumn({default: () => "CURRENT_TIMESTAMP", type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({default: () => "CURRENT_TIMESTAMP", type: "timestamp"})
    updatedAt: Date;

    @DeleteDateColumn({nullable: true, type: "timestamp"})
    deletedAt?: Date;

    @ManyToOne(() => DepartmentE, department => department.id)
    @JoinColumn({name: "departmentId"})
    department: DepartmentE;
}