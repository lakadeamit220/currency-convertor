import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const primaryUrl = `https://api.exchangerate-api.com/v4/latest/${currency}`;
    const fallbackUrl = `https://api.exchangerate-api.com/v4/latest/${currency}`;

    const fetchCurrencyData = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch currency data");
        const result = await response.json();
        setData(result.rates);
        setError(null);
      } catch (err) {
        setError(err.message);
        return false;
      }
      return true;
    };

    // Try primary URL, fall back to secondary if it fails
    fetchCurrencyData(primaryUrl).then((success) => {
      if (!success) {
        console.warn("Primary API failed, trying fallback...");
        fetchCurrencyData(fallbackUrl);
      }
    });
  }, [currency]);

  if (error) {
    console.error("Currency API error:", error);
  }

  return data;
}

export default useCurrencyInfo;