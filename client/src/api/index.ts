const urlBase = 'http://localhost:9000'

export const getData = (url: string) => {
  return fetch(urlBase + url)
}

export const createData = (url: string, data: any) => {
  return fetch(urlBase + url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  } )
}

export const removeData = (url: string) => {
  return fetch(urlBase + url, {
    method: 'DELETE'
  })
}

export const editData = (url: string, data: any) => {
  return fetch(urlBase + url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}