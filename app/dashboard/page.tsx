import {
  ActivityFeed,
  MetricCards,
  PipelineChart,
  SequenceList,
  TaskList,
} from '@/components/ui/dashboard';

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <MetricCards />
      <div className="grid md:grid-cols-2 gap-6">
        <ActivityFeed />
        <PipelineChart />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <SequenceList />
        <TaskList />
      </div>
    </div>
  );
}
