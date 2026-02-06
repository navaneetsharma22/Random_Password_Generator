const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const btnAccess = document.querySelector("[data-grantAccess]");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const errorContainer = document.querySelector(".error-container");
const errorMessage = document.querySelector("[data-errorMessage]");

// Initially selected tab
let currentTab = userTab;
const API_KEY = "3d6b3bc817ad02eb2818c0ad867eb7c3";
currentTab.classList.add("current-tab");
getfromSessionStorage();

// ----------------- Switch Tab -----------------
function switchTab(newTab) {
    if (newTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = newTab;
        currentTab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")) {
            // show search form
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            errorContainer.classList.remove("active");
            searchForm.classList.add("active");
        } else {
            // back to user weather tab
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            errorContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => switchTab(userTab));
searchTab.addEventListener("click", () => switchTab(searchTab));

// ----------------- Session Storage -----------------
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantAccessContainer.classList.add("active");
    } else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

// ----------------- Fetch Weather (User Location) -----------------
async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;

    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");
    errorContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        loadingScreen.classList.remove("active");

        if (data.cod !== 200) {
            showErrorMessage(data.message || "Unable to fetch location weather");
            return;
        }

        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        loadingScreen.classList.remove("active");
        showErrorMessage("Network error. Please try again.");
        console.error("Error fetching user weather:", err);
    }
}

// ----------------- Render Weather Info -----------------
function renderWeatherInfo(weatherInfo) {
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temrature]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const clouds = document.querySelector("[data-cloudiness]");

    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/wn/${weatherInfo?.weather?.[0]?.icon}@2x.png`;

    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    clouds.innerText = `${weatherInfo?.clouds?.all}%`;
}

// ----------------- Geolocation -----------------
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation not supported by your browser");
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation);

// ----------------- Search Weather -----------------
const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value.trim();

    if (cityName === "") return;
    fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    errorContainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        loadingScreen.classList.remove("active");

        if (data.cod === "404") {
            showErrorMessage("City not found. Please try again");
            return;
        }

        if (data.cod !== 200) {
            showErrorMessage(data.message || "Something went wrong");
            return;
        }

        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        loadingScreen.classList.remove("active");
        showErrorMessage("Network error. Please try again.");
        console.error("Error fetching city weather:", err);
    }
}

// ----------------- Error Message Helper -----------------
function showErrorMessage(msg) {
    errorMessage.innerText = msg;
    errorContainer.classList.add("active");
}
