const express = require('express');
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
    host: '172.16.3.142',
    port: '3306',
    user: 'group16',
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
    var query = "SELECT * FROM movies.central LIMIT 10;"
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