import { UserFormData, User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export function createApiUserRepository(): UserRepository {
    return {
        save: saveUser,
        getAll: getAllUsers,
        delete: deleteUser,
    }
}

async function saveUser(user: UserFormData){
    const response = await fetch('http://localhost:9000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name:user.name,
            description:user.description,
            photo:user.photo
        })
    });

    const savedUser = await response.json() as User;
    return savedUser;
}

async function getAllUsers(query?: string){
    let url = 'http://localhost:9000/api/users';

    if (query) {
        url += `?q=${encodeURIComponent(query)}`;
    }
    
    const users = await fetch(url).then(
        (response) => response.json() as Promise<User[]>
    );
    return users;
}

async function deleteUser(id: number){
    await fetch('http://localhost:9000/api/users/'+id, {
        method: 'DELETE'
    });
}