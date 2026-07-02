import DashboardLayout from "../layouts/DashboardLayout";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import EmptyState from "../components/EmptyState";
import Button from "../components/common/Button";

export default function Players() {
  return (
    <DashboardLayout>

      <PageHeader
        title="Players"
        subtitle="Manage all registered academy players."
        action={<Button>Add Player</Button>}
      />

      <div className="mt-8 mb-8">

        <SearchBar
          placeholder="Search players..."
        />

      </div>

      <EmptyState
        title="No Players Found"
        description="Your academy doesn't have any registered players yet."
        button={<Button>Add First Player</Button>}
      />

    </DashboardLayout>
  );
}
