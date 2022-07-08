import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../TasksFilter';
import './Footer.css';

export default class Footer extends React.Component {
  static defaultProps = {
    activeTaskCount: 0,
    onFilterChange: () => {},
    onClearCompleted: () => {},
  };

  static propTypes = {
    activeTaskCount: PropTypes.number,
    onFilterChange: PropTypes.func,
    onClearCompleted: PropTypes.func,
  };

  render() {
    const { activeTaskCount, onFilterChange, onClearCompleted } = this.props;

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
  }
}
