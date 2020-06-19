import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { selectCompleted, selectNotCompleted, selectVisible } from '../../store/selectors/todo';
import { FILTERS } from '../../constants/filter';
import { onFilterSelect } from '../../store/actions/filter';

export function Footer() {
  const allCount = useSelector(state => selectVisible(state.todos, FILTERS.all).length);
  const completedCount = useSelector(state => selectCompleted(state.todos).length);
  const activeCount = useSelector(state => selectNotCompleted(state.todos).length);

  const filterTitles = [
    { key: FILTERS.all, value: allCount },
    { key: FILTERS.active, value: activeCount },
    { key: FILTERS.completed, value: completedCount }
  ];
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  const filterSelect = selectedFilter => dispatch(onFilterSelect(selectedFilter));

  return (
    <footer className="footer">
      <ul className="filtersC">
        {filterTitles.map((filterTitle, index) => (
          <li key={filterTitle.key}>
            <a
              href="./#"
              className={classNames({ selected: filterTitle.key === filter })}
              onClick={() => filterSelect(filterTitle.key)}
            >
              {filterTitle.value}
            </a>
            {index !== filterTitles.length - 1 && (<span>/</span>) }
          </li>
        ))}
      </ul>
    </footer>
  );
}
