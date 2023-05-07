import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CompanyEntity } from "../company/company.entity";
import { NotificationFcmTokenEntity } from "../notifications/fcm_tokens/fcm_token.entity";
import { PositionE } from "../positions/entities/position.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: "200", nullable: false })
  firstname: string;

  @Column({ length: "250", nullable: false })
  lastname: string;

  @Column({ length: "255", nullable: false })
  email: string;

  @Column({ length: "255", nullable: false })
  password: string;

  @Column({ unsigned: false })
  companyId: number;

  @Column({ unsigned: true })
  positionId: number;

  @Column({ default: false })
  isAdmin: boolean;

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

  @OneToOne(() => CompanyEntity, (company) => company.id)
  @JoinColumn({ referencedColumnName: "id" })
  company: CompanyEntity;

  @OneToOne(() => PositionE, (position) => position.id)
  @JoinColumn({ referencedColumnName: "id" })
  position: PositionE;

  @OneToMany(() => NotificationFcmTokenEntity, (fcmToken) => fcmToken.user)
  // @JoinColumn({ referencedColumnName: "userId" })
  fcmToken: NotificationFcmTokenEntity[];
}
