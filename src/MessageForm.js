import React, { useContext, useState } from 'react';
import { Carousel, Gif } from '@giphy/react-components';
import {
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
} from '@giphy/react-components';
import EmojiImage from './components/EmojiImage';
import AutocompleteInput from './components/AutocompleteInput';
import { useStateValue } from './state/state';
import { setMessage } from './state/reducer';

const Preview = ({gif}) => {
  return (
    <>
      <p className="lead mb-0 mt-2">Preview</p>
      <Gif className="gif-preview" hideAttribution noLink gif={gif} height={125} />
    </>
  );
}

const MessageForm = ({ markerState, formState }) => {
  const { data, setData } = markerState;
  const { form, } = formState;
  const { fetchGifs, searchKey, setSearch } = useContext(SearchContext);
  const [ { user }, dispatch ] = useStateValue(); 

  const [label, setLabel] = useState(""); //Data to form
  const [curGif, setCurGif] = useState(); //new post
  const [pos, setPos] = useState();
  const [marker, setMarker] = useState();
  const [reset, setReset] = useState(false);

  const handleAutoComplete = ({ _, geo }) => {
    setPos([geo.coordinates[1], geo.coordinates[0]])
  }

  const validate = () => {
    if(!label || label === "")
      throw new Error('Label is required for publishing posts.');
    if(!pos)
      throw new Error('Location is required for publishing posts.');
    if(!curGif || !curGif.id)
      throw new Error('Gif is required for publishing posts.');
    if(!marker)
      throw new Error('Marker is required for publishing posts.');
    if(label.length > 40)
      throw new Error('Shorten label to 40 characters or less.');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      validate();
    } catch (error) {
      return dispatch(setMessage("Error: "+error.message, 'danger'))
    }

    const newMarker = { id: Math.random(), sender_id: user.id, gif: curGif.id, label, pos, marker };

    setData([ ...data, newMarker ]);
    fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMarker)
    })
    .then(_ => {
      dispatch(setMessage('Published: '+label, 'success'))
      setLabel("")
      setCurGif(undefined)
      setPos(undefined)
      setMarker(undefined)
      setReset(!reset)
      setSearch("")
      // setMessage({type: "success", text: "Tapahtuma " + newObject.title + " lisätty tapahtumakalenteriin."})
    });
  }

  return(
    <form autoComplete='off' className={form ? "pr-2 pl-2": "d-none"} onSubmit={e => handleSubmit(e)}>
      <h3 className="pt-4">New Pop message</h3>
      <input className="form-control mt-3" placeholder="Whats on your mind..."
        value={label} onChange={(e) => setLabel(e.target.value)} />

      <AutocompleteInput className="mt-3"  handleAutoComplete={handleAutoComplete}
        placeholder="Location, to share your vibes" reset={reset} />
      
      {curGif ? <Preview gif={curGif} />: ''}
      <SearchBar placeholder="Mood in GIF..." className="gif-input form-control mt-3" />
      <Carousel hideAttribution gifHeight={150} key={searchKey} fetchGifs={fetchGifs} onGifClick={(gif, e) => {
          console.log("gif", gif);
          e.preventDefault();
          setCurGif(gif);
        }} />

      <div className="emojiContainer container row mt-3 mb-3">
        <p className="lead col-12">Marker</p>
        <EmojiImage name={'laugh'} className={`col-2 ${marker === 'laugh' ? 'active': ''}`} onClick={() => setMarker('laugh')} />
        <EmojiImage name={'sad'} className={`col-2 ${marker === 'sad' ? 'active': ''}`} onClick={() => setMarker('sad')} />
        <EmojiImage name={'love'} className={`col-2 ${marker === 'love' ? 'active': ''}`} onClick={() => setMarker('love')} />
        <EmojiImage name={'fear'} className={`col-2 ${marker === 'fear' ? 'active': ''}`} onClick={() => setMarker('fear')} />
        <EmojiImage name={'glasses'} className={`col-2 ${marker === 'glasses' ? 'active': ''}`} onClick={() => setMarker('glasses')} />
        <EmojiImage name={'wink'} className={`col-2 ${marker === 'wink' ? 'active': ''}`} onClick={() => setMarker('wink')} />
      </div>
      <button type="submit" className="btn btn-success btn-block mt-2" >Publish</button>
    </form>
  );
}

export default MessageForm;