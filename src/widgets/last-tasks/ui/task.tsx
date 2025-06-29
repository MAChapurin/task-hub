import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';

import { Plane, MessageSquareText, BookImage, Link, Plus, Pencil } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Progress } from './progress';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/css';

export const Task = ({
  progress,
  progressBackground,
}: {
  progress: number;
  progressBackground?: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-violet-200 flex flex-col items-center justify-center text-violet-600 shrink-0">
              <Plane />
            </div>
            <div>
              <CardTitle className="font-semibold text-2xl text-balance">
                Travel App User Flow
              </CardTitle>
              <CardDescription>Due: 3 days</CardDescription>
            </div>
          </div>
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Progress value={progress} background={progressBackground} />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button size={'icon'} variant={'ghost'}>
            <MessageSquareText className="text-muted-foreground" /> 3
          </Button>
          <Button size={'icon'} variant={'ghost'}>
            <BookImage className="text-muted-foreground" /> 6
          </Button>
          <Button size={'icon'} variant={'ghost'}>
            <Link className="text-muted-foreground" /> 3
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className={cn('w-12 h-12 rounded-full', progressBackground)}
            variant="outline"
            size="sm"
          >
            <Plus className="text-background" />
          </Button>
          <Button className="w-12 h-12 rounded-full" variant="outline" size="sm">
            <Pencil />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
