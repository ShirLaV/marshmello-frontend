import { Pie } from 'react-chartjs-2';

export function TasksPerMemberChart({ tasksPerMemberMap, labelsColors }) {
  const data = {
    labels: Object.keys(tasksPerMemberMap),
    datasets: [
      {
        label: '# of Votes',
        data: Object.values(tasksPerMemberMap),
        backgroundColor: labelsColors,
        borderWidth: 2,
        hoverOffset: 2,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          color: 'black',
          padding: 10
        },
      },
    },
  };

  return (
    <div className='chart-container'>
      <h1>Tasks per Member</h1>
      <div className='chart-wrapper square-ratio'>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
