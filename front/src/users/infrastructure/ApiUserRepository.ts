import { UserFormData, User, UserRepository } from '../domain';

/**
 * Función que crea y devuelve una implementación de UserRepository basada en una API.
 * 
 * @returns {UserRepository} Implementación de UserRepository para la API.
 */
export function createApiUserRepository(): UserRepository {
    return {
        save: saveUser,
        getAll: getAllUsers,
        delete: deleteUser,
    }
}

/**
 * Función asincrónica para guardar un usuario en la API.
 * 
 * @param {UserFormData} user - Datos del usuario a guardar.
 * @returns {Promise<User>} Promesa que se resuelve con el usuario guardado.
 */
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

/**
 * Función asincrónica para obtener todos los usuarios de la API, opcionalmente filtrados por una consulta.
 * 
 * @param {string} query - Consulta opcional para filtrar los usuarios.
 * @returns {Promise<User[]>} Promesa que se resuelve con la lista de usuarios obtenida.
 */
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

/**
 * Función asincrónica para eliminar un usuario de la API por su ID.
 * 
 * @param {number} id - ID del usuario a eliminar.
 * @returns {Promise<void>} Promesa que se resuelve una vez que se ha eliminado el usuario.
 */
async function deleteUser(id: number){
    await fetch('http://localhost:9000/api/users/'+id, {
        method: 'DELETE'
    });
}