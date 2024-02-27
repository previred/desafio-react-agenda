/**
 * Interface que define la estructura de un objeto Usuario.
 *
 * Esta Interface es utilizada para tipar objetos de usuario dentro de la aplicación
 *
 * @property {number} [id] - El identificador único del usuario.
 * @property {string} name - El nombre del usuario.
 * @property {string} description - Una breve descripción  del usuario.
 * @property {string} photo - URL de la fotografía del perfil del usuario.
 *
 */

export interface IUser {
  id?: number;
  name: string;
  description: string;
  photo: string;
}
