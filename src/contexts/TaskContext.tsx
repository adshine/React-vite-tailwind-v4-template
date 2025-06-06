import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Task, TaskContextType } from '@/types/task';

interface TaskState {
  tasks: Task[];
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: { title: string; description?: string } }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Omit<Task, 'id' | 'createdAt'>> } }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'TOGGLE_TASK'; payload: { id: string } };

const TaskContext = createContext<TaskContextType | undefined>(undefined);

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    }
    case 'UPDATE_TASK': {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates, updatedAt: new Date() }
            : task
        ),
      };
    }
    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload.id),
      };
    }
    case 'TOGGLE_TASK': {
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed, updatedAt: new Date() }
            : task
        ),
      };
    }
    default:
      return state;
  }
}

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] });

  const addTask = (title: string, description?: string) => {
    dispatch({ type: 'ADD_TASK', payload: { title, description } });
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: { id } });
  };

  const toggleTask = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: { id } });
  };

  const value: TaskContextType = {
    tasks: state.tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
} 