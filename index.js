const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
//const fs = require('fs');

const articles = [{title: 'example' }];
const points = [undefined, 10, 20, 30, 40, 50];
const cellClasses = ["fail", "first-try", "second-try", "right-from-first-try", "right-from-second-try"];
const bonusClasses = ["bonus-fail", "bonus-can", "bonus-have"];
const teams = [];
teams[1] = {"name": "ком1", "school": "Школа 1", "table":[], "classes":[]};
teams[1].table[0] = ["темы", 1, 2, 3, 4, 5, "бонусы"];
teams[1].table[1] = ["Тема№1", 0, 0, 0, 0, 0, 0];
teams[1].table[2] = ["Тема№2", 0, 0, 0, 0, 0, 0];
teams[1].table[3] = ["Тема№3", 0, 0, 0, 0, 0, 0];
teams[1].table[4] = ["Тема№4", 0, 0, 0, 0, 0, 0];
teams[1].table[5] = ["Тема№5", 0, 0, 0, 0, 0, 0];
teams[1].table[6] = ["бонусы", 0, 0, 0, 0, 0];

teams[1].classes[1] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[1].classes[2] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[1].classes[3] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[1].classes[4] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[1].classes[5] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[1].classes[6] = [undefined, bonusClasses[1], bonusClasses[1], bonusClasses[1], bonusClasses[1], bonusClasses[1], bonusClasses[1]];

teams[2] = {"name": "ком2", "school": "Школа 1", "table":[], "classes":[]};
teams[2].table[0] = ["темы", 1, 2, 3, 4, 5, "бонусы"];
teams[2].table[1] = ["Тема№1", 0, 0, 0, 0, 0, 0];
teams[2].table[2] = ["Тема№2", 0, 0, 0, 0, 0, 0];
teams[2].table[3] = ["Тема№3", 0, 0, 0, 0, 0, 0];
teams[2].table[4] = ["Тема№4", 0, 0, 0, 0, 0, 0];
teams[2].table[5] = ["Тема№5", 0, 0, 0, 0, 0, 0];
teams[2].table[6] = ["бонусы", 0, 0, 0, 0, 0];

teams[2].classes[1] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[2].classes[2] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[2].classes[3] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[2].classes[4] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[2].classes[5] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[2].classes[6] = [undefined, bonusClasses[1], bonusClasses[1], bonusClasses[1], bonusClasses[1], bonusClasses[1], bonusClasses[1]];

teams[3] = {"name": "ком3", "school": "Школа 1", "table":[], "classes":[]};
teams[3].table[0] = ["темы", 1, 2, 3, 4, 5, "бонусы"];
teams[3].table[1] = ["Тема№1", 0, 0, 0, 0, 0, 0];
teams[3].table[2] = ["Тема№2", 0, 0, 0, 0, 0, 0];
teams[3].table[3] = ["Тема№3", 0, 0, 0, 0, 0, 0];
teams[3].table[4] = ["Тема№4", 0, 0, 0, 0, 0, 0];
teams[3].table[5] = ["Тема№5", 0, 0, 0, 0, 0, 0];
teams[3].table[6] = ["бонусы", 0, 0, 0, 0, 0];

teams[3].classes[1] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[3].classes[2] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[3].classes[3] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[3].classes[4] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[3].classes[5] = [undefined, cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], cellClasses[1], bonusClasses[1]];
teams[3].classes[6] = [undefined, bonusClasses[1], bonusClasses[1], bonusClasses[1], bonusClasses[1], bonusClasses[1], bonusClasses[1]];

app.set('port', process.env.port || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    '/index.html',
    express.static('public/index.html')
);
app.use(
    '/index',
    express.static('public/index.html')
);
app.use(
    '/result.html',
    express.static('public/results.html')
);
app.use(
    '/team-1.html',
    express.static('public/team-1.html')
);
app.use(
    '/team-2.html',
    express.static('public/team-2.html')
);
app.use(
    '/team-3.html',
    express.static('public/team-3.html')
);
app.use(
    '/styles/style.css',
    express.static('public/styles/style.css')
);
app.use(
    '/styles/locations.css',
    express.static('public/styles/locations.css')
);
app.use(
    '/styles/locations-in-results.css',
    express.static('public/styles/locations-in-results.css')
);
app.use(
    '/styles/results-styles.css',
    express.static('public/styles/results-styles.css')
);
app.use(
    '/styles/teams-pages-styles.css',
    express.static('public/styles/teams-pages-styles.css')
);
app.use(
    '/images/arrow-square-left.svg',
    express.static('public/images/arrow-square-left.svg')
);
app.use(
    '/scripts/scripts-for-teams-page.js',
    express.static('public/scripts/scripts-for-teams-page.js')
);
app.use(
    '/scripts/for-results.js',
    express.static('public/scripts/for-results.js')
);
app.use(
    '/scripts-end/jquery-1.12.4.min.js',
    express.static('public/scripts-end/jquery-1.12.4.min.js')
);
app.use(
    '/scripts-end/for-results.js',
    express.static('public/scripts-end/for-results.js')
);
app.use(
    '/scripts-end/scripts-for-teams-page.js',
    express.static('public/scripts-end/scripts-for-teams-page.js')
);

app.get('/results.html', (req, res) => {
    //res.type('text/html');
    res.render('result.ejs', { teams: teams });
});

app.post('/answer/', (req, res, next) => {
    console.log('answer:');
});
app.post('/answer/:coordX/:coordY', (req, res, next) => {
    const coordX = req.params.coordX;
    const coordY = req.params.coordY;
    console.log('answer: coordX='+coordX+" coordY="+coordY);
    console.log(req.body);
    
    const myurl = new URL(req.headers.referer);
    const mypath = myurl.pathname;
    console.log(mypath);
    const teamNumber = mypath[6];
     if (req.body.data == 25) {
	console.log(req.body.data + " is number");
	//const myurl = new URL(req.headers.referer);
	//console.log(myurl);
	//const mypath = myurl.pathname;
	//const teamNumber = mypath[6]; // только для тестов!!!
	console.log("номер команды ", teamNumber);
	if (teams[teamNumber].classes[coordY][coordX] == cellClasses[1]) {
	    teams[teamNumber].classes[coordY][coordX] = cellClasses[3]; //right-from-first-try
	    teams[teamNumber].table[coordY][coordX] = points[coordX];
	    //fs.writeFile("/result.html", );
	}
	if (teams[teamNumber].classes[coordY][coordX] == cellClasses[2]) {
	    teams[teamNumber].classes[coordY][coordX] = cellClasses[4];
	    teams[teamNumber].table[coordY][coordX] = points[coordX] / 2;
	}
	const newLog = "Команда " + teams[teamNumber].name + " решила задачу №" + coordX + " в теме " + teams[1].table[coordY][0] + ".";
	
    } else {
	if (teams[teamNumber].classes[coordY][coordX] == cellClasses[2]) {
	    teams[teamNumber].classes[coordY][coordX] = cellClasses[0]
	}
	if (teams[teamNumber].classes[coordY][coordX] == cellClasses[1]) {
	    teams[teamNumber].classes[coordY][coordX] = cellClasses[2]
	}
	const newLog = "Команда " + teams[teamNumber].name + " не решила задачу №" + coordX + " в теме " + teams[1].table[coordY][0] + ".";
    }
    //res.render("/team-2.html");
    //express.static("public" + mypath);
    //res.render('team-2.ejs');
    res.send("Принято.");
    //res.redirect(303, mypath);
});

// Пользовательская страница 404
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 — Не найдено')
})
// Пользовательская страница 500
app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 — Ошибка сервера')
})
    
app.listen(app.get('port'), () => {
    console.log('App started on port', app.get('port'));
});

module.exports = app;
