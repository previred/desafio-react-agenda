import { User, UserFormData } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export async function createUser(userRepository: UserRepository, user: UserFormData): Promise<User> {
    return userRepository.save(user);
}