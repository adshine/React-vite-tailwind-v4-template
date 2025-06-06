import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTask } from '@/contexts/TaskContext';
import type { Task } from '@/types/task';
import { Delete01Icon, Tick01Icon, Cancel01Icon } from 'hugeicons-react';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTask();

  return (
    <Card className={`w-full transition-all duration-200 ${task.completed ? 'opacity-75 bg-muted/50' : 'hover:shadow-md'}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-lg leading-tight ${
              task.completed 
                ? 'line-through text-muted-foreground' 
                : 'text-card-foreground'
            }`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-2 leading-relaxed ${
                task.completed 
                  ? 'line-through text-muted-foreground/70' 
                  : 'text-muted-foreground'
              }`}>
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
              <span>Created: {task.createdAt.toLocaleDateString()}</span>
              {task.completed && (
                <span className="text-success font-medium">
                  ✓ Completed
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleTask(task.id)}
              className={`${
                task.completed 
                  ? 'text-warning hover:text-warning border-warning/30 hover:border-warning/50' 
                  : 'text-success hover:text-success border-success/30 hover:border-success/50'
              }`}
              title={task.completed ? 'Mark as pending' : 'Mark as completed'}
            >
              {task.completed ? (
                <Cancel01Icon className="h-4 w-4" />
              ) : (
                <Tick01Icon className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteTask(task.id)}
              className="text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50"
              title="Delete task"
            >
              <Delete01Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 