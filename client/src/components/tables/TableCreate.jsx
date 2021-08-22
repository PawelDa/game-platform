import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTable } from '../../actions/table';

const TableCreate = ({ addTable }) => {
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        addTable();
      }}>
        <input type='submit' className='btn btn-dark my-1' value='Create new game table' />
      </form>
    </div>
  );
};

TableCreate.propTypes = {
  addTable: PropTypes.func.isRequired
};

export default connect(null, { addTable })(TableCreate);
