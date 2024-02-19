import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(userDto: UserDto): Promise<User> {
    return this.usersRepository.save(this.usersRepository.create(userDto));
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(fields: FindOptionsWhere<User>): Promise<User> {
    return this.usersRepository.findOne({ where: fields });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create({ id, ...updateUserDto }),
    );
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
