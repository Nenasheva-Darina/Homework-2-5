import { useState, useRef, useEffect } from 'react';
import styles from './Search.module.css';

export const Search = ({
  setSearch,
  setSearchFlag,
  searchFlag,
  searchInputValue,
}) => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchFlag) {
      searchInputRef.current.focus();
    }
  }, [searchFlag]);

  const searchClasses = searchFlag ? styles.completed : '';

  return (
    <>
      <img
        className={searchClasses}
        src="/images/search.png"
        alt="Perform a search"
        onClick={() => setSearchFlag(!searchFlag)}
      />
      {searchFlag && (
        <input
          type="text"
          placeholder="Что ищем?"
          className={styles.newToDoInput}
          value={searchInputValue}
          ref={searchInputRef}
          onChange={(event) => setSearch(event.target.value)}
        />
      )}
    </>
  );
};
