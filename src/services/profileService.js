import api from './apiClient'

const fallbackProfile = {
  travelStyle: 'balanced',
  preferredInterests: ['Nature', 'Culture'],
  budgetPreference: 'Comfort',
  savedDestinations: ['manali', 'goa', 'jaipur'],
  sentinelEnabled: true,
}

export async function getProfile() {
  try {
    const response = await api.get('/profile')
    if (response?.success) return { ...response, source: 'backend' }
  } catch (error) {
    console.warn('[profileService] Backend profile unavailable:', error.message)
  }

  return { success: true, ...fallbackProfile, source: 'local' }
}

export async function updateProfile(updates) {
  try {
    const response = await api.patch('/profile', updates)
    if (response?.success) return { ...response, source: 'backend' }
  } catch (error) {
    console.warn('[profileService] Backend profile update unavailable:', error.message)
  }

  return { success: true, ...fallbackProfile, ...updates, source: 'local' }
}
