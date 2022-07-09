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
      });
    }
  };

  render() {
    const { title, onAddedTask } = this.props;
    return (
      <header className="header" onKeyUp={this.onEnterClick}>
        <h1>{title}</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.describe}
            autoFocus
            onKeyUp={(e) => onAddedTask(e, this.state.describe)}
            onChange={this.onDescribeChange}
          />
          <input className="new-todo-form__timer" placeholder="Min" autoFocus />
          <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
        </form>
      </header>
    );
  }
}
