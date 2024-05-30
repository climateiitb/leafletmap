from django.contrib import admin
from .models import Station, Rainfall, StationData, Temperature, Humidity

admin.site.register(Station)
admin.site.register(StationData)
admin.site.register(Rainfall)
admin.site.register(Temperature)
admin.site.register(Humidity)