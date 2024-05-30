from django.db import models

class Station(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.name
    

class Rainfall(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    time = models.DateTimeField(blank=True, null=True)
    rainfall = models.FloatField(default=0)

    def __str__(self):
        return self.station.name + " - " + str(self.time)
    
class Temperature(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    time = models.DateTimeField(blank=True, null=True)
    temperature = models.FloatField(default=0)
    
    def __str__(self):
        return self.station.name + " - " + str(self.time)
    

class Humidity(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE)
    time = models.DateTimeField(blank=True, null=True)
    humidity = models.FloatField(default=0)
    
    def __str__(self):
        return self.station.name + " - " + str(self.time)

class StationData(models.Model):
    station = models.OneToOneField(Station, on_delete=models.CASCADE)
    rainfall = models.FloatField(default=0)
    temperature = models.FloatField(default=0)
    humidity = models.FloatField(default=0)
    windSpeed = models.FloatField(default=0)
    windDirection = models.FloatField(default=0)
    pressure = models.FloatField(default=0)
    uvIndex = models.FloatField(default=0)
    
    def __str__(self):
        return self.station.name + " data"