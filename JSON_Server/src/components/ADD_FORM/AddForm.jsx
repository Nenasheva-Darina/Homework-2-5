import { useState } from 'react';
import styles from './AddForm.module.css';

export const AddForm = ({ onSave, setErrorMessage }) => {
  const [inputValue, setInputValue] = useState(''); // Значения инпута ввода задачи
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      setErrorMessage('Упс...Кажется вы забыли написать задачу');
      return;
    }
    setIsCreating(true);
    try {
      await onSave(inputValue);
      setErrorMessage('');
      setInputValue('');
    } catch (error) {
      console.error('Ошибка при отправке задачи:', error);
      setErrorMessage('Произошла ошибка при добавлении задачи.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <form className={styles.addForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Какое приключение на сегодня?"
        className={styles.newToDoInput}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <button disabled={isCreating} className={styles.button} type="submit">
        Добавить
      </button>
    </form>
  );
};
