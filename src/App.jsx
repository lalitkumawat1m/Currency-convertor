import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [adjustedRates, setAdjustedRates] = useState({});

  const exchangeRates = {
    'EUR/USD': 1.05,
    'USD/INR': 80.05,
    'AUD/USD': 0.67,
  };

  useEffect(() => {
    const adjustRates = () => {
      const newRates = {};
      Object.entries(exchangeRates).forEach(([pair, rate]) => {
        const adjustment = rate * (Math.random() * 0.06 - 0.03); // Adjust up or down by up to 3%
        newRates[pair] = parseFloat((rate + adjustment).toFixed(2));
      });
      setAdjustedRates(newRates);
    };

    adjustRates(); // Initialize with adjusted rates

    const interval = setInterval(() => {
      adjustRates();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleExchange = () => {
    const rate = adjustedRates[`${sourceCurrency}/${targetCurrency}`];
    if (rate) {
      setConvertedAmount((amount * rate).toFixed(2));
    } else {
      setConvertedAmount('Invalid currency pair');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-24 w-full max-w-4xl">
        <div className="bg-blue-950 text-white p-4 lg:p-10 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Markets</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="pb-2">Currency Pair</th>
                <th className="pb-2">Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(adjustedRates).map(([pair, rate]) => (
                <tr key={pair}>
                  <td className="py-1">{pair}</td>
                  <td className="py-1">{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-300 pb-4 pl-4 pr-4 pt-4 lg:pt-10 rounded-md shadow-md">
          <div className="flex justify-center items-center">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Currency Converter</h2>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Source currency</label>
            <select
              className="w-full p-2 border rounded-md"
              value={sourceCurrency}
              onChange={(e) => setSourceCurrency(e.target.value)}
            >
              <option value="" disabled>Select source currency</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Target currency</label>
            <select
              className="w-full p-2 border rounded-md"
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            >
              <option value="" disabled>Select target currency</option>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Amount</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Estimated converted amount:</label>
            <div className="p-2 border rounded-md bg-gray-50">{convertedAmount !== null ? convertedAmount : 'N/A'}</div>
          </div>
          <div className="flex justify-center">
          <button
            className="w-[50%] bg-blue-600 text-white p-2 rounded-md"
            onClick={handleExchange}
          >
            Exchange
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
