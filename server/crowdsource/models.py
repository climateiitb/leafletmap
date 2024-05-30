from django.db import models

class CrowdSourceData(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    waterlevel = models.FloatField()
    location = models.CharField(max_length=100 , blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name
