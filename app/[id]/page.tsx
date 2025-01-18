import Link from "next/link";
import Plan from "@/lib/model";

import styles from "./page.module.css";

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slug = (await params).id;
  const plan = await Plan.findById(slug);

  if (!plan) {
    return <h1>Not Found</h1>;
  }

  return (
    <main>
      <section className={styles.header}>
        <h1>{plan.name}</h1>
        <Link href="/goals/new" className={styles.primaryButton}>
          New
        </Link>
      </section>
    </main>
  );
}
