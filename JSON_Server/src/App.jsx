import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { SortIMG } from './SortIMG';
import { ToDoList } from './ToDoList/ToDoContainer.jsx';

export const App = () => {
  const [toDoList, setToDoList] = useState([]); //Массив объектов списка дел
  const [isLoadingLoader, setIsLoadingLoader] = useState(false); // Загрузка лоудера
  const [downloadButtonActive, setDownloadButtonActive] = useState(false); // Кнопка Добавить дело
  const [updateToDoList, setUpdateToDoList] = useState(false); // Флаг кнопки редактирования
  const [refreshToDoFlag, setRefreshToDoFlag] = useState(false); // Флаг обновления списка дел
  const [inputValue, setInputValue] = useState(''); // Сброс значения инпута
  const [errorMessage, setErrorMessage] = useState(''); // Хранилище ошибок
  const [isChecked, setIsChecked] = useState(false); //  Состояние для галочки
  const [alphabetically, setAlphabetically] = useState(false);

  const refreshToDo = () => setRefreshToDoFlag(!refreshToDoFlag);

  useEffect(() => {
    fetch('http://localhost:3004/toDoList')
      .then((loadedData) => loadedData.json())
      .then((loadedToDoList) => {
        setToDoList(loadedToDoList);
      })
      .catch((error) => console.log('Ошибочка...', error))
      .finally(() => setIsLoadingLoader(false));
  }, [refreshToDoFlag]);

  const requestAddNewToDo = () => {
    setDownloadButtonActive(true);
    setIsLoadingLoader(true);

    fetch('http://localhost:3004/toDoList', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        title: inputValue,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log('Добавленно новое дело:', response);
        setToDoList([...toDoList, response]);
        // console.log(response);
        setRefreshToDoFlag(!refreshToDoFlag);
        setInputValue('');
        refreshToDo();
      })
      .catch((error) => console.log('Ошибочка...', error))
      .finally(() => setUpdateToDoList(false));
  };

  const handleChange = (target) => {
    if (target.value === '') {
      setErrorMessage('Упс...Кажется вы забыли написать задачу');
      setInputValue('');
    } else {
      setInputValue(target.value);
      setErrorMessage('');
    }
  };

  const handleCheckboxChange = (id) => {
    setToDoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleUpdateTitle = (id, newTitle) => {
    setToDoList((prevList) =>
      prevList.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const sorterFilterArr = () => {
    const newfilterArr = [...toDoList].sort((a, b) =>
      a.title.localeCompare(b.title, 'ru')
    );

    return newfilterArr;
  };

  return (
    <>
      <div className={styles.boxToDo}>
        {errorMessage ? (
          <div className={styles.errorBlock}>{errorMessage}</div>
        ) : null}

        <h1> Мой список дел </h1>

        <div className={styles.boxToDo1Div}>
          <input
            type="text"
            placeholder="Какое приключение на сегодня?"
            className={styles.newToDoInput}
            value={inputValue}
            onChange={(event) => handleChange(event.target)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                requestAddNewToDo();
              }
            }}
          />
          <SortIMG setAlphabetically={setAlphabetically} />
        </div>

        <div className={styles.content}>
          {isLoadingLoader ? <div className={styles.loader}></div> : null}

          {alphabetically
            ? sorterFilterArr().map(({ id, title, completed }) => (
                <div key={id} className={styles.toDoList}>
                  <input
                    className={styles.boxCheck}
                    type="checkbox"
                    checked={completed}
                    onClick={() => handleCheckboxChange(id)}
                  />

                  <ToDoList
                    key={id}
                    id={id}
                    title={title}
                    completed={completed}
                    taskUpdate={handleUpdateTitle}
                    refreshToDo={refreshToDo}
                  />
                </div>
              ))
            : toDoList.map(({ id, title, completed }) => (
                <div key={id} className={styles.toDoList}>
                  <input
                    className={styles.boxCheck}
                    type="checkbox"
                    checked={completed}
                    onClick={() => handleCheckboxChange(id)}
                  />

                  <ToDoList
                    key={id}
                    id={id}
                    title={title}
                    completed={completed}
                    taskUpdate={handleUpdateTitle}
                    refreshToDo={refreshToDo}
                  />
                </div>
              ))}
        </div>

        <button className={styles.button} onClick={requestAddNewToDo}>
          Добавить новое дело
        </button>
      </div>
    </>
  );
};
