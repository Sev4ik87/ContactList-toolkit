import React from 'react';
import './ContactItem.css';
import { useDispatch } from 'react-redux';
import { deleteContactAsync, selectContact } from '../../store/slices/contactSlice';
import API from '../../contact-service';

function ContactItem({ contact }) {
  const dispatch = useDispatch();

  const onItemDelete = () => {
    API.delete(`/${contact.id}`)
      .then(({ status }) => console.log(status))
      .catch((error) => console.error(error));
    dispatch(deleteContactAsync(contact.id));
  };

  const onContactEdit = (e) => {
    e.stopPropagation();
    dispatch(selectContact(contact));
  };

  return (
    <div className='contact-item' onClick={onContactEdit}>
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
