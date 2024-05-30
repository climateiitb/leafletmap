
from django.urls import path
import widget.views as views

urlpatterns = [
    path('stations/', views.StationList.as_view()),
    path('station/<int:id>/', views.StationDetail.as_view()),
    path('rainfall/<int:id>/', views.RainfallList.as_view()),
    path('alldata/<int:id>', views.AllData.as_view())
]   