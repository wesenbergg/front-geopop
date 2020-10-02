import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import InboxIcon from '@material-ui/icons/Inbox';
import MessageForm from './MessageForm';
import ReplyContainer from './ReplyContainer';

const ControlPanel = ({ markerState }) => {
  const [replies, setReplies] = useState(true)
  const [form, setForm] = useState(false)
  const [editLocation, setEditLocation] = useState(false)

  return(
    <div className="col-4 h-100 pr-0 pl-0">
      
      <div className="message-form-group row m-1">
        <div id="InboxButton" className="p-1 col-xl-1 col-lg-2 text-left">
          <InboxIcon onClick={() => setReplies(!replies) || setForm(false)} fontSize="large"/>
          </div>

        { editLocation ? 
        <input className="col-xl-9 col-lg-6 form-control" value="Helsinki, Finland" />:
        <p className="strong m-auto">Helsinki, Finland</p>}

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