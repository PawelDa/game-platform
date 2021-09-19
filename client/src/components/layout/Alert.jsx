import React from 'react';
import { connect } from 'react-redux';

import { selectAlerts } from '../../redux/selectors/alert';

const Alert = ({ alerts }) =>
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.type}`}>
      {alert.msg}
    </div>
  ));

const mapStateToProps = state => ({
  alerts: selectAlerts(state)
});

export default connect(mapStateToProps)(Alert);
