// Fetch the currency data and display it
fetch('/api/currencies')
    .then(response => response.json())
    .catch(error => console.error('Error fetching currency data:', error));