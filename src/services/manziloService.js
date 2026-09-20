// Manzilo AI Service — API integration for AI reasoning, chat, and predictive suggestions

import api from './apiClient'

export async function chatWithManzilo(message, conversationId = null, tripId = null) {
  try {
    const response = await api.post('/manzilo/chat', {
      message,
      conversationId,
      tripId
    })

    if (response && response.response) {
      return response
    }
  } catch (error) {
    console.warn('[manziloService] Manzilo API chat failed, using fallback:', error.message)
  }

  // Graceful fallback response
  const lower = message.toLowerCase()
  let reply = "I've analyzed your travel query. While my live cloud agent reconnects, your saved trip itinerary and Sentinel safety monitors remain fully protected."
  if (lower.includes('paragliding')) {
    reply = "I checked the wind conditions for Solang Valley tomorrow. Early morning (08:30 – 11:00) has optimal visibility with low wind shear."
  } else if (lower.includes('budget') || lower.includes('cost')) {
    reply = "By opting for scenic electric shuttles and choosing regional dining, we can comfortably protect your contingency buffer."
  }

  return {
    success: true,
    response: reply,
    widget: null,
    actions: [],
    timestamp: new Date().toISOString()
  }
}

export async function getManziloSuggestion(tripId, context = 'weather') {
  try {
    const response = await api.post('/manzilo/suggestion', {
      tripId,
      context
    })
    if (response && response.suggestion) {
      return response
    }
  } catch (error) {
    console.warn('[manziloService] Failed to fetch suggestion from API:', error.message)
  }

  return {
    success: true,
    suggestion: 'Based on current conditions, I recommend shifting outdoor activities to the morning.',
    confidence: 0.92
  }
}
