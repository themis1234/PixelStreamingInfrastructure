import React from 'react';
import styles from './GraphPanel.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const sampleData = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 80 },
  { name: 'Mar', value: 30 },
  { name: 'Apr', value: 100 },
  { name: 'May', value: 90 },
];

export default function GraphPanel() {
  return (
    <div className={styles.graphPanel}>
      <h3>Statistics</h3>
      <LineChart width={400} height={300} data={sampleData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </div>
  );
}
