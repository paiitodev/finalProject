const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");

function searchDestination() {
    const input = document.getElementById("destinationInput").value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {

            if (input !== '') {
                if (input.includes('beach')) {
                    const beaches = data.beaches;
                    beaches.forEach(beach => {
                        resultDiv.innerHTML += `
                        <div class="result-item">
                        <div class="image-section"> 
                        <img src="${beach.imageUrl}" alt="${beach.name}">
                        </div><div class="text-section">
                        <h2>${beach.name}</h2>
                        <p>${beach.description}</p>
                        </div>
                        </div>`;
                    });
                }

                if (input.includes('temple')) {
                    const temples = data.temples;
                    temples.forEach(temple => {
                        resultDiv.innerHTML += `
                        <div class="result-item">
                        <div class="image-section"> 
                        <img src="${temple.imageUrl}" alt="${temple.name}">
                        </div><div class="text-section">
                        <h2>${temple.name}</h2>
                        <p>${temple.description}</p>
                        </div>
                        </div>`;
                    });
                }

                if (input.includes('country') || input.includes('countries')) {
                    const countries = data.countries;
                    countries.forEach(country => {
                        country.cities.forEach(city => {
                            resultDiv.innerHTML += `
                            <div class="result-item">
                            <div class="image-section"> 
                            <img src="${city.imageUrl}" alt="${city.name}">
                            </div><div class="text-section">
                            <h2>${city.name}</h2>
                            <p>${city.description}</p>
                            </div>
                            </div>`;
                        });
                    });
                }
            }

        })
        .catch(error => {
            console.log('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

btnSearch.addEventListener('click', searchDestination);

function resetSearch() {
    document.getElementById("destinationInput").value = "";
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}

document.getElementById('btnContact').addEventListener('click', function() {
    window.location.href = './travel_contact.html';
  });

btnClear.addEventListener("click", resetSearch);
