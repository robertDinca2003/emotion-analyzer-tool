# Emotion Analyzer Tool

## Description

This web app helps you analyze the emotional tone of a text using Natural Language Processing (NLP). It breaks down the emotional weight of each sentence, giving you insights that can help improve your writing, especially for copywriting. Just input your text, and the app will show you how each part scores emotionally, making it easier to adjust your tone if needed.

### [A live demo](https://google-emotion-analyzer.netlify.app/) is worth 1000 words

## Features

- **Step-by-Step Tutorial**: Includes a built-in tutorial to help users get started quickly.
- **Multiple ways to make an input**: Upload .txt files or input text directly into the app.
- **Language moderation**: Indicates if the language used is appropriate.
- **Overall Document Metrics**: Provides a summary of the document’s overall emotional score and magnitude.
- **Emotion Distribution Visualization**: Displays a chart showing how different emotions are spread across the text.
- **Emotion Evolution Tracking**: Tracks how the emotional tone shifts from sentence to sentence.
- **Text Highlighting Based on Emotion**: Each line of the text is highlighted based on its emotional score, making it easy to see the emotional weight of specific parts.
- **Analyze History**: Allows you to preview old analyses and continue working on them.
- **Simple and User-Friendly**: Clean interface designed for ease of use.
- **Mobile-Responsive Design**: Works seamlessly on both desktop and mobile devices for flexibility.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (version 14 or higher)
- npm or yarn
- git

### Clone the Repository

```bash
git clone https://github.com/robertDinca2003/emotion-analyzer-tool.git
cd emotion-analyzer-tool
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### API Setup

This project relies on an external API to perform sentiment analysis. You will need to acquire an API key for the analysis service (Google Cloud Natural Language API). This API offers 5000 calls/month without any costs. Follow these steps:

### 1. Get an API Key:

- Create an account on the [Google Cloud Console](https://console.cloud.google.com/).
- Create a new project.
- Go to 'Library' and search "Cloud Natural Language API".
- Enable the Cloud Natural Language API.
- Go to 'Credentials' and 'Create Credential' and choose 'API KEY'.
- Optional: Restrict key access.
- Copy the key.

### 2. Add the API Key to Your Clone:

- Go to /emotion-analyzer/src/utils/apiCall.js
- Replace the '[YOUR_API_KEY]' with your copied key.
- Save.

### Run the Application

```bash
npm run dev
# or
yarn dev
```

### Enjoy!

## Developing stack

- **Front End**: [React(with Vite)](https://vitejs.dev/guide/)
- **Styling**: [TailwindCSS](https://v2.tailwindcss.com/docs)
- **HTTPS Requests**: [Axios](https://axios-http.com/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/)
- **Notifications**: [react-toastify](https://www.npmjs.com/package/react-toastify)
- **Animations**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

## Project Structure

The project follows the default structure of a Vite React app, with additional custom folders to organize assets, components, context, and utilities.

```bash
emotion-analyzer/
├── node_modules/
├── public/
├── src/
│   ├── assets/              # Contains images (PNGs, SVGs) used in the app
│   │   ├── logo.svg
│   │   └── confetti.png
│   ├── components/          # Every section is split in multiple components
│   │   ├── analyzer/        # Components related to analyzing text
│   │   │   └── ...
│   │   ├── results/         # Components for displaying results
│   │   │   └── ...
│   │   ├── tutorial/        # Components for the tutorial
│   │   │   └── ...
│   ├── context/             # Context files for state management
│   │   └── StateContext.jsx
│   ├── sections/            # The main sections used within App.jsx
│   │   ├── Analyzer.jsx
│   │   ├── Results.jsx
│   │   ├── SideBarHistory.jsx
│   │   └── Tutorial.jsx
│   ├── utils/               # Utility functions for API calls and other helpers
│   │   ├── apiCall.js
│   │   └── utility.js
│   ├── App.jsx              # Main App component
│   ├── App.css              # Global styles
│   ├── index.css
│   ├── main.jsx             # Entry point for the React app
├── package.json
├── vite.config.js           # Vite configuration
├── README.md
├── index.html
├── ...                      # Other config files
```

## Design Approach & User Experience

The design of this app revolves around a user-centered, science-backed approach to ensure an intuitive, engaging, and visually appealing experience:

- **Color Scheme**: The use of gray tones was deliberately chosen based on psychological research, which shows that neutral colors like gray evoke balance and impartiality, making it easier for users to focus on the emotional highlights. This strategy emphasizes the emotional visualizations by drawing attention to colored data points, enabling clearer interpretation and smoother decision-making [1].

- **Gamification Elements**: Gamification was employed to make the tool more engaging. A fake loading animation gives users a sense of anticipation, suggesting that the emotional analysis is a complex process worth waiting for. This technique enhances user experience by triggering positive emotions, leading to greater satisfaction [2]. Additionally, the scoring mechanism encourages users to refine and reanalyze their text, turning the process into an iterative improvement cycle. The graph showing the evolution of the emotional score and magnitude over time further gamifies the experience by visually tracking progress and fostering user involvement.

- **Responsive Design**: The app is fully responsive, supporting screen resolutions as small as 200px and above. This ensures an optimal mobile experience, where the layout of the analysis results dynamically adjusts for smaller screens, improving readability and ease of interaction. The responsiveness enhances accessibility, allowing users to interact seamlessly across devices, from desktops to smartphones.

- **Dashboard-Like Visualization**: The data visualization is laid out in a dashboard-style format, giving users the feeling of being an expert analyzing advanced metrics. The layout is clean and simple, which adheres to the principles of cognitive load theory by preventing information overload [3]. The dashboard allows users to digest information at a glance while maintaining a professional aesthetic, making the experience not only functional but also empowering.

- **Interactive Tutorial with Characters**: To provide a more engaging and personalized learning experience, fictitious characters Nadia and Lukas are introduced. They act as guides throughout the app’s tutorial, offering quick tips and insights. This humanized interaction fosters a deeper connection with the user, creating a more relatable and less mechanical experience. By including characters, the app presents a professional yet approachable interface, combining functional instruction with emotional support, which improves the learning curve [4].

These design decisions are backed by psychological and scientific research, ensuring that the tool not only delivers accurate emotional analysis but also provides a user experience rooted in simplicity, engagement, and accessibility.

**Bibliographic References**:

- [1] Kaya, N., & Epps, H. H. (2004). Relationship between color and emotion: A study of college students. _College Student Journal_.
- [2] Deterding, S., Dixon, D., Khaled, R., & Nacke, L. (2011). From game design elements to gamefulness: Defining “gamification”. _Proceedings of the 15th international academic MindTrek conference: Envisioning future media environments_.
- [3] Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. _Cognitive Science_.
- [4] Reeves, B., & Nass, C. (1996). _The media equation: How people treat computers, television, and new media like real people and places_. Cambridge University Press.

## Challenges Faced During Development

Building the **Emotion Analyzer Tool** presented several unique challenges that required innovative solutions:

1. **API Security**:
   To ensure the security of the API key, I restricted its accessibility in the Google Cloud Console, making it usable only from the demo URL. This limits access solely to the necessary Natural Language Processing (NLP) functionalities while preventing unauthorized use from other domains.

2. **Complexity in Data Visualization**:
   The main challenge was creating readable, maintainable code for the `Result.jsx` component, which handles the entire data visualization. This component manages animations like the fake loading screen and transitions into the dashboard view. Initially, this resulted in a cluttered and messy codebase. By adding thorough comments and splitting the code into multiple smaller functions, I improved its readability and maintainability without sacrificing functionality.

3. **Responsiveness and Layout Adjustments**:
   Designing the app to be fully responsive across all device sizes was demanding, especially ensuring a smooth experience on resolutions as low as 200px and above. Adapting the layout of the analysis results for mobile devices, while keeping the visualizations clear and accessible, required multiple iterations to find the right balance.

4. **Readable Code for Complex Components**: One of the most challenging sections of the app was the `Result.jsx` component, which handles the entire data visualization, from the fake loading animation to the transition into the dashboard view. With multiple animations and state transitions, this component became quite messy. To improve readability, I heavily commented the code and split it into several smaller functions, making the logic easier to follow. Although still complex, this restructuring helped make it more maintainable and understandable for future developers.

These challenges collectively pushed the boundaries of my development skills, especially in the areas of front-end security, user experience design, responsive layouts, and code maintainability.

## Mistakes and Improvements

Throughout the development of the Emotion Analyzer Tool, a few key areas could have been improved:

1. **Frontend-Only Limitation**:
   Since the application was built solely on the front-end, I was forced to rely on local storage to save user history and daily uses, limiting both scalability and functionality. A back-end server would have allowed for more robust data storage options, such as cloud databases, and would have improved security around user data and API keys.

2. **Code Structure and Readability**:
   Splitting the code into smaller, more manageable functions proved challenging, particularly for complex components like `Result.jsx`, which handles data visualization and animations. Initially, my approach was messy, making the code difficult to maintain. While I managed to improve readability by refactoring, adding comments, and breaking the logic into smaller functions, there’s still room for further simplification and better architectural planning from the start.

3. **Lack of Concise Development Plan**:
   The absence of a clear, concise development plan caused friction later in the project. As new ideas and features emerged, they often conflicted with the existing code structure, especially in terms of scalability. This resulted in reworking various parts of the codebase, leading to unnecessary complexity and technical debt. Having a solid plan from the beginning, with clear objectives and a long-term view of feature expansion, would have saved time and effort.

4. **Scalability Concerns**:
   While the tool was designed to be scalable in terms of visualizing emotions, certain design choices, particularly those influenced by the front-end-only nature of the project, made it more difficult to scale the app for broader use cases, such as converting it into a SaaS platform without significant back-end integration. A full-stack approach would have allowed for more seamless scaling.
