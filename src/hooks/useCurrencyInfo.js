import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const cacheKey = `currency_${currency.toUpperCase()}`;
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(`${cacheKey}_time`);
    const cacheValidDuration = 60 * 60 * 1000; // 1 hour

    if (cachedData && cacheTime && Date.now() - cacheTime < cacheValidDuration) {
      setData(JSON.parse(cachedData));
      // console.log(cachedData);
      setLastUpdated(new Date(parseInt(cacheTime)));
      return;
    }

    const fetchCurrencyData = async (url) => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch currency data");
        const result = await response.json();
        setData(result.rates);
        setLastUpdated(new Date());
        localStorage.setItem(cacheKey, JSON.stringify(result.rates));
        localStorage.setItem(`${cacheKey}_time`, Date.now());
        setError(null);
      } catch (err) {
        setError(err.message);
        return false;
      } finally {
        setLoading(false);
      }
      return true;
    };

    const primaryUrl = `https://api.exchangerate-api.com/v4/latest/${currency.toUpperCase()}`;
    fetchCurrencyData(primaryUrl);
  }, [currency]);

  return { data, error, loading, lastUpdated };
}

export default useCurrencyInfo;