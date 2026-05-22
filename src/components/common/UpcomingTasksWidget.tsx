import Icon from "@/components/ui/AppIcon";
import type { DashboardTask } from "@/types/user";

interface UpcomingTasksWidgetProps {
  tasks: DashboardTask[];
}

const priorityStyles = {
  high: { bg: "bg-destructive/10", icon: "text-destructive" },
  medium: { bg: "bg-warning/10", icon: "text-warning" },
  low: { bg: "bg-muted", icon: "text-muted-foreground" },
};

export default function UpcomingTasksWidget({ tasks }: UpcomingTasksWidgetProps) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-lg font-bold text-foreground mb-4">Upcoming Tasks</h3>
      {tasks.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No upcoming tasks</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task, index) => {
            const style = priorityStyles[task.priority];
            return (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${style.bg}`}
                >
                  <Icon name={task.icon} size={16} className={style.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{task.task}</p>
                  <p className="text-xs text-muted-foreground">Due {task.dueDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
