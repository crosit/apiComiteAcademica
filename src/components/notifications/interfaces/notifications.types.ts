export interface StoreNotificationI {
  receiverId: number;
  content: string;
  subject: string;
  redirectUrl?: string;
}

export interface PushNotificationPayload {
  usersToken: string[];
  subject: string;
  content: string;
}
