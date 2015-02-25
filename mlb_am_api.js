http://www.w3schools.com/json/json_http.asp

window.gameArray = [];

function Game(sName, minTemp, maxTemp, rainMax) {
  this.homeTeam = homeTeam;
  this.awayTeam = awayTeam;
  this.homeScore = homeScore;
  this.awayScore = awayScore;
  // Getters
  this.setHomeTeam = function() {
    this.homeTeam = homeTeam;
  };
  this.setAwayTeam = function() {
    this.awayTeam = awayTeam;
  };
  this.setHomeScore = function() {
    this.homeScore = homeScore;
  };
  this.setAwayScore = function() {
    this.awayScore = awayScore;
  };
  // Setters
  this.getHomeTeam = function() {
    return this.homeTeam;
  };
  this.getAwayTeam = function() {
    return this.awayTeam;
  };
  this.getHomeScore = function() {
    return this.homeScore;
  };
  this.getAwayScore = function() {
    return this.awayScore;
  };
}


function getTomorrowWeather() {
  var req = new XMLHttpRequest();
  if(!req) {
    throw 'Unable to create HttpRequest.';
  }
  var yearSelect = document.getElementsByName('year-select')[0];
  var url = 'http://gd2.mlb.com/components/game/mlb/';
  var params = {
    q: citySelect.option[citySelect.selectedIndex].value,
    mode: json,
    units: 'imperial',
    cnt: '7'
  };
  url += '?' + urlStringify(params);
  req.onreadystatechange = function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  };
  req.open('GET', url);
  req.send();
}
