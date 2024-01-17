import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export async function getAllUsers(userRepository: UserRepository): Promise<User[]> {
    return userRepository.getAll();
}