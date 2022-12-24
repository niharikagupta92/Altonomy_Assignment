import { useCallback, useEffect, useState } from "react";

const API_URL = 'https://api.binance.com/api/v3/depth?symbol=ETHUSDT';

const API_TIME_INTERVAL = 5000;

function App() {

  const [data, setData] = useState();

  // acts like componentDidMount - call once when the page is load
  useEffect(() => {
    const fetchData = async () => {
      // fetch is used for api call
      await fetch(API_URL)
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((e) => console.error(e));
    };

    fetchData();
    // call the api in certain interval to get the updated data
    const timer = setInterval(() => {
      fetchData();
    }, API_TIME_INTERVAL);

    // clean up the interval - acts like componentWillUnmount
    return () => clearInterval(timer);
  }, []);

  const renderContent = useCallback((data, priceClass) => {
    return (
      <div className="order-list-container">
        <div className="orderbook-list orderbook-ask">
          <div className="order-book-list-container">
            <div style={{height: 160, width: '100%'}}>
            {data.map((bid, i) => {
                const price = bid[0];
                const size = bid[1];
                return (
                  <div key={i} className="order-book-progress">
                    <div className="progress-container">
                      <div className="row-content">
                        <div className={`${priceClass} text`}>{parseFloat(price).toFixed(2)}</div>
                        <div className="text" style={{textAlign: 'center'}}>{parseFloat(size).toFixed(2)}</div>
                        <div className="text" style={{textAlign: 'right'}}>{20.925}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className="order-book">
      <div className="wrapper">
        <div className="order-book-text">Order Book</div>
        <div className="orderbook-table-header">
          <div className="content">
            <div className="item justify-content-flex-start">Price(USDT)</div>
            <div className="item justify-content-flex-end">Size(ETH)</div>
            <div className="item justify-content-flex-end">Sum(ETH)</div>
          </div>
        </div>
        {data?.bids && renderContent(data.bids, "ask-light")}
        {data?.asks && renderContent(data.asks, "bid-light")}
      </div>
    </div>
  );
}

export default App;
