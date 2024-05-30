import React, { useState } from 'react';
import Map from '../components/home/crowdsource_map'; 
import RainFallMap from '../components/home/rainfall_map';
import WaterlevelMap from '../components/home/waterlevel_map';
import { MapContainer, TileLayer } from 'react-leaflet';
import Form from '../components/home/form';
import RainfallWidget from '../components/home/rainfall_widget';
import WaterlevelWidget from '../components/home/waterlevel_widget';

function Home() {
    const [selectedTab, setSelectedTab] = useState(1);
    const [rainfallLocations, setRainfallLocations] = useState(null);
    const [waterlevelLocations, setWaterlevelLocations] = useState(null);

    return (
        <div className='h-screen w-screen'>
            <div className='w-full h-full'> 
                <div className='w-full h-full'> 
                    <div className="absolute z-20 top-14 left-1/3 w-80 mx-auto flex justify-center align-middle">
                        <span
                            className={`h-[2rem] w-[6rem] flex flex-col justify-center text-center font-serif cursor-pointer rounded-l-xl transition-all duration-300 ${
                                selectedTab === 1 ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            onClick={() => setSelectedTab(1)}
                        >
                            Rainfall
                        </span>
                        <span
                            className={`h-[2rem] w-[6rem] flex flex-col justify-center text-center font-serif cursor-pointer transition-all duration-300 ${
                                selectedTab === 2 ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200'
                            } border-r border-l border-gray-800`}
                            onClick={() => setSelectedTab(2)}
                        >
                            Waterlevel
                        </span>
                        <span
                            className={`h-[2rem] w-[6rem] flex flex-col justify-center text-center  font-serif cursor-pointer rounded-r-xl transition-all duration-300 ${
                                selectedTab === 3 ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                            onClick={() => setSelectedTab(3)}
                        >
                            Public Data
                        </span>
                    </div>
                </div>

                <div className='h-full w-full absolute top-0 left-0 z-10'>
                    <MapContainer
                        className='h-full w-full fixed z-10'
                        center={[19.14, 72.2]}
                        zoom={13}
                        minZoom={0}
                        maxZoom={18}
                        maxBounds={[
                            [19.4, 72.6],
                            [18.85, 73.2]
                        ]}
                    >
                        <TileLayer 
    attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
    url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}" 
    ext='png' 
    zoomOptions={false}
    zoomControlPosition="bottomright"  // Remove the zoom control
/>
                        {selectedTab === 1 && <RainFallMap setLocations={setRainfallLocations} location={rainfallLocations} />}
                        {selectedTab === 2 && <WaterlevelMap setLocations={setWaterlevelLocations} location={waterlevelLocations} />}
                        {selectedTab === 3 && <Map />}
                    </MapContainer>

                    {selectedTab === 1 && rainfallLocations && (
                        <div className="absolute top-24 left-2 z-20">
                            <RainfallWidget selectedOption={rainfallLocations} />
                        </div>
                    )}

                    {selectedTab === 2 && waterlevelLocations && (
                        <div className="absolute top-24 left-2 z-20">
                            <WaterlevelWidget selectedOption={waterlevelLocations} />
                        </div>
                    )}

                    {selectedTab === 3 && (
                        <div className='absolute top-24 left-2 p-4 bg-opacity-50 rounded-lg shadow-lg z-20'>
                            <Form />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
