import { useEffect, useState, useMemo } from 'react';

const BASE_URL = 'http://localhost:3004/toDoList';

export const UseToDos = () => {
  const [toDoList, setToDoList] = useState([]);
  const [isLoadingLoader, setIsLoadingLoader] = useState(false);
  const [search, setSearch] = useState('');
  const [sortingOption, setSortingOption] = useState('default');

  const filteredAndSortedTodos = useMemo(() => {
    let result = [...toDoList];

    if (search) {
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (sortingOption) {
      case 'alphabetical':
        result = [...result].sort((a, b) =>
          a.title.localeCompare(b.title, 'ru')
        );
        break;
    }

    return result;
  }, [toDoList, search, sortingOption]);

  useEffect(() => {
    fetchToDos();
  }, []);

  const fetchToDos = async () => {
    setIsLoadingLoader(true);
    try {
      const loadedToDoList = await fetch(BASE_URL).then((loadedData) =>
        loadedData.json()
      );
      setToDoList(loadedToDoList);
    } catch (error) {
      console.log('Ошибочка...', error);
    } finally {
      setIsLoadingLoader(false);
    }
  };

  const requestAddNewToDo = async (text) => {
    try {
      const newToDo = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({
          title: text,
          completed: false,
        }),
      }).then((response) => response.json());
      console.log('Добавленно новое дело:', newToDo);
      setToDoList([...toDoList, newToDo]);
    } catch (error) {
      console.log('Ошибочка...', error);
    } finally {
      setIsLoadingLoader(false);
    }
  };

  const requestDeleteToDo = async (id) => {
    try {
      const newToDODelete = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      setToDoList((prevToDoList) =>
        prevToDoList.filter((todo) => todo.id !== id)
      );
      console.log('Дело было удалено:', id);
    } catch (error) {
      console.log('Ошибочка при удалении задачи:', error);
    }
  };

  const requestUpdateToDoList = async (updateTodo) => {
    try {
      const response = await fetch(`${BASE_URL}/${updateTodo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(updateTodo),
      });

      const updatedToDo = await response.json();

      setToDoList((prevToDoList) =>
        prevToDoList.map((todo) =>
          todo.id === updatedToDo.id ? { ...todo, ...updatedToDo } : todo
        )
      );

      console.log('Задача обновлена:', updatedToDo);
    } catch (error) {
      console.log('Ошибочка при обновлении задачи:', error);
    }
  };

  return {
    toDoList: filteredAndSortedTodos,
    isLoadingLoader,
    fetchToDos,
    requestAddNewToDo,
    requestDeleteToDo,
    requestUpdateToDoList,
    setSearch,
    sortingOption,
    setSortingOption,
  };
};
