import { Attachment } from "nodemailer/lib/mailer";
import { UserEntity } from "../../user/user.entity";

export enum BroadCastStrategy {
  SMS = "sms",
  EMAIL = "email",
  PUSH = "push",
}
export interface NotificationJob {
  key: string;
  subject: string;
  text: string;
  smsText: string;
  html?: string;
  redirectUrl?: string;
  notifiables: UserEntity[];
  attachments?: Attachment[];
  strategies: BroadCastStrategy[];
  template?: string;
  bodyEmail?: any;
  content: string;
}

export interface CustomNotifiable {
  users?: number[];
  positions?: number[];
  departments?: number[];
}

export abstract class CustomNotification {
  protected sms: boolean;
  protected push: boolean;
  protected email: boolean;
  protected redirectUrl: string;

  constructor() {
    this.sms = true;
    this.email = true;
    this.push = true;
    this.redirectUrl = "";
  }

  public getSmsText(): string {
    return "";
  }
  public getRedirectUrl() {
    return this.redirectUrl;
  }

  public abstract getText(): string;
  public abstract getContent(): string;
  public abstract getActionKey(): string;
  public abstract getSubject(): string;
  public abstract getNotifiables(): CustomNotifiable;

  public getBroadcastStrategies(): BroadCastStrategy[] {
    const strategies = [];
    if (this.sms) strategies.push(BroadCastStrategy.SMS);
    if (this.push) strategies.push(BroadCastStrategy.PUSH);
    if (this.email) strategies.push(BroadCastStrategy.EMAIL);
    return strategies;
  }
}
