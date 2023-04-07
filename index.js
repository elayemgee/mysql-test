const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })) // might change later

app.set('view engine', 'hbs');
app.engine("hbs", exphbs.engine({
    extname: "hbs"
    // helpers: require(__dirname + '/public/hbs-helpers/helpers.js')
}));

app.use(express.static('public'));

app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '/index.html'));
    res.render('index');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});