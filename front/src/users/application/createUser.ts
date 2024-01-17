import { User, UserFormData, UserRepository } from '../domain';

export async function createUser(userRepository: UserRepository, user: UserFormData): Promise<User> {
    return userRepository.save(user);
}