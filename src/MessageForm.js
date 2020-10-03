import React, { useContext, useEffect, useState } from 'react';
import { Carousel, Gif } from '@giphy/react-components';
import {
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
} from '@giphy/react-components';
import { useDebounce } from 'use-debounce/lib';
import EmojiImage from './components/EmojiImage';

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
  const { form, setForm } = formState;
  const { fetchGifs, searchKey } = useContext(SearchContext);

  const [label, setLabel] = useState(); //Data to form
  const [curGif, setCurGif] = useState(); //new post
  const [pos, setPos] = useState();
  const [marker, setMarker] = useState();

  const [mapData, setMapData] = useState();
  const [search, setSearch] = useState('');
  const [searchTerm] = useDebounce(search, 1000);
  
  useEffect(() => {
    if(!searchTerm) return;
    console.log(searchTerm);
    fetch('https://nominatim.openstreetmap.org/search?format=geocodejson&limit=4&q='+searchTerm)
    .then(res => res.json())
    .then(res => {
      if(res && res.features) setMapData(res.features)
    })
  }, [searchTerm])

  const handleAutoCompleteClick = (prop, geo) => {
    setPos([geo.coordinates[1], geo.coordinates[0]])
    setSearch(prop.geocoding.label)
    setMapData(undefined)
  }

  const showResult = () => mapData.map(({ properties, geometry }) =>
  <div key={Math.random()} onClick={() => handleAutoCompleteClick(properties, geometry)}>
    {properties.geocoding.label}
  </div> );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMarker = { id: Math.random(), gif: curGif.id, label, pos, marker };
    setData([ ...data, newMarker ]);
    fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMarker)
    })
    .then(_ => {
      setLabel("")
      setSearch("")
      setCurGif(undefined)
      setPos(undefined)
      setMarker(undefined)
      // setMessage({type: "success", text: "Tapahtuma " + newObject.title + " lisätty tapahtumakalenteriin."})
    });
  }

  return(
    <form autoComplete='off' className={form ? "pr-2 pl-2": "d-none"} onSubmit={e => handleSubmit(e)}>
      <h3 className="pt-4">New Pop message</h3>
      <input className="form-control mt-3" placeholder="Whats on your mind..."
        value={label} onChange={(e) => setLabel(e.target.value)} />
      <div className="autocomplete">
        <input className="form-control mt-3 " placeholder="Location, to share your vibes" 
          value={search} onChange={(e) => setSearch(e.target.value)}/>
        <div className="autocomplete-items">
          {mapData ? showResult(): ''}
        </div>
      </div>
      
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
      <button type="submit" className="btn btn-success btn-block mt-2" >Send</button>
    </form>
  );
}

export default MessageForm;