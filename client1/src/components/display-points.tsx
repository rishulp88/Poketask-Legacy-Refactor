import React, { useState, useEffect } from 'react';
import apiService from '../apiService';
import firstlvl from '../assets/first-level.png';
import secondlvl from '../assets/secondlvl.png';
import thirdlvl from '../assets/thirdlvl.png';
import fourthlvl from '../assets/fourthlvl.png';

// Define the Points interface
interface Points {
  newPoints: number;
  // Add other properties if needed
}

const DisplayPoints: React.FC = () => {
  const [points, setPoints] = useState<Points>({ newPoints: 0 });

  useEffect(() => {
    const getPoints = async () => {
      const response = await apiService.getUserPoints(); // Replace with actual API call
      if (!response.error && typeof response.data === 'number') {
        setPoints({ newPoints: response.data }); // Ensuring 'data' is a number
      } else {
        // Handle the error or undefined case
        console.error('Error fetching points or invalid data format');
      }
    };

    getPoints();
  }, []);

  const chooseImg = (): string => {
    if (points.newPoints <= 20) {
      return firstlvl;
    } else if (points.newPoints <= 50) {
      return secondlvl;
    } else if (points.newPoints <= 100) {
      return thirdlvl;
    } else if (points.newPoints <= 160) {
      return fourthlvl;
    } else {
      return ''; // Default image or empty string if none match
    }
  };

  return (
    <div className="point-display">
      <p className="point-count">Points: {points.newPoints}</p>
      <img className="dragon" src={chooseImg()} alt="Level Image" />
    </div>
  );
};

export default DisplayPoints;
