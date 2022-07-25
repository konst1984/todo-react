import React from 'react';
import './Main.css';
import PropTypes from 'prop-types';

import TaskList from '../TaskList';

const Main = ({ todos, onDeleted, onEdit, onToggleDone, changeTask, startTimer, pauseTimer }) => {
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
};

Main.defaultProps = {
  onDeleted: () => {},
  onEdit: () => {},
  onToggleDone: () => {},
  changeTask: () => {},
  startTimer: () => {},
  pauseTimer: () => {},
};

Main.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
  onToggleDone: PropTypes.func,
  changeTask: PropTypes.func,
  startTimer: PropTypes.func,
  pauseTimer: PropTypes.func,
};

export default Main;
