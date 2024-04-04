import Link from "next/link";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h1>COLLECTION TYPES</h1>
      <ul>
        <li>
          <Link href="restaurants" style={{ textDecoration: "none" }}>
            <span className={styles.link}>Restaurants</span>
          </Link>
        </li>
        <li>
          <Link href="chefs" style={{ textDecoration: "none" }}>
            <span className={styles.link}>Chefs</span>
          </Link>
        </li>
        <li>
          <Link href="dishes" style={{ textDecoration: "none" }}>
            <span className={styles.link}>Dishes</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
