import styles from "./Sidebar.module.css";
import { LinkWidget } from "./Sidebar.style";
import Resources from "@/resources/resources";
import Routes from "@/routes/routes";

const Sidebar = () => {
  const content = [
    { labe: Resources.restaurants, href: Routes["/restaurants"] },
    { labe: Resources.chefs, href: Routes["/chefs"] },
    { labe: Resources.dishes, href: Routes["/dishes"] },
  ];
  return (
    <div className={styles.sidebar}>
      <h1>COLLECTION TYPES</h1>
      <ul>
        {content.map((page) => (
          <li>
            <LinkWidget href={page.href} key={page.href}>
              <span className={styles.link}>{page.labe}</span>
            </LinkWidget>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
