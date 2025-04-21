import React, { useState } from 'react';
import styles from './App.module.css';

export const SortIMG = ({ setAlphabetically }) => {
  const [isIcon1Visible, setIsIcon1Visible] = useState(true);
  const [isBackgroundChanged, setIsBackgroundChanged] = useState(false);

  const handleClick = () => {
    setIsIcon1Visible(!isIcon1Visible);
    setIsBackgroundChanged(!isBackgroundChanged);
    if (isIcon1Visible) {
      setAlphabetically(true);
    } else {
      setAlphabetically(false);
    }
  };

  const filter = () => {};

  return (
    <div className={styles.boxToDo1Div}>
      <img
        className={`${styles.boxIMG} ${
          isBackgroundChanged ? styles.backgroundChanged : ''
        }`}
        src="/iconsBlueSort.png"
        alt="Иконка 1"
        onClick={handleClick}
        style={{ display: isIcon1Visible ? 'block' : 'none' }}
      />

      <img
        className={`${styles.boxIMG} ${
          isBackgroundChanged ? styles.backgroundChanged : ''
        }`}
        src="/iconsWhiteSort.png"
        alt="Иконка 2"
        onClick={handleClick}
        style={{ display: isIcon1Visible ? 'none' : 'block' }}
      />
    </div>
  );
};
