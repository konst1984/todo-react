import React from 'react';
import PropTypes from 'prop-types';

export default class TaskFilter extends React.Component {
  static defaultProps = {
    onFilterChange: () => {},
  };

  static propTypes = {
    onFilterChange: PropTypes.func,
  };

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      return (
        <li key={name}>
          <button className={name} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return <>{buttons}</>;
  }
}
