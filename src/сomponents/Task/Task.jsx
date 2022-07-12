import React from 'react';
import './Task.css';
import PropTypes from 'prop-types';
import Timer from '../Timer';

import NewTaskForm from '../NewTaskForm';

export default class Task extends React.Component {
  static defaultProps = {
    describe: 'Here should be the name of the case',
    onDeleted: () => {},
    onEdit: () => {},
    onToggleDone: () => {},
    changeTask: () => {},
    startTimer: () => {},
    pauseTimer: () => {},
    done: false,
    edit: false,
    checked: false,
  };

  static propTypes = {
    describe: PropTypes.string,
    onDeleted: PropTypes.func,
    onEdit: PropTypes.func,
    onToggleDone: PropTypes.func,
    changeTask: PropTypes.func,
    time: PropTypes.string,
    done: PropTypes.bool,
    edit: PropTypes.bool,
    checked: PropTypes.bool,
    id: PropTypes.number.isRequired,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    startTimer: PropTypes.func,
    pauseTimer: PropTypes.func,
  };

  render() {
    const {
      describe,
      onDeleted,
      time,
      onEdit,
      onToggleDone,
      done,
      checked,
      edit,
      changeTask,
      id,
      hours,
      minutes,
      seconds,
      startTimer,
      pauseTimer,
    } = this.props;

    let className = '';

    if (done) {
      className = 'completed';
    }
    if (edit) {
      className = 'editing';
    }
    const check = !!checked;

    return (
      <li className={className}>
        <div className="view">
          <input id={`${id}`} className="toggle" type="checkbox" onChange={onToggleDone} checked={check} />
          <label htmlFor={`${id}`}>
            <span className="title">{describe}</span>
            <Timer startTimer={startTimer} pauseTimer={pauseTimer} hours={hours} minutes={minutes} seconds={seconds} />
            <span className="description">created {time} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {edit ? <NewTaskForm describe={describe} changeTask={changeTask} id={id} /> : null}
      </li>
    );
  }
}
