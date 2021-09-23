import 'dotenv/config';

import { startServer } from './startServer';

const { PORT = 4000 } = process.env;

startServer()
  .then((app) => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is listing on http://localhost:${PORT} 🚀`);
    });
  })
  .catch((error) => console.log(error));
