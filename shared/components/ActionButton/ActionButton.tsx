import React from "react";
import styles from "./ActionButton.module.css";

interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  onClick,
}) => {
  return (
    <button className={styles["action-button"]} onClick={onClick}>
      {icon}
      <span className={styles["label-display"]}>{label}</span>
    </button>
  );
};

export default ActionButton;
