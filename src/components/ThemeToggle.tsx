import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sun01Icon, Moon01Icon, Desk01Icon,  } from 'hugeicons-react';

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  const options = [
    {
      value: 'light',
      label: 'Light',
      icon: <Sun01Icon className="h-4 w-4" />,
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: <Moon01Icon className="h-4 w-4" />,
    },
    {
      value: 'system',
      label: `System (${systemTheme})`,
      icon: <Desk01Icon className="h-4 w-4" />,
    },
  ];

  const selectedOption = options.find(option => option.value === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 justify-between shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            {selectedOption?.icon}
            {/* <span className="hidden sm:inline font-medium">{selectedOption?.label}</span> */}
          </div>
          {/* <ArrowDown01Icon className="h-3 w-3 opacity-50" /> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
            className={`flex items-center gap-3 ${
              theme === option.value ? 'bg-accent text-accent-foreground' : ''
            }`}
          >
            {option.icon}
            <span className="font-medium">{option.label}</span>
            {theme === option.value && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 