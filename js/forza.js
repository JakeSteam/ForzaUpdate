var firstSeriesStart = new Date(Date.UTC(2026, 5, 21, 14, 30, 0));
var nextSeasonStart;
var nextSeriesStart;
var seasons = [
    "Summer",
    "Autumn",
    "Winter",
    "Sprint"
];
var seriesNames = [
    { "name": "Welcome to Japan", "url": "https://forza.net/news/forza-horizon-6-series-1" },
    { "name": "Horizon Decades", "url": "https://forza.net/" }
];

window.addEventListener("load", function() {
    showSeriesAndSeasonInfo();
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
}, false);

// Reference: https://forza.fandom.com/wiki/Forza_Horizon_6/Festival_Playlist
function showSeriesAndSeasonInfo(date = new Date()) {
    nextSeasonStart = getNextSeasonStart();

    var totalWeeks = weeksBetween(firstSeriesStart, date);
    var currentSeries = Math.ceil(totalWeeks / 4);
    var seasonIndex = (totalWeeks - 1) % 4;
    var nextSeasonIndex = totalWeeks % 4;
    var weeksRemainingInSeries = (4 - nextSeasonIndex) % 4;
    nextSeriesStart = addDays(nextSeasonStart, weeksRemainingInSeries * 7);

    // Series
    const defaultSeriesInfo = seriesNames[seriesNames.length - 1];
    document.getElementById('current-series-number').innerHTML = currentSeries;
    
    const currentSeriesInfo = seriesNames[currentSeries] || defaultSeriesInfo;
    document.getElementById('current-series-link').innerHTML = currentSeriesInfo.name;
    document.getElementById('current-series-link').href = currentSeriesInfo.url;
    
    const nextSeriesInfo = seriesNames[currentSeries + 1] || defaultSeriesInfo;
    document.getElementById('next-series-link').innerHTML = nextSeriesInfo.name;
    document.getElementById('next-series-link').href = nextSeriesInfo.url;
    
    document.getElementById('next-series-date').innerHTML = nextSeriesStart.toLocaleString();

    // Season
    document.getElementById('current-season-name').innerHTML = seasons[seasonIndex];
    document.getElementById('next-season-name').innerHTML = seasons[nextSeasonIndex];
    document.getElementById('next-season-date').innerHTML = nextSeasonStart.toLocaleString();
}

function updateCountdowns() {
    var now = new Date();
    document.getElementById('next-season-countdown').innerHTML = getCountdownText(nextSeasonStart, now);
    document.getElementById('next-series-countdown').innerHTML = getCountdownText(nextSeriesStart, now);
}

// Utils //

// https://stackoverflow.com/a/65869347/608312
function getNextSeasonStart(d = new Date()) {
    let thursday = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() + (4 - d.getDay()), 14, 30, 0, 0));
    thursday <= d ? thursday.setDate(thursday.getDate() + 7) : null;
    return thursday;
}


// https://stackoverflow.com/a/9335296/608312
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
function getCountdownText(targetDate, now = Date()) {
    var difference = targetDate - now;
    var days = Math.floor(difference / _day);
    var hours = Math.floor((difference % _day) / _hour);
    var minutes = Math.floor((difference % _hour) / _minute);
    var seconds = Math.floor((difference % _minute) / _second);
    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
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
