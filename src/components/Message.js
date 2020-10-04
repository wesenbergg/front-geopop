import React from 'react';
import { clearMessage } from '../state/reducer';
import { useStateValue } from '../state/state';

const Message = ({ message, className, ...props }) => {
  const [ , dispatch ] = useStateValue();
  console.log('message', message);

  if(!message || !message.text || !message.text ) return <></>;
  setTimeout(() => dispatch(clearMessage()), 5000);

  return(
    <div className={className+" alert alert-"+message.type} role="alert">
      <p className="font-weight-bold mb-0">
        {message.text}
      </p>
    </div>
  )
}

Message.defaultProps = {
  type: 'primary',
  text: '',
  className: ''
};

export default Message;