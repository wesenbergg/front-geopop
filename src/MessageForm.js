import React, { useContext, useEffect, useState } from 'react';
import { Carousel, Gif } from '@giphy/react-components'
import {
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
} from '@giphy/react-components'
import { useDebounce } from 'use-debounce/lib';

const Preview = ({gif}) => {
  return (
    <>
      <p className="lead mb-0 mt-2">Preview</p>
      <Gif className="gif-preview" hideAttribution noLink gif={gif} height={125} />
    </>
  );
}

const MessageForm = ({ markerState }) => {
  const [label, setLabel] = useState(); //Data to form
  const [curGif, setCurGif] = useState(); //new post
  const [pos, setPos] = useState();

  const { data, setData } = markerState;
  const [mapData, setMapData] = useState();
  const [search, setSearch] = useState('');
  const [clearGifSearch, setClearGifSearch] = useState(true);
  const [searchTerm] = useDebounce(search, 1000);
  const { fetchGifs, searchKey } = useContext(SearchContext);
  console.log(data);

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
    const newMarker = { id: Math.random(), gif: curGif.id, label, pos };
    setData([ ...data, newMarker ]);
    fetch('http://localhost:3001/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMarker)
    })
    .then(_ => {
      setLabel("")
      setSearch("")
      setCurGif(undefined)
      setPos(undefined)
      // setMessage({type: "success", text: "Tapahtuma " + newObject.title + " lisätty tapahtumakalenteriin."})
    });
  }

  return(
    <>
    <form autoComplete='off' className="col-4 h-100" onSubmit={e => handleSubmit(e)}>
      <h3 className="pt-4">New Pop message</h3>
      <input className="form-control mt-2" placeholder="Whats on your mind..."
        value={label} onChange={(e) => setLabel(e.target.value)} />
      <div className="autocomplete">
        <input className="form-control mt-2 " placeholder="Location, to share your vibes" 
          value={search} onChange={(e) => setSearch(e.target.value)}/>
        <div className="autocomplete-items">
          {mapData ? showResult(): ''}
        </div>
      </div>
      
      {curGif ? <Preview gif={curGif} />: ''}
      <SearchBar placeholder="Mood in GIF..." className="gif-input form-control mt-2" />
      <Carousel hideAttribution gifHeight={150} key={searchKey} fetchGifs={fetchGifs} onGifClick={(gif, e) => {
          console.log("gif", gif);
          e.preventDefault();
          setCurGif(gif);
          setClearGifSearch(!clearGifSearch)
        }} />
      <button type="submit" className="btn btn-success btn-block mt-2" >Send</button>
      
    </form>
    </>
  );
}

export default MessageForm;