import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';
import { CreateProjectDialog } from '@/features/create-project';

export function CreateProjectCard() {
  return (
    <Card className="w-full max-w-sm text-center">
      <CardHeader>
        <CardTitle className="text-lg">Создать новый проект</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center">
          <CreateProjectDialog />
        </div>
      </CardContent>
    </Card>
  );
}
