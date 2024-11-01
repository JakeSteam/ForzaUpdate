var firstSeriesStart = new Date(Date.UTC(2021, 10, 11, 14, 30, 0));
var nextSeasonStart;
var nextSeriesStart;
var seasons = [
    "Summer / Wet",
    "Autumn / Storm",
    "Winter / Dry",
    "Sprint / Hot"
];
var seriesNames = [
    { "name": "Welcome Week", "url": "https://forza.net/news/forza-horizon-5-early-access" },
    { "name": "Welcome to Mexico", "url": "https://forza.net/news/forza-horizon-5-now-available" },
    { "name": "Holiday Special", "url": "https://forza.net/news/forza-horizon-5-series-2" },
    { "name": "Happy New Year", "url": "https://forza.net/news/forza-horizon-5-series-3-update" },
    { "name": "Horizon World Cup", "url": "https://forza.net/news/forza-horizon-5-series-4-update" },
    { "name": "Horizon Rush Takeover", "url": "https://forza.net/news/forza-horizon-5-series-5-update" },
    { "name": "Horizon Customs", "url": "https://forza.net/news/forza-horizon-5-series-6-update" },
    { "name": "Cinco de Mayo", "url": "https://forza.net/news/forza-horizon-5-series-7-update" },
    { "name": "German Automotive Excellence", "url": "https://forza.net/news/forza-horizon-5-series-8" },
    { "name": "Hot Wheels", "url": "https://forza.net/news/forza-horizon-5-series-9" },
    { "name": "Extreme E", "url": "https://forza.net/news/forza-horizon-5-series-10" },
    { "name": "Rami's Racing History", "url": "https://forza.net/news/forza-horizon-5-ramis-racing-history" },
    { "name": "Horizon Road Trip", "url": "https://forza.net/news/forza-horizon-5-horizon-road-trip" },
    { "name": "Horizon 10-Year Anniversary", "url": "https://forza.net/news/forza-horizon-celebrating-a-decade-of-festivals" },
    { "name": "Donut Media", "url": "https://forza.net/news/forza-horizon-5-donut-media" },
    { "name": "Horizon Holidays", "url": "https://forza.net/news/forza-horizon-5-holidays" },
    { "name": "#FORDzathon", "url": "https://forza.net/news/forza-horizon-5-fordzathon" },
    { "name": "Japanese Automotive", "url": "https://forza.net/news/forza-horizon-5-japanese-automotive" },
    { "name": "Horizon Wilds Takeover", "url": "https://forza.net/news/forza-horizon-5-horizon-wilds-takeover" },
    { "name": "Midnights at Horizon", "url": "https://forza.net/news/forza-horizon-5-midnights" },
    { "name": "High Performance", "url": "https://forza.net/news/forza-horizon-5-high-performance" },
    { "name": "Explore the Horizon", "url": "https://forza.net/news/forza-horizon-5-explore-the-horizon" },
    { "name": "Upgrade Heroes", "url": "https://forza.net/news/forza-horizon-5-upgrade-heroes" },
    { "name": "Summer Party", "url": "https://forza.net/news/forza-horizon-5-summer-party" },
    { "name": "Italian Automotive", "url": "https://forza.net/news/forza-horizon-5-italian-automotive" },
    { "name": "Horizon Creatives", "url": "https://forza.net/news/forza-horizon-5-horizon-creatives" },
    { "name": "Día de Muertos", "url": "https://forza.net/news/forza-horizon-5-dia-de-muertos" },
    { "name": "American Automotive", "url": "https://forza.net/news/forza-horizon-5-american-automotive" },
    { "name": "Winter Wonderland", "url": "https://forza.net/news/Winter-Wonderland" },
    { "name": "Community Choice", "url": "https://forza.net/news/forza-horizon-5-Community-Choice" },
    { "name": "Lunar New Year", "url": "https://forza.net/news/forza-horizon-5-Lunar-New-Year" },
    { "name": "European Automotive", "url": "https://forza.net/news/forza-horizon-5-European-Auto" },
    { "name": "Horizon Race-Off", "url": "https://forza.net/news/forza-horizon-5-Horizon-Race-Off" },
    { "name": "Apex Allstars", "url": "https://forza.net/news/forza-horizon-5-Apex-AllStars" },
    { "name": "Horizon Retrowave", "url": "https://forza.net/news/forza-horizon-5-horizon-retrowave" },
    { "name": "Modern Horizons", "url": "https://forza.net/news/forza-horizon-5-modern-horizons" },
    { "name": "Horizon Cars and Coffee", "url": "https://forza.net/news/forza-horizon-5-cars-coffee" },
    { "name": "High-Performance Dailies", "url": "https://forza.net/news/forza-horizon-5-high-performance-dailies" },
    { "name": "Hidden Horizons", "url": "https://forza.net/news/forza-horizon-5-hidden-horizons" },
    { "name": "Back to the 90's", "url": "https://forza.net/news/forza-horizon-5-back-to-the-90s" },
    { "name": "Horizon Track Day", "url": "https://forza.net/news/forza-horizon-5-horizon-track-day" },
    { "name": "Horizon Holidays Mixup", "url": "https://forza.net/news/" }
];

window.addEventListener("load", function() {
    showSeriesAndSeasonInfo();
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
}, false);

// Reference: https://forza.fandom.com/wiki/Forza_Horizon_5/Festival_Playlist
function showSeriesAndSeasonInfo(date = new Date()) {
    nextSeasonStart = getNextSeasonStart();

    var totalWeeks = weeksBetween(firstSeriesStart, date);
    var currentSeries = Math.ceil(totalWeeks / 4);
    var seasonIndex = (totalWeeks - 1) % 4;
    var nextSeasonIndex = totalWeeks % 4;
    var weeksRemainingInSeries = (4 - nextSeasonIndex) % 4;
    nextSeriesStart = addDays(nextSeasonStart, weeksRemainingInSeries * 7);

    // Series
    document.getElementById('current-series-number').innerHTML = currentSeries;
    document.getElementById('current-series-link').innerHTML = seriesNames[currentSeries].name || "Unannounced";
    document.getElementById('current-series-link').href = seriesNames[currentSeries].url || "https://forza.net/news/";
    document.getElementById('next-series-link').innerHTML = seriesNames[currentSeries + 1].name || "Unannounced";
    document.getElementById('next-series-link').href = seriesNames[currentSeries + 1].url || "https://forza.net/news/";
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
