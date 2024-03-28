import React, { useEffect, useState } from 'react';
import Departures from "./components/departure/Departures";

function App() {
  const [departures, setDepartures] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedDepartures, setDisplayedDepartures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_DEPARTURES_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDepartures(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, import.meta.env.VITE_DEPARTURES_TIMER_REFETCH);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  // Update currentIndex to cycle through departures
  useEffect(() => {  
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % departures.length);
    }, import.meta.env.VITE_DEPARTURES_TIMER_PER_DEPARTURE);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [departures]);
  
  useEffect(() => {
    const endIndex = (currentIndex + import.meta.env.VITE_DEPARTURES_PER_PAGE) % departures.length;
    const newDisplayedDepartures = (currentIndex + import.meta.env.VITE_DEPARTURES_PER_PAGE) > departures.length
      ? [...departures.slice(currentIndex), ...departures.slice(0, endIndex)]
      : departures.slice(currentIndex, endIndex);
    setDisplayedDepartures(newDisplayedDepartures.slice(0, import.meta.env.VITE_DEPARTURES_PER_PAGE));
    }, [currentIndex, departures]);
  

  return (
    <div>
      {loading && <p>Loading departures...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && displayedDepartures.length > 0 && (
        <Departures data={displayedDepartures} />
      )}
      {!loading && displayedDepartures.length === 0 && (
        <p>No departures available</p>
      )}
    </div>
  );
}

export default App;
