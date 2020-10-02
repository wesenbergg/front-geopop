import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import getIcon from './utils/icons/getIcon';

const position = [60.16985569999999, 24.938379]

const MapContainer = ({markerState}) => {
  const { data, setData } = markerState
  const [gif, setGif] = useState()
  const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API)

  useEffect( () => {
    fetch("http://localhost:3001/data")
    .then(res => res.json())
    .then(res => setData(res) )
  }, [setData])

  console.log("MapContainer ", data);
  
  const fetchGif = async (id) => {
    try {
      console.log(id);
      const { data } = await gf.gif(id)
      console.log("Data ", data);
      if(!data || data.id === "undefined") return console.log(data);
      setGif(data)
    } catch (error) {
      console.log("Error while fetching giphy");
    }
  };
  
  const showMarkers = () => data.map( e => 
    <Marker key={e.id} position={e.pos} onclick={() => fetchGif(e.gif)} icon={getIcon(e.marker)} draggable>
      <Popup>
        <h3>{e.label}</h3>
        {gif ? <Gif hideAttribution gif={gif} width={300} />: <p>Loading</p>}
      </Popup>
    </Marker>
    )

  return(
    <div className="col-8 p-0 h-100">
      <Map center={position} zoom={15} minZoom={3} 
        maxBounds={[ [-90, -170], [90, 190] ]} > {/** +10 horizontal offset */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        { data ? showMarkers() : ''}
      </Map>
    </div>
  );
}

export default MapContainer;

