import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

interface ConsumptionData {
  time: Date;
  consumption: { [building: string]: number };
}

interface MonthlyAverages {
  [building: string]: {
    [month: string]: number;
  };
}

const ConsumptionPage: React.FC = () => {
  const [data, setData] = useState<ConsumptionData[]>([]);
  const [monthlyAverages, setMonthlyAverages] = useState<MonthlyAverages>({});
  // State for overall monthly average for all buildings combined.
  const [overallMonthlyAverage, setOverallMonthlyAverage] = useState<{ [month: string]: number }>({});

  useEffect(() => {
    fetch('/data.csv')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse<string[]>(csvText, {
          header: false,
          complete: (results) => {
            const rows = results.data;
            if (rows.length === 0) return;

            // The first row contains headers: the first cell is the time header and the rest are building names.
            const headerRow = rows[0];
            const buildingNames = headerRow.slice(1);

            // Process each subsequent row into structured data.
            const processedData: ConsumptionData[] = rows
            .slice(1)
            .filter((row) => row[0].trim() !== '') // Remove empty rows based on the time column.
            .map((row) => {
                const [timeStr, ...values] = row;
                const date = new Date(timeStr);
                // If the date is invalid, skip this row.
                if (isNaN(date.getTime())) {
                return null;
                }
                const consumption: { [building: string]: number } = {};
                buildingNames.forEach((name, index) => {
                consumption[name] = parseFloat(values[index]) || 0;
                });
                return {
                time: date,
                consumption,
                };
            })
            .filter((entry): entry is ConsumptionData => entry !== null);
            console.log(processedData);
            setData(processedData);

            // Compute monthly averages per building.
            const averages = computeMonthlyAverages(processedData);
            setMonthlyAverages(averages);

            // Compute overall monthly averages (all buildings combined).
            const overallAverage = computeOverallMonthlyAverage(processedData);
            setOverallMonthlyAverage(overallAverage);
          },
          error: (error: Error) => {
            console.error('Error parsing CSV:', error);
          },
          // Optionally, enable worker mode: worker: true,
        });
      })
      .catch((error) => console.error('Error fetching CSV:', error));
  }, []);

  // Function to compute monthly averages per building.
  const computeMonthlyAverages = (data: ConsumptionData[]): MonthlyAverages => {
    // Object to store totals and counts for each building per month.
    const buildingMonthly: {
      [building: string]: {
        [month: string]: { total: number; count: number };
      };
    } = {};

    data.forEach((entry) => {
      // Format the month as "YYYY-MM"
      const month = `${entry.time.getFullYear()}-${(entry.time.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;

      // For each building, accumulate the values.
      Object.entries(entry.consumption).forEach(([building, value]) => {
        if (!buildingMonthly[building]) {
          buildingMonthly[building] = {};
        }
        if (!buildingMonthly[building][month]) {
          buildingMonthly[building][month] = { total: 0, count: 0 };
        }
        buildingMonthly[building][month].total += value;
        buildingMonthly[building][month].count += 1;
      });
    });

    // Compute the average consumption for each building per month.
    const averages: MonthlyAverages = {};
    Object.keys(buildingMonthly).forEach((building) => {
      averages[building] = {};
      Object.keys(buildingMonthly[building]).forEach((month) => {
        const { total, count } = buildingMonthly[building][month];
        averages[building][month] = total / count;
      });
    });
    return averages;
  };

  // Function to compute overall monthly averages (all buildings combined).
  const computeOverallMonthlyAverage = (data: ConsumptionData[]): { [month: string]: number } => {
    const monthlyTotals: { [month: string]: { total: number; count: number } } = {};

    data.forEach((entry) => {
      // Format month as "YYYY-MM"
      const month = `${entry.time.getFullYear()}-${(entry.time.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;
      // Sum consumption of all buildings for this entry.
      const sumAllBuildings = Object.values(entry.consumption).reduce((sum, value) => sum + value, 0);

      if (!monthlyTotals[month]) {
        monthlyTotals[month] = { total: 0, count: 0 };
      }
      monthlyTotals[month].total += sumAllBuildings;
      monthlyTotals[month].count += 1;
    });

    // Compute the overall monthly average by dividing the total by count.
    const overall: { [month: string]: number } = {};
    Object.keys(monthlyTotals).forEach((month) => {
      overall[month] = monthlyTotals[month].total / monthlyTotals[month].count;
    });

    return overall;
  };

  return (
    <div>
      <h1>Electricity Consumption Data</h1>

      {/* Display overall monthly averages */}
      <h2>Overall Monthly Averages (All Buildings Combined)</h2>
      <ul>
        {Object.entries(overallMonthlyAverage).map(([month, avg]) => (
          <li key={month}>
            {month}: {avg.toFixed(2)} kWh
          </li>
        ))}
      </ul>

      {/* Display per building monthly averages */}
      <h2>Monthly Averages by Building</h2>
      <div>
        {Object.entries(monthlyAverages).map(([building, months]) => (
          <div key={building}>
            <h3>{building}</h3>
            <ul>
              {Object.entries(months).map(([month, avg]) => (
                <li key={month}>
                  {month}: {avg.toFixed(2)} kWh
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsumptionPage;
