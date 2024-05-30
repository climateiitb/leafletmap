import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap'; // Import Bootstrap components for modal and buttons
import TimeSeriesChart from './TimeSeriesChart'; // Import your TimeSeriesChart component
import stationImage from '../../icons/download.png'; // Path to your station image
import plac from '../../icons/aa.png';

export default function WaterlevelMap({ selectedOption, width, height }) {
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const [selectedStation, setSelectedStation] = useState(null); // State to track selected station

    // Dummy station data
    const stations = [
        { name: "Andheri Subway (bandh)" },
        { name: "Andheri Subway Pole (Alternate location)" },
        { name: "Gandhi Market below the King Circle bridge" },
        { name: "Hindmata (Pole 1)" },
        { name: "Khar Subway" },
        { name: "Khar subway (alternate location pole)" },
        { name: "Mumbai university" },
        { name: "Nair Hospital (Outside HDFC bank)" },
        { name: "Nair hospital (alternate location street pole)" },
    ];

    // Function to handle station button click
    const handleStationClick = (station) => {
        setSelectedStation(station);
        setShowModal(true);
    };

    return (
        <div className='text-xl w-max bg-black rounded-xl bg-opacity-40 text-white h-max mx-0 my-0 flex flex-col p-4 shadow-lg z-10 ' style={{ width, height }}>
            <div className='relative flex justify-center '>
                {/* Display current date, time, and temperature */}
                <div className='w-1/2 flex justify-evenly text-xs text-amber-400  font-bold flex-col text-center'>
                                      
                    <img src={plac} alt="IIT Logo" width="40" height="40" className='mx-14'/>
                    LIVE Waterlevel Monitoring
                </div>
                <div className='w-1/2 flex flex-col justify-evenly mx-0'>
                    <div className='flex flex-col text-center'>
                        <button className=" zigzag-button alert-button" onClick={() => alert('Report Flood')}>
                            Report Flood
                        </button>
                    </div>
                </div>
                
            </div>

            <div className=' justify-center flex-col gap-1 position-relative'>
                {/* Map through stations and render buttons */}
                {stations.map((station, index) => (
                    <Button
                        key={index}
                        variant="primary"
                        onClick={() => handleStationClick(station)}
                        style={{
                            backgroundColor: 'transparent', // Transparent background color
                            borderColor: '#EE4E4E', // Blue border color
                            color: '#ffffff', // White text color
                            borderRadius: '10px',
                            fontWeight: 'bold', // Rounded corners
                            padding: '3px 8px', // Padding
                            cursor: 'pointer', // Pointer cursor on hover
                            fontSize: '12px',
                            marginBottom: '5px', // Adjust space between buttons
                            transition: 'background-color 0.3s ease-in-out', // Smooth transition
                            borderStyle: 'solid', // Added border style
                            borderWidth: '2px',
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#EE4E4E'} // Change background color on hover
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'} // Restore background color on mouse leave
                    >
                        {station.name}
                    </Button>
                ))}
            </div>
            {/* Modal for displaying station image and time series chart */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedStation?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={stationImage} alt="Station" className="w-100 mb-3" />
                    <TimeSeriesChart />
                </Modal.Body>
            </Modal>
        </div>
    );
}
const styles = `
<style>
.btoon{
    background-color: #C39898;

}
    .alert-button {
        background-color: red;
        color: white;
        font-weight: bold;
        padding: 10px;
        border: none;
        border-radius: 5px;
        animation: pulse 1s infinite;
    }

    .zigzag-button {
        position: relative;
        background-color: red;
        color: white;
        font-weight: bold;
        padding: 10px;
        border: none;
        z-index: 1;
        overflow: hidden;
        border-radius: 30px;
        clip-path: polygon(
            5% 0%, 10% 10%, 15% 0%, 20% 10%, 25% 0%, 30% 10%, 35% 0%, 40% 10%, 
            45% 0%, 50% 10%, 55% 0%, 60% 10%, 65% 0%, 70% 10%, 75% 0%, 80% 10%, 
            85% 0%, 90% 10%, 95% 0%, 100% 10%, 100% 90%, 95% 100%, 90% 90%, 85% 100%, 
            80% 90%, 75% 100%, 70% 90%, 65% 100%, 60% 90%, 55% 100%, 50% 90%, 
            45% 100%, 40% 90%, 35% 100%, 30% 90%,30% 90%,30% 90%, 25% 100%, 20% 90%, 15% 100%, 
            10% 90%, 5% 100%, 0% 90%, 0% 10%
        );
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);