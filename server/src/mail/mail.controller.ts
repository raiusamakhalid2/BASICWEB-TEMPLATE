import { Controller, Get, Body } from '@nestjs/common';
import { MailService } from './mail.service';


@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  sendMail() {
    return this.mailService.sendMail();
  }

}
