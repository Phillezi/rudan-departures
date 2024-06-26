import React, { useEffect, useState } from 'react';
import Departures from "./components/departure/Departures";

function App() {
  const [departures, setDepartures] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedDepartures, setDisplayedDepartures] = useState([]);

  const refetchTimer = parseInt(import.meta.env.VITE_DEPARTURES_TIMER_REFETCH);
  const departureTimer = parseInt(import.meta.env.VITE_DEPARTURES_TIMER_PER_DEPARTURE);
  const departuresPerPage = parseInt(import.meta.env.VITE_DEPARTURES_PER_PAGE);

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
        setError(null);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, refetchTimer);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  useEffect(() => {  
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % departures.length);
    }, departureTimer);
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [departures]);

  useEffect(() => {
    if(displayedDepartures.length < departuresPerPage) {
      setDisplayedDepartures(departures.slice(0, departuresPerPage));
    }
    displayedDepartures.push(departures[(currentIndex+departuresPerPage)%departures.length]);
    displayedDepartures.shift();
  }, [currentIndex, departures])
  

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
