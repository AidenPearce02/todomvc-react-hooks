import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function formattedTime(time) {
  let diffTime = time;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  diffTime -= diffDays * 1000 * 60 * 60 * 24;
  const diffHours = Math.floor(diffTime / 1000 / 60 / 60);
  diffTime -= diffHours * 1000 * 60 * 60;
  const diffMinutes = Math.floor(diffTime / 1000 / 60);
  let result = '';
  if (diffDays > 0) {
    result = result.concat(`${diffDays} d `);
  }
  if (diffHours === 0 && diffDays > 0) {
    result = result.concat('00 h ');
  } else if (diffHours > 0) {
    if (diffHours < 10) {
      result = result.concat('0');
    }
    result = result.concat(`${diffHours} h `);
  }
  if (diffMinutes >= 0) {
    if (diffMinutes < 10) {
      result = result.concat('0');
    }
    result = result.concat(`${diffMinutes} m`);
  }
  return result;
}

export function Item({ todo, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(todo.name);

  const timeLeft = useCallback(() => {
    const finishTo = new Date(todo.finishTo);
    const diffTime = finishTo - new Date();
    if (diffTime > 0) {
      return formattedTime(diffTime);
    }
    return 'Failed';
  }, [todo.finishTo]);
  const [time, setTime] = useState(timeLeft);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const solvedIn = () => {
    const solved = new Date(todo.solved);
    const diffTime = solved - new Date(todo.createdOn);
    if (diffTime > 0) {
      return formattedTime(diffTime);
    }
    return 'Failed';
  };

  const handleName = () => {
    const maxLength = 15;
    if (name.length > maxLength) {
      return name.substr(0, maxLength).concat('...');
    }
    return name;
  };

  const handleEdit = () => setEditing(true);

  const handleCompleted = () => {
    onUpdate({
      id: todo.id,
      completed: !todo.completed,
      solved: (!todo.completed) ? new Date() : todo.solved
    });
  };

  const handleRemove = () => onRemove(todo.id);

  const handleChange = event => setName(event.target.value);

  const handleBlur = () => {
    onUpdate({
      id: todo.id,
      name
    });
    setEditing(false);
  };

  const { completed } = todo;

  return (
    <li className={classNames({ completed, editing })} data-testid="todo-item">
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={handleCompleted} />
        <label data-testid="todo-name">
          {handleName()}
        </label>
        {!completed && (
          <label className="todo-date" data-testid="todo-finishTo">
            <span className="mobile">Time to complete: </span>
            {time}
          </label>
        )}
        {completed && (
          <label className="todo-date" data-testid="todo-solved">
            <span className="mobile">Solved in: </span>
            {solvedIn()}
          </label>
        )}
        <button className="editB" onClick={handleEdit} data-testid="todo-edit" />
        <button className="destroy" onClick={handleRemove} data-testid="todo-remove" />
      </div>
      {editing && (
        <input className="edit" value={name} onInput={handleChange} onBlur={handleBlur} onChange={() => {}} />
      )}
    </li>
  );
}

Item.propTypes = {
  todo: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};
