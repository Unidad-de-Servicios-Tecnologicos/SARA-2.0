import InstructorKPIs from "./InstructorKPIs";
import InstructorCharts from "./InstructorCharts";
import ActivitiesTable from "./ActivitiesTable";

export default function InstructorDashboard() {
  return (
    <div className="space-y-6">
      <InstructorKPIs />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InstructorCharts />
        <ActivitiesTable />
      </div>
    </div>
  );
}
