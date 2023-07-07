import styles from "./page.module.css";
import { Journey } from "@/components/Journey/Journey";

export default function Home() {
  return (
    <main className={styles.main}>
      <Journey />
    </main>
  );
}
