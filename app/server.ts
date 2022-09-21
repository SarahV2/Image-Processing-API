import router from "./routes/imageRoutes";

const express = require('express');

const app = express()

app.use('/api', router)

const port = 8000
  app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
  });