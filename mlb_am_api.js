// http://www.w3schools.com/json/json_http.asp

function Game() {
  this.homeTeam = '';
  this.awayTeam = '';
  this.homeScore = '';
  this.awayScore = '';
  // Setters
  this.setHomeTeam = function(homeTeam) {
    this.homeTeam = homeTeam;
  };
  this.setAwayTeam = function(awayTeam) {
    this.awayTeam = awayTeam;
  };
  this.setHomeScore = function(homeScore) {
    this.homeScore = homeScore;
  };
  this.setAwayScore = function(awayScore) {
    this.awayScore = awayScore;
  };
  // Getters
  this.getHomeTeam = function(homeTeam) {
    return this.homeTeam;
  };
  this.getAwayTeam = function(awayTeam) {
    return this.awayTeam;
  };
  this.getHomeScore = function(homeScore) {
    return this.homeScore;
  };
  this.getAwayScore = function(awayScore) {
    return this.awayScore;
  };
}

function createScoreboard(scoreTable, response) {
  var obj = response.data.games.game;
  for (var key in obj) {
      var tempItem = new Game();
      tempItem.setHomeTeam(obj[key].home_team_name);
      tempItem.setAwayTeam(obj[key].away_team_name);
      tempItem.setHomeScore(obj[key].home_team_runs);
      tempItem.setAwayScore(obj[key].away_team_runs);
      tableObject(scoreTable, tempItem);
  }
}

function tableObject(scoreTable, tempItem) {
  var newTable = document.createElement('table');
  var tblBody = document.createElement('tbody');

  // Build the Away Team Name and Score
  var row1 = document.createElement('tr');

  var th1 = document.createElement('th');
  var th1Text = document.createTextNode(tempItem.getAwayTeam());
  th1.appendChild(th1Text);
  row1.appendChild(th1);

  var td1 = document.createElement('td');
  var td1Text = document.createTextNode(tempItem.getAwayScore());
  td1.appendChild(td1Text);
  row1.appendChild(td1);
  tblBody.appendChild(row1);

  // Build the Home Team Name and Score
  var row2 = document.createElement('tr');

  var th2 = document.createElement('th');
  var th2Text = document.createTextNode(tempItem.getHomeTeam());
  th2.appendChild(th2Text);
  row2.appendChild(th2);

  var td2 = document.createElement('td');
  var td2Text = document.createTextNode(tempItem.getHomeScore());
  td2.appendChild(td2Text);
  row2.appendChild(td2);
  tblBody.appendChild(row2);

  newTable.appendChild(tblBody);
  scoreTable.appendChild(newTable);
  newTable.setAttribute("class", "table table-bordered");
}

function getScores() {
  var emptyNode = document.getElementById('scoreboard');
  emptyNode.innerHTML = '';
  var req = new XMLHttpRequest();
  if(!req) {
    throw 'Unable to create HttpRequest.';
  }
  var yearSelect = document.getElementsByName('year')[0].value;
  var monthSelect = document.getElementsByName('month')[0].value;
  var daySelect = document.getElementsByName('day')[0].value;
  var url = 'http://gd2.mlb.com/components/game/mlb/';
  url += 'year_' + yearSelect + '/month_' + monthSelect + '/day_' + daySelect + '/miniscoreboard.json';
  req.onreadystatechange = function() {
    if(this.readyState === 4) {
      if(this.status === 200) {
        var response = JSON.parse(this.responseText);
        createScoreboard(document.getElementById('scoreboard'), response);
      }
    }
  };
  req.open('GET', url);
  req.send();
}

window.onload = function() {
  document.getElementById('scoreboard').innerHTML = '';
}
