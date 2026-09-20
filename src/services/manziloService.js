// Manzilo AI Service — Mock API abstraction for AI chat operations.

const MOCK_DELAY = 1000

const simulateDelay = (ms = MOCK_DELAY) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export async function chatWithManzilo(message) {
  await simulateDelay(1500)

  const responses = {
    default: "I'd love to help plan your journey! Tell me your destination, duration, and budget, and I'll create a personalized itinerary for you.",
    manali: "I've created a 4-day plan optimized for your budget, interests and travel time. Shall I walk you through day-by-day?",
    goa: "Goa is perfect for a beach getaway! I'll optimize your itinerary around the best beaches, local cuisine spots, and nightlife — while keeping travel time minimal.",
    budget: "I'll make sure every rupee counts. I can find the best value accommodations, free activities, and affordable local food spots.",
  }

  const lowerMessage = message.toLowerCase()
  let reply = responses.default
  if (lowerMessage.includes('manali')) reply = responses.manali
  else if (lowerMessage.includes('goa')) reply = responses.goa
  else if (lowerMessage.includes('budget') || lowerMessage.includes('₹'))
    reply = responses.budget

  return {
    success: true,
    response: reply,
    timestamp: new Date().toISOString(),
  }
}

export async function getManziloSuggestion(tripId, context) {
  await simulateDelay()
  return {
    success: true,
    suggestion: 'Based on current conditions, I recommend shifting outdoor activities to the morning.',
    confidence: 0.92,
  }
}
