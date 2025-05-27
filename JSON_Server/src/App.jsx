import { useEffect, useState, useRef } from 'react';
import styles from './App.module.css';
import { UseToDos } from './hooks/UseToDos.js';
import { AddForm, TodoItem, SortIMG, ErrorBlock, Search } from './components';

export const App = () => {
  const {
    toDoList,
    isLoadingLoader,
    requestAddNewToDo,
    requestDeleteToDo,
    requestUpdateToDoList,
    setSearch: setSearchFilter,
    sortingOption,
    setSortingOption,
  } = UseToDos();

  const [searchInputValue, setSearchInputValue] = useState(''); // Значения инпута ввода поиска
  const [errorMessage, setErrorMessage] = useState(''); // Хранилище ошибок
  const [searchFlag, setSearchFlag] = useState(false);

  const [alphabetically, setAlphabetically] = useState(false);

  const newFilterArrToDo = toDoList.filter((task) => {
    const title = task.title.toLowerCase();
    const difficultTask = searchInputValue.toLowerCase();

    return title.includes(difficultTask);
  });

  const handleSearchInputChange = (newValue) => {
    setSearchInputValue(newValue);
  };

  return (
    <>
      <div className={styles.boxToDo}>
        <ErrorBlock errorMessage={errorMessage} />

        <h1> Мой список дел </h1>

        <div className={styles.boxToDo1Div}>
          <Search
            setSearch={handleSearchInputChange}
            searchFlag={searchFlag}
            setSearchFlag={setSearchFlag}
            searchInputValue={searchInputValue}
          />

          {!searchFlag && (
            <AddForm
              onSave={requestAddNewToDo}
              setErrorMessage={setErrorMessage}
              setSearch={setSearchFilter}
            />
          )}

          <SortIMG
            setSortingOption={setSortingOption}
            sortingOption={sortingOption}
          />
        </div>

        <div className={styles.content}>
          {isLoadingLoader ? <div className={styles.loader}></div> : null}

          {alphabetically
            ? sorterFilterArr().map(({ id, title, completed }) => (
                <TodoItem
                  key={id}
                  onDelete={requestDeleteToDo}
                  id={id}
                  title={title}
                  completed={completed}
                  onEdit={requestUpdateToDoList}
                />
              ))
            : searchFlag
            ? newFilterArrToDo.map(({ id, title, completed }) => (
                <TodoItem
                  key={id}
                  onDelete={requestDeleteToDo}
                  id={id}
                  title={title}
                  completed={completed}
                  onEdit={requestUpdateToDoList}
                />
              ))
            : toDoList.map(({ id, title, completed }) => (
                <TodoItem
                  key={id}
                  onDelete={requestDeleteToDo}
                  id={id}
                  title={title}
                  completed={completed}
                  onEdit={requestUpdateToDoList}
                />
              ))}
        </div>
      </div>
    </>
  );
};

// json-server --watch db.json --port 3004
