import { Task } from './task';

export const LastTasks = () => {
  return (
    <section>
      <h2 className="mb-4">
        Last tasks <span className="text-[var(--muted-foreground)]">(3)</span>
      </h2>
      <ul className="grid grid-cols-3 gap-4">
        <li>
          <Task progress={52} progressBackground={'bg-chart-1'} />
        </li>
        <li>
          <Task progress={100} progressBackground={'bg-chart-2'} />
        </li>
        <li>
          <Task progress={80} progressBackground={'bg-chart-4'} />
        </li>
      </ul>
    </section>
  );
};
