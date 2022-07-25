import React from 'react';
import './Timer.css';
import PropTypes from 'prop-types';

const Timer = ({ minutes, seconds, startTimer, pauseTimer }) => {
  const transformTimer = (item1, item2) => {
    if (item1 !== undefined) {
      return `${item1.toString().padStart(2, '0')}:${item2.toString().padStart(2, '0')}`;
    } else return 0;
  };

  return (
    <span className="description">
      <button className="icon icon-play" onClick={startTimer}></button>
      <button className="icon icon-pause" onClick={pauseTimer}></button>
      {transformTimer(minutes, seconds)}
    </span>
  );
};

Timer.defaultProps = {
  startTimer: () => {},
  pauseTimer: () => {},
  done: false,
  edit: false,
  checked: false,
};

Timer.propTypes = {
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  startTimer: PropTypes.func,
  pauseTimer: PropTypes.func,
};

export default Timer;
