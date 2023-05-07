import { Exclude, Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ClientEntity } from "../client/client.entity";
import { DepartmentE } from '../departments/entities/departments.entity';
import { OneToMany } from 'typeorm';

@Entity({ name: "companies" })
export class CompanyEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: "175", nullable: false })
  name: string;

  @Column({ length: "25", nullable: false })
  rfc: string;

  @Column({ unsigned: false })
  clientId: number;

  @Column()
  zipCode: number;

  @Column({ length: "255" })
  neighborhood: string;

  @Column({ length: "255" })
  imagePath: string;

  @Column({ length: "255" })
  street: string;

  @Column()
  number: number;

  @Column({ length: "120" })
  city: string;

  @Column({ length: "120" })
  country: string;

  @Column({ length: "120" })
  state: string;

  @Column({ length: "20" })
  taxSystem: string;

  @Column({ default: true })
  status: boolean;

  @Column({length: '120'})
  alias: string;

  @Column({length: '255'})
  photo: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt?: Date;

  @ManyToOne(() => ClientEntity, (client) => client.id)
  client: ClientEntity;

  @OneToMany(() => DepartmentE, department => department.company, {cascade: true})
  departments: DepartmentE[];

}
