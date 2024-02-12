import { URL_API, headers } from './config'

export const webApiService = {
  getListLoardService: async () => {
    const urlApi = URL_API + 'users'
    const response = await fetch(urlApi, { method: 'GET', headers })
    return await response.json()
  },
  getListLoardIdUserService: async (q: string) => {
    const urlApi = URL_API + `users?q=${q}`
    const response = await fetch(urlApi, { method: 'GET', headers })
    return await response.json()
  },
  deleteUserService: async (id: string | number) => {
    const urlApi = URL_API + `users/${id}`
    const response = await fetch(urlApi, { method: 'delete', headers })

    return await response.ok
  },
  saverUserService: async (bodyUser: any) => {
    const urlApi = URL_API + 'users'
    const response = await fetch(urlApi,
      {
        method: 'post',
        body: JSON.stringify(bodyUser),
        headers
      })

    return response.status
  },
  searchUserIdService: async (id: string | number) => {
    const urlApi = URL_API + `users/${id}`
    const response = await fetch(urlApi, { method: 'get', headers })
    return response.json()
  }
}
