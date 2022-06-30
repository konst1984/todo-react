import './App.css';
import React from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Main from './Components/Main';

export default class App extends React.Component {
  maxId = 100;

  dateTime = new Date();

  state = {
    todoData: [],
    filter: 'all',
  };

  createTodoTask(describe, timer = '0') {
    return {
      id: this.maxId++,
      describe,
      done: false,
      checked: false,
      edit: false,
      time: timer,
      timeAgo: new Date(),
    };
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const newArrayTask = [...todoData].filter((item) => item.id !== id);
      return {
        todoData: newArrayTask,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newItem = { ...todoData[idx], done: !todoData[idx].done, checked: !todoData[idx].checked };

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'completed':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onClearCompleted = (items) => {
    const newArray = items.filter((item) => !item.done);
    this.setState(() => {
      return {
        todoData: newArray,
      };
    });
  };

  onEdit = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newItem = { ...todoData[idx], edit: !todoData[idx].edit };

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addTask = (e, text) => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      const timer = formatDistanceToNowStrict(new Date());

      const newTask = this.createTodoTask(text, timer);

      this.setState(({ todoData }) => {
        const newArrayTask = [...todoData, newTask];
        return {
          todoData: newArrayTask,
        };
      });
    }
  };

  changeTask = (e, text, id) => {
    if (e.keyCode === 13 && e.target.value.trim()) {
      const timer = formatDistanceToNowStrict(new Date(this.dateTime));

      const newTask = this.createTodoTask(text, timer);

      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((item) => item.id === id);
        const newArrayTask = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
        return {
          todoData: newArrayTask,
        };
      });
    }
  };

  updateTimeItem = (items) => {
    return items.map((item) => {
      return { ...item, time: formatDistanceToNowStrict(new Date(item.timeAgo)) };
    });
  };

  render() {
    const { todoData, filter } = this.state;

    const doneCount = todoData.filter((item) => !item.done).length;

    const visibleItems = this.updateTimeItem(this.filter(todoData, filter));

    return (
      <div className="todoapp">
        <Header title="todos" onAddedTask={this.addTask} />
        <Main
          todos={visibleItems}
          onDeleted={(id) => this.deleteTask(id)}
          onEdit={this.onEdit}
          onToggleDone={this.onToggleDone}
          changeTask={this.changeTask}
        />
        <Footer
          activeTaskCount={doneCount}
          onFilterChange={this.onFilterChange}
          onClearCompleted={() => this.onClearCompleted(todoData)}
        />
      </div>
    );
  }
}
