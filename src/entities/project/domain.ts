import { Project, ProjectParticipant, User } from '@prisma/client';

export type ProjectWithParticipants = Project & {
  owner: User;
  participants: (ProjectParticipant & {
    user: Pick<User, 'id' | 'name' | 'surname' | 'avatarUrl'>;
  })[];
};
