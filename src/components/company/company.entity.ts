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
import { OneToMany } from 'typeorm';

@Entity({ name: "estatus" })
export class EstatusEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: "255", nullable: false })
  descripcion: string;

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

  // @ManyToOne(() => ClientEntity, (client) => client.id)
  // client: ClientEntity;

  // @OneToMany(() => DepartmentE, department => department.company, {cascade: true})
  // departments: DepartmentE[];

}
