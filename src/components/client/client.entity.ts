import { Exclude, Expose } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "clients" })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true, nullable: false })
  isActive: boolean;

  @Column({ length: "175", nullable: false })
  name: string;

  @Column({ length: "175", nullable: false })
  contact_name: string;

  @Column({ unsigned: false })
  contact_phone: number;

  @Column({ nullable: false, length: 100 })
  contact_email: string;

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
}
