export type UserEntity = {
  id: string;
  login: string;
  passwordHash: string;
  salt: string;
  email: string;
};

export type SessionEntity = {
  id: string;
  login: string;
  expiredAt: string;
};

export const userToSession = (user: UserEntity, expiredAt: string): SessionEntity => {
  return {
    id: user.id,
    login: user.login,
    expiredAt,
  };
};
