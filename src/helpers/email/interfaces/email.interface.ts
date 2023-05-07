export interface EmailI {
    to: Array<string>; // Array of email addresses
    cc?: Array<string>; 
    bcc?: Array<string>;
    subject: string; // Subject line
    text?: string;
    attachments?: Array<{}>;
    template: string;
    context?: {};
}