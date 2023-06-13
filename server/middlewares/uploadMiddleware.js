const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/')
  },
  filename: (req, file, cb) => {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(file.originalname)[1]; 
    cb(null, `${uuid.v4()}.${ext}`)
  },
})

const upload = multer({ storage });

module.exports = upload;