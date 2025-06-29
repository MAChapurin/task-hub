import { Search } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';

import { CommandSearch } from './search-command';

export const SearchDialog = () => {
  return (
    <Dialog>
      <search>
        <DialogTrigger asChild>
          <Button variant="outline" size={'icon'}>
            <Search />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-fit">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <CommandSearch />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Search</Button>
          </DialogFooter>
        </DialogContent>
      </search>
    </Dialog>
  );
};
