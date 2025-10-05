import axios from 'axios'
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api'
export const api = axios.create({ baseURL: API_BASE, timeout: 30000 })
export const fetchProductDetail = (url: string) => api.get(`/product/detail?url=${encodeURIComponent(url)}`).then(r=>r.data)
