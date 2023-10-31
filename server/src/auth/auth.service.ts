import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { error } from 'console';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as sgMail from '@sendgrid/mail'
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }


  async login(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ email: createUserDto.email });

      if (!user) {
        return new NotFoundException('Email not found');
      }

      const isPasswordValid = await bcrypt.compare(
        createUserDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        return new NotFoundException('Password not found');
      }
      if(!user.isVarified){
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: '1h',
        });
          const msg = {
            to: user.email,
            from: 'usama.khalid@vaival.com',
            subject: 'Verification Email',
            templateId: "d-77bfc1b87fe44817baf11a343d201bdd", 
            dynamicTemplateData: {
                verification_link: `http://localhost:3000/verify/${token}`,
            } 

        }

          try {
            await sgMail.send(msg);
            this.logger.log('Email sent successfully');
            return new NotFoundException('User not varified verfiy by email');
          } catch (error) {
            this.logger.error('Error sending email', error);
          }
      }

      const jesontoken = jwt.sign({ userId: user.id,IsAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY, {
        expiresIn: '100h',
      });
      return jesontoken;
    } catch (error) {
      console.error('Error during login:', error.message);
      throw new Error('Login failed');
    }
  }



  async varifyUser(id: number) {
    try {
      const user = await this.userRepository.findBy({ id });
    if (!user) {
      return error('Invalid Link');
    }

    let _user = user[0]
    // const mytoken = await this.userRepository.findOneBy({ 
    //   id: id,
    //   token: token,
    //  });
    //  if (!mytoken) {
    //   return new NotFoundException('Invalid Link token');
    //  }
     if (_user.isVarified) {
      return 'Already varified';
     }
     await this.userRepository.update(id,{isVarified: true });
    } catch (error) {
      console.error(error, "varification error");
    }
  }
}

