import { Plan } from "@/lib/model";
import styles from "./page.module.css";

import Link from "next/link";

export default async function Home() {
  const plans = await Plan.find();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Plans</h1>
          <Link href={"/new"} className={styles.link}>
            New
          </Link>
        </header>
        <section>
          <ul>
            {plans.map((p) => (
              <li key={p.id}>
                <Link href={`/${p.id}`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
