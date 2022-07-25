import './App.css';
import React, { useState, useEffect } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Header from './сomponents/Header';
import Footer from './сomponents/Footer';
import Main from './сomponents/Main';

const App = () => {
  let [maxId, setMaxId] = useState(Number(localStorage.getItem('id')));
  const [todoData, setTodoData] = useState(JSON.parse(localStorage.getItem('todoData')));
  const [currentFilter, setCurrentFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoData));
    localStorage.setItem('id', String(maxId));
    localStorage.setItem('filter', JSON.stringify(currentFilter));
  }, [todoData, currentFilter]);

  const createTodoTask = (describe, min, sec) => {
    setMaxId(maxId + 1);
    return {
      id: maxId++,
      describe,
      done: false,
      checked: false,
      edit: false,
      creationTime: new Date(),
      time: formatDistanceToNowStrict(new Date()),
      minutes: min,
      seconds: sec,
      timer: null,
    };
  };

  const deleteTask = (id) => {
    setTodoData((todoData) => {
      return [...todoData].filter((item) => item.id !== id);
    });
  };

  const onToggleDone = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newItem = { ...todoData[idx], done: !todoData[idx].done, checked: !todoData[idx].checked };

      return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    });
  };

  const filter = (items, name) => {
    switch (name) {
      case 'all':
        console.log(items)
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'completed':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  const onFilterChange = (name) => {
    setCurrentFilter(name);
  };

  const onClearCompleted = (items) => {
    const newArray = items.filter((item) => !item.done);
    setTodoData(newArray);
  };


  const addTask = (e, text, min, sec) => {
    if (e.keyCode === 13 && e.target.value.trim() && text && (min || sec)) {
      const newTask = createTodoTask(text, min, sec);
      setTodoData((todoData) => {
        return [...todoData, newTask];
      });
    }
  };

  const onEdit = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newItem = { ...todoData[idx], edit: !todoData[idx].edit };

      return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    });
  };

  const changeTask = (e, text, id) => {
    const oldItem = todoData.find((item) => item.id === id);

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

    setTodoData((todoData) => {
      const idx = todoData.findIndex((item) => item.id === id);
      return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
    });
  };

  const updateTimeItem = (items) => {
    return items.map((item) => {
      return { ...item, time: formatDistanceToNowStrict(new Date(item.creationTime)) };
    });
  };

  const startTimer = (id) => {
    let newTask = {
      ...todoData.find((item) => item.id === id),
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
        clearInterval(todoData.find((item) => item.id === id).timer);
      }

      setTodoData((todoData) => {
        const idx = todoData.findIndex((item) => item.id === id);
        return [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
      });
    }, 1000);
  };

  const pauseTimer = (id) => {
    clearInterval(todoData.find((item) => item.id === id).timer);
  };

  const doneCount = todoData.filter((item) => !item.done).length;

  const visibleItems = updateTimeItem(filter(todoData, currentFilter));
  console.log(visibleItems)

  return (
    <div className="todoapp">
      <Header title="todos" onAddedTask={addTask} />
      <Main
        todos={visibleItems}
        onDeleted={deleteTask}
        onEdit={onEdit}
        onToggleDone={onToggleDone}
        changeTask={changeTask}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
      />
      <Footer
        activeTaskCount={doneCount}
        onFilterChange={onFilterChange}
        onClearCompleted={() => onClearCompleted(todoData)}
      />
    </div>
  );
};

export default App;
