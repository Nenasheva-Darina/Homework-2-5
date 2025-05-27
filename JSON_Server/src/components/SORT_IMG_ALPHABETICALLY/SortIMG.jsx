import React, { useState, useEffect } from 'react';
import styles from './SortIMG.module.css';

export const SortIMG = ({ setSortingOption, sortingOption }) => {
  const [iconSrc, setIconSrc] = useState('/images/iconsBlueSort.png');

  useEffect(() => {
    setIconSrc(
      sortingOption === 'alphabetical'
        ? '/images/iconsWhiteSort.png'
        : '/images/iconsBlueSort.png'
    );
  }, [sortingOption]);

  const handleClick = () => {
    setSortingOption(
      sortingOption === 'alphabetical' ? 'default' : 'alphabetical'
    );
  };

  const backgroundClass =
    sortingOption === 'alphabetical' ? styles.backgroundChanged : '';

  return (
    <>
      <img
        className={`${styles.boxIMG} ${backgroundClass}`}
        src={iconSrc}
        alt="Сортировать"
        onClick={handleClick}
      />
    </>
  );
};
