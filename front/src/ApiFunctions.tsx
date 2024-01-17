import axios from 'axios';

export const API_URL = 'http://localhost:9000/api/users';

export const getAllUsers = async (limit = 5) => {
  try {
    //fetches all the users from the API
    const response = await axios.get(`${API_URL}?&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsersByName = async (name: string) => {
  try {
    //fetches the data by name from the API
    const response = await axios.get(`${API_URL}?q=${name}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteUsers = async (id: number) => {
  try {
    //deletes the user by id from the API
    await axios.delete(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    //shows a successfull message to the user
    alert(`Contacto borrado con exito!`);
  } catch (error) {
    console.error(`Error !.`);
    // Handle error scenarios or display an error message to the user
  }
}
