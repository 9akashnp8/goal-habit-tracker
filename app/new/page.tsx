import styles from "./page.module.css";
import NewPlanForm from "./components/new-plan-form";

export default async function NewPlan() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Create New Plan</h1>
        </header>
        <section>
          <NewPlanForm />
        </section>
      </main>
    </div>
  );
}
