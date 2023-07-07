import styles from "./page.module.css";
import { Start } from "@/components/Start";
import { TestJourney } from "@/components/Journey";
import { NamedJourneyTest } from "@/components/Journey/test";
import { Journey } from "@/components/Journey/simpleArray";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Start /> */}
      {/* <TestJourney /> */}
      {/* <NamedJourneyTest /> */}
      <Journey />
    </main>
  );
}
