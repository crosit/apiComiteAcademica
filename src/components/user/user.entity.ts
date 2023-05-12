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
  nombre: string;

  @Column({ length: "200", nullable: false })
  apellido_p: string;

  @Column({ length: "250", nullable: false })
  apellido_m: string;

  @Column({ length: "11", nullable: true })
  numero_control: string;

  @Column({ length: "255", nullable: false })
  correo: string;

  @Column({ length: "255", nullable: false })
  password: string;

  @Column({ length: "255",unsigned: false })
  telefono: string;

  @Column({ unsigned: true })
  tipoId: number;

  // @Column({ default: false })
  // isAdmin: boolean;

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

  // @OneToOne(() => CompanyEntity, (company) => company.id)
  // @JoinColumn({ referencedColumnName: "id" })
  // company: CompanyEntity;

  // @OneToOne(() => PositionE, (position) => position.id)
  // @JoinColumn({ referencedColumnName: "id" })
  // position: PositionE;

  // @OneToMany(() => NotificationFcmTokenEntity, (fcmToken) => fcmToken.user)
  // // @JoinColumn({ referencedColumnName: "userId" })
  // fcmToken: NotificationFcmTokenEntity[];
}
