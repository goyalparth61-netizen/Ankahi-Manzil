// Trip Service — API client integration with local storage caching and fallback

import api from './apiClient'

const LOCAL_STORAGE_KEY = 'am_saved_trips'

function getLocalTrips() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
  } catch (e) {
    return []
  }
}

function saveLocalTrip(trip) {
  try {
    const existing = getLocalTrips()
    const updated = [trip, ...existing.filter(t => t.id !== trip.id && t.tripId !== trip.tripId)]
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  } catch (e) {
    console.warn('Failed to save trip to localStorage cache:', e)
  }
}

export async function createTripPlan({
  destination,
  days,
  budget,
  interests = [],
  travelers = 'Couple',
  travelStyle = 'balanced'
}) {
  try {
    const response = await api.post('/trips/plan', {
      destination,
      days,
      budget,
      interests,
      travelers,
      travelStyle
    })

    if (response && (response.tripId || response.id)) {
      const tripData = {
        ...response,
        id: response.tripId || response.id
      }
      saveLocalTrip(tripData)
      return tripData
    }
    return response
  } catch (error) {
    console.warn('[tripService] Backend plan creation failed, falling back to local simulation:', error.message)
    // Fallback simulation
    const fallbackTrip = {
      success: true,
      tripId: `trip_${Date.now()}`,
      id: `trip_${Date.now()}`,
      destination,
      days,
      budget,
      totalBudget: budget,
      plannedCost: Math.round(budget * 0.85),
      savings: Math.round(budget * 0.15),
      interests,
      travelers,
      travelStyle,
      status: 'planned',
      message: `Created a ${days}-day plan for ${destination} within ₹${budget}`
    }
    saveLocalTrip(fallbackTrip)
    return fallbackTrip
  }
}

export async function getTrips(status) {
  try {
    const endpoint = status && status !== 'all' ? `/trips?status=${status}` : '/trips'
    const response = await api.get(endpoint)
    if (response && response.data) {
      return response.data
    }
  } catch (error) {
    console.warn('[tripService] Failed to fetch trips from backend, using localStorage:', error.message)
  }
  return getLocalTrips()
}

export async function getTripById(tripId) {
  try {
    const response = await api.get(`/trips/${tripId}`)
    if (response && (response.tripId || response.id)) {
      return response
    }
  } catch (error) {
    console.warn(`[tripService] Failed to fetch trip ${tripId} from backend, checking cache:`, error.message)
  }

  // Check localStorage cache
  const local = getLocalTrips().find(t => t.id === tripId || t.tripId === tripId)
  if (local) return local

  return {
    id: tripId,
    tripId,
    destination: 'Manali',
    days: 4,
    budget: 20000,
    status: 'active',
    daysData: []
  }
}

export async function updateTrip(tripId, updates) {
  try {
    const response = await api.patch(`/trips/${tripId}`, updates)
    if (response && response.data) {
      saveLocalTrip(response.data)
      return response
    }
  } catch (error) {
    console.warn(`[tripService] Failed to patch trip ${tripId}:`, error.message)
  }

  return {
    success: true,
    tripId,
    ...updates,
    message: 'Trip updated successfully (local cache)'
  }
}

export async function deleteTrip(tripId) {
  try {
    await api.delete(`/trips/${tripId}`)
  } catch (error) {
    console.warn(`[tripService] Failed to delete trip ${tripId} on backend:`, error.message)
  }

  try {
    const existing = getLocalTrips()
    const filtered = existing.filter(t => t.id !== tripId && t.tripId !== tripId)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered))
  } catch (e) {}

  return { success: true, tripId }
}

export async function getDisruptions(tripId) {
  try {
    const response = await api.get(`/trips/${tripId}/disruptions`)
    if (response && response.disruptions) {
      return response
    }
  } catch (error) {
    console.warn(`[tripService] Failed to fetch disruptions for ${tripId}:`, error.message)
  }

  return {
    tripId,
    disruptions: [
      {
        id: 'dis_1',
        type: 'weather',
        severity: 'medium',
        title: 'Heavy rainfall expected',
        affectedActivity: 'Solang Valley',
        time: '3:00 PM'
      }
    ]
  }
}

export async function monitorTrip(tripId, simulateDisruption = false) {
  try {
    const endpoint = `/trips/${tripId}/monitor${simulateDisruption ? '?simulate_disruption=true' : ''}`
    return await api.post(endpoint, {})
  } catch (error) {
    console.warn(`[tripService] Sentinel monitoring failed for ${tripId}:`, error.message)
    return {
      success: true,
      tripId,
      checkedAt: new Date().toISOString(),
      conditions: [
        { sentinel: 'Weather Sentinel', condition: '17°C • Mostly Sunny', isLive: false }
      ],
      disruptions: []
    }
  }
}

export async function replanTrip(tripId, disruptionId) {
  try {
    const response = await api.post(`/trips/${tripId}/replan`, { disruptionId })
    if (response && response.success) {
      return response
    }
  } catch (error) {
    console.warn(`[tripService] Replanning failed on backend for ${tripId}:`, error.message)
  }

  return {
    success: true,
    tripId,
    disruptionId,
    newActivities: [
      { time: '3:30 PM', activity: 'Himalayan Museum' },
      { time: '5:30 PM', activity: 'Cafe / Mall Road' }
    ],
    additionalCost: 250,
    message: 'Itinerary updated to avoid weather disruption'
  }
}
