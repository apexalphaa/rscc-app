import dashboardSummary from "../data/dashboardSummary";
import SummaryCard from "./SummaryCard";

export default function DashboardSummary() {
  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {dashboardSummary.map((card) => (

        <SummaryCard
          key={card.title}
          {...card}
        />

      ))}

    </section>
  );
}
