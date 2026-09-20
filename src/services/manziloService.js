import api from './apiClient'

export async function chatWithManzilo(message, conversationId = null, tripId = null) {
  try {
    const response = await api.post('/manzilo/chat', { message, conversationId, tripId })
    if (response?.response) return { ...response, source: 'backend' }
  } catch (error) {
    console.warn('[manziloService] Backend Manzilo unavailable, using local fallback:', error.message)
  }

  const lower = message.toLowerCase()
  let response = "I can still help with the local demo while the backend is unavailable. Tell me the destination, budget, or part of the itinerary you want to change."

  if (lower.includes('manali')) {
    response = 'For Manali, I would keep the morning outdoors and preserve an afternoon flexibility buffer for weather or traffic.'
  } else if (lower.includes('goa')) {
    response = 'For Goa, I would group beaches and heritage stops geographically so the trip spends less time in transit.'
  } else if (lower.includes('budget') || lower.includes('cost') || lower.includes('₹')) {
    response = 'I would protect a contingency buffer first, then optimize transport and dining before removing a core experience.'
  }

  return {
    success: true,
    conversationId: conversationId || `local_conversation_${Date.now()}`,
    response,
    widget: null,
    actions: [],
    context: {},
    timestamp: new Date().toISOString(),
    source: 'local',
  }
}

export async function getManziloSuggestion(tripId, context = 'weather') {
  try {
    const response = await api.post('/manzilo/suggestion', { tripId, context })
    if (response?.suggestion) return { ...response, source: 'backend' }
  } catch (error) {
    console.warn('[manziloService] Suggestion API unavailable:', error.message)
  }

  return {
    success: true,
    suggestion: 'Keep the outdoor activities earlier and preserve an afternoon buffer.',
    confidence: 0.75,
    source: 'local',
  }
}
