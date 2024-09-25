# Currency Rate Exchange API

### [Access the Currency Data API](https://currency-rate-exchange-api.onrender.com/inr)

This API delivers detailed information on over 200 global currencies, including:

- Currency code (ISO)
- Currency name
- Currency symbol
- Associated country name and code
- National flag image of the associated country
- Current exchange rates

## Sample Output

### `GET /inr`

```json
{
    "currencyCode": "INR",
    "currencyName": "Indian Rupee",
    "currencySymbol": "₹",
    "countryName": "India",
    "countryCode": "IN",
    "flagImage": "https://flagcdn.com/w320/in.png",
    "rates": {
        "date": "2024-09-25",
        "inr": {
            "1000sats": 38.11256604,
            "1inch": 0.039452258,
            "ada": 0.030587888,
            "eur": 0.010692011,
            "usd": 0.011963938,
        
            // Over 200 currencies available
        }
    }
}

```


## Features

- **Free to use**
- **Unlimited API requests**
- **Supports over 200 exisiting currencies**
- **Currency Codes and Names**: Access detailed data of global currencies, including their official ISO codes, name and symbols, name and code of the country associated with that particular curriencies.
- **National Flags**: Get the flag png images of the countries associated with each currency.
- **Exchange Rates**: Access up-to-date exchange rate information.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: JSON file for static data storage
- **API**: FlagCDN API for flag images


## API Endpoints

### `/{currencycode}`

This endpoint returns the complete information of the currency in JSON format.

### `Sample Endpoint: inr , usd  , asd , amd`


## Usage Guide

### **Example:** Get the currency info with INR as base currency

### https://currency-rate-exchange-api.onrender.com/inr 
 

### **Sample response:**
```json
{
    "currencyCode": "INR",
    "currencyName": "Indian Rupee",
    "currencySymbol": "₹",
    "countryName": "India",
    "countryCode": "IN",
    "flagImage": "https://flagcdn.com/w320/in.png",
    "rates": {
        "date": "2024-09-25",
        "inr": {
            "1000sats": 38.11256604,
            "1inch": 0.039452258,
            "ada": 0.030587888,
            "eur": 0.010692011,
            "usd": 0.011963938,
        
            // Over 200 currencies available
        }
    }
}

```
### **Example:** Incase of Invalid Endpoints  

### **Sample response:**
```json
{
    "message": "Currency not found"
}

```




## Security

- The `app.js` and `currencyDatabase.json` are hidden and protected from public access. Only the API and static files are served to users.

## License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this API, provided that proper credit is given to the original author. 

For more information, see the [LICENSE](LICENSE) file.

---

### [Click to access the API](https://currency-rate-exchange-api.onrender.com/inr)


