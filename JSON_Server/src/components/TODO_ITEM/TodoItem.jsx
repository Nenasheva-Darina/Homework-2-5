import { React, useRef, useEffect, useState } from 'react';
import styles from './TodoItem.module.css';

export const TodoItem = ({ onDelete, id, title, completed, onEdit }) => {
  const [editModeInputToDo, setEditModeInputToDo] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editModeInputToDo) {
      inputRef.current.focus();
    }
  }, [editModeInputToDo]);

  const requestDeleteToDo = async () => {
    setIsDeleting(true);
    try {
      await onDelete(id);
    } finally {
      setIsDeleting(false);
    }
  };

  const requestEditToDo = async (event) => {
    event.stopPropagation();
    setEditModeInputToDo(true);
  };

  const handleCheckboxChange = () => {
    onEdit({ id, completed: !completed, title });
  };

  const handleSave = () => {
    onEdit({ id, completed, title: inputRef.current.value });
    setEditModeInputToDo(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave();
    }
  };

  const textClasses = completed
    ? `${styles.title} ${styles.completed}`
    : styles.title;

  const divClasses = completed
    ? `${styles.toDoList} ${styles.completedToDo}`
    : styles.toDoList;

  return (
    <div key={id} className={divClasses}>
      <input
        className={styles.boxCheck}
        type="checkbox"
        checked={completed}
        onChange={handleCheckboxChange}
      />

      {editModeInputToDo ? (
        <input
          type="text"
          ref={inputRef}
          defaultValue={title}
          className={styles.newToDoInputList}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className={textClasses} onClick={(e) => e.stopPropagation()}>
          {title}
        </span>
      )}

      <div className={styles.boxIMG}>
        <img
          src="/images/delete.png"
          alt="Mark as Complete"
          onClick={requestDeleteToDo}
        />

        <img
          src="/images/edit.png"
          alt="Mark as Complete"
          onClick={requestEditToDo}
        />
      </div>
    </div>
  );
};
