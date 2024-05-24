document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('weather-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const city = document.getElementById('city').value;
        getWeather(city);
    });
    
    function getWeather(city) {
        const apiKey = '364933eca37b414392f210823242405'; // Remplacez 'YOUR_API_KEY' par votre clé d'API WeatherAPI
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Une erreur s\'est produite lors de la récupération des données météorologiques.');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.current && data.current.temp_c) {
                    const temperature = data.current.temp_c;
                    const location = data.location.name;
                    const description = data.current.condition.text;
    
                    const weatherInfo = document.getElementById('weather-info');
                    weatherInfo.innerHTML = `
                        <h2>Météo à ${location}</h2>
                        <p>Température: ${temperature}°C</p>
                        <p>Description: ${description}</p>
                    `;
                    weatherInfo.style.display = 'block';
                } else {
                    throw new Error('Les données météorologiques ne contiennent pas les informations attendues.');
                }
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la récupération des données météorologiques:', error.message);
                const weatherInfo = document.getElementById('weather-info');
                weatherInfo.innerHTML = `<p>Impossible de récupérer les données météorologiques pour ${city}. Veuillez réessayer.</p>`;
                weatherInfo.style.display = 'block';
            });
    }
    
});