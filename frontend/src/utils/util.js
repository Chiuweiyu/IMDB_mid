const BASE_URL = `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`

export const api = resource => `${BASE_URL}${resource}`