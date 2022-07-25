import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TasksFilter';
import './Footer.css';

const Footer = ({ activeTaskCount, onFilterChange, onClearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeTaskCount} items left</span>
      <ul className="filters">
        <TaskFilter onFilterChange={onFilterChange} />
      </ul>
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  activeTaskCount: 0,
  onFilterChange: () => {},
  onClearCompleted: () => {},
};

Footer.propTypes = {
  activeTaskCount: PropTypes.number,
  onFilterChange: PropTypes.func,
  onClearCompleted: PropTypes.func,
};

export default Footer;
