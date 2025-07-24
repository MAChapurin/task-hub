'use client';

import { Dialog, DialogTrigger, DialogContent } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Plus } from 'lucide-react';

export const CreateProjectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4" variant="default">
          <Plus className="mr-2 h-4 w-4" /> Создать проект
        </Button>
      </DialogTrigger>
      <DialogContent>
        {/* TODO: Add form to create a project */}
        <p>Форма создания проекта здесь</p>
      </DialogContent>
    </Dialog>
  );
};
