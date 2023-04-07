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

const mysql = require('mysql2');
var con = mysql.createConnection({
    host: 'ccscloud3.dlsu.edu.ph',
    port: '39000',
    user: 'dev',
    password: '12341234'
});

con.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + con.threadId);
});

app.get('/', function (req, res) {
    //   res.sendFile(path.join(__dirname, '/index.html'));
    var query = "SELECT * FROM imdb.movies LIMIT 10;"
    con.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        // connected!

        res.render('index', { tuple: results });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});