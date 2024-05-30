from rest_framework import serializers
from .models import CrowdSourceData

class CrowdSourceDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrowdSourceData
        fields = '__all__'
