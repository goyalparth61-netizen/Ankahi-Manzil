export const destinations = [
  {
    id: 1,
    slug: 'goa',
    name: 'Goa',
    image: '/images/dest-goa.jpg',
    categories: ['Beaches', 'Food', 'Nightlife'],
    rating: 4.8,
    description: 'Sun-kissed beaches, vibrant nightlife, and Portuguese heritage create an unforgettable coastal experience.',
  },
  {
    id: 2,
    slug: 'manali',
    name: 'Manali',
    image: '/images/dest-manali.jpg',
    categories: ['Mountains', 'Adventure', 'Nature'],
    rating: 4.7,
    description: 'A Himalayan paradise where snow-capped peaks meet lush valleys and thrilling adventure sports.',
  },
  {
    id: 3,
    slug: 'jaipur',
    name: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80',
    categories: ['Culture', 'History', 'Food'],
    rating: 4.6,
    description: 'The Pink City dazzles with majestic forts, vibrant bazaars, and royal Rajasthani heritage.',
  },
  {
    id: 4,
    slug: 'kerala',
    name: 'Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
    categories: ['Backwaters', 'Nature', 'Wellness'],
    rating: 4.8,
    description: "God's Own Country — serene backwaters, Ayurvedic wellness, and lush tropical landscapes.",
  },
]

export const stats = [
  { icon: 'MapPin', value: '50+', label: 'Destinations', color: '#FF6B35' },
  { icon: 'Users', value: '10K+', label: 'Happy Travelers', color: '#16C7D9' },
  { icon: 'Star', value: '4.9/5', label: 'Avg. Journey Rating', color: '#F6A623' },
  { icon: 'Leaf', value: '2.5K+', label: 'CO₂ Saved (Est.)', color: '#7DDC48' },
]

export const agentSteps = [
  {
    id: 'plan',
    label: 'Plan',
    description: 'Build your perfect itinerary',
    icon: 'CalendarDays',
    color: '#FF6B35',
  },
  {
    id: 'monitor',
    label: 'Monitor',
    description: 'Track real-time conditions',
    icon: 'Eye',
    color: '#18D5B5',
  },
  {
    id: 'detect',
    label: 'Detect',
    description: 'Find disruptions & conflicts',
    icon: 'AlertTriangle',
    color: '#2697FF',
  },
  {
    id: 'reason',
    label: 'Reason',
    description: 'Analyze & find the best option',
    icon: 'Brain',
    color: '#8B5CF6',
  },
  {
    id: 'replan',
    label: 'Replan',
    description: 'Create an updated itinerary',
    icon: 'RefreshCw',
    color: '#16C7D9',
  },
]

export const tripItinerary = {
  day: 1,
  route: 'Delhi → Manali',
  activities: [
    { time: '09:00', title: 'Hotel Check-in', icon: 'Building2' },
    { time: '11:00', title: 'Hadimba Temple', icon: 'Landmark' },
    { time: '13:00', title: 'Lunch', icon: 'UtensilsCrossed' },
    { time: '15:30', title: 'Solang Valley', icon: 'Mountain' },
    { time: '18:30', title: 'Mall Road', icon: 'ShoppingBag' },
  ],
  stats: {
    cost: '₹4,850',
    travelTime: '2h 15m',
    activities: 5,
    status: 'On Track',
  },
  disruption: {
    type: 'weather',
    title: 'WEATHER ALERT',
    message: 'Rain expected at 3:00 PM',
  },
  replan: {
    affected: 'Solang Valley',
    suggestion: [
      { time: '3:30 PM', activity: 'Himalayan Museum' },
      { time: '5:30 PM', activity: 'Cafe / Mall Road' },
    ],
    additionalCost: '₹250',
  },
}

export const benefits = [
  {
    icon: 'Brain',
    title: 'AI-Personalized',
    description: 'Plans built around you.',
    color: '#8B5CF6',
  },
  {
    icon: 'Zap',
    title: 'Real-Time Adaptation',
    description: 'Your trip changes when the world changes.',
    color: '#FF6B35',
  },
  {
    icon: 'MapPin',
    title: 'Location Optimized',
    description: 'Less unnecessary travel.',
    color: '#16C7D9',
  },
  {
    icon: 'IndianRupee',
    title: 'Budget Aware',
    description: 'Stay within your spending limits.',
    color: '#F6A623',
  },
  {
    icon: 'CloudRain',
    title: 'Disruption Ready',
    description: 'Prepare alternatives before plans collapse.',
    color: '#2697FF',
  },
  {
    icon: 'MessageCircle',
    title: 'Conversational',
    description: 'Ask Manzilo anything about your journey.',
    color: '#18D5B5',
  },
]

export const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Features', href: '#features' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
]
