import { useEffect, useState } from "react";
import { DefaultInputType, TimeSeriesDomain } from "../types";

interface UseTimeSeriesDataProps<T extends Record<string, DefaultInputType>> {
  data: T[];
  key: {
    x: string;
    y: string;
  };
  options?: {
    isCategoricalData?: boolean;
  };
}
export default function useTimeSeriesData<
  T extends Record<string, DefaultInputType>,
>({ data, key, options }: UseTimeSeriesDataProps<T>) {
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
  function getContinousDomain() {
    const timeSeriesKey = key.x;
    const timeSeriesData = data
      .map((data) => {
        if (data.hasOwnProperty(timeSeriesKey)) {
          return data[timeSeriesKey] as string;
        }
        return "";
      })
      .filter((val) => val !== "");
    const sortedTimeSeries = getSortedTimeseries(timeSeriesData);
    const continousKey = key.y;
    const continousData = data
      .map((data) => {
        if (data.hasOwnProperty(continousKey)) {
          return data[continousKey] as number;
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
    const timeSeriesKey = key.y;
    const timeSeriesData = data
      .map((data) => {
        if (data.hasOwnProperty(timeSeriesKey)) {
          return data[timeSeriesKey] as string;
        }
        return "";
      })
      .filter((val) => val !== "");
    const sortedTimeSeries = getSortedTimeseries(timeSeriesData);
    const categoricalKey = key.x;
    const categoricalData = data
      .map((data) => {
        if (data.hasOwnProperty(categoricalKey)) {
          return data[categoricalKey] as string;
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
    const domain = getTimeSeriesDomain();
    setDomain(domain);
  }, [data]);
  return {
    domain,
    data,
  };
}
