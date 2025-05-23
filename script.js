const API_KEY = 'efed9c2093a5705aaedc7202';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;
  const resultDiv = document.getElementById('result');

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const response = await fetch(API_URL + from);
    const data = await response.json();

    if (data.result === 'error') {
      resultDiv.textContent = "Error fetching exchange rate.";
      return;
    }

    const rate = data.conversion_rates[to];
    const converted = (amount * rate).toFixed(2);
    resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    console.error(error);
    resultDiv.textContent = "Something went wrong. Please try again later.";
  }
}