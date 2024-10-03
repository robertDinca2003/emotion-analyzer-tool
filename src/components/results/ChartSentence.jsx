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
  scales,
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

export const ChartSentence = ({ senteces }) => {
  let labelData = [];
  let sentimentScores = [];
  let sentimentMagnitude = [];

  //For every sentence will save it's score, magnitude in coreponding arrays
  senteces.forEach((element, key) => {
    labelData.push('Sentence ' + String(key + 1));
    sentimentScores.push(element.sentiment.score * 100);
    sentimentMagnitude.push(element.sentiment.magnitude * 100);
  });

  //Chart data
  const data = {
    labels: labelData, // X-axis labels
    datasets: [
      {
        label: 'Sentiment Score', // Label for the line
        data: sentimentScores, // Data points for the chart
        fill: false, // Don't fill the area under the line
        backgroundColor: 'rgba(75,192,192,0.2)', // Line color
        borderColor: 'rgba(75,192,192,1)', // Border color of the line
        tension: 0.1, // Line smoothness
      },
      {
        label: 'Sentiment Magnitude', // Label for the line
        data: sentimentMagnitude, // Data points for the chart
        fill: false, // Don't fill the area under the line
        backgroundColor: 'rgba(22, 101, 52, 0.2)', // Line color
        borderColor: 'rgba(22, 101, 52, 1)', // Border color of the line
        tension: 0.1, // Line smoothness
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
        text: 'Sentence by Sentence Emotions Evolution', // Chart title
      },
    },
  };

  return (
    <div className="min-w-[100%] min-h-[300px] overflow-x-auto overflow-y-auto">
      <Line data={data} options={options} />
    </div>
  );
};
