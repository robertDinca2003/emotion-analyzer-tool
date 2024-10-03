import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ChartOverallEvolution = ({ analyzeHistory }) => {
  let labelData = [];
  //Getting all scores from previous analyzes
  let scoreData = JSON.parse(JSON.stringify(analyzeHistory.score));
  //Getting all magnitudes from previous analyzes
  let magnitudeData = JSON.parse(JSON.stringify(analyzeHistory.magnitude));
  for (let i = 0; i < magnitudeData.length; i++) magnitudeData[i] *= 100;

  //Filling label data array
  for (let i = 1; i <= scoreData.length; i++) labelData.push(i + ' Review');

  //If it is the first analyze, add again the results
  //to have at least one line in the chart
  if (labelData.length == 1) {
    scoreData.push(scoreData[0]);
    magnitudeData.push(magnitudeData[0]);
  }
  if (labelData.length > 1) labelData.pop();

  labelData.push('Current Review');

  // Chart Data
  const data = {
    labels: labelData, // X-axis labels
    datasets: [
      {
        label: 'Overall Score', // Label for the line
        data: scoreData, // Data points for the chart
        fill: false, // Don't fill the area under the line
        backgroundColor: 'rgba(75,192,192,0.2)', // Line color
        borderColor: 'rgba(75,192,192,1)', // Border color of the line
        tension: 0.1, // Line tension (smoothness)
      },
      {
        label: 'Overall Magnitude', // Label for the line
        data: magnitudeData, // Data points for the chart
        fill: false, // Don't fill the area under the line
        backgroundColor: 'rgba(22, 101, 52, 0.2)', // Line color
        borderColor: 'rgba(22, 101, 52, 1)', // Border color of the line
        tension: 0.1, // Line tension (smoothness)
      },
    ],
  };

  // Define optional configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true, // Show legend
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sentiment Over Time', // Chart title
      },
    },
  };

  return (
    <div className="min-w-[100%] min-h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
};
