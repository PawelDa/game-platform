import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import  Moment from 'react-moment';

import { deleteExperience } from '../../redux/actions/profile';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {
          exp.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{exp.to}</Moment>)
        }
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => {
            deleteExperience(exp._id);
            document.documentElement.scrollTop = 0;
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Employment history</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteExperience: (id) => dispatch(deleteExperience(id))
});

export default connect(null, mapDispatchToProps)(Experience);
