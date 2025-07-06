export function getDaysPassed(dueDate: Date): number {
  const now = new Date();
  const diffInMs = now.getTime() - dueDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}
