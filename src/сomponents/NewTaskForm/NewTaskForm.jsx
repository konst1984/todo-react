import React from 'react';
import './NewTaskForm.css';
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
    if (e.code === 'Enter' && e.target.value.trim()) {
      this.props.changeTask(e, e.target.value, this.props.id);
    }
    this.setState({
      describe: e.target.value,
    });
  };

  render() {
    return (
      <>
        <input
          id="input"
          type="text"
          className="edit"
          defaultValue={this.state.describe}
          autoFocus
          onKeyDown={(e) => {
            this.onDescribeChange(e);
          }}
        />
      </>
    );
  }
}
