import api from './apiClient'
import { destinations } from '../data/destinations'

export async function getAllDestinations(q = '', category = '') {
  try {
    const params = new URLSearchParams()
    if (q) params.append('q', q)
    if (category && category.toLowerCase() !== 'all') params.append('category', category)
    const queryString = params.toString() ? `?${params.toString()}` : ''

    const response = await api.get(`/destinations${queryString}`)
    if (response?.data) {
      return { success: true, data: response.data, source: 'backend' }
    }
  } catch (error) {
    console.warn('[destinationService] Backend unavailable, using local destination data:', error.message)
  }

  let filtered = destinations
  if (category && category.toLowerCase() !== 'all') {
    filtered = filtered.filter((destination) =>
      destination.categories.some((item) => item.toLowerCase() === category.toLowerCase())
    )
  }
  if (q.trim()) {
    const query = q.toLowerCase()
    filtered = filtered.filter((destination) =>
      destination.name.toLowerCase().includes(query) ||
      destination.description.toLowerCase().includes(query) ||
      destination.categories.some((item) => item.toLowerCase().includes(query))
    )
  }

  return { success: true, data: filtered, source: 'local' }
}

export async function getDestinationBySlug(slug) {
  try {
    const response = await api.get(`/destinations/${slug}`)
    if (response?.data) {
      return { success: true, data: response.data, source: 'backend' }
    }
  } catch (error) {
    console.warn(`[destinationService] Backend destination "${slug}" unavailable:`, error.message)
  }

  const destination = destinations.find(
    (item) => item.slug === slug || item.name.toLowerCase() === slug.toLowerCase()
  )

  return destination
    ? { success: true, data: destination, source: 'local' }
    : { success: false, error: 'Destination not found', source: 'local' }
}
