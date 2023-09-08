var firstSeriesStart = new Date(2021, 10, 11, 14, 30, 0);
var end = getNextThursday();
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var seasons = [ 
    "Wet", 
    "Storm", 
    "Dry", 
    "Hot" 
];
var seriesNames = [
    "Welcome Week",
    "Welcome to Mexico",
    "Holiday Special",
    "Happy New Year",
    "Horizon World Cup",
    "Horizon Rush Takeover",
    "Horizon Customs",
    "Cinco de Mayo",
    "German Automotive Excellence",
    "Hot Wheels",
    "Extreme E",
    "Rami's Racing History",
    "Horizon Road Trip",
    "Horizon 10-Year Anniversary",
    "Donut Media",
    "Horizon Holidays",
    "#FORDzathon",
    "Japanese Automotive",
    "Horizon Wilds Takeover",
    "Midnights at Horizon",
    "High Performance",
    "Explore the Horizon",
    "Upgrade Heroes",
    "Summer Party",
    "Italian Automotive"
];
window.onload = pageLoaded;

function pageLoaded() {
    showRemaining();
    setInterval(showRemaining, 1000);
    getSeriesAndSeason();
}

// https://stackoverflow.com/a/65869347/608312
function getNextThursday(d = new Date()) {
    let thursday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (4 - d.getDay() ), 14, 30, 0, 0);
    thursday <= d? thursday.setDate(thursday.getDate() + 7) : null;
    return thursday;
}

// https://stackoverflow.com/a/9335296/608312
function showRemaining() {
    var now = new Date();
    var distance = end - now;
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    document.getElementById('next').innerHTML = end.toLocaleString();
    document.getElementById('countdown').innerHTML = days + ' days, ';
    document.getElementById('countdown').innerHTML += hours + ' hours, ';
    document.getElementById('countdown').innerHTML += minutes + ' minutes, ';
    document.getElementById('countdown').innerHTML += seconds + ' seconds';
}

// Reference: https://forza.fandom.com/wiki/Forza_Horizon_5/Festival_Playlist
function getSeriesAndSeason(date = new Date()) {
    var totalWeeks = weeksBetween(firstSeriesStart, date);
    var currentSeries = Math.ceil(totalWeeks / 4);
    var remainder = (totalWeeks - 1) % 4;
    document.getElementById('series').innerHTML = currentSeries;
    document.getElementById('series-name').innerHTML = seriesNames[currentSeries];
    document.getElementById('season').innerHTML = seasons[remainder];
    //console.log("Weeks: " + totalWeeks + ". " + date.toString() + ": Series " + currentSeries + " Week " + remainder + " Season " + seasons[remainder]);
}

// https://stackoverflow.com/a/22859920/608312
function weeksBetween(d1, d2) {
    return Math.ceil((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}
   