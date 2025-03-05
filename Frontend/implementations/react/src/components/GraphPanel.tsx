import styles from './GraphPanel.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
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

export default function GraphPanel() {
  const [data, setData] = useState<ConsumptionData[]>([]);
  const [monthlyAverages, setMonthlyAverages] = useState<MonthlyAverages>({});

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

            // First row contains headers (time in the first cell, then building names)
            const headerRow = rows[0];
            const buildingNames = headerRow.slice(1);

            // Process each row into structured data.
            const processedData: ConsumptionData[] = rows
              .slice(1)
              .filter((row) => row[0].trim() !== '')
              .map((row) => {
                const [timeStr, ...values] = row;
                const date = new Date(timeStr);
                if (isNaN(date.getTime())) return null;
                const consumption: { [building: string]: number } = {};
                buildingNames.forEach((name, index) => {
                  consumption[name] = parseFloat(values[index]) || 0;
                });
                return { time: date, consumption };
              })
              .filter((entry): entry is ConsumptionData => entry !== null);

            setData(processedData);

            // Compute monthly averages per building.
            const averages = computeMonthlyAverages(processedData);
            setMonthlyAverages(averages);
          },
          error: (error: Error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      })
      .catch((error) => console.error('Error fetching CSV:', error));
  }, []);

  // Compute monthly averages for each building.
  const computeMonthlyAverages = (data: ConsumptionData[]): MonthlyAverages => {
    const buildingMonthly: {
      [building: string]: {
        [month: string]: { total: number; count: number };
      };
    } = {};

    data.forEach((entry) => {
      // Format month as "YYYY-MM"
      const month = `${entry.time.getFullYear()}-${(entry.time.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;

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

  // Prepare chart data: one entry per month with keys for each building.
  const monthsSet = new Set<string>();
  Object.values(monthlyAverages).forEach((monthData) => {
    Object.keys(monthData).forEach((month) => monthsSet.add(month));
  });
  const months = Array.from(monthsSet).sort();
  const chartData = months.map((month) => {
    const dataPoint: any = { month };
    Object.keys(monthlyAverages).forEach((building) => {
      dataPoint[building] = monthlyAverages[building][month] || 0;
    });
    return dataPoint;
  });

  // Sorted list of buildings.
  const buildings = Object.keys(monthlyAverages).sort();
  const totalBuildings = buildings.length;

  // Dynamically generate a color using HSL based on the index.
  const generateColor = (index: number, total: number) => {
    const hue = (index * 360) / total;
    return `hsl(${hue}, 70%, 50%)`;
  };

  return (
    <div className={styles.graphPanel}>
  <div className={styles.header}>
    <h3>Monthly Consumption Per Building</h3>
  </div>
  
  {/* Graph 1 */}
  <div className={styles.graphContainer}>
    <div className={styles.chartWrapper}>
    <ResponsiveContainer width="100%" height={400}>
    <LineChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      {buildings.map((building, index) => (
        <Line
          key={building}
          type="monotone"
          dataKey={building}
          stroke={generateColor(index, totalBuildings)}
          strokeWidth={1}
          dot={false}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
    </div>
    <div className={styles.legendWrapper}>
      <h4 style={{ fontSize: '10px', margin: '2px 0' }}>Building Legend</h4>
      {buildings.map((building, index) => (
        <div
          key={building}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '2px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              background: generateColor(index, totalBuildings),
              marginRight: '4px',
            }}
          />
          <span
            style={{
              fontSize: '8px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {building}
          </span>
        </div>
      ))}
    </div>
  </div>
  
  {/* Future graphs can be added as additional .graphContainer blocks */}
  {/* <div className={styles.graphContainer}>
      ... another graph and legend ...
  </div> */}
</div>



  );
}
