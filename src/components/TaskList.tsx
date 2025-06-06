import { useTask } from '@/contexts/TaskContext';
import { TaskItem } from './TaskItem';

export function TaskList() {
  const { tasks } = useTask();

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 opacity-20">📝</div>
        <p className="text-muted-foreground text-lg">
          No tasks yet. Add your first task above!
        </p>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="w-full max-w-3xl space-y-8">
      {pendingTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Pending Tasks
            </h2>
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
              {pendingTasks.length}
            </span>
          </div>
          <div className="space-y-4">
            {pendingTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Completed Tasks
            </h2>
            <span className="bg-badge text-success dark:text-white px-2 py-0.5 rounded-full text-sm font-medium">
              {completedTasks.length}
            </span>
          </div>
          <div className="space-y-4">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {tasks.length > 0 && (
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Total: {tasks.length} task{tasks.length !== 1 ? 's' : ''} • 
            Completed: {completedTasks.length} • 
            Pending: {pendingTasks.length}
          </p>
        </div>
      )}
    </div>
  );
} 