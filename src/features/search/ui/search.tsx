import { Input } from '@/shared/ui/input';
import { Search } from 'lucide-react';

export const FormSearch = () => {
  return (
    <search className="relative">
      <Search className="absolute top-1 left-2 text-input" />
      <Input className="pl-8" />
    </search>
  );
};
