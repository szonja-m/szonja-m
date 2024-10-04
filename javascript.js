console.log("JavaScript file loaded successfully!");

document.getElementById('fetch-button').addEventListener('click', function() {
    // API endpoint for getting Bitcoin market data
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update the highlight box with Bitcoin market data
            const apiResultElement = document.getElementById('api-result');

            if (data && data.length > 0) {
                const bitcoinData = data[0]; // Get the first result
                apiResultElement.innerHTML = `
                    <strong>1 Bitcoin=</strong> ${bitcoinData.current_price} USD <br>
                    <strong>24 órás forgalom:</strong> ${bitcoinData.total_volume} USD <br>
                    <strong>Piaci kapitalizáció:</strong> ${bitcoinData.market_cap} USD
                `;
            } else {
                apiResultElement.textContent = 'No data found.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('api-result').textContent = 'Failed to load data.';
        });
});
