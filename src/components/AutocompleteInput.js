import React, { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

const AutocompleteInput = ({ defaultValue, className, placeholder, handleAutoComplete, reset, ...props }) => {
  const [mapData, setMapData] = useState();
  const [value, setValue] = useState(defaultValue);

  const debounced = useDebouncedCallback(
    (v) => {
      if(v === '') return;
      fetch('https://nominatim.openstreetmap.org/search?format=geocodejson&limit=4&q='+v)
      .then(res => res.json())
      .then(res => {
        if(res && res.features) setMapData(res.features)
      })
    },
    500,
    // The maximum time func is allowed to be delayed before it's invoked:
    { maxWait: 2000 }
  );

  useEffect( () => {
    if(reset) setValue('')
      // console.log("Reset");
  }, [reset])

  const handleAutoCompleteClick = (prop, geo) => {
    handleAutoComplete({ prop, geo })
    setMapData(undefined)
    setValue(prop.geocoding.label)
  }

  const showResult = () => mapData.map(({ properties, geometry }) =>
  <div key={Math.random()} onClick={() => handleAutoCompleteClick(properties, geometry)}>
    {properties.geocoding.label}
  </div> );

  return(
    <>
      <div className={`autocomplete ${className}`}>
        <input className="form-control" placeholder={placeholder} value={value}
          onChange={(e) => debounced.callback(e.target.value) || setValue(e.target.value)} />
        <div className="autocomplete-items">
          {mapData ? showResult(): ''}
        </div>
      </div>
    </>
  )
};

AutocompleteInput.defaultProps = {
  className: '',
  placeholder: '',
  defaultValue: '',
  handleAutoComplete: () => console.log('Handle click')
};

export default AutocompleteInput;