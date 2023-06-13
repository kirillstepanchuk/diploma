// kirillstepanchuk qwerty123
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const errorMiddleware = require('./middlewares/errorMiddleware');
const uploadMiddleware = require('./middlewares/uploadMiddleware');
const routes = require('./routes/routes');

const app = express();
app.use(cors({credentials: true, origin: true,}))
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);
app.use(errorMiddleware)

app.get('/images/:imageName', (req, res) => {

  const imageName = req.params.imageName

  const readStream = fs.createReadStream(`images/${imageName}`)
  readStream.pipe(res)
})

mongoose.connect(process.env.DATABASE_URL, { dbName: 'shop' });
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.listen(process.env.API_PORT, () => {
  console.log(`Server Started at ${process.env.API_PORT}`);
})