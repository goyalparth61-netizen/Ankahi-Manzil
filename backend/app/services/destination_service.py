from typing import List, Optional, Dict, Any
from app.schemas.destination import DestinationBase
from app.core.errors import NotFoundException

DESTINATIONS_DATA: List[Dict[str, Any]] = [
    {
        "id": 1,
        "slug": "goa",
        "name": "Goa",
        "image": "/images/dest-goa.jpg",
        "categories": ["Beaches", "Food", "Nightlife"],
        "rating": 4.8,
        "description": "Sun-kissed beaches, vibrant nightlife, and Portuguese heritage create an unforgettable coastal experience.",
        "bestTime": "November – February",
        "budget": "₹8,000 – ₹25,000",
        "suggestedDays": "3–5 days",
        "weather": "Tropical, warm year-round. Monsoon June–September.",
        "about": "Goa is India's smallest state and a beloved coastal paradise. Known for its pristine beaches stretching along the Arabian Sea, Portuguese-era churches, vibrant night markets, and a laid-back culture that blends Indian and Western influences. From the lively shores of Baga and Calangute to the serene beauty of Palolem and Agonda, Goa offers something for every traveler.",
        "topAttractions": ["Baga Beach", "Fort Aguada", "Basilica of Bom Jesus", "Dudhsagar Falls", "Anjuna Flea Market", "Old Goa Churches"],
        "thingsToDo": ["Beach hopping", "Water sports", "Spice plantation tours", "Casino nights", "Seafood dining", "Heritage walks"],
        "nearby": ["Hampi", "Gokarna", "Dandeli"],
        "latitude": 15.2993,
        "longitude": 74.1240
    },
    {
        "id": 2,
        "slug": "manali",
        "name": "Manali",
        "image": "/images/dest-manali.jpg",
        "categories": ["Mountains", "Adventure", "Nature"],
        "rating": 4.7,
        "description": "A Himalayan paradise where snow-capped peaks meet lush valleys and thrilling adventure sports.",
        "bestTime": "October – June",
        "budget": "₹10,000 – ₹30,000",
        "suggestedDays": "4–6 days",
        "weather": "Cold winters with snowfall. Pleasant summers. Monsoon July–September.",
        "about": "Nestled in the Kullu Valley of Himachal Pradesh, Manali is a high-altitude hill station surrounded by towering Himalayan peaks, dense deodar forests, and the rushing Beas River. It serves as a gateway to adventure — from trekking and paragliding to skiing and river rafting. The town blends ancient temples, hippie culture, and Tibetan monasteries into a unique mountain experience.",
        "topAttractions": ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Old Manali", "Jogini Waterfall", "Manu Temple"],
        "thingsToDo": ["Paragliding", "Trekking", "River rafting", "Skiing", "Camping", "Cafe hopping in Old Manali"],
        "nearby": ["Kasol", "Sissu", "Spiti Valley"],
        "latitude": 32.2432,
        "longitude": 77.1892
    },
    {
        "id": 3,
        "slug": "jaipur",
        "name": "Jaipur",
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
        "categories": ["Culture", "History", "Food"],
        "rating": 4.6,
        "description": "The Pink City dazzles with majestic forts, vibrant bazaars, and royal Rajasthani heritage.",
        "bestTime": "October – March",
        "budget": "₹6,000 – ₹20,000",
        "suggestedDays": "3–4 days",
        "weather": "Hot summers, pleasant winters. Desert climate.",
        "about": "Jaipur, the capital of Rajasthan, is a vibrant city known as the Pink City for its signature terracotta-colored buildings. Founded in 1727, it showcases a stunning blend of ancient Rajput architecture and modern urban life. The city is home to some of India's most iconic forts and palaces, colorful bazaars selling traditional handicrafts, and a culinary scene rich with Rajasthani flavors.",
        "topAttractions": ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Nahargarh Fort", "Jal Mahal"],
        "thingsToDo": ["Fort exploration", "Bazaar shopping", "Elephant rides", "Traditional Rajasthani dining", "Block printing workshops", "Hot air ballooning"],
        "nearby": ["Pushkar", "Ajmer", "Ranthambore"],
        "latitude": 26.9124,
        "longitude": 75.7873
    },
    {
        "id": 4,
        "slug": "kerala",
        "name": "Kerala",
        "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
        "categories": ["Backwaters", "Nature", "Wellness"],
        "rating": 4.8,
        "description": "God's Own Country — serene backwaters, Ayurvedic wellness, and lush tropical landscapes.",
        "bestTime": "September – March",
        "budget": "₹10,000 – ₹35,000",
        "suggestedDays": "5–7 days",
        "weather": "Tropical. Monsoon June–August brings lush greenery.",
        "about": "Kerala stretches along India's southwestern Malabar Coast and is renowned for its palm-lined backwaters, pristine beaches, and lush Western Ghats hill stations. The state is a pioneer in Ayurvedic wellness tourism and offers a unique cultural tapestry of temple festivals, Kathakali dance, and spice-scented cuisine. From the tranquil houseboats of Alleppey to the misty tea gardens of Munnar, Kerala is a feast for the senses.",
        "topAttractions": ["Alleppey Backwaters", "Munnar Tea Gardens", "Fort Kochi", "Periyar Wildlife Sanctuary", "Varkala Beach", "Wayanad"],
        "thingsToDo": ["Houseboat cruises", "Ayurvedic spa retreats", "Tea plantation walks", "Kathakali performances", "Spice market visits", "Wildlife safaris"],
        "nearby": ["Coorg", "Ooty", "Kanyakumari"],
        "latitude": 9.9312,
        "longitude": 76.2673
    },
    {
        "id": 5,
        "slug": "rishikesh",
        "name": "Rishikesh",
        "image": "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
        "categories": ["Adventure", "Wellness", "Nature"],
        "rating": 4.6,
        "description": "The Yoga Capital of the World — where spiritual serenity meets adrenaline-fueled adventure by the Ganges.",
        "bestTime": "September – November, February – May",
        "budget": "₹5,000 – ₹15,000",
        "suggestedDays": "3–4 days",
        "weather": "Pleasant most of the year. Hot summers. Monsoon flooding possible.",
        "about": "Rishikesh sits at the foothills of the Himalayas along the sacred Ganges River. Famous worldwide as a yoga and meditation destination, it also offers thrilling white-water rafting, bungee jumping, and trekking. The iconic Laxman Jhula suspension bridge, riverside ashrams, and evening Ganga Aarti create an atmosphere of spiritual energy and natural beauty.",
        "topAttractions": ["Laxman Jhula", "Ram Jhula", "Triveni Ghat", "Beatles Ashram", "Neer Garh Waterfall", "Rajaji National Park"],
        "thingsToDo": ["White-water rafting", "Bungee jumping", "Yoga retreats", "Ganga Aarti", "Camping by the river", "Café hopping"],
        "nearby": ["Haridwar", "Mussoorie", "Dehradun"],
        "latitude": 30.0869,
        "longitude": 78.2676
    },
    {
        "id": 6,
        "slug": "udaipur",
        "name": "Udaipur",
        "image": "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=600&q=80",
        "categories": ["Culture", "History", "Romance"],
        "rating": 4.7,
        "description": "The City of Lakes — romantic palaces, shimmering waters, and timeless Rajasthani grandeur.",
        "bestTime": "September – March",
        "budget": "₹7,000 – ₹25,000",
        "suggestedDays": "3–4 days",
        "weather": "Hot summers, pleasant winters. Monsoon brings lake overflow.",
        "about": "Often called the Venice of the East, Udaipur is a jewel of Rajasthan set around a series of artificial lakes surrounded by the Aravalli Hills. The city's ornate palaces, including the iconic Lake Palace seemingly floating on Lake Pichola, make it one of India's most romantic destinations. Narrow winding streets reveal hidden temples, art galleries, and rooftop restaurants with lake views.",
        "topAttractions": ["City Palace", "Lake Pichola", "Jag Mandir", "Sajjangarh Palace", "Jagdish Temple", "Fateh Sagar Lake"],
        "thingsToDo": ["Boat ride on Lake Pichola", "Palace tours", "Rooftop dining with lake views", "Vintage car museum visit", "Puppet shows at Bagore Ki Haveli", "Shopping for miniature paintings"],
        "nearby": ["Kumbhalgarh", "Ranakpur", "Chittorgarh"],
        "latitude": 24.5854,
        "longitude": 73.7125
    },
    {
        "id": 7,
        "slug": "ladakh",
        "name": "Ladakh",
        "image": "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&q=80",
        "categories": ["Mountains", "Adventure", "Culture"],
        "rating": 4.9,
        "description": "The Land of High Passes — dramatic moonscapes, ancient monasteries, and azure alpine lakes.",
        "bestTime": "May – September",
        "budget": "₹15,000 – ₹40,000",
        "suggestedDays": "6–8 days",
        "weather": "Extreme cold. Arid high-altitude desert. Accessible mainly May–October.",
        "about": "Perched at over 10,000 feet in the Indian Himalayas, Ladakh is a trans-Himalayan desert with dramatic landscapes unlike anywhere else on Earth. Barren mountains, deep valleys, and high-altitude saltwater lakes like Pangong Tso contrast with whitewashed Tibetan Buddhist monasteries clinging to cliff faces. The region attracts motorcyclists tackling the world's highest motorable passes and seekers of quietude.",
        "topAttractions": ["Pangong Tso", "Nubra Valley", "Thiksey Monastery", "Khardung La", "Magnetic Hill", "Hemis Monastery"],
        "thingsToDo": ["Motorcycle road trips", "Monastery visits", "Double-humped camel rides in Nubra", "Star-gazing", "River rafting in Zanskar", "High-altitude trekking"],
        "nearby": ["Zanskar", "Kargil", "Spiti"],
        "latitude": 34.1526,
        "longitude": 77.5771
    },
    {
        "id": 8,
        "slug": "varanasi",
        "name": "Varanasi",
        "image": "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&q=80",
        "categories": ["Culture", "History", "Wellness"],
        "rating": 4.5,
        "description": "The Spiritual Heart of India — sacred ghats, timeless rituals, and the eternal flow of the Ganges.",
        "bestTime": "October – March",
        "budget": "₹4,000 – ₹15,000",
        "suggestedDays": "2–3 days",
        "weather": "Hot summers, cool winters. Monsoon brings high river levels.",
        "about": "One of the world's oldest continuously inhabited cities, Varanasi (Kashi) is the spiritual capital of India. Located on the banks of the sacred Ganges River in Uttar Pradesh, the city is a labyrinth of narrow alleys (galis), ancient temples, and bustling ghats where life and death intertwine. The mesmerizing evening Ganga Aarti at Dashashwamedh Ghat is an experience etched in every traveler's memory.",
        "topAttractions": ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Assi Ghat", "Sarnath", "Manikarnika Ghat", "Ramnagar Fort"],
        "thingsToDo": ["Sunrise boat ride on the Ganges", "Evening Ganga Aarti ceremony", "Temple trail", "Street food walks", "Silk saree shopping", "Excursion to Sarnath"],
        "nearby": ["Prayagraj", "Ayodhya", "Bodh Gaya"],
        "latitude": 25.3176,
        "longitude": 82.9739
    },
    {
        "id": 9,
        "slug": "darjeeling",
        "name": "Darjeeling",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
        "categories": ["Mountains", "Nature", "Food"],
        "rating": 4.6,
        "description": "Queen of the Hills — world-famous tea gardens, toy train heritage, and views of Kanchenjunga.",
        "bestTime": "March – May, October – December",
        "budget": "₹7,000 – ₹22,000",
        "suggestedDays": "3–5 days",
        "weather": "Mild summers, chilly winters. Heavy monsoon July–August.",
        "about": "Nestled in the Lesser Himalayas of West Bengal, Darjeeling is famed for its emerald tea plantations producing some of the world's finest brew. The Darjeeling Himalayan Railway, a UNESCO World Heritage site, winds charmingly through mountain slopes. On clear mornings, Tiger Hill offers breathtaking sunrise views of Kanchenjunga, the world's third-highest peak, bathed in golden light.",
        "topAttractions": ["Tiger Hill", "Batasia Loop", "Happy Valley Tea Estate", "Himalayan Mountaineering Institute", "Peace Pagoda", "Ghum Monastery"],
        "thingsToDo": ["Toy train joyride", "Sunrise over Kanchenjunga", "Tea tasting tours", "Cable car ride", "Tibetan cuisine trail", "Mall Road strolls"],
        "nearby": ["Kalimpong", "Gangtok", "Mirik"],
        "latitude": 27.0410,
        "longitude": 88.2663
    },
    {
        "id": 10,
        "slug": "meghalaya",
        "name": "Meghalaya",
        "image": "https://images.unsplash.com/photo-1626014303757-656c075736e4?w=600&q=80",
        "categories": ["Nature", "Adventure"],
        "rating": 4.8,
        "description": "The Abode of Clouds — living root bridges, crystalline rivers, and thunderous waterfalls.",
        "bestTime": "October – April",
        "budget": "₹10,000 – ₹28,000",
        "suggestedDays": "4–6 days",
        "weather": "Wettest place on earth during monsoon. Pleasant post-monsoon.",
        "about": "Meghalaya, in Northeast India, is a lush wonderland of misty hills, pine forests, and dramatic gorges. The state is renowned for its bio-engineered living root bridges created by the indigenous Khasi and Jaintia tribes over centuries. From the crystal-clear waters of Umngot River in Dawki to the thunderous cascades of Nohkalikai Falls, Meghalaya feels like another world.",
        "topAttractions": ["Living Root Bridges (Nongriat)", "Dawki / Umngot River", "Cherrapunji (Sohra)", "Mawsynram", "Nohkalikai Falls", "Mawlynnong Village"],
        "thingsToDo": ["Trek to double decker root bridge", "Boating on crystal-clear Umngot River", "Cave exploration (Krem Liat Prah)", "Ziplining across valleys", "Waterfall chasing", "Bamboo trail walks"],
        "nearby": ["Shillong", "Kaziranga", "Guwahati"],
        "latitude": 25.5788,
        "longitude": 91.8933
    },
    {
        "id": 11,
        "slug": "andaman",
        "name": "Andaman",
        "image": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
        "categories": ["Beaches", "Adventure", "Nature"],
        "rating": 4.9,
        "description": "Tropical Island Paradise — turquoise waters, coral reefs, and untouched white-sand beaches.",
        "bestTime": "October – May",
        "budget": "₹15,000 – ₹45,000",
        "suggestedDays": "5–7 days",
        "weather": "Tropical, warm. Cyclone risk during monsoon transitions.",
        "about": "The Andaman and Nicobar Islands, an archipelago in the Bay of Bengal, are India's premier tropical island escape. Havelock Island (Swaraj Dweep) is home to Radhanagar Beach, consistently rated among Asia's best beaches. With thriving coral reefs, world-class scuba diving, mangrove kayak trails, and poignant historical sites like the Cellular Jail in Port Blair, the islands offer raw, untouched natural beauty.",
        "topAttractions": ["Radhanagar Beach", "Cellular Jail", "Elephant Beach", "Neil Island", "Ross Island", "Baratang Limestone Caves"],
        "thingsToDo": ["Scuba diving and snorkeling", "Sea karting", "Bioluminescence night kayaking", "Glass-bottom boat rides", "Historical light & sound show", "Trek through tropical rain forests"],
        "nearby": ["Havelock", "Neil Island", "Baratang"],
        "latitude": 11.7401,
        "longitude": 92.6586
    },
    {
        "id": 12,
        "slug": "jaisalmer",
        "name": "Jaisalmer",
        "image": "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&q=80",
        "categories": ["Culture", "History", "Adventure"],
        "rating": 4.6,
        "description": "The Golden City — sandstone forts rising from Thar Desert dunes and starlit desert camps.",
        "bestTime": "October – March",
        "budget": "₹6,000 – ₹20,000",
        "suggestedDays": "2–4 days",
        "weather": "Extreme desert heat in summer. Cool, crisp winter nights.",
        "about": "Rising like a golden mirage from the heart of the Thar Desert, Jaisalmer is famous for its yellow sandstone architecture that glows golden under the desert sun. The majestic Jaisalmer Fort, a living fort where a quarter of the city's population still resides, crowns the hill. Beyond the fort lies the vast Thar Desert, where rolling sand dunes, camel safaris, and starlit desert camps create an unforgettable desert experience.",
        "topAttractions": ["Jaisalmer Fort (Sonar Qila)", "Sam Sand Dunes", "Patwon Ki Haveli", "Gadisar Lake", "Kuldhara Abandoned Village", "Desert National Park"],
        "thingsToDo": ["Camel safari in Thar dunes", "Desert camping under the stars", "Folk dance & music performances", "Exploring living fort alleys", "Haveli architecture walks", "Dune bashing in 4x4s"],
        "nearby": ["Jodhpur", "Bikaner", "Khuri"],
        "latitude": 26.9157,
        "longitude": 70.9083
    }
]


def get_all_destinations(q: Optional[str] = None, category: Optional[str] = None) -> List[DestinationBase]:
    results = []
    for d in DESTINATIONS_DATA:
        if category and category.lower() != "all":
            if not any(c.lower() == category.lower() for c in d["categories"]):
                continue

        if q and q.strip():
            query = q.strip().lower()
            matches_name = query in d["name"].lower()
            matches_desc = query in d["description"].lower()
            matches_cat = any(query in c.lower() for c in d["categories"])
            if not (matches_name or matches_desc or matches_cat):
                continue

        results.append(DestinationBase(**d))
    return results


def get_destination_by_slug(slug: str) -> DestinationBase:
    target = slug.strip().lower()
    for d in DESTINATIONS_DATA:
        if d["slug"].lower() == target or d["name"].lower() == target:
            return DestinationBase(**d)
    raise NotFoundException(f"Destination '{slug}' not found", code="DESTINATION_NOT_FOUND")


def find_destination_or_default(name_or_slug: str) -> DestinationBase:
    """Returns matching destination or falls back to Manali."""
    target = name_or_slug.strip().lower()
    for d in DESTINATIONS_DATA:
        if d["slug"].lower() == target or d["name"].lower() == target:
            return DestinationBase(**d)
    return DestinationBase(**DESTINATIONS_DATA[1])  # Default to Manali
