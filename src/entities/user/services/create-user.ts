import { left, right } from '@/shared/lib/either';
import { userRepository } from '../repositories/user';
import cuid from 'cuid';
import { passwordService } from './password';

export const createUser = async ({
  login,
  password,
  email,
}: {
  login: string;
  password: string;
  email: string;
}) => {
  const userWithLogin = await userRepository.getUser({ login });

  if (userWithLogin) {
    return left('user-login-exists' as const);
  }

  const { hash, salt } = await passwordService.hashPassword(password);

  const user = await userRepository.saveUser({
    id: cuid(),
    login,
    passwordHash: hash,
    salt,
    email,
  });

  return right(user);
};
