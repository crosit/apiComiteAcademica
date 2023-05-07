import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { PositionE } from '../../positions/entities/position.entity';
import { CompanyEntity } from '../../company/company.entity';
@Entity({ name: 'departments' })
export class DepartmentE {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100})
    name: string;

    @Column({ length: 255})
    description: string;

    @Column()
    companyId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => PositionE, position => position.department, {cascade: true})
    positions: PositionE[];

    @ManyToOne(() => CompanyEntity, company => company.departments)
    @JoinColumn({name: 'companyId'})
    company: CompanyEntity;

}