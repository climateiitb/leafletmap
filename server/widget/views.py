from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Station, Rainfall, StationData, Temperature, Humidity
from .serializers import StationSerializer, RainfallSerializer, StationDataSerializer, TemperatureSerializer, HumiditySerializer

from .utils import MCGM_data


class StationList(APIView):
    def get(self, request):
        stations = Station.objects.all()
        serializer = StationSerializer(stations, many=True)
        return Response(serializer.data)    
    
class StationDetail(APIView):
    def get(self, request, id):
        try:
            updateStationData(id)
            station = Station.objects.get(id=id)
            data = StationData.objects.get(station=station)

            stationSerializer = StationSerializer(station)
            stationDataSerializer = StationDataSerializer(data)
            return Response({
                "station" : stationSerializer.data,
                "data" : stationDataSerializer.data
            })
        except Station.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

def updateStationData (id):
    if id:
        stations = Station.objects.filter(id=id)
    else:
        stations = Station.objects.all()
    for station in stations:
        data = StationData.objects.get(station=station)

        mcgm_data = MCGM_data()
        if mcgm_data:
            data.rainfall = mcgm_data['Rain']
            data.temperature = mcgm_data['Temp_Out']
            data.humidity = mcgm_data['Out_Humidity']
            data.windSpeed = mcgm_data['Wind_Speed']
            # data.windDirection = mcgm_data['Wind_Dir']
            data.pressure = mcgm_data['Bar']
            data.uvIndex = 0  
            data.save()
                


class RainfallList(APIView):
    def get(self, request, id):
        try:
            station = Station.objects.get(id=id)
            rainfalls = Rainfall.objects.filter(station=station)
            serializer = RainfallSerializer(rainfalls, many=True)
            return Response(serializer.data)
        except Station.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


# load_data('static/csv/humidity.csv')

class AllData (APIView):
    def get(self, request, id):
        try:
            station = Station.objects.get(id=id)

            updateStationData(id)
            data = StationData.objects.get(station=station)

            humidity = Humidity.objects.filter(station=station)
            temperature = Temperature.objects.filter(station=station)
            rainfall = Rainfall.objects.filter(station=station)
            stationSerializer = StationSerializer(station)
            stationDataSerializer = StationDataSerializer(data)
            humiditySerializer = HumiditySerializer(humidity, many=True)
            temperatureSerializer = TemperatureSerializer(temperature, many=True)
            rainfallSerializer = RainfallSerializer(rainfall, many=True)
            return Response({
                "station" : stationSerializer.data,
                "data" : stationDataSerializer.data,
                "humidity" : humiditySerializer.data,
                "temperature" : temperatureSerializer.data,
                "rainfall" : rainfallSerializer.data
            })
        
        except Station.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

