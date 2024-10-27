const apiKey = '90e871f0f90f2103412ad407e5da92b4'; // aici am cheia mea API

async function getWeather() {
    const city = 'Iași';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Ia%C8%99i&appid=${apiKey}&units=metric&lang=ro`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Ia%C8%99i&appid=${apiKey}&units=metric&lang=ro`;

    try {
        // Obțin vremea curentă
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) {
            throw new Error(`Eroare: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        document.getElementById('city').innerText = `Orașul: ${data.name}`;
        document.getElementById('temperature').innerText = `Temperatura: ${data.main.temp} °C`;
        document.getElementById('description').innerText = `Descriere: ${data.weather[0].description}`;

        // Obțin prognoza pentru următoarele zile
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error(`Eroare: ${forecastResponse.status} ${forecastResponse.statusText}`);
        }

        const forecastData = await forecastResponse.json();
        const dailyForecasts = forecastData.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));
        
        // Actualizez prognoza pe zile
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = ''; // Curăț forecast-ul anterior

        dailyForecasts.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'short' });
            const temp = day.main.temp;
            const description = day.weather[0].description;

            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <p>${date}</p>
                <p>${temp} °C</p>
                <p>${description}</p>
            `;

            forecastContainer.appendChild(forecastItem);
        });
    } catch (error) {
        console.error("Detalii eroare:", error);
        alert("A apărut o eroare la obținerea datelor meteo. Verifică consola pentru detalii.");
    }
}
