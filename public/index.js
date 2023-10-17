function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

async function main() {
   //let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=30min&outputsize=24&apikey=da6a5d47b41d40798b7c1721b4fb19e3')
    //let results = await response.json();
    //console.log(results)
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //let GME = result.GME;
    //let MSFT = result.MSFT;
    //let DIS = result.DIS;
    //let BNTX = result.BNTX;

    const {GME, MSFT, DIS, BNTX} = mockData;

    const stocks = [GME, MSFT, DIS, BNTX];

    stocks.forEach(stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.reverse().map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),           
        }))
    },
   
}); 

    function getHighestValue(values){
        let highestValue = 0;
        console.log(values)
        for (let i = 0; i < values.length; i++) {
            if (highestValue < values[i].high)
            highestValue = values[i].high
        }
        return highestValue;
    }

new Chart(highestPriceChartCanvas.getContext('2d'), {
    type: 'bar',
    data: {
        labels: stocks.map((stock => stock.meta.symbol)),
        datasets: [{
            label: 'Highest',
            data: stocks.map(stock => getHighestValue(stock.values)),
            backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
            borderColor: stocks.map(stock => getColor(stock.meta.symbol)),           
        }]
    }
})
}

main()