import { useEffect, useState } from "react";
import { DefaultInputType, TimeSeriesDomain } from "../types";

interface UseTimeSeriesDataProps<T extends { [K in keyof T]: T[K] }> {
  data: T[];
  key: {
    x: string;
    y: string;
  };
  options?: {
    isCategoricalData?: boolean;
  };
}
export default function useTimeSeriesData<T extends { [K in keyof T]: T[K] }>({
  data,
  key,
  options,
}: UseTimeSeriesDataProps<T>) {
  const [domain, setDomain] = useState<TimeSeriesDomain>({
    x: [],
    y: [],
  });
  function getSortedTimeseries(timeSeriesData: string[]) {
    return timeSeriesData.sort((a, b) => {
      if (a && b) {
        return new Date(a).valueOf() - new Date(b).valueOf();
      }
      return 1;
    });
  }

  function getTimeSeriesDomain() {
    if (options?.isCategoricalData) {
      return getCategoricalDomain();
    } else {
      return getContinousDomain();
    }
  }
  function getTimeSeriesData() {
    const timeSeriesKey = key.x;
    const identityDate = new Set<string>();
    data.forEach((data) => {
      if (data.hasOwnProperty(timeSeriesKey)) {
        const date = data[timeSeriesKey as keyof T] as string;
        if (!identityDate.has(date)) {
          identityDate.add(date);
        }
      }
    });
    const timeSeriesData = [...identityDate];
    return timeSeriesData;
  }
  function getContinousDomain() {
    const timeSeriesData = getTimeSeriesData();
    const sortedTimeSeries = getSortedTimeseries(timeSeriesData);
    const continousKey = key.y;
    const continousData = data
      .map((data) => {
        if (data.hasOwnProperty(continousKey)) {
          return data[continousKey as keyof T] as number;
        }
        return Infinity;
      })
      .filter((val) => val !== Infinity);
    const continousMinMax = getNumbericMinMax(continousData);
    const continousDomain = [continousMinMax.min, continousMinMax.max];
    return {
      x: sortedTimeSeries,
      y: continousDomain,
    };
  }
  function getCategoricalDomain() {
    const timeSeriesData = getTimeSeriesData();
    const sortedTimeSeries = getSortedTimeseries(timeSeriesData);
    const categoricalKey = key.x;
    const categoricalData = data
      .map((data) => {
        if (data.hasOwnProperty(categoricalKey)) {
          return data[categoricalKey as keyof T] as string;
        }
        return "";
      })
      .filter((val) => val !== "");

    return {
      x: sortedTimeSeries,
      y: categoricalData,
    };
  }
  function getNumbericMinMax(data: number[]) {
    return {
      min: 0,
      max: Math.max(...data),
    };
  }
  useEffect(() => {
    if (data && data.length > 0) {
      const domain = getTimeSeriesDomain();
      setDomain(domain);
    }
  }, [data]);
  return {
    domain,
    data,
  };
}
