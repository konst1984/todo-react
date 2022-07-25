import React from 'react';
import PropTypes from 'prop-types';

const TaskFilter = ({ onFilterChange }) => {
  const filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const filterList = filterButtons.map(({ name, label }) => {
    return (
      <li key={name}>
        <button className={name} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <>{filterList}</>;
};

TaskFilter.defaultProps = {
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

export default TaskFilter;
