import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect, useState } from "react";
import { Icon, divIcon, point } from "leaflet";
import Widget from "../home/waterlevel_widget";
import stationImage from '../../icons/download.png';
import { Chart } from "react-google-charts";
import './style.css';

export default function WaterlevelMap({setLocations, location}) {

  setLocations(dummyMarkers[0])
  console.log('waterlevel map', dummyMarkers[0])

  const handleMarkerClick = (marker) => {
    setLocations(marker);
    console.log(marker);
  }
    return (
      <>
          {dummyMarkers.map((dummyMarker, index) => (
            <Marker
              key={`dummy-${index}`}
              position={dummyMarker.position}
              icon={customIcon}
              eventHandlers={{ click: () => handleMarkerClick(dummyMarker) }}
            >
              <Popup className="custom-popup">
              <div>
                <h3>{dummyMarker.name}</h3>
                <img src={stationImage} alt="Station" width="300px" height="300px" />
                <TimeSeriesChart />
              </div>
                </Popup>
            </Marker>
          ))}
      </>
    );
  }


// Define a blue circle icon for the second type of markers
const customIcon = new Icon({
  iconUrl: require("../../icons/aa.png"),
  iconSize: [50, 50 ] 
});

// Define dummy markers for the second type of markers
const dummyMarkers = [
  { position: [19.12416667, 72.84694444], name: "Andheri Subway (bandh)" },
  { position: [19.12416867, 72.84685544], name: "Andheri Subway Pole (Alternate location)" },
  { position: [19.03127051, 72.85837318], name: "Gandhi Market below the King Circle bridge" },
  { position: [19.00870649, 72.84182174], name: "Hindmata (Pole 1)" },
  { position: [19.07529221, 72.84067776], name: "Khar Subway" },
  { position: [19.07525531, 72.84044246], name: "Khar subway (alternate location pole)" },
  { position: [19.07351796, 72.84974291], name: "Mumbai university" },
  { position: [18.97377629, 72.82290942], name: "Nair Hospital (Outside HDFC bank)" },
  { position: [18.9740177, 72.82299581], name: "Nair hospital (alternate location street pole)" },
  { position: [18.96205825, 72.81331529], name: "Nana chowk (Shri Krishna Hotel)" },
  { position: [19.06087774, 72.89412691], name: "16th Postal colony road" },
  { position: [19.13038919, 72.89581639], name: "BMC's 8 MLD plant behind L&T, Filterpada" }
];
function TimeSeriesChart() {
  const data = [
    ["Time", "Water Level"],
    ["00:00", 0],
    ["01:00", 1],
    ["02:00", 2],
    ["03:00", 1.5],
    ["04:00", 1.7],
    ["05:00", 2.1],
    ["06:00", 2.5],
    ["07:00", 3],
    ["08:00", 2.8],
    ["09:00", 3.5],
    ["10:00", 3.8],
    ["11:00", 4],
    ["12:00", 4.2],
    ["13:00", 4.5],
    ["14:00", 4.8],
    ["15:00", 5],
    ["16:00", 5.2],
    ["17:00", 5.5],
    ["18:00", 5.7],
    ["19:00", 6],
    ["20:00", 6.2],
    ["21:00", 6.5],
    ["22:00", 6.8],
    ["23:00", 7],
  ];

  const options = {
    title: "Water Level Over Time",
    hAxis: { title: "Time" },
    vAxis: { title: "Water Level (m)", minValue: 0 },
    legend: { position: "none" },
    backgroundColor: "transparent",
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="200px"
      data={data}
      options={options}
    />
  );
}
