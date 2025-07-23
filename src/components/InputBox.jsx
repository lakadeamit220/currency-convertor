import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency,
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();
  const currencySelectId = useId();

  // Currency to country name mapping
  const currencyToCountry = {
    USD: "United States Dollar",
    INR: "Indian Rupee",
    EUR: "Euro",
    GBP: "British Pound",
    JPY: "Japanese Yen",
    AUD: "Australian Dollar",
    CAD: "Canadian Dollar",
    CHF: "Swiss Franc",
    CNY: "Chinese Yuan",
    BRL: "Brazilian Real",
    ZAR: "South African Rand",
    RUB: "Russian Rubles",
    // Add more mappings as needed
  };

  return (
    <div
      className={`bg-white/90 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 ${className}`}
    >
      <div className="w-full sm:w-1/2">
        <label
          htmlFor={amountInputId}
          className="text-gray-700 mb-2 block font-semibold text-sm"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors disabled:bg-gray-200"
          type="number"
          placeholder="Enter amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
          aria-describedby={`${amountInputId}-desc`}
        />
        <p id={`${amountInputId}-desc`} className="sr-only">
          Enter the amount to convert
        </p>
      </div>
      <div className="w-full sm:w-1/2">
        <label
          htmlFor={currencySelectId}
          className="text-gray-700 mb-2 block font-semibold text-sm text-right sm:text-left"
        >
          Currency
        </label>
        <select
          id={currencySelectId}
          className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors disabled:bg-gray-200"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
          aria-describedby={`${currencySelectId}-desc`}
        >
          {currencyOptions
            .map((currency) => ({
              code: currency,
              name: currencyToCountry[currency] || currency,
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ code, name }) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
        </select>
        <p id={`${currencySelectId}-desc`} className="sr-only">
          Select the currency
        </p>
      </div>
    </div>
  );
}

export default InputBox;
