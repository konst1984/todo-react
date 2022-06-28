import React from 'react';
import './task.css';
import PropTypes from 'prop-types';

import NewTaskForm from '../NewTaskForm';

export default class Task extends React.Component {
  static defaultProps = {
    describe: 'Here should be the name of the case',
    onDeleted: () => {},
    onEdit: () => {},
    onToggleDone: () => {},
    changeTask: () => {},
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
  };

  render() {
    const { describe, onDeleted, time, onEdit, onToggleDone, done, checked, edit, changeTask, id } = this.props;

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
          <input className="toggle" type="checkbox" onChange={onToggleDone} checked={check} />
          <label>
            <span className="description">{describe}</span>
            <span className="created">created {time} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {edit ? <NewTaskForm describe={describe} changeTask={changeTask} id={id} /> : null}
      </li>
    );
  }
}
