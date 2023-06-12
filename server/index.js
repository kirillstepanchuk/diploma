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

// app.post('/api/photo', uploadMiddleware.single('image'), function (req, res, next) {
//   console.log('req: ', req.body);
//   console.log('req: ', req.file);

//   res.status(200).json({
//     good: true,
//   })
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// });

app.get('/images/:imageName', (req, res) => {
  // do a bunch of if statements to make sure the user is 
  // authorized to view this image, then

  const imageName = req.params.imageName

  // if (!imageName) {
  //   const readStream = fs.createReadStream(`images/${imageName}`);
  //   readStream.pipe(res);
  //   return;
  // }
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