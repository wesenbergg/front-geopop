import { GiphyFetch } from '@giphy/js-fetch-api';
import { Gif } from '@giphy/react-components';
import React, { useEffect, useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { useStateValue } from './state/state';
import getIcon from './utils/icons/getIcon';
import SendIcon from '@material-ui/icons/Send';
import RefreshIcon from '@material-ui/icons/Refresh';
import { reFetch, setMessage } from './state/reducer';

const ReplyForm = ({ post }) => {
  const [text, setText] = useState();
  const [{ user }, dispatch ] = useStateValue();

  const send = () => {
    if(!text || text === "") return dispatch(setMessage("Reply length must be atleast 1 character.", "danger"));
    const reply = {
      id: Math.random(),
      receiver_id: post.sender_id,
      sender_id: user.id,
      title: post.label,
      pos: post.pos,
      marker: post.marker,
      text
    };
    fetch('https://geo-pop.herokuapp.com/api/replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reply)
    })
    .then(res => {
      setText("");
      dispatch(setMessage('Successfully replied to: '+post.label, 'success'))
    });
  };

  return(
    <div className="input-group mt-2 mb-2">
      <input type="text" className="form-control" placeholder="Type reply..."
        value={text} onChange={e => setText(e.target.value)} />
      <div className="input-group-append">
        <button className="btn btn-success" type="button" onClick={send}><SendIcon /></button>
      </div>
    </div>
  );
}

const MapContainer = ({markerState}) => {
  const [ { user, fetchData }, dispatch ] = useStateValue();
  const { data, setData } = markerState;
  const [gif, setGif] = useState();
  const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API);

  useEffect( () => {
    fetch("https://geo-pop.herokuapp.com/api/posts")
    .then(res => res.json())
    .then(res => setData(res) );
  }, [setData, fetchData]);
  
  const fetchGif = async (id) => {
    try {
      const { data } = await gf.gif(id);
      // console.log("Data ", data);
      if(!data || data.id === "undefined") return console.log(data);
      setGif(data);
    } catch (error) {
      dispatch(setMessage("Error while fetching giphy"));
    }
  };
  
  const showMarkers = () => data.map( e => 
  <Marker key={e.id} position={e.pos} onclick={() => fetchGif(e.gif)} icon={getIcon(e.marker)} draggable>
    <Popup>
      <h3>{e.label}</h3>
      {gif ? <Gif hideAttribution gif={gif} width={300} />: <p>Loading</p>}
      {user.id === e.sender_id ? <></>: <ReplyForm post={e} />}
      {/* <ReplyForm post={e} /> */}
    </Popup>
  </Marker>
  );

  return(
    <div className="col-8 p-0 h-100">
      <Map center={user.pos} zoom={15} minZoom={3} 
        maxBounds={[ [-90, -170], [90, 190] ]} > {/** +10 horizontal offset */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        { data ? showMarkers() : ''}
        <div id="RefreshBtn" className="btn btn-success" onClick={() => dispatch(reFetch()) || dispatch(setMessage('Refreshed posts and replies.', 'primary'))}>
          <RefreshIcon fontSize='large'/>
        </div>
      </Map>
      
    </div>
  );
}

export default MapContainer;

