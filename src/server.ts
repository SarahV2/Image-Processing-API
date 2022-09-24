import router from "./routes/imageRoutes";
import { logger } from "./utils/logging";

const express = require('express');

const app = express()

app.use('/api', router)

const port = 8000
  app.listen(port, () => {
    logger.info(`[server]: Server is running at https://localhost:${port}`);
  });