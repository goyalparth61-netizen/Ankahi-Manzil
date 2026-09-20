// Destination Service — API client integration with data fallback

import api from './apiClient'
import { destinations } from '../data/destinations'

export async function getAllDestinations(q = '', category = '') {
  try {
    const params = new URLSearchParams()
    if (q) params.append('q', q)
    if (category && category.toLowerCase() !== 'all') params.append('category', category)
    const queryString = params.toString() ? `?${params.toString()}` : ''

    const response = await api.get(`/destinations${queryString}`)
    if (response && response.data) {
      return { success: true, data: response.data }
    }
  } catch (error) {
    console.warn('[destinationService] Failed to fetch from backend, using local destinations:', error.message)
  }

  // Fallback to local dataset
  let filtered = destinations
  if (category && category.toLowerCase() !== 'all') {
    filtered = filtered.filter(d => d.categories.some(c => c.toLowerCase() === category.toLowerCase()))
  }
  if (q && q.trim()) {
    const query = q.toLowerCase()
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query) ||
      d.categories.some(c => c.toLowerCase().includes(query))
    )
  }
  return { success: true, data: filtered }
}

export async function getDestinationBySlug(slug) {
  try {
    const response = await api.get(`/destinations/${slug}`)
    if (response && response.data) {
      return { success: true, data: response.data }
    }
  } catch (error) {
    console.warn(`[destinationService] Failed to fetch ${slug} from backend:`, error.message)
  }

  const dest = destinations.find(d => d.slug === slug || d.name.toLowerCase() === slug.toLowerCase())
  if (!dest) {
    return { success: false, error: 'Destination not found' }
  }
  return { success: true, data: dest }
}
