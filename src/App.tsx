import { TaskProvider } from '@/contexts/TaskContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AddTask } from '@/components/AddTask';
import { TaskList } from '@/components/TaskList';
import { ThemeToggle } from '@/components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <header className="text-center mb-12">
              <div className="flex justify-between items-center mb-6">
                <div className="flex-1"></div>
                <h1 className="text-4xl font-bold text-foreground flex-1">
                  Task Manager
                </h1>
                <div className="flex-1 flex justify-end">
                  <ThemeToggle />
                </div>
              </div>
              <p className="text-muted-foreground text-lg">
                Organize your tasks with ease and style
              </p>
            </header>
            
            <div className="flex flex-col items-center space-y-12">
              <AddTask />
              <TaskList />
            </div>
          </div>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
