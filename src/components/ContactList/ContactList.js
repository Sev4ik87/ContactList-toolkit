import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.css';
import {
  addNewContact,
  getContactsAsync,
} from '../../store/slices/contactSlice';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contact.contacts);
  

  useEffect(() => {
    dispatch(getContactsAsync()); 
  }, [dispatch]);

  function onAddNewContact() {
    dispatch(addNewContact());
  }


  return (
    <div className='list-container'>
      <div className='item-container'>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
          />
        ))}
      </div>
      <button id='new' onClick={onAddNewContact}>
        New
      </button>
    </div>
  );
}

export default ContactList;