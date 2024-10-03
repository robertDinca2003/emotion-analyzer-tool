import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartEmotionDistribution = ({ sentences }) => {
  // Define the data for the doughnut chart
  let emotionDistribution = [0, 0, 0, 0, 0];

  // Every sentence will be classiefied in as
  // Very positive[0], Positive[1], Neutral[2], Negative[3], Very Negative[4]
  for (let i = 0; i < sentences.length; i++) {
    if (sentences[i].sentiment.score * 100 > 80) emotionDistribution[0]++;
    else if (sentences[i].sentiment.score * 100 > 33) emotionDistribution[1]++;
    else if (sentences[i].sentiment.score * 100 > -33) emotionDistribution[2]++;
    else if (sentences[i].sentiment.score * 100 > -80) emotionDistribution[3]++;
    else emotionDistribution[4]++;
  }

  // Calculate percents
  const sentenceNumber = sentences.length;
  for (let i = 0; i < sentenceNumber; i++)
    emotionDistribution[i] = (emotionDistribution[i] * 100) / sentenceNumber;

  const data = {
    labels: [
      '(80 -> 100) Very Positive',
      '(33 -> 79) Positive',
      '(-32 -> 32) Neutral',
      '(-79 -> -33) Negative',
      '(-100 -> -80) Very Negative',
    ], // Chart labels (can represent sentiment categories)
    datasets: [
      {
        label: 'Sentiment Distribution', // Label for the dataset
        data: emotionDistribution, // Data for each category
        backgroundColor: [
          'rgba(22, 101, 52, 0.6)', // Border color for Positive
          'rgba(128, 255, 44, 0.6)', // Border color for Neutral
          'rgba(234, 179, 8, 0.6)', // Border color for Negative
          'rgba(252, 126, 67, 0.6)',
          'rgba(185, 28, 28, 0.6)',
        ],
        borderColor: [
          'rgba(22, 101, 52, 1)', // Border color for Positive
          'rgba(128, 255, 44, 1)', // Border color for Neutral
          'rgba(234, 179, 8, 1)', // Border color for Negative
          'rgba(252, 126, 67, 1)',
          'rgba(185, 28, 28, 1)',
        ],
        borderWidth: 1, // Border width
      },
    ],
  };

  // Optional configuration options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Legend position
      },
      title: {
        display: true,
        text: 'Sentiment Distribution', // Chart title
      },
    },
  };

  return (
    <div className="flex  justify-center w-[100%]">
      <div className="w-[75%]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};
