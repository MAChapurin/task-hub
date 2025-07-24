import { projectRepository } from '../repositories/project.repository';

export const getProjectsByUser = projectRepository.getByUserId;
