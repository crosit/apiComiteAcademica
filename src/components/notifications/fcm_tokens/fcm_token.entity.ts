import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserEntity } from "../../user/user.entity";

@Entity({ name: "notifications_fcm_tokens" })
export class NotificationFcmTokenEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unsigned: true, nullable: false })
  userId: number;

  @Column({ length: "255", nullable: false })
  fcmToken: string;

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

  // @ManyToOne(() => UserEntity, (user) => user.fcmToken)
  // @JoinColumn({ name: "userId" })
  user: UserEntity;
}
