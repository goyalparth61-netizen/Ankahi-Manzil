// Destination Service — Mock API abstraction for destination data.

import { destinations } from '../data/destinations'

const MOCK_DELAY = 500

const simulateDelay = (ms = MOCK_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export async function getAllDestinations() {
  await simulateDelay()
  return { success: true, data: destinations }
}

export async function getDestinationBySlug(slug) {
  await simulateDelay()
  const destination = destinations.find((d) => d.slug === slug)
  if (!destination) {
    return { success: false, error: 'Destination not found' }
  }
  return { success: true, data: destination }
}
