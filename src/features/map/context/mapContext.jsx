import { useState } from 'react';
import { createContext } from 'react';
import { getAllEventInScope } from '../../../api/event';

export const MapContext = createContext();

function MapContextProvider() {
  const [events, setEvents] = useState();
  // Fetch data based on the specified bounds
  const fetchData = (bounds) => getAllEventInScope(bounds); // console.log('Fetching data for bounds:', bounds);
  return <MapContext.Provider value={{}}></MapContext.Provider>;
}

export default MapContextProvider;
