import React from 'react';
import './Timer.css';
import PropTypes from 'prop-types';

export default class Timer extends React.Component {
  static defaultProps = {
    startTimer: () => {},
    pauseTimer: () => {},
    done: false,
    edit: false,
    checked: false,
  };

  static propTypes = {
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    startTimer: PropTypes.func,
    pauseTimer: PropTypes.func,
  };

  transformTimer = (item1, item2) => {
    if (item1 !== undefined) {
      return `${item1.toString().padStart(2, '0')}:${item2.toString().padStart(2, '0')}`;
    } else return '0';
  };

  render() {
    const { minutes, seconds, startTimer, pauseTimer } = this.props;
    return (
      <span className="description">
        <button className="icon icon-play" onClick={startTimer}></button>
        <button className="icon icon-pause" onClick={pauseTimer}></button>
        {this.transformTimer(minutes, seconds)}
      </span>
    );
  }
}
