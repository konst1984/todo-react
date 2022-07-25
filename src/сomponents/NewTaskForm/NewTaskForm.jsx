import React, { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const NewTaskForm = ({ describe, id, changeTask }) => {
  const [todoName, setTodoName] = useState(describe);

  const onDescribeChange = (e) => {
    if (e.code === 'Enter' && e.target.value.trim()) {
      changeTask(e, e.target.value, id);
    }
    this.setState({
      describe: e.target.value,
    });
  };

  return (
    <>
      <input
        id="input"
        type="text"
        className="edit"
        autoFocus
        defaultValue={todoName}
        onKeyDown={(e) => {
          onDescribeChange(e);
        }}
      />
    </>
  );
};

NewTaskForm.defaultProps = {
  changeTask: () => {},
};
NewTaskForm.propTypes = {
  changeTask: PropTypes.func,
  id: PropTypes.number.isRequired,
  describe: PropTypes.string,
};

export default NewTaskForm;
