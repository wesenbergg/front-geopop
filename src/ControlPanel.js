/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import InboxIcon from '@material-ui/icons/Inbox';
import MessageForm from './MessageForm';
import ReplyContainer from './ReplyContainer';
import { useStateValue } from './state/state';
import { setUser } from './state/reducer';
import { useDebounce } from 'use-debounce/lib';

const ControlPanel = ({ markerState }) => {
  const [{ user }, dispatch] = useStateValue();
  const [ search, setSearch ] = useState();
  const [searchTerm] = useDebounce(search, 1000);
  const [mapData, setMapData] = useState();

  const [replies, setReplies] = useState(true);
  const [form, setForm] = useState(false);
  const [editLocation, setEditLocation] = useState(false);

  useEffect(() => {
    if(!searchTerm) return;
    // console.log(searchTerm);
    fetch('https://nominatim.openstreetmap.org/search?format=geocodejson&limit=4&q='+searchTerm)
    .then(res => res.json())
    .then(res => {
      if(res && res.features) setMapData(res.features)
    })
  }, [searchTerm])

  useEffect(() => {
    setSearch(user.pos_label)
  }, [editLocation]);

  const handleAutoCompleteClick = (prop, geo) => {
    console.log('Click', prop.geocoding.label);
    dispatch(setUser({
      ...user,
      pos_label: prop.geocoding.label,
      pos: [geo.coordinates[1], geo.coordinates[0]]
    }))
    setMapData(undefined)
    setEditLocation(false)
  }

  const showResult = () => mapData.map(({ properties, geometry }) =>
  <div key={Math.random()} onClick={() => handleAutoCompleteClick(properties, geometry)}>
    {properties.geocoding.label}
  </div> );

  return(
    <div className="col-4 h-100 pr-0 pl-0">
      
      <div className="message-form-group row m-1">
        <div id="InboxButton" className="p-1 col-xl-1 col-lg-2 text-left">
          <InboxIcon onClick={() => setReplies(!replies) || setForm(false)} fontSize="large"/>
          </div>

        { editLocation ? 
        <>
        <div className="autocomplete col-xl-9 col-lg-6">
          <input className="form-control"
            value={search} onChange={e => setSearch(e.target.value)} />
          <div className="autocomplete-items">
            {mapData ? showResult(): ''}
          </div>
        </div>
        </>:
        <p className="strong m-auto">{user.pos_label ? user.pos_label.substring(0,32)+'..': ''}</p>}

        <div id="LocationButton" className="p-1 col-xl-1 col-lg-2 text-right">
          <SettingsIcon onClick={() => setEditLocation(!editLocation)} fontSize="large" />
        </div>
        <div id="AddPost" className="p-1 col-xl-1 col-lg-2 text-right">
          <AddIcon fontSize="large" style={{ color: 'white' }}  onClick={() => setForm(!form) || setReplies(false) }/>
        </div>
      </div>

      <MessageForm markerState={markerState} formState={{form, setForm}} />

      <ReplyContainer repliesState={{replies, setReplies}} />
    </div>
  );
}

export default ControlPanel;