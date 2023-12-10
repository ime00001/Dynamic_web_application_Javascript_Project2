document.addEventListener('DOMContentLoaded', function () {
    const fetchDataBtn = document.getElementById('fetchDataBtn');
  
    fetchDataBtn.addEventListener('click', function () {
      const stationInput = document.getElementById('stationInput');
      const searchInput = document.getElementById('searchInput');
      
      const stationName = stationInput.value.trim();
      const searchString = searchInput.value.trim();
  
      if (stationName) {
        fetchData(stationName, searchString);
      } else {
        alert('Please enter a station name.');
      }
    });
  });
  
  function fetchData(stationName, searchString) {
    const apiUrl = `https://rata.digitraffic.fi/api/v1/live-trains?station=${stationName}`;
  
    // Making the AJAX call
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        displayResults(data, searchString);
      } else {
        alert('Failed to fetch data. Please try again.');
      }
    };
  
    xhr.onerror = function () {
      alert('Failed to fetch data. Please try again.');
    };
  
    xhr.send();
  }
  
  function displayResults(data, searchString) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    if (data && data.length > 0) {
      data.forEach(train => {
        // Check if the train information matches the search string
        if (
          searchString === '' ||
          train.trainNumber.includes(searchString) ||
          train.destination.includes(searchString)
        ) {
          const trainInfo = document.createElement('div');
          trainInfo.className = 'train-info';
  
          trainInfo.innerHTML = `
            <p><strong>Train ID:</strong> ${train.trainNumber}</p>
            <p><strong>Departure Time:</strong> ${train.departureDate}</p>
            <p><strong>Destination:</strong> ${train.trainType} - ${train.destination}</p>
            <hr>
          `;
  
          resultsContainer.appendChild(trainInfo);
        }
      });
    } else {
      resultsContainer.innerHTML = '<p>No train data available for the selected station.</p>';
    }
  }
  