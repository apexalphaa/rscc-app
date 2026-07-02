import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import Button from "../components/common/Button";

export default function Players() {
  return (
    <DashboardLayout>

      <PageHeader
        title="Players"
        subtitle="Manage academy players."
        action={<Button>Add Player</Button>}
      />

      <SearchBar
        placeholder="Search players..."
      />

      <div className="mt-10 bg-white rounded-3xl border-2 border-dashed border-slate-300 h-96 flex items-center justify-center">

        <p className="text-slate-400 text-xl">
          Player Management module will be built in Sprint 13.
        </p>

      </div>

    </DashboardLayout>
  );
}
