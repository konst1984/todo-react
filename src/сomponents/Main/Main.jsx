import React from 'react';
import './Main.css';
import PropTypes from 'prop-types';

import TaskList from '../TaskList';

export default class Main extends React.Component {
  static defaultProps = {
    onDeleted: () => {},
    onEdit: () => {},
    onToggleDone: () => {},
    changeTask: () => {},
    startTimer: () => {},
    pauseTimer: () => {},
  };

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func,
    onEdit: PropTypes.func,
    onToggleDone: PropTypes.func,
    changeTask: PropTypes.func,
  };

  render() {
    const { todos, onDeleted, onEdit, onToggleDone, changeTask, startTimer, pauseTimer } = this.props;

    return (
      <section className="main">
        <TaskList
          todoData={todos}
          onDeleted={onDeleted}
          onEdit={onEdit}
          onToggleDone={onToggleDone}
          changeTask={changeTask}
          startTimer={startTimer}
          pauseTimer={pauseTimer}
        />
      </section>
    );
  }
}
