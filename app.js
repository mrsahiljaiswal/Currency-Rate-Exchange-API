const express = require('express');
const axios = require('axios');
const fs = require('fs');
const cors = require('cors'); // Import CORS middleware

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS
app.use(cors());

// Load the existing JSON data (your local file)
const currencyData = JSON.parse(fs.readFileSync('CurrencyDatabase.json', 'utf-8'));

// Create mappings from the loaded data
const currencySymbols = {};
const currencyCountryMapping = {};

currencyData.forEach(currency => {
    currencySymbols[currency.currencyCode] = currency.currencySymbol;
    currencyCountryMapping[currency.currencyCode] = {
        countryName: currency.countryName,
        countryCode: currency.countryCode
    };
});
app.get('/api/currency/:currencyCode', async (req, res) => {
    const currencyCode = req.params.currencyCode.toUpperCase();

    // Get currency details from your local JSON
    const currencyDetails = currencyData.find(currency => currency.currencyCode === currencyCode);
    
    if (!currencyDetails) {
        return res.status(404).json({ message: 'Currency not found' });
    }

    // Get country information and flag image
    const countryInfo = currencyCountryMapping[currencyCode] || { countryName: '', countryCode: '' };
    const flagUrl = `https://flagcdn.com/w320/${countryInfo.countryCode.toLowerCase()}.png`;

    // Fetch live currency rates from the external API
    try {
        const response = await axios.get(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyCode.toLowerCase()}.json`);

        // Log the API response to debug
        console.log('API Response:', response.data);

        // Access the currency rates
        const currencyRates = response.data; // Get all rates for the specified currency

        // Check if currencyRates is empty
        if (!currencyRates || Object.keys(currencyRates).length === 0) {
            return res.status(404).json({ message: 'No rates found for this currency' });
        }

        const combinedData = {
            currencyCode: currencyDetails.currencyCode,
            currencyName: currencyDetails.currencyName,
            currencySymbol: currencySymbols[currencyCode] || '',
            countryName: countryInfo.countryName,
            countryCode: countryInfo.countryCode,
            flagImage: flagUrl,
            rates: currencyRates // Include all rates
        };

        return res.json(combinedData);

    } catch (error) {
        console.error('Error fetching currency rates:', error.message);
        return res.status(500).json({ message: 'Error fetching currency rates' });
    }
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});