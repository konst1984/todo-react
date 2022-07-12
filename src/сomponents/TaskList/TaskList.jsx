import React from 'react';
import './TaskList.css';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

export default class TaskList extends React.Component {
  // state = {
  //   hours: 0,
  //   minutes: 0,
  //   seconds: 0,
  // };

  static defaultProps = {
    onDeleted: () => {},
    onEdit: () => {},
    onToggleDone: () => {},
    changeTask: () => {},
    startTimer: () => {},
    pauseTimer: () => {},
  };

  static propTypes = {
    todoData: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func,
    onEdit: PropTypes.func,
    onToggleDone: PropTypes.func,
    changeTask: PropTypes.func,
    startTimer: PropTypes.func,
    pauseTimer: PropTypes.func,
  };

  render() {
    const { todoData, onDeleted, onEdit, onToggleDone, changeTask, startTimer, pauseTimer } = this.props;

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
          hours={item.hours}
          minutes={item.minutes}
          seconds={item.seconds}
          startTimer={() => startTimer(id)}
          pauseTimer={() => pauseTimer(id)}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
