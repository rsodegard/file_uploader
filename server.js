const express = require('express');
const fileUpload = require('express-fileupload');

// init express
const app = express();

// init file upload
app.use(fileUpload());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Origin, Authorization'
  );
  next();
};

// Upload endpoint
app.post('/upload', allowCrossDomain, (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  // we are taking the file and sending back to the client uploads file.
  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

app.listen(5000, () => console.log('Server Started...'));

// cors issue,
//  'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS, PUT, DELETE',
// 'Access-Control-Allow-Headers' => 'Content-Type, Origin, Authorization'

// If you want the progress bar to work, you need ot figure out how to solve the CORS pre-flight issue.
