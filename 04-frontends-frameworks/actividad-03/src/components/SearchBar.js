import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onSearch }) => {
  console.log(value)
  return (
    <div className="form-group p-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={value}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
}

export default SearchBar;
