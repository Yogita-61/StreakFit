const apiRoot = import.meta.env.VITE_API_URL?.replace(/\/$/, '')

export const API_URL = apiRoot
  ? apiRoot.endsWith('/api') ? apiRoot : `${apiRoot}/api`
  : ''
