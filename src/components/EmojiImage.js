import laugh from '../img/emojis/laugh.png';
import sad from '../img/emojis/sad.png';
import love from '../img/emojis/love.png';
import fear from '../img/emojis/fear.png';
import glasses from '../img/emojis/glasses.png';
import wink from '../img/emojis/wink.png';

import React from 'react';

const EmojiImage = ({ name, ...props }) => {
  switch (name) {
    case 'laugh':
      return <img src={laugh} alt='laugh' {...props} />
    case 'sad':
      return <img src={sad} alt='sad' {...props} />
    case 'fear':
      return <img src={fear} alt='fear' {...props} />
    case 'love':
      return <img src={love} alt='love' {...props} />
    case 'glasses':
      return <img src={glasses} alt='glasses' {...props} />
    case 'wink':
      return <img src={wink} alt='wink' {...props} />
    default:
      return <></>;
  }
}

export default EmojiImage;