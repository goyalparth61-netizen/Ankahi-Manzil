// Trip Service — Mock API abstraction for trip planning operations.
// Replace mock implementations with real API calls when backend is ready.

const MOCK_DELAY = 800

const simulateDelay = (ms = MOCK_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export async function createTripPlan({ destination, days, budget, interests }) {
  await simulateDelay()
  return {
    success: true,
    tripId: `trip_${Date.now()}`,
    destination,
    days,
    budget,
    interests,
    itinerary: [],
    status: 'planned',
    message: `Created a ${days}-day plan for ${destination} within ₹${budget}`,
  }
}

export async function getTripById(tripId) {
  await simulateDelay()
  return {
    id: tripId,
    destination: 'Manali',
    days: 4,
    budget: 20000,
    status: 'active',
    itinerary: [],
  }
}

export async function updateTrip(tripId, updates) {
  await simulateDelay()
  return {
    success: true,
    tripId,
    ...updates,
    message: 'Trip updated successfully',
  }
}

export async function getDisruptions(tripId) {
  await simulateDelay()
  return {
    tripId,
    disruptions: [
      {
        id: 'dis_1',
        type: 'weather',
        severity: 'medium',
        title: 'Heavy rainfall expected',
        affectedActivity: 'Solang Valley',
        time: '3:00 PM',
      },
    ],
  }
}

export async function replanTrip(tripId, disruptionId) {
  await simulateDelay(1200)
  return {
    success: true,
    tripId,
    disruptionId,
    newActivities: [
      { time: '3:30 PM', activity: 'Himalayan Museum' },
      { time: '5:30 PM', activity: 'Cafe / Mall Road' },
    ],
    additionalCost: 250,
    message: 'Itinerary updated to avoid weather disruption',
  }
}
