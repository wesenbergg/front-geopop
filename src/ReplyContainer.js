import React, { useEffect, useState } from 'react';
import { setPos } from './state/reducer';
import { useStateValue } from './state/state';
import EmojiImage from './components/EmojiImage';
import { getAliases } from './utils/names';

const ReplyContainer = ({ repliesState }) => {
  const {replies,} = repliesState
  const [{ fetchData, user }, dispatch ] = useStateValue();
  const [ replyList, setReplyList ] = useState([]);
  
  useEffect(() => {
    fetch("https://geo-pop.herokuapp.com/api/replies/"+user.id)
    .then(res => res.json())
    .then(res => {
      const aliases = getAliases(res);
      const list = res.map(e => {
        return { ...e, alias: aliases[e.sender_id] }
      });
      setReplyList(list);
    });
  }, [fetchData])

  const showReplies = () => replyList.map(e => 
    <div key={e.id} className="m-3 pb-3 pt-3 separator container row" onClick={() => dispatch( setPos(e.pos) ) }>
      <div className="col-xl-3 col-lg-4 ">
        <EmojiImage name={e.marker} className="reply-marker"/>
      </div>
      <div className="col-xl-9 col-lg-8">
        <p className="lead font-weight-bold mb-0">{e.title}</p>
        <p>{e.alias}: <i>{e.text}</i></p>
      </div>
    </div>)

  const showSadFace = () => 
  <div id="EmptyInbox" className="text-center">
    <EmojiImage name="sad" className="op-4 empty-inbox" />
    <p className="lead text-muted strong">No messages yet.</p>
  </div>

    console.log(replyList.length);
  return(
    <div className={replies ? "": "d-none"}>
      <h3 className="pt-4 pl-3 pb-3 mb-0 inbox-h">Inbox</h3>
      <div className="reply-container custom-scroll">
        {!replyList || replyList.length === 0 ? showSadFace(): showReplies()}
      </div>
    </div>
  );
}

export default ReplyContainer;