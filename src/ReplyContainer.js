import React, { useState } from 'react';

const ReplyContainer = ({ repliesState }) => {
  const {replies,} = repliesState
  
  const replyList = [
    {
      to: "Pony",
      pos: [],
      text: "Hahaha! Cute!"
    },
    {
      to: "goth",
      pos: [],
      text: "Slick moves fam!"
    },
    {
      to: "Kontula hoods",
      pos: [],
      text: "00940"
    },
    {
      to: "Malmin Ykä",
      pos: [],
      text: "kEtÄ täNäÄ cAzy HoRsEes?"
    },
    {
      to: "How are you there?",
      pos: [],
      text: "Hahaha! Fine thanks for asking!"
    },
    {
      to: "Haters gonna hate",
      pos: [],
      text: "make 'murica g8 agan"
    },
    {
      to: "GTO",
      pos: [],
      text: "SOS"
    },
  ]

  const showReplies = () => replyList.map(e => 
    <div className="m-3 p-3 separator">
      <p className="lead mb-0"><strong>{e.to}</strong></p>
      <p><i>{e.text}</i></p>
    </div>)

  return(
    <div className={replies ? "": "d-none"}>
      <h3 className="pt-4 pl-3 pb-3 mb-0 inbox-h">Inbox</h3>
      {showReplies()}
    </div>
  );
}

export default ReplyContainer;