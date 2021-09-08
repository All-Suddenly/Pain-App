import 'dotenv/config';

import { startServer } from './startServer';

const { PORT = 4000 } = process.env;

startServer()
  .then((app) => {
    app.listen(PORT);
  })
  .catch((error) => console.log(error));
