import { User, UserRepository } from '../domain'

export async function getAllUsers(userRepository: UserRepository): Promise<User[]> {
    return userRepository.getAll();
}