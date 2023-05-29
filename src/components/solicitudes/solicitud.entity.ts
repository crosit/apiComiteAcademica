import { Exclude, Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ClientEntity } from "../client/client.entity";
import { OneToMany } from 'typeorm';
import { UserEntity } from "../user/user.entity";

@Entity({ name: "documentos" })
export class SolicitudEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ nullable: false })
  descripcion: string;

  @Column({ length: "255", nullable: false })
  url: string;

  @Column({ unsigned: false,default: 1 })
  estatusId: number;

  @Column({ unsigned: false })
  nombreDocumento:string;

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
  @ManyToMany(()=>UserEntity)
  @JoinTable()
  usuarios:UserEntity[];

  

}
