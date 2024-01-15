export const transformData = (apiData) => {
  return apiData.map((user) => ({
    key: user.id.toString(), // La clave debe ser un string y única para cada fila
    name: [user.name, user.photo],
    description: user.description,
  }));
};
