import { PropsWithChildren, FC } from "react";
import styles from "./wrapper.module.css";

export const Wrapper: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
