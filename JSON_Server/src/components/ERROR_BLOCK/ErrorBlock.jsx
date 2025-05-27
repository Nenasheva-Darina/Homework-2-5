import styles from './ErrorBlock.module.css';

export const ErrorBlock = ({ errorMessage }) => {
  return <div className={styles.errorBlock}>{errorMessage}</div>;
};
