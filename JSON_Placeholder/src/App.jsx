import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
  const [toDoList, setToDoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((loadedData) => loadedData.json())
      .then((loadedToDoList) => {
        setToDoList(loadedToDoList);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        toDoList.map(({ userId, id, title }) => (
          <div key={userId}>
            <div className={styles.toDoList} key={id}>
              {title}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
