import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getTables } from '../../actions/table';

const Tables = ({ getTables, table: { tables, loading } }) => {
  useEffect(() => {
    getTables();
  }, [getTables]);
  return (
    <div>
      Hello
    </div>
  )
};

Tables.propTypes = {
  getTables: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  table: state.table
});

export default connect(mapStateToProps, { getTables })(Tables);
