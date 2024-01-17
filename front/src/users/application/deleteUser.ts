import { UserRepository } from '../domain/UserRepository';

export async function deleteUser(userRepository: UserRepository, id: number): Promise<void> {
    return userRepository.delete(id);
}