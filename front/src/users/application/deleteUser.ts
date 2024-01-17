import { UserRepository } from '../domain';

export async function deleteUser(userRepository: UserRepository, id: number): Promise<void> {
    return userRepository.delete(id);
}