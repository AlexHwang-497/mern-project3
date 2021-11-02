import { useEffect,useState } from "react"
import config from "./config"

const FetchStockPrice= ()=>{
    // console.log('this is the api key in fetchStock',api)
    
    // const url = `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?from=${startDate}&to=${endDate}&apikey=${api}`
    
    // const response = await fetch(url)
    // console.log('this is response in fetchLatest',response)
    // if(!response.ok){
        //     throw new Error('Something went wrong!!!')
        // }
        // const responseData = await response.json()
        // console.log(responseData)
        // const loadQuote =[]
        
        // for(const key in responseData){
            //     loadQuote.push({
                //         symbol:responseData.symbol,
                //         currentPrice:responseData.historical[0].date
                //     })
                // }
                // console.log('loadQuote',loadQuote)
    const apiKey = config.FMP_API_KEY_ID
    const startDate='2000-10-21'
    const endDate='2021-10-25'
                
    const [stockList, setStockList] = useState(['AAPL','AMZN','GOOG','NFLX'])
    const [stockData,editStockData] = useState([])

    
    useEffect(() => {
        Promise.all(
        stockList.map((stock) =>
        fetch(
        `https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?from=${startDate}&to=${endDate}&apikey=${apiKey}`
        )
        )
        ).then((results) =>
        Promise.all(results.map((res) => res.json())).then((stocks) => {
        editStockData(stocks);
        })
        );
        }, []);


    useEffect(()=> {
        if(stockData.length===0) return;
        for(let j=0;j<stockList.length;j++){

            const historicalData = stockData[j].historical
            // console.log(historicalData)
            
            let sum = 0
            for(let i=1; i<20;i++){
                let cumReturn = historicalData[i].adjClose/historicalData[i-1].adjClose-1
                // console.log(cumReturn)
                sum +=cumReturn
    
            }
            let average = sum/19
            console.log('stockList[j]',j,'average:', average)
        }



    },[stockData])


    




        


    return (
        <div>

            <h1>this is the stockData:</h1>

        </div>
    )

}
export default FetchStockPrice

