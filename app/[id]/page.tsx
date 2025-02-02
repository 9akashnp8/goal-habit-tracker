import Link from "next/link";
import { Plan } from "@/lib/model";

import styles from "./page.module.css";
import GoalList from "./components/goal-list";

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const planId = (await params).id;
  const plan = await Plan.findById(planId);

  if (!plan) {
    return <h1>Not Found</h1>;
  }

  return (
    <main>
      <section className={styles.header}>
        <h1>{plan.name}</h1>
        <Link
          href={`/${planId}/goals/new/step-1`}
          className={styles.primaryButton}
        >
          New
        </Link>
      </section>
      <section>
        <GoalList platId={planId} />
      </section>
    </main>
  );
}
