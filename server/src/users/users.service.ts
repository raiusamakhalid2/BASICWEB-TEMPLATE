import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as sgMail from '@sendgrid/mail';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOneBy({
        email: createUserDto.email,
      });

      if (existingUser) {
        return new NotFoundException('Email already exists');
      }
      // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // const userToCreate = {
      //   ...createUserDto,
      //   token: token,
      // };

      const newUser = await this.userRepository.save(createUserDto);
      if (newUser){
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: '1h',
        });
          const msg = {
            to: newUser.email,
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
          } catch (error) {
            this.logger.error('Error sending email', error);
          }
        }
      


    } catch (error) {
      console.error('Error creating user:', error.message);
      throw new Error('Failed to create user');
    }
  }
  


  async findAll() {
    const user = await this.userRepository.find();
    if (!user) {
      throw new Error('Users not found');
    }
    return user;
  }



  async findOne(id: number) {
    const user = await this.userRepository.findBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }



  async update(id: number, updateUserDto: UpdateUserDto) {
    const _user = await this.userRepository.findBy({ id });
    var user = _user[0]
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserDto.email, id: Not(id) },
      });

      if (existingUser) {
        throw new Error('Email already exists');
      }
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      // user.map((user) => {
          user.email = updateUserDto.email,
          user.phone = updateUserDto.phone,
          user.password = hashedPassword,
          user.isAdmin = updateUserDto.isAdmin,
          user.isVarified = updateUserDto.isVarified
      // });

      await this.userRepository.save(user);
      return 'User updated successfully';
    } catch (err) {
      console.error('Error updating user:', err.message);
    }
  }



  async remove(id: number) {
    const entity = await this.userRepository.findOneBy({ id });
    await this.userRepository.remove(entity);
    return 'remove Successfully';
  }



  
}
