import { Button } from '@/shared/ui/button';
import { Search } from 'lucide-react';

export const FormSearch = () => {
  return (
    <search className="relative">
      <Button variant={'outline'} size={'icon'}>
        <Search />
      </Button>
    </search>
  );
};
