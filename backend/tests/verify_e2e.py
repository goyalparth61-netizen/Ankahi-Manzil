import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from fastapi.testclient import TestClient
from app.main import app

def run_verification():
    client = TestClient(app)

    # 1. Health check
    h = client.get('/api/health').json()
    print('1. Health check:', h)
    assert h['status'] == 'ok'

    # 2. Destinations list
    dests = client.get('/api/destinations').json()
    print('2. Destinations count:', len(dests['data']))
    assert len(dests['data']) >= 12

    # 3. Plan Manali 4-day trip
    plan_payload = {
        'destination': 'Manali',
        'days': 4,
        'budget': 20000,
        'interests': ['Scenic Nature', 'Cafes & Nightlife', 'Trekking & Hiking'],
        'travelers': 'Couple',
        'travelStyle': 'balanced'
    }
    trip = client.post('/api/trips/plan', json=plan_payload).json()
    trip_id = trip['tripId']
    print(f'3. Planned trip: {trip_id}, destination: {trip["destination"]}, planned: INR {trip["plannedCost"]}, savings: INR {trip["savings"]}')
    assert trip['days'] == 4

    # 4. Sentinel Monitor
    mon = client.post(f'/api/trips/{trip_id}/monitor?simulate_disruption=true').json()
    print(f'4. Sentinel monitored. Conditions: {len(mon["conditions"])}, Disruptions: {len(mon["disruptions"])}')
    assert len(mon['disruptions']) > 0
    dis_id = mon['disruptions'][0]['id']

    # 5. Replan
    rep = client.post(f'/api/trips/{trip_id}/replan', json={'disruptionId': dis_id}).json()
    print(f'5. Replan applied: {rep["message"]}, additionalCost: {rep["additionalCost"]}')
    assert rep['success'] is True

    # 6. Manzilo Chat: Paragliding
    c1 = client.post('/api/manzilo/chat', json={'message': 'Can I add paragliding tomorrow?', 'tripId': trip_id}).json()
    print(f'6. Manzilo paragliding response: {c1["response"][:70]}... widget: {c1.get("widget", {}).get("type")}')
    assert c1['success'] is True
    assert c1.get('widget') is not None

    # 7. Manzilo Chat: Why did you change itinerary
    c2 = client.post('/api/manzilo/chat', json={'message': 'Why did you change my itinerary?', 'tripId': trip_id}).json()
    print(f'7. Manzilo reason response: {c2["response"][:70]}... widget: {c2.get("widget", {}).get("type")}')
    assert c2['success'] is True

    print('\n*** ALL 7 END-TO-END VERIFICATION STEPS PASSED SUCCESSFULLY! ***')

if __name__ == '__main__':
    run_verification()
