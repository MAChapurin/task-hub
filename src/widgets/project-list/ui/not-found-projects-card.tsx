import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Ban } from 'lucide-react';

export function NoProjectsCard() {
  return (
    <Card className="w-full h-full text-center">
      <CardHeader>
        <div className="flex justify-center mb-2">
          <Ban className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardTitle>Проекты не найдены</CardTitle>
        <CardDescription>В данной категории пока нет доступных проектов.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Попробуйте выбрать другую категорию или создать новый проект.
        </p>
      </CardContent>
    </Card>
  );
}
