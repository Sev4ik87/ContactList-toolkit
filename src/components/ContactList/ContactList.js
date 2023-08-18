import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.css';
import API from '../../contact-service';
import {
  addNewContact,
  selectContact,
  getContacts,
  selectContacts,
  deleteContactAsync, 
} from '../../store/slices/contactSlice';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    API.get('/')
      .then(({ data }) => dispatch(getContacts(data)))
      .catch(({ statusText }) => console.log({ statusText }));
  }, [dispatch]);

  function onAddNewContact() {
    dispatch(addNewContact());
  }

  function onDeleteContact(id) {
    dispatch(deleteContactAsync(id)); 
  }

  function onEditContact(contact) {
    dispatch(selectContact(contact));
  }

  return (
    <div className='list-container'>
      <div className='item-container'>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDelete={() => onDeleteContact(contact.id)}
            onEdit={() => onEditContact(contact)}
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