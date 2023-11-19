import { Stock } from "./types";

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function generateSequentialStockData(
  symbols: string[] = ["AAPL"],
  days: number = 100,
  start_datetime_id = new Date(Date.now()).toISOString()
) {
  const stockData: Stock[][] = symbols.map((symbol) => {
    let currentDate = new Date(start_datetime_id);
    const stockData: Stock[] = [];
    for (let i = 0; i < days; i++) {
      const open = (Math.random() * (200 - 50) + 50).toFixed(2);
      const high = (Math.random() * (200 - 50) + 50).toFixed(2);
      const low = (Math.random() * (200 - 50) + 50).toFixed(2);
      const close = (Math.random() * (200 - 50) + 50).toFixed(2);
      const volume = Math.floor(Math.random() * (1000000 - 10000 + 1) + 10000);

      const stockEntry = {
        Date: currentDate.toISOString().split("T")[0],
        Symbol: symbol,
        Open: parseFloat(open),
        High: parseFloat(high),
        Low: parseFloat(low),
        Close: parseFloat(close),
        Volume: volume,
      };

      stockData.push(stockEntry);

      currentDate = addDays(currentDate, 1);
    }
    return stockData;
  });

  return stockData;
}
