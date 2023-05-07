import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity({ name: "notifications" })
export class NotificationEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, nullable: false })
  receiverId: number;

  @Column({ length: "500", nullable: false })
  content: string;

  @Column({ length: "500", nullable: false })
  subject: string;

  @Column({ length: "255", nullable: true })
  redirectUrl: string;

  @Column({ default: false, nullable: false })
  read: boolean;

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

  @OneToOne(() => UserEntity, (receiver) => receiver.id)
  @JoinColumn({ referencedColumnName: "id" })
  receiver: UserEntity;
}
