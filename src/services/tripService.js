import api from './apiClient'

const LOCAL_STORAGE_KEY = 'am_saved_trips'

export function getLocalTrips() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveLocalTrip(trip) {
  try {
    const id = trip.id || trip.tripId
    const existing = getLocalTrips()
    const updated = [trip, ...existing.filter((item) => (item.id || item.tripId) !== id)]
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.warn('[tripService] Unable to cache trip locally:', error.message)
  }
}

export async function createTripPlan({
  destination,
  days,
  budget,
  interests = [],
  travelers = 'Couple',
  travelStyle = 'balanced',
}) {
  try {
    const response = await api.post('/trips/plan', {
      destination,
      days,
      budget,
      interests,
      travelers,
      travelStyle,
    })

    if (response?.tripId || response?.id) {
      const trip = { ...response, id: response.tripId || response.id, source: 'backend' }
      saveLocalTrip(trip)
      return trip
    }
  } catch (error) {
    console.warn('[tripService] Backend planner unavailable, using local fallback:', error.message)
  }

  const fallback = {
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
    source: 'local',
  }
  saveLocalTrip(fallback)
  return fallback
}

export async function getTrips(status) {
  try {
    const endpoint = status && status !== 'all' ? `/trips?status=${status}` : '/trips'
    const response = await api.get(endpoint)
    if (response?.data) return { data: response.data, source: 'backend' }
  } catch (error) {
    console.warn('[tripService] Backend trip list unavailable, using local cache:', error.message)
  }

  return { data: getLocalTrips(), source: 'local' }
}

export async function getTripById(tripId) {
  try {
    const response = await api.get(`/trips/${tripId}`)
    if (response?.tripId || response?.id) return { ...response, source: 'backend' }
  } catch (error) {
    console.warn(`[tripService] Backend trip "${tripId}" unavailable, checking local cache:`, error.message)
  }

  const local = getLocalTrips().find((item) => (item.id || item.tripId) === tripId)
  return local ? { ...local, source: 'local' } : null
}

export async function updateTrip(tripId, updates) {
  try {
    const response = await api.patch(`/trips/${tripId}`, updates)
    if (response?.data) {
      saveLocalTrip(response.data)
      return { ...response, source: 'backend' }
    }
  } catch (error) {
    console.warn(`[tripService] Backend update failed for "${tripId}":`, error.message)
  }

  const local = getLocalTrips().find((item) => (item.id || item.tripId) === tripId)
  if (local) saveLocalTrip({ ...local, ...updates })
  return { success: true, tripId, ...updates, source: 'local' }
}

export async function deleteTrip(tripId) {
  let source = 'backend'
  try {
    await api.delete(`/trips/${tripId}`)
  } catch (error) {
    source = 'local'
    console.warn(`[tripService] Backend delete failed for "${tripId}":`, error.message)
  }

  const filtered = getLocalTrips().filter((item) => (item.id || item.tripId) !== tripId)
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered))
  return { success: true, tripId, source }
}

export async function getDisruptions(tripId) {
  try {
    const response = await api.get(`/trips/${tripId}/disruptions`)
    if (response?.disruptions) return { ...response, source: 'backend' }
  } catch (error) {
    console.warn(`[tripService] Disruption API unavailable for "${tripId}":`, error.message)
  }

  return { tripId, disruptions: [], source: 'local' }
}

export async function monitorTrip(tripId, simulateDisruption = false) {
  try {
    const suffix = simulateDisruption ? '?simulate_disruption=true' : ''
    const response = await api.post(`/trips/${tripId}/monitor${suffix}`, {})
    return { ...response, source: 'backend' }
  } catch (error) {
    console.warn(`[tripService] Sentinel monitor unavailable for "${tripId}":`, error.message)
    return {
      success: true,
      tripId,
      checkedAt: new Date().toISOString(),
      conditions: [{ sentinel: 'Weather Sentinel', condition: 'Demo fallback active', isLive: false }],
      disruptions: simulateDisruption
        ? [{ id: 'local_disruption', type: 'weather', severity: 'medium', title: 'Demo weather disruption' }]
        : [],
      source: 'local',
    }
  }
}

export async function replanTrip(tripId, disruptionId) {
  try {
    const response = await api.post(`/trips/${tripId}/replan`, { disruptionId })
    if (response?.success) return { ...response, source: 'backend' }
  } catch (error) {
    console.warn(`[tripService] Backend replan unavailable for "${tripId}":`, error.message)
  }

  return {
    success: true,
    tripId,
    disruptionId,
    newActivities: [
      { time: '3:30 PM', activity: 'Indoor cultural stop' },
      { time: '5:30 PM', activity: 'Cafe / local market window' },
    ],
    additionalCost: 0,
    message: 'Local fallback replan applied',
    source: 'local',
  }
}
