import { useEffect, useState } from "react";

const App = () => {
    const [coins, setCoins] = useState([]);
    const [cryptoData, setCryptoData] = useState({});
    const [isSwaped, setIsSwaped] = useState(false);
    const [current, setCurrent] = useState();
    const [value, setValue] = useState("");

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

    const onSwapClick = () => {
        setIsSwaped((prev) => !prev);
        reset();
    };

    const onSelectChange = (e) => {
        const index = e.target.selectedIndex;
        setCryptoData({
            name: coins[index].name,
            symbol: coins[index].symbol,
            price: coins[index].quotes.USD.price,
        });
        setCurrent(`${coins[index].name} (${coins[index].symbol})`);
        reset();
    };

    const onConvertChange = (e) => {
        setValue(e.target.value);
    };

    const reset = () => {
        setValue("");
    };

    const SwapBtn = () => {
        return <button onClick={onSwapClick}>Swap</button>;
    };

    const SelectBar = () => {
        return (
            <select
                onChange={onSelectChange}
                value={current ? current : null}
            >
                {coins.map((coin) => {
                    return (
                        <option key={coin.id}>
                            {coin.name} ({coin.symbol})
                        </option>
                    );
                })}
            </select>
        );
    };

    return (
        <div>
            <h1>Coin Converter</h1>
            <hr></hr>
            <SelectBar />
            <hr></hr>
            <div>
                <input
                    type="number"
                    onChange={onConvertChange}
                    disabled={isSwaped}
                    value={isSwaped ? value * cryptoData.price : value}
                    placeholder={0}
                ></input>
                <span> Dollor</span>
            </div>
            <SwapBtn setIsSwaped={setIsSwaped} />
            <div>
                <input
                    type="number"
                    onChange={onConvertChange}
                    disabled={!isSwaped}
                    value={isSwaped ? value : value / cryptoData.price}
                    placeholder={0}
                ></input>
                <span> {cryptoData.symbol}</span>
            </div>
        </div>
    );
};

export default App;
