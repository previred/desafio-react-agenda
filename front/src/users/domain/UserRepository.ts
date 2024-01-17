import { User, UserFormData } from './User';

export interface UserRepository {
    save(user: UserFormData): Promise<User>;
    getAll(): Promise<User[]>;
    delete(id: number): Promise<void>;
}