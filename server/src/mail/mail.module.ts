import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  // imports: [
  //   MailerModule.forRoot({
  //     transport: {
  //       host:'smtp.gmail.com',
  //       port: 465,
  //       secure: true,
  //       auth: { 
  //         user: 'usama.khalid@vaival.com',
  //         pass: 'bdisf824%9ashdh',
  //     },
  //   },
  //   }),
  // ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}


