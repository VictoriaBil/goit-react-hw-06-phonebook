import React from 'react';
import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeContact } from '../../redux/contactsSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ContactList() {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filter.filter);
  const contacts = useSelector(state => state.contacts.contacts);

  function deleteContact(id) {
    dispatch(removeContact(id));
    toast.success('The contact has been deleted', {
      autoClose: 2000,
    });
  }

  function filteredContacts() {
    const normalisedFilter = filterValue.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalisedFilter)
    );
  }

  return (
    <ul className={css.list}>
      {filteredContacts().map(({ name, number, id }) => {
        return (
          <li className={css.contact} key={id}>
            <p className={css.name}>{name}</p> :
            <p className={css.number}>{number}</p>
            <button
              className={css.contactBtn}
              type="button"
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
      <ToastContainer />
    </ul>
  );
}
