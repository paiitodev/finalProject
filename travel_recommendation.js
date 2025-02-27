const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");

async function loadData() {
  try {
    const response = await fetch("travel_recommendation_api.json"); // Ruta al archivo JSON
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo JSON");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

// Función para manejar la búsqueda
async function handleSearch() {
  // Obtener la entrada del usuario
  const userInput = document.getElementById("destinationInput").value.toLowerCase();

  // Limpiar resultados anteriores
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  // Cargar los datos JSON
  const data = await loadData();
  if (!data) {
    resultsContainer.innerHTML = "<p>Error al cargar los datos.</p>";
    return;
  }

  // Determinar la categoría basada en la entrada del usuario
  let category;
  if (userInput === "beach" || userInput === "beaches") {
    category = "beaches";
  } else if (userInput === "temple" || userInput === "temples") {
    category = "temples";
  } else if (userInput === "country" || userInput === "countries") {
    category = "countries";
  } else {
    resultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  // Obtener las recomendaciones de la categoría seleccionada
  const recommendations = data[category];

  // Mostrar las recomendaciones
  if (recommendations && recommendations.length > 0) {
    recommendations.forEach((item) => {
      let itemHTML;
      if (category === "countries") {
        // Mostrar ciudades para países
        item.cities.forEach((city) => {
          itemHTML = `
            <div class="searchDestination">
              <img src="${city.imageUrl}" alt="${city.name}">
              <h3>${city.name}</h3>
              <p>${city.description}</p>
            </div>
          `;
          resultsContainer.innerHTML += itemHTML;
        });
      } else {
        // Mostrar templos o playas
        itemHTML = `
          <div class="recommendation">
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        `;
        resultsContainer.innerHTML += itemHTML;
      }
    });
  } else {
    resultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
  }
}

// Función para limpiar los resultados
function clearResults() {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // Borra el contenido del contenedor
}

// Asignar funciones a los botones

btnSearch.addEventListener("click", handleSearch);
btnClear.addEventListener("click", clearResults);
