import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { onCreate } from '../../store/actions/todo';
import { FILTERS } from '../../constants/filter';
import { onFilterSelect } from '../../store/actions/filter';

const ENTER_KEY = 'Enter';

export function Header() {
  const filterTitles = [
    { key: FILTERS.all, value: 'All' },
    { key: FILTERS.active, value: 'Active' },
    { key: FILTERS.completed, value: 'Completed' }
  ];
  const filter = useSelector(state => state.filter);


  const [name, setName] = useState('');
  const [finishTo, setFinishTo] = useState(`${new Date().getFullYear()}-${`${new Date().getMonth()
  + 1}`.padStart(2, '0')}-${`${new Date().getDate()}`.padStart(
    2,
    '0'
  )}T${`${new Date().getHours()}`.padStart(
    2,
    '0'
  )}:${`${new Date().getMinutes()}`.padStart(2, '0')}`);
  const dispatch = useDispatch();
  const filterSelect = selectedFilter => dispatch(onFilterSelect(selectedFilter));

  const handleChangeN = event => setName(event.target.value);
  const handleChangeD = event => setFinishTo(event.target.value);

  const handleSubmit = event => {
    if (event.key !== ENTER_KEY) {
      return;
    }

    dispatch(onCreate(name, finishTo));
    onCreate(name, finishTo);
    setName('');
    setFinishTo(`${new Date().getFullYear()}-${`${new Date().getMonth()
    + 1}`.padStart(2, '0')}-${`${new Date().getDate()}`.padStart(
      2,
      '0'
    )}T${`${new Date().getHours()}`.padStart(
      2,
      '0'
    )}:${`${new Date().getMinutes()}`.padStart(2, '0')}`);
  };

  return (
    <header className="header">
      <ul className="filters">
        {filterTitles.map(filterTitle => (
          <li key={filterTitle.key}>
            <a
              href="./#"
              className={classNames({ selected: filterTitle.key === filter })}
              onClick={() => filterSelect(filterTitle.key)}
            >
              {filterTitle.value}
            </a>
          </li>
        ))}
      </ul>
      <h1>todos</h1>
      <div className="form-inline">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={name}
          onInput={handleChangeN}
          onKeyUp={handleSubmit}
          onChange={() => {}}
          data-testid="todo-create-name"
        />
        <input
          className="finishTo-todo"
          type="datetime-local"
          value={finishTo}
          onChange={handleChangeD}
          data-testid="todo-finish-to"
        />
      </div>
    </header>
  );
}
