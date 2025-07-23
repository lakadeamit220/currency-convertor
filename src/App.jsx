import { useState, useEffect } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [swapAnimation, setSwapAnimation] = useState(false);

  const {
    data: currencyInfo,
    error,
    loading,
    lastUpdated,
  } = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  // Currency symbol mapping
  const currencySymbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    CNY: "¥",
    BRL: "R$",
    ZAR: "R",
    RUB: "₽",
    // Add more symbols as needed
  };

  useEffect(() => {
    if (currencyInfo[to] && amount && !isNaN(amount) && amount >= 0) {
      setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
    } else {
      setConvertedAmount("");
    }
  }, [amount, from, to, currencyInfo]);

  const swap = () => {
    setSwapAnimation(true);
    setTimeout(() => {
      setFrom(to);
      setTo(from);
      setConvertedAmount(amount);
      setAmount(convertedAmount);
      setSwapAnimation(false);
    }, 300);
  };

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-no-repeat p-4 sm:p-8 border"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100">
        <h1 className="text-4xl sm:text-5xl text-center font-bold text-white mb-8 py-2 px-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg shadow-md">
          Currency Converter
        </h1>
        {loading && (
          <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden mb-6">
            <div
              className="absolute h-full bg-teal-500 animate-pulse"
              style={{ width: "100%" }}
            />
          </div>
        )}
        {error && (
          <p className="text-red-400 text-center bg-red-900/30 p-3 rounded-md mb-6">
            Error: {error}. Please try again later.
          </p>
        )}
        <div className="space-y-6">
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(value) => setAmount(value)}
            className="animate-fade-in"
          />
          <div className="flex justify-center">
            <button
              type="button"
              className={`p-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                swapAnimation ? "animate-spin-once" : ""
              }`}
              onClick={swap}
              aria-label="Swap currencies"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16H21M21 16l-4 4m4-4l-4-4M3 8h14M3 8l4 4m-4-4l4-4"
                />
              </svg>
            </button>
          </div>
          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
            className="animate-fade-in"
          />
        </div>
        {lastUpdated && (
          <p className="text-sm text-gray-300 text-center mt-6">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        )}
        {amount && convertedAmount && !error && (
          <p className="text-xl text-white text-center mt-6 bg-teal-900/30 p-3 rounded-md">
            {currencySymbols[from] || from} {Number(amount).toFixed(2)} {from} ={" "}
            {currencySymbols[to] || to} {convertedAmount} {to}
          </p>
        )}
        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in;
          }
          .animate-spin-once {
            animation: spin 0.3s linear;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default App;
