import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { useStateValue } from './state/state';
import getIcon from './utils/icons/getIcon';
import SendIcon from '@material-ui/icons/Send';

// const position = [60, 24]

const ReplyForm = ({ post }) => {
  const [text, setText] = useState();
  const [{ user }, ] = useStateValue();

  const send = () => {
    const reply = {
      id: Math.random(),
      receiver_id: post.sender_id,
      sender_id: user.uuid,
      title: post.label,
      pos: post.pos,
      marker: post.marker,
      text,
      alias: "Mr.Green" //DEFAULT ARVO, TODO: Tämä pitäisi määrittää backendissä
    };
    fetch('http://localhost:3001/replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reply)
    })
  };

  return(
    <div className="input-group mt-2 mb-2">
      <input type="text" className="form-control" placeholder="Type reply..."
        value={text} onChange={e => setText(e.target.value)} />
      <div className="input-group-append">
        <button className="btn btn-success" type="button" onClick={send}><SendIcon /></button>
      </div>
    </div>
  )
}

const MapContainer = ({markerState}) => {
  const [{ user },] = useStateValue();
  const { data, setData } = markerState;
  const [gif, setGif] = useState();
  const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API);

  useEffect( () => {
    fetch("http://localhost:3001/posts")
    .then(res => res.json())
    .then(res => setData(res) )
  }, [setData])
  
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
        {/* {user.uuid === e.sender_id ? <></>: <ReplyForm post={e} />} */}
        <ReplyForm post={e} />
      </Popup>
    </Marker>
    )

  return(
    <div className="col-8 p-0 h-100">
      <Map center={user.pos} zoom={15} minZoom={3} 
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

