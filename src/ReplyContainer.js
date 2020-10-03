import React, { useEffect, useState } from 'react';
import { setPos } from './state/reducer';
import { useStateValue } from './state/state';
import EmojiImage from './components/EmojiImage';

const ReplyContainer = ({ repliesState }) => {
  const {replies,} = repliesState
  const [, dispatch ] = useStateValue();
  const [ replyList, setReplyList ] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:3001/replies")
    .then(res => res.json())
    .then(res => setReplyList(res) )
  }, [])

  const showReplies = () => replyList.map(e => 
    <div className="m-3 pb-3 pt-3 separator container row" onClick={() => dispatch( setPos(e.pos) ) }>
      <EmojiImage name={e.marker} className="col-2"/>
      <div className="col-10">
        <p className="lead font-weight-bold mb-0">{e.title}</p>
        <p>{e.alias}: <i>{e.text}</i></p>
      </div>
    </div>)

  return(
    <div className={replies ? "": "d-none"}>
      <h3 className="pt-4 pl-3 pb-3 mb-0 inbox-h">Inbox</h3>
      <div className="reply-container">
        {showReplies()}
      </div>
    </div>
  );
}

export default ReplyContainer;