import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectAlerts } from '../../redux/selectors/alert';

const Alert = ({ alerts }) =>
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.type}`}>
      {alert.msg}
    </div>
  ));

const mapStateToProps = createStructuredSelector({
  alerts: selectAlerts
});

export default connect(mapStateToProps)(Alert);
