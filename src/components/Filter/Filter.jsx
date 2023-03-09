import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterContacts } from '../../redux/filterSlice';
import css from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filter.filter);

  const handleChange = e => {
    dispatch(setFilterContacts(e.currentTarget.value.trim()));
  };

  return (
    <label className={css.filter}>
      Search contact by name:
      <input
        className={css.filterInput}
        type="text"
        value={filterValue}
        onChange={handleChange}
      ></input>
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  filterValue: PropTypes.string,
  handleChange: PropTypes.func,
};
