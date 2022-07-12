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
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    startTimer: PropTypes.func,
    pauseTimer: PropTypes.func,
  };

  transformTimer = (item, item2, item3) => {
    if (item !== undefined) {
      return `${item.toString().padStart(2, '0')}:${item2.toString().padStart(2, '0')}:${item3
        .toString()
        .padStart(2, '0')}`;
    } else return '0';
  };

  render() {
    const { hours, minutes, seconds, startTimer, pauseTimer } = this.props;
    return (
      <span className="description">
        <button className="icon icon-play" onClick={startTimer}></button>
        <button className="icon icon-pause" onClick={pauseTimer}></button>
        {this.transformTimer(hours, minutes, seconds)}
      </span>
    );
  }
}
