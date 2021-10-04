import React from 'react';
import { Bar } from 'react-chartjs-2';

export function TasksPerLabelChart({ tasksPerLabelMap, labelsColors }) {
  const data = {
    labels: Object.keys(tasksPerLabelMap),
    datasets: [
      {
        label: '',
        data: Object.values(tasksPerLabelMap),
        backgroundColor: labelsColors,
        borderWidth: 2,
        hoverOffset: 2,
        fontColor: 'white'
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          fontColor: '#f00'
        }
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'white'
        }
      },
      x: {
        ticks: {
          color: 'white'
        }
      }
    }
  };

  return (
    <div className='chart bar-chart-container' style={{ maxHeight: 400 }}>
      <h1>Tasks per Label</h1>
      <Bar data={data} height={null}
        width={null}
        options={options} />
    </div>
  );
}
