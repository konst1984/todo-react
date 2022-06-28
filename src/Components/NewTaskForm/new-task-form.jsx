import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    changeTask: () => {},
  };

  static propTypes = {
    changeTask: PropTypes.func,
    id: PropTypes.number.isRequired,
  };

  state = {
    describe: this.props.describe,
  };

  onDescribeChange = (e) => {
    this.setState({
      describe: e.target.value,
    });
  };

  // onEnterClick = (e) => {
  //   if(e.keyCode === 13 && e.target.value.trim()) {
  //     this.setState({
  //       describe: ''
  //     })
  //   }
  // }

  render() {
    const { changeTask, id } = this.props;

    return (
      <input
        type="text"
        className="edit"
        autoFocus
        value={this.state.describe}
        onKeyUp={(e) => changeTask(e, this.state.describe, id)}
        onChange={this.onDescribeChange}
      />
    );
  }
}
