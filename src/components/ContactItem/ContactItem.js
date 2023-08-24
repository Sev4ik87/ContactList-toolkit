import React from 'react';
import './ContactItem.css';
import { useDispatch } from 'react-redux';
import { deleteContactAsync, selectContact } from '../../store/slices/contactSlice';

function ContactItem({ contact }) {
  const dispatch = useDispatch();

  const onItemDelete = () => {
    dispatch(deleteContactAsync(contact.id));
  };

  const onContactEdit = () => {
    dispatch(selectContact(contact));
  };

  return (
    <div className='contact-item' >
      <p className='content' onDoubleClick={onContactEdit}>
        {contact.firstName} {contact.lastName}
      </p>
      <span className='delete-btn' onClick={onItemDelete}>
        X
      </span>
    </div>
  );
}

export default ContactItem;