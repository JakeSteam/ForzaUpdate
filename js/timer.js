var firstSeriesStart = new Date(2021, 10, 11, 14, 30, 0);
var nextSeasonStart;
var nextSeriesStart;
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
    "Italian Automotive",
    "Horizon Creatives"
];
window.onload = pageLoaded;

function pageLoaded() {
    showSeriesAndSeasonInfo();
    showRemaining();
    setInterval(showRemaining, 1000);
}

// https://stackoverflow.com/a/65869347/608312
function getNextSeasonStart(d = new Date()) {
    let thursday = new Date(d.getFullYear(), d.getMonth(), d.getDate() + (4 - d.getDay() ), 14, 30, 0, 0);
    thursday <= d? thursday.setDate(thursday.getDate() + 7) : null;
    return thursday;
}

function showRemaining() {
    var now = new Date();
    document.getElementById('next-season-date').innerHTML = nextSeasonStart.toLocaleString();
    document.getElementById('next-season-countdown').innerHTML = getCountdownText(nextSeasonStart, now);
    document.getElementById('next-series-date').innerHTML = nextSeriesStart.toLocaleString();
    document.getElementById('next-series-countdown').innerHTML = getCountdownText(nextSeriesStart, now);
}

// https://stackoverflow.com/a/9335296/608312
function getCountdownText(targetDate, now = Date()) {
    var difference = targetDate - now;
    var days = Math.floor(difference / _day);
    var hours = Math.floor((difference % _day) / _hour);
    var minutes = Math.floor((difference % _hour) / _minute);
    var seconds = Math.floor((difference % _minute) / _second);
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// Reference: https://forza.fandom.com/wiki/Forza_Horizon_5/Festival_Playlist
function showSeriesAndSeasonInfo(date = new Date()) {
    nextSeasonStart = getNextSeasonStart();

    var totalWeeks = weeksBetween(firstSeriesStart, date);
    var currentSeries = Math.ceil(totalWeeks / 4);
    var seasonIndex = (totalWeeks - 1) % 4;
    var nextSeasonIndex = totalWeeks % 4;
    var weeksRemainingInSeries = (4 - nextSeasonIndex) % 4;
    nextSeriesStart = addDays(nextSeasonStart, weeksRemainingInSeries * 7);

    document.getElementById('current-series-number').innerHTML = currentSeries;
    document.getElementById('current-series-name').innerHTML = seriesNames[currentSeries] || "Unannounced";
    document.getElementById('next-series-name').innerHTML = seriesNames[currentSeries + 1] || "Unannounced";
    document.getElementById('current-season-name').innerHTML = seasons[seasonIndex];
    document.getElementById('next-season-name').innerHTML = seasons[nextSeasonIndex];
}

// https://stackoverflow.com/a/22859920/608312
function weeksBetween(d1, d2) {
    return Math.ceil((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

// https://stackoverflow.com/a/19691491/608312
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
   