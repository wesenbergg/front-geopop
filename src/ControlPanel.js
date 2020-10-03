/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import InboxIcon from '@material-ui/icons/Inbox';
import MessageForm from './MessageForm';
import ReplyContainer from './ReplyContainer';
import { useStateValue } from './state/state';
import AutocompleteInput from './components/AutocompleteInput';
import { setUser } from './state/reducer';

const ControlPanel = ({ markerState }) => {
  const [{ user }, dispatch] = useStateValue();  
  
  const [replies, setReplies] = useState(true);
  const [form, setForm] = useState(false);
  const [editLocation, setEditLocation] = useState(false);

  const handleAutoComplete = ({ prop, geo }) => {
    // console.log('Click', prop.geocoding.label);
    dispatch(setUser({
      ...user,
      pos_label: prop.geocoding.label,
      pos: [geo.coordinates[1], geo.coordinates[0]]
    }))
    setEditLocation(false)
  }

  return(
    <div className="col-4 h-100 pr-0 pl-0">
      
      <div className="message-form-group row m-1">
        <div id="InboxButton" className="p-1 col-xl-1 col-lg-2 text-left">
          <InboxIcon onClick={() => setReplies(!replies) || setForm(false)} fontSize="large"/>
          </div>

        { editLocation ? 
        <AutocompleteInput defaultValue={user.pos_label} className="col-xl-9 col-lg-6"
          handleAutoComplete={handleAutoComplete} />:
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