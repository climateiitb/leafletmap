import csv
from datetime import datetime
from .models import Station, Rainfall, StationData, Temperature, Humidity
import requests

def create_stations_and_rainfall(stations_file_path, rainfall_file_path):
    # Read stations data from CSV
    with open(stations_file_path, 'r') as stations_file:
        stations_data = csv.DictReader(stations_file)
        for row in stations_data:
            name = row['Place']
            latitude = float(row['latitude'])
            longitude = float(row['longitude'])
            # Create Station instance
            station, created = Station.objects.get_or_create(
                name=name,
                latitude=latitude,
                longitude=longitude
            )
            stationdetails = StationData.objects.create(
                station=station,
                rainfall=0,
                temperature=0,
                humidity=0,
                windSpeed=0,
                windDirection=0,
                pressure=0,
                uvIndex=0
            )
    
def load_data(file_path):
    with open(file_path, 'r') as rainfall_file:
        rainfall_data = csv.DictReader(rainfall_file)
        for row in rainfall_data:
            time = datetime.strptime(row['Index2'], '%d-%m-%Y %H:%M')
            for key, value in row.items():
                if key != 'Index2' and value:
                    if value == None:
                        value = 0
                
                    station = Station.objects.get(name=key)
                    instance = Humidity.objects.create(
                        station=station,
                        time=time,
                        humidity=float(value)
                    )

def MCGM_data():
    url = "https://dmwebtwo.mcgm.gov.in/api/tabWeatherForecastData/loadById"
    headers = {
        "Authorization": "Basic RE1BUElVU0VSOkRNYXBpdXNlclBhJCR3b3JkQDEyMzQ="
    }
    payload = {"id": 22}  # Set the location ID to 22
    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        data = response.json()
        location_data = data['locationList']
        dummy_data = data['dummyTestRaingaugeDataDetails']
        
        result = {
            'ID': location_data['id'],
            'Code': location_data['code'],
            'Description': location_data['description'],
            'Zone_ID': location_data['zoneid'],
            'Latitude': location_data['lati'],
            'Longitude': location_data['longi'],
            'Status': location_data['status'],
            'Temp_Out': dummy_data['tempOut'],
            'High_Temp': dummy_data['highTemp'],
            'Low_Temp': dummy_data['lowTemp'],
            'Out_Humidity': dummy_data['outHumidity'],
            'Dew_Point': dummy_data['dewPoint'],
            'Wind_Speed': dummy_data['windSpeed'],
            'Wind_Dir': dummy_data['windDir'],
            'Wind_Run': dummy_data['windRun'],
            'Hi_Speed': dummy_data['hiSpeed'],
            'Hi_Dir': dummy_data['hiDir'],
            'Wind_Chill': dummy_data['windChill'],
            'Heat_Index': dummy_data['heatIndex'],
            'THW_Index': dummy_data['thwIndex'],
            'Bar': dummy_data['bar'],
            'Rain': dummy_data['rain'],
            'Rain_Rate': dummy_data['rainRate'],
            'Head_Dd': dummy_data['headDd'],
            'Cool_Dd': dummy_data['coolDd'],
            'In_Temp': dummy_data['inTemp'],
            'In_Humidity': dummy_data['inHumidity']
        }
        return result
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")
        return None