import React from 'react';
import './TaskList.css';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

const TaskList = ({ todoData, onDeleted, onEdit, onToggleDone, changeTask, startTimer, pauseTimer }) => {

    const elements = todoData.map((item) => {
      const { id, nameClass, ...itemProps } = item;

      return (
        <Task
          key={id}
          className={nameClass}
          {...itemProps}
          id={id}
          todoData={todoData}
          onDeleted={() => onDeleted(id)}
          onEdit={() => onEdit(id)}
          onToggleDone={() => onToggleDone(id)}
          changeTask={changeTask}
          minutes={+item.minutes}
          seconds={+item.seconds}
          startTimer={() => startTimer(id)}
          pauseTimer={() => pauseTimer(id)}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;

}

TaskList.defaultProps = {
  onDeleted: () => {},
  onEdit: () => {},
  onToggleDone: () => {},
  changeTask: () => {},
  startTimer: () => {},
  pauseTimer: () => {},
};

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleted: PropTypes.func,
  onEdit: PropTypes.func,
  onToggleDone: PropTypes.func,
  changeTask: PropTypes.func,
  startTimer: PropTypes.func,
  pauseTimer: PropTypes.func,
};

export default TaskList;