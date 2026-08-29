function checkWeather() {
    try {
        const cityRef = document.querySelector("#cityName");
        const divRef = document.querySelector("#Weather");

        if (!cityRef || !divRef) {
            throw new Error("City input or weather output element was not found.");
        }

        const city = cityRef.value.trim();

        if (!city) {
            divRef.innerHTML = "Please enter a city name.";
            return;
        }

        fetch(`https://p2pclouds.up.railway.app/v1/learn/weather?city=${encodeURIComponent(city)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);

                const temp = data?.current?.temp_c;
                const cityName = data?.location?.name;
                const region = data?.location?.region;
                const country = data?.location?.country;

                if (temp === undefined || !cityName) {
                    throw new Error("Weather data is missing or invalid.");
                }

                divRef.innerHTML = `The Temperature of ${cityName} - ${region || ""} - ${country || ""} is ${temp} Degree Celsius`;
            })
            .catch((error) => {
                console.log(error);
                divRef.innerHTML = "Something went wrong. Please try again.";
            });
    } catch (error) {
        console.log(error);
        alert("Something went wrong. Try again.");
    }
}

// JSON example
const person = {
    name: "muzammil",
    age: 20,
    courses: ["yup"],
};

console.log(JSON.stringify(person));

