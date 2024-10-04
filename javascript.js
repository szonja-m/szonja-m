console.log("JavaScript file loaded successfully!");

document.getElementById('fetch-button').addEventListener('click', function() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const apiResultElement = document.getElementById('api-result');

            if (data && data.length > 0) {
                const bitcoinData = data[0];
                apiResultElement.innerHTML = `
                    <strong>1 Bitcoin=</strong> ${bitcoinData.current_price} USD <br>
                    <strong>24 órás forgalom:</strong> ${bitcoinData.total_volume} USD <br>
                    <strong>Piaci kapitalizáció:</strong> ${bitcoinData.market_cap} USD
                `;
            } else {
                apiResultElement.textContent = 'Sajnálom, nem talált eredményt';
            }
        })
        .catch(error => {
            console.error('Sajnálom, hibába ütközött: ', error);
            document.getElementById('api-result').textContent = 'Sajnálom, nem sikerült lekérdezni';
        });
});
