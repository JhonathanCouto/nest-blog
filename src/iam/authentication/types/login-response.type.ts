import { User } from 'src/users/entities/user.entity';

export type LoginResponseType = {
  accessToken: string;
  refreshToken: string;
  user: Pick<User, 'id' | 'email' | 'username'>;
};
