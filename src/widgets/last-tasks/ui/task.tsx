import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { Plane, MessageSquareText, BookImage, Link } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Progress } from './progress';
import { Button } from '@/shared/ui/button';
import { FC } from 'react';

import { EditTaskDialog } from '@/features/edit-task';
import { ITask } from '@/entities';
import { DayCounter } from './day-counter';
import { AddSubTaskDialog } from '@/features/add-subtask/ui/add-subtask';

export const Task: FC<ITask> = ({ progress, title, dueDate, users, id }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col w-full max-w-full">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="w-10 h-10 rounded-full bg-violet-200 flex items-center justify-center text-violet-600 shrink-0">
              <Plane />
            </div>
            <div className="flex -space-x-2 mb-auto *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
              {users.map((user) => (
                <Avatar key={user.id}>
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          <div className="w-full max-w-full mt-2">
            <CardTitle
              className="font-semibold text-2xl w-full max-w-full text-balance"
              title={title}
            >
              {title}
            </CardTitle>
            <CardDescription>
              <DayCounter dueDate={dueDate} />
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={progress} />
      </CardContent>
      <CardFooter className="flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <MessageSquareText className="text-muted-foreground" /> 3
          </Button>
          <Button size="icon" variant="ghost">
            <BookImage className="text-muted-foreground" /> 6
          </Button>
          <Button size="icon" variant="ghost">
            <Link className="text-muted-foreground" /> 3
          </Button>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <AddSubTaskDialog taskId={id} />
          <EditTaskDialog taskId={id} />
        </div>
      </CardFooter>
    </Card>
  );
};
