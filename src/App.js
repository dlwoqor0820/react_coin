import { useEffect, useState } from "react";

function App() {
    const [isSwap, setSwap] = useState(false);
    const [coins, setCoins] = useState([""]);
    const [cryptoData, setCryptoData] = useState({});
    const [amount, setAmount] = useState(0);

    const Dollor = () => {
        return (
            <div>
                <input
                    value={amount}
                    type="number"
                    onChange={converting}
                    disabled={isSwap}
                    placeholder={0}
                ></input>
                <span> Dollor</span>
            </div>
        );
    };

    const Coin = () => {
        return (
            <div>
                <input
                    value={amount}
                    type="number"
                    onChange={converting}
                    disabled={!isSwap}
                    placeholder={0}
                ></input>
                <span> {cryptoData ? cryptoData.symbol : "BTC"}</span>
            </div>
        );
    };

    const SwapBtn = () => {
        return (
            <div>
                <button onClick={swap}>Swap</button>
            </div>
        );
    };

    const swap = () => {
        setSwap(!isSwap);
    };

    const selectCoin = (e) => {
        const coinIndex = e.target.selectedIndex;
        setCryptoData({
            name: coins[coinIndex].name,
            symbol: coins[coinIndex].symbol,
            price: coins[coinIndex].quotes.USD.price,
        });
    };

    const converting = (e) => {
        const value = e.target.value;
        setAmount(value);
    };

    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers?limit=50")
            .then((res) => res.json())
            .then((json) => {
                setCoins(json);
                setCryptoData({
                    name: json[0].name,
                    symbol: json[0].symbol,
                    price: json[0].quotes.USD.price,
                });
            });
    }, []);

    return (
        <div>
            <h1>Coin Converter</h1>
            {coins !== "" ? (
                <div>
                    <select onChange={selectCoin}>
                        {coins.map((coin) => {
                            return (
                                <option>
                                    {coin.name} ({coin.symbol})
                                </option>
                            );
                        })}
                    </select>
                    <Dollor />
                    <SwapBtn />
                    <Coin />
                </div>
            ) : (
                <h3>Loading...</h3>
            )}
        </div>
    );
}

export default App;
