import React, { useState } from 'react';
import './Header.css';
import PropTypes from 'prop-types';

const Header = ({ title, onAddedTask }) => {
  const [describe, setDescribe] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onDescribeChange = (e) => {
    setDescribe(e.target.value);
  };

  const onEnterClick = (e) => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      setDescribe('');
      setMin('');
      setSec('');
    }
  };

  const onSetTime = (e) => {
    let regex = /[A-Za-zA-Яа-яЁё]/g;
    if (e.target.name === 'min') {
      setMin(e.target.value.replace(regex, ''));
    } else if (e.target.name === 'sec') {
      setSec(e.target.value.replace(regex, ''));
    }
  };

  return (
    <header className="header" onKeyUp={onEnterClick}>
      <h1>{title}</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={describe}
          autoFocus
          onKeyUp={(e) => onAddedTask(e, describe, min, sec)}
          onChange={onDescribeChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="00"
          autoFocus
          name="min"
          maxLength="2"
          value={min}
          onChange={onSetTime}
          onKeyUp={(e) => onAddedTask(e, describe, min, sec)}
        />
        <input
          className="new-todo-form__timer"
          placeholder="00"
          autoFocus
          name="sec"
          maxLength="2"
          value={sec}
          onChange={onSetTime}
          onKeyUp={(e) => onAddedTask(e, describe, min, sec)}
        />
      </form>
    </header>
  );
};

Header.defaultProps = {
  title: 'Title document',
  onAddedTask: () => {},
};

Header.propTypes = {
  title: PropTypes.string,
  onAddedTask: PropTypes.func,
};

export default Header;
