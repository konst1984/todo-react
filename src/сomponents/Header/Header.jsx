import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';

export default class Header extends React.Component {
  static defaultProps = {
    title: 'Title document',
    onAddedTask: () => {},
  };

  static propTypes = {
    title: PropTypes.string,
    onAddedTask: PropTypes.func,
  };

  state = {
    describe: '',
    min: '',
    sec: '',
  };

  onDescribeChange = (e) => {
    this.setState({
      describe: e.target.value,
    });
  };

  onEnterClick = (e) => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      this.setState({
        describe: '',
        min: '',
        sec: '',
      });
    }
  };

  onSetTime = (e) => {
    // this.setState({ [e.target.name]: e.target.value });
    let regex = /[A-Za-zA-Яа-яЁё]/g;
    this.setState({ [e.target.name]: e.target.value.replace(regex, '') });
  };

  render() {
    const { title, onAddedTask } = this.props;
    const { describe, min, sec } = this.state;
    return (
      <header className="header" onKeyUp={this.onEnterClick}>
        <h1>{title}</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={describe}
            autoFocus
            onKeyUp={(e) => onAddedTask(e, describe, min, sec)}
            onChange={this.onDescribeChange}
          />
          <input
            className="new-todo-form__timer"
            placeholder="00"
            autoFocus
            name="min"
            maxLength="2"
            value={min}
            onChange={this.onSetTime}
            onKeyUp={(e) => onAddedTask(e, describe, min, sec)}
          />
          <input
            className="new-todo-form__timer"
            placeholder="00"
            autoFocus
            name="sec"
            maxLength="2"
            value={sec}
            onChange={this.onSetTime}
            onKeyUp={(e) => onAddedTask(e, describe, min, sec)}
          />
        </form>
      </header>
    );
  }
}
