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

const currencySymbols = {
    "AUD": "A$", "AED": "د.إ", "ALL": "L", "AMD": "֏", "ANG": "ƒ", "AOA": "Kz", 
    "ARS": "$", "AWG": "ƒ", "AZN": "₼", "BAM": "KM", "BBD": "$", "BDT": "৳", 
    "BGN": "лв", "BHD": ".د.ب", "BMD": "$", "BND": "$", "BOB": "Bs.", "BRL": "R$", 
    "BSD": "$", "BTN": "Nu.", "BWP": "P", "BYN": "Br", "BZD": "$", "CAD": "$", 
    "CHF": "Fr.", "CLP": "$", "CNY": "¥", "COP": "$", "CRC": "₡", "CVE": "$", 
    "CZK": "Kč", "DJF": "Fdj", "DKK": "kr", "DOP": "$", "DZD": "دج", "EUR": "€", 
    "EGP": "£", "ETB": "Br", "FJD": "$", "FKP": "£", "GBP": "£", "GEL": "₾", 
    "GGP": "£", "GHS": "₵", "GIP": "£", "GMD": "D", "GNF": "FG", "GTQ": "Q", 
    "GYD": "$", "HKD": "$", "HNL": "L", "HRK": "kn", "HTG": "G", "HUF": "Ft", 
    "INR": "₹", "IDR": "Rp", "ILS": "₪", "IMP": "£", "ISK": "kr", "JEP": "£", 
    "JMD": "$", "JOD": "د.ا", "JPY": "¥", "KES": "KSh", "KGS": "с", "KHR": "៛", 
    "KMF": "CF", "KRW": "₩", "KWD": "د.ك", "KYD": "$", "KZT": "₸", "LAK": "₭", 
    "LBP": "ل.ل", "LKR": "Rs", "LRD": "$", "LSL": "L", "MXN": "$", "MAD": "د.م.", 
    "MDL": "L", "MGA": "Ar", "MKD": "ден", "MMK": "K", "MNT": "₮", "MOP": "P", 
    "MRU": "UM", "MUR": "₨", "MVR": ".ރ", "MWK": "MK", "MYR": "RM", "MZN": "MT", 
    "NAD": "$", "NGN": "₦", "NIO": "C$", "NOK": "kr", "NPR": "Rs", "NZD": "$", 
    "OMR": "ر.ع.", "PAB": "B/.", "PEN": "S/", "PGK": "K", "PHP": "₱", "PKR": "₨", 
    "PLN": "zł", "PYG": "₲", "QAR": "ر.ق", "RON": "lei", "RSD": "дин.", "RUB": "₽", 
    "RWF": "FRw", "SAR": "ر.س", "SBD": "$", "SCR": "₨", "SEK": "kr", "SGD": "$", 
    "SHP": "£", "SLL": "Le", "SRD": "$", "SVC": "$", "SZL": "L", "THB": "฿", 
    "TJS": "ЅМ", "TMT": "T", "TND": "د.ت", "TOP": "T$", "TRY": "₺", "TTD": "$", 
    "TWD": "$", "TZS": "Sh", "USD": "$", "UAH": "₴", "UGX": "USh", "UYU": "$U", 
    "UZS": "сум", "VND": "₫", "VUV": "VT", "WST": "T", "XAF": "FCFA", "XCD": "$", 
    "XOF": "CFA", "XPF": "₣", "ZAR": "R", "ZMW": "ZK"
    // Add other currency symbols here
};


const currencyCountryMapping = {
    "AUD": {"countryName": "Australia", "countryCode": "AU"},
    "AED": {"countryName": "United Arab Emirates", "countryCode": "AE"},
    "ALL": {"countryName": "Albania", "countryCode": "AL"},
    "AMD": {"countryName": "Armenia", "countryCode": "AM"},
    "ANG": {"countryName": "Netherlands Antilles", "countryCode": "AN"},
    "AOA": {"countryName": "Angola", "countryCode": "AO"},
    "ARS": {"countryName": "Argentina", "countryCode": "AR"},
    "AWG": {"countryName": "Aruba", "countryCode": "AW"},
    "AZN": {"countryName": "Azerbaijan", "countryCode": "AZ"},
    "BAM": {"countryName": "Bosnia and Herzegovina", "countryCode": "BA"},
    "BBD": {"countryName": "Barbados", "countryCode": "BB"},
    "BDT": {"countryName": "Bangladesh", "countryCode": "BD"},
    "BGN": {"countryName": "Bulgaria", "countryCode": "BG"},
    "BHD": {"countryName": "Bahrain", "countryCode": "BH"},
    "BMD": {"countryName": "Bermuda", "countryCode": "BM"},
    "BND": {"countryName": "Brunei", "countryCode": "BN"},
    "BOB": {"countryName": "Bolivia", "countryCode": "BO"},
    "BRL": {"countryName": "Brazil", "countryCode": "BR"},
    "BSD": {"countryName": "Bahamas", "countryCode": "BS"},
    "BTN": {"countryName": "Bhutan", "countryCode": "BT"},
    "BWP": {"countryName": "Botswana", "countryCode": "BW"},
    "BYN": {"countryName": "Belarus", "countryCode": "BY"},
    "BZD": {"countryName": "Belize", "countryCode": "BZ"},
    "CAD": {"countryName": "Canada", "countryCode": "CA"},
    "CHF": {"countryName": "Switzerland", "countryCode": "CH"},
    "CLP": {"countryName": "Chile", "countryCode": "CL"},
    "CNY": {"countryName": "China", "countryCode": "CN"},
    "COP": {"countryName": "Colombia", "countryCode": "CO"},
    "CRC": {"countryName": "Costa Rica", "countryCode": "CR"},
    "CVE": {"countryName": "Cape Verde", "countryCode": "CV"},
    "CZK": {"countryName": "Czech Republic", "countryCode": "CZ"},
    "DJF": {"countryName": "Djibouti", "countryCode": "DJ"},
    "DKK": {"countryName": "Denmark", "countryCode": "DK"},
    "DOP": {"countryName": "Dominican Republic", "countryCode": "DO"},
    "DZD": {"countryName": "Algeria", "countryCode": "DZ"},
    "EUR": {"countryName": "European Union", "countryCode": "EU"},
    "EGP": {"countryName": "Egypt", "countryCode": "EG"},
    "ETB": {"countryName": "Ethiopia", "countryCode": "ET"},
    "FJD": {"countryName": "Fiji", "countryCode": "FJ"},
    "FKP": {"countryName": "Falkland Islands", "countryCode": "FK"},
    "GBP": {"countryName": "United Kingdom", "countryCode": "GB"},
    "GEL": {"countryName": "Georgia", "countryCode": "GE"},
    "GGP": {"countryName": "Guernsey", "countryCode": "GG"},
    "GHS": {"countryName": "Ghana", "countryCode": "GH"},
    "GIP": {"countryName": "Gibraltar", "countryCode": "GI"},
    "GMD": {"countryName": "Gambia", "countryCode": "GM"},
    "GNF": {"countryName": "Guinea", "countryCode": "GN"},
    "GTQ": {"countryName": "Guatemala", "countryCode": "GT"},
    "GYD": {"countryName": "Guyana", "countryCode": "GY"},
    "HKD": {"countryName": "Hong Kong", "countryCode": "HK"},
    "HNL": {"countryName": "Honduras", "countryCode": "HN"},
    "HRK": {"countryName": "Croatia", "countryCode": "HR"},
    "HTG": {"countryName": "Haiti", "countryCode": "HT"},
    "HUF": {"countryName": "Hungary", "countryCode": "HU"},
    "INR": {"countryName": "India", "countryCode": "IN"},
    "IDR": {"countryName": "Indonesia", "countryCode": "ID"},
    "ILS": {"countryName": "Israel", "countryCode": "IL"},
    "IMP": {"countryName": "Isle of Man", "countryCode": "IM"},
    "ISK": {"countryName": "Iceland", "countryCode": "IS"},
    "JEP": {"countryName": "Jersey", "countryCode": "JE"},
    "JMD": {"countryName": "Jamaica", "countryCode": "JM"},
    "JOD": {"countryName": "Jordan", "countryCode": "JO"},
    "JPY": {"countryName": "Japan", "countryCode": "JP"},
    "KES": {"countryName": "Kenya", "countryCode": "KE"},
    "KGS": {"countryName": "Kyrgyzstan", "countryCode": "KG"},
    "KHR": {"countryName": "Cambodia", "countryCode": "KH"},
    "KMF": {"countryName": "Comoros", "countryCode": "KM"},
    "KRW": {"countryName": "South Korea", "countryCode": "KR"},
    "KWD": {"countryName": "Kuwait", "countryCode": "KW"},
    "KYD": {"countryName": "Cayman Islands", "countryCode": "KY"},
    "KZT": {"countryName": "Kazakhstan", "countryCode": "KZ"},
    "LAK": {"countryName": "Laos", "countryCode": "LA"},
    "LBP": {"countryName": "Lebanon", "countryCode": "LB"},
    "LKR": {"countryName": "Sri Lanka", "countryCode": "LK"},
    "LRD": {"countryName": "Liberia", "countryCode": "LR"},
    "LSL": {"countryName": "Lesotho", "countryCode": "LS"},
    "MXN": {"countryName": "Mexico", "countryCode": "MX"},
    "MAD": {"countryName": "Morocco", "countryCode": "MA"},
    "MDL": {"countryName": "Moldova", "countryCode": "MD"},
    "MGA": {"countryName": "Madagascar", "countryCode": "MG"},
    "MKD": {"countryName": "North Macedonia", "countryCode": "MK"},
    "MMK": {"countryName": "Myanmar", "countryCode": "MM"},
    "MNT": {"countryName": "Mongolia", "countryCode": "MN"},
    "MOP": {"countryName": "Macau", "countryCode": "MO"},
    "MRU": {"countryName": "Mauritania", "countryCode": "MR"},
    "MUR": {"countryName": "Mauritius", "countryCode": "MU"},
    "MVR": {"countryName": "Maldives", "countryCode": "MV"},
    "MWK": {"countryName": "Malawi", "countryCode": "MW"},
    "MYR": {"countryName": "Malaysia", "countryCode": "MY"},
    "MZN": {"countryName": "Mozambique", "countryCode": "MZ"},
    "NAD": {"countryName": "Namibia", "countryCode": "NA"},
    "NGN": {"countryName": "Nigeria", "countryCode": "NG"},
    "NIO": {"countryName": "Nicaragua", "countryCode": "NI"},
    "NOK": {"countryName": "Norway", "countryCode": "NO"},
    "NPR": {"countryName": "Nepal", "countryCode": "NP"},
    "NZD": {"countryName": "New Zealand", "countryCode": "NZ"},
    "OMR": {"countryName": "Oman", "countryCode": "OM"},
    "PAB": {"countryName": "Panama", "countryCode": "PA"},
    "PEN": {"countryName": "Peru", "countryCode": "PE"},
    "PGK": {"countryName": "Papua New Guinea", "countryCode": "PG"},
    "PHP": {"countryName": "Philippines", "countryCode": "PH"},
    "PKR": {"countryName": "Pakistan", "countryCode": "PK"},
    "PLN": {"countryName": "Poland", "countryCode": "PL"},
    "PYG": {"countryName": "Paraguay", "countryCode": "PY"},
    "QAR": {"countryName": "Qatar", "countryCode": "QA"},
    "RON": {"countryName": "Romania", "countryCode": "RO"},
    "RSD": {"countryName": "Serbia", "countryCode": "RS"},
    "RUB": {"countryName": "Russia", "countryCode": "RU"},
    "RWF": {"countryName": "Rwanda", "countryCode": "RW"},
    "SAR": {"countryName": "Saudi Arabia", "countryCode": "SA"},
    "SBD": {"countryName": "Solomon Islands", "countryCode": "SB"},
    "SCR": {"countryName": "Seychelles", "countryCode": "SC"},
    "SEK": {"countryName": "Sweden", "countryCode": "SE"},
    "SGD": {"countryName": "Singapore", "countryCode": "SG"},
    "SHP": {"countryName": "Saint Helena", "countryCode": "SH"},
    "SLL": {"countryName": "Sierra Leone", "countryCode": "SL"},
    "SRD": {"countryName": "Suriname", "countryCode": "SR"},
    "SVC": {"countryName": "El Salvador", "countryCode": "SV"},
    "SZL": {"countryName": "Eswatini", "countryCode": "SZ"},
    "THB": {"countryName": "Thailand", "countryCode": "TH"},
    "TJS": {"countryName": "Tajikistan", "countryCode": "TJ"},
    "TMT": {"countryName": "Turkmenistan", "countryCode": "TM"},
    "TND": {"countryName": "Tunisia", "countryCode": "TN"},
    "TOP": {"countryName": "Tonga", "countryCode": "TO"},
    "TRY": {"countryName": "Turkey", "countryCode": "TR"},
    "TTD": {"countryName": "Trinidad and Tobago", "countryCode": "TT"},
    "TWD": {"countryName": "Taiwan", "countryCode": "TW"},
    "TZS": {"countryName": "Tanzania", "countryCode": "TZ"},
    "USD": {"countryName": "United States", "countryCode": "US"},
    "UAH": {"countryName": "Ukraine", "countryCode": "UA"},
    "UGX": {"countryName": "Uganda", "countryCode": "UG"},
    "UYU": {"countryName": "Uruguay", "countryCode": "UY"},
    "UZS": {"countryName": "Uzbekistan", "countryCode": "UZ"},
    "VND": {"countryName": "Vietnam", "countryCode": "VN"},
    "VUV": {"countryName": "Vanuatu", "countryCode": "VU"},
    "WST": {"countryName": "Samoa", "countryCode": "WS"},
    "XAF": {"countryName": "Central African CFA", "countryCode": "CF"},
    "XCD": {"countryName": "East Caribbean Dollar", "countryCode": "XC"},
    "XOF": {"countryName": "West African CFA", "countryCode": "XF"},
    "XPF": {"countryName": "CFP Franc", "countryCode": "PF"},
    "ZAR": {"countryName": "South Africa", "countryCode": "ZA"},
    "ZMW": {"countryName": "Zambia", "countryCode": "ZM"}

};
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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});