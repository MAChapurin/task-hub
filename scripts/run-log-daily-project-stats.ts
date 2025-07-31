import { logDailyProjectStats } from './log-daily-project-stats';

logDailyProjectStats()
  .then(() => {
    console.log('✅ Done');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error writing stats:', err);
    process.exit(1);
  });
