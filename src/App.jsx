import './App.css';
import React from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Header from './сomponents/Header';
import Footer from './сomponents/Footer';
import Main from './сomponents/Main';

export default class App extends React.Component {
  maxId = 100;
  date = new Date();

  state = {
    todoData: [],
    filter: 'all',
  };

  componentDidMount() {
    const todoData = JSON.parse(localStorage.getItem('todoData'));
    const filter = JSON.parse(localStorage.getItem('filter'));
    this.maxId = this.maxId !== 0 ? Number(localStorage.getItem('id')) : 1;
    if (todoData) {
      this.setState(() => ({
        todoData,
        filter,
      }));
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todoData', JSON.stringify(this.state.todoData));
    localStorage.setItem('id', String(this.maxId));
    localStorage.setItem('filter', JSON.stringify(this.state.filter));
  }

  createTodoTask(describe, min, sec) {
    return {
      id: this.maxId++,
      describe,
      done: false,
      checked: false,
      edit: false,
      creationTime: new Date(),
      time: formatDistanceToNowStrict(new Date()),
      minutes: Number(min),
      seconds: Number(sec),
      timer: null,
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

  addTask = (e, text, min, sec) => {
    if (e.keyCode === 13 && e.target.value.trim() && text && min && sec) {
      const newTask = this.createTodoTask(text, min, sec);
      this.setState(({ todoData }) => {
        const newArrayTask = [...todoData, newTask];
        return {
          todoData: newArrayTask,
        };
      });
    }
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

  changeTask = (e, text, id) => {
    const oldItem = this.state.todoData.find((item) => item.id === id);

    const newTask = {
      id: id,
      describe: text,
      done: false,
      checked: false,
      edit: false,
      creationTime: oldItem.creationTime,
      time: formatDistanceToNowStrict(new Date(oldItem.creationTime)),
      minutes: oldItem.minutes,
      seconds: oldItem.seconds,
      timer: oldItem.timer,
    };

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((item) => item.id === id);
      const newArrayTask = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];

      return {
        todoData: newArrayTask,
      };
    });
  };

  updateTimeItem = (items) => {
    return items.map((item) => {
      return { ...item, time: formatDistanceToNowStrict(new Date(item.creationTime)) };
    });
  };

  startTimer = (id) => {
    let newTask = {
      ...this.state.todoData.find((item) => item.id === id),
    };
    clearInterval(newTask.timer);

    newTask.timer = setInterval(() => {
      if (newTask.seconds >= 1) {
        newTask.seconds -= 1;
      }
      if (newTask.seconds < 1) {
        newTask.minutes -= 1;
        newTask.seconds = 59;
      }
      if (newTask.minutes < 0) {
        newTask.minutes = 0;
        newTask.seconds = 0;
        clearInterval(this.state.todoData.find((item) => item.id === id).timer);
      }

      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((item) => item.id === id);
        const newArrayTask = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];

        return {
          todoData: newArrayTask,
        };
      });
    }, 1000);
  };

  pauseTimer = (id) => {
    clearInterval(this.state.todoData.find((item) => item.id === id).timer);
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
          onDeleted={this.deleteTask}
          onEdit={this.onEdit}
          onToggleDone={this.onToggleDone}
          changeTask={this.changeTask}
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
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
