import 'dotenv/config';

import { startServer } from './startServer';

process.once('SIGUSR2', function () {
  process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, 'SIGINT');
});

startServer()
  .then((PORT) => {
    console.log(`🚀 listening on http://localhost:${PORT} 🚀`);
  })
  .catch((error) => console.log(error));
