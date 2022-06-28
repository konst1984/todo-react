import React from 'react';
import './task-list.css';
import PropTypes from 'prop-types';
import Task from '../Task/task';

export default class TaskList extends React.Component {
  static defaultProps = {
    onDeleted: () => {},
    onEdit: () => {},
    onToggleDone: () => {},
    changeTask: () => {},
  };

  static propTypes = {
    todoData: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleted: PropTypes.func,
    onEdit: PropTypes.func,
    onToggleDone: PropTypes.func,
    changeTask: PropTypes.func,
  };

  render() {
    const { todoData, onDeleted, onEdit, onToggleDone, changeTask } = this.props;

    const elements = todoData.map((item) => {
      const { id, nameClass, ...itemProps } = item;
      return (
        <Task
          key={id}
          className={nameClass}
          {...itemProps}
          id={id}
          onDeleted={() => onDeleted(id)}
          onEdit={() => onEdit(id)}
          onToggleDone={() => onToggleDone(id)}
          changeTask={changeTask}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
