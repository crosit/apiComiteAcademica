import {
  CustomNotification,
  CustomNotifiable,
} from "../../notifications/interfaces/CustonNotifications.interface";
import { UserEntity } from "../user.entity";

export class WelcomingNotifications extends CustomNotification {
  constructor(private readonly newUser: UserEntity) {
    super();
    this.sms = false;
    this.email = true;
    this.push = true;
    this.redirectUrl = ``;
  }

  public getActionKey(): string {
    return "WELCOMING-NEW-USER";
  }

  public getSubject(): string {
    return `Welcoming to Comite ${this.newUser.apellido_p} ${this.newUser.apellido_m}`;
  }

  public getContent(): string {
    return `${
      (this, this.getSubject())
    }. The administrator just gave you access to this amazing platform ${this.newUser.correo}`;
  }

  public getText(): string {
    return `${this.getSubject()}`;
  }

  public getSmsText(): string {
    return `${this.getSubject()}`;
  }

  public getNotifiables(): CustomNotifiable {
    let notifiables: CustomNotifiable = {
      users: [this.newUser.id],
    };

    return notifiables;
  }
}
