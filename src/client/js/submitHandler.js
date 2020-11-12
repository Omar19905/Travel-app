document.addEventListener('DOMContentLoaded', function () {
    let submit = document.querySelector("#submit")
    submit.addEventListener("click", citySubmit)
})


let result = document.querySelector(".result")

function citySubmit(event) {
    event.preventDefault()

    let city = document.querySelector('#destination').value

    // get the difference between the dates
    dateCountdown(document.querySelector('#date').value)


    // check what text was put into the form field

    const spinner = document.getElementById("spinner");
    spinner.removeAttribute('hidden');
    result.setAttribute('hidden', "");


    fetch("http://localhost:8081/weather", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: city
        })
    })
        .then(res => {
            return res.json()
        })
        .then(function (data) {
            console.log(data.data[0])

            // update trip city
            document.querySelector("#city").textContent = "Trip to: " + city.toUpperCase()

            // update weather
            document.querySelector("#weather-description").textContent =
                "Weather: " + data.data[0].weather.description
            // set weather icon
            document.querySelector("#weather-icon").setAttribute("src", `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`)
            document.querySelector("#high").textContent = "High: " + data.data[0].max_temp + " °C"
            document.querySelector("#low").textContent = "Low: " + data.data[0].low_temp + " °C"

            setPicture()

        })
        .catch(err => {
            alert("city not found")
            spinner.setAttribute('hidden', '');
        })
}

function setPicture() {
    let city = document.querySelector('#destination').value

    fetch("http://localhost:8081/picture", {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: city
        })
    })
        .then(res => {
            return res.json()
        })
        .then(function (data) {
            document.querySelector("#city-picture").setAttribute("src", data.hits[0].webformatURL)
            result.removeAttribute("hidden")
            spinner.setAttribute('hidden', '');
        })
        .catch(err => {
            spinner.setAttribute('hidden', '');
            result.removeAttribute("hidden")

        })

}

function dateCountdown(date) {
    let today = new Date()
    let selectedDate = new Date(date)

    let day = selectedDate.toLocaleString('default', {day: 'numeric'})
    let month = selectedDate.toLocaleString('default', {month: 'long'})
    let year = selectedDate.toLocaleString('default', {year: 'numeric'})

    let ms = selectedDate.getTime() - today.getTime();

    // ms to days
    let days = Math.ceil(ms / (1000 * 3600 * 24));

    //update ui for the date and countdown
    document.querySelector("#trip-date").textContent = "arrival date: " + month + " " + day + ", " + year
    console.log(selectedDate)
    document.querySelector("#countdown").textContent = "your trip in: " + days + " days"


}

export {citySubmit}
