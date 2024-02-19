import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const userDto: UserDto = {
      email: 'test@example.com',
      username: 'test',
      password: 'test',
    };
    const user = new User();
    user.email = userDto.email;
    user.username = userDto.username;
    user.password = userDto.password;

    jest.spyOn(repository, 'create').mockReturnValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    expect(await service.create(userDto)).toEqual(user);
    expect(repository.create).toHaveBeenCalledWith(userDto);
    expect(repository.save).toHaveBeenCalledWith(user);
  });
});
