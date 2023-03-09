import { useSelector, useDispatch } from 'react-redux';
import { addContact, removeContact } from '../redux/contactsSlice';
import { setFilterContacts } from '../redux/filterSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from './Form/Form';
import { ContactList } from '../components/ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';
import css from './App.module.css';

export function App() {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filter.filter);
  const contacts = useSelector(state => state.contacts.contacts);

  const changeFilter = e => {
    dispatch(setFilterContacts(e.currentTarget.value.trim()));
  };

  function addNewContact({ name, number }) {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return toast.warning(`${name} is alredy in contacts.`, {
        autoClose: 2000,
        theme: 'colored',
      });
    } else if (contacts.find(contact => contact.number === number)) {
      return toast.warning(`${number} is already in contacts`, {
        autoClose: 2000,
        theme: 'colored',
      });
    } else {
      dispatch(addContact(name, number));
      toast.success(`${name} has been added`, {
        autoClose: 2000,
        theme: 'colored',
      });
    }
  }

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
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <Form onSubmit={addNewContact} />
      <h2 className={css.title}>Contacts</h2>
      {contacts.length === 0 ? (
        <Notification message="There are no contacts in your phonebook yet" />
      ) : (
        <Filter value={filterValue} onChange={changeFilter} />
      )}
      <ContactList
        contacts={filteredContacts()}
        deleteContact={deleteContact}
      />
      <ToastContainer />
    </div>
  );
}
