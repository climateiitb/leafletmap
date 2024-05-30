from rest_framework import serializers
from .models import Station, Rainfall, StationData, Temperature, Humidity

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ['id', 'name', 'latitude', 'longitude']

class StationDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = StationData
        fields = ['station', 'rainfall', 'temperature', 'humidity', 'windSpeed', 'windDirection', 'pressure', 'uvIndex']


class RainfallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rainfall
        fields = ['station', 'time', 'rainfall']

class TemperatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temperature
        fields = ['station', 'time', 'temperature']

class HumiditySerializer(serializers.ModelSerializer):
    class Meta:
        model = Humidity
        fields = ['station', 'time', 'humidity']