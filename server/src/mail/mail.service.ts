import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }


  async sendMail() {
    const msg = {
      to: 'raiusamakhalid@gmail.com',
      from: 'usama.khalid@vaival.com',
      subject: 'Verified mail',
      text: 'User has verified',
      html: '<b>User has verified that send by CodeFist</b>',
    };

     
    try {
      await sgMail.send(msg);
      this.logger.log('Email sent successfully');
    } catch (error) {
      this.logger.error('Error sending email', error);
    }
  }
}
