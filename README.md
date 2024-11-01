# Hotel Booking Dashboard

![License](https://img.shields.io/badge/license-MIT-green)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

The **Hotel Booking Dashboard** is a single-page application built with React and TypeScript that allows users to visualize booking data for a hotel. Users can filter data based on date ranges, and the dashboard displays various charts to analyze visitor statistics, including time series data, country-wise distributions, and adult/child visitor counts.

## Features

- **Interactive Date Range Filter**: Users can select start and end dates to filter data.
- **Dynamic Charts**: Visual representation of booking data with:
  - Time Series Chart for daily visitors
  - Country Chart for visitors by country
  - Sparklines for adult and child visitor counts
- **Responsive Design**: Optimized layout for various devices.

## Technologies Used

- **Frontend**:
  - React.js
  - TypeScript
  - CSS 
  - ApexCharts (for charting)
- **Testing**:
  - React Testing Library
  - Jest

## Getting Started

To get started with the Hotel Booking Dashboard, follow these steps:

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hotel-booking-dashboard.git
   cd hotel-booking-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:
```bash
npm start
```

Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Use the date range filter to select the desired booking period.
- The dashboard will automatically update the charts based on the selected dates.
- Explore the visualizations to gain insights into booking trends.

## Testing

To run the tests, use the following command:
```bash
npm test
```

This will start the test runner, and you can follow the on-screen instructions to view results.

## Contributing

Contributions are welcome! If you would like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message about the feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeatureName
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/) - JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript.
- [ApexCharts](https://apexcharts.com/) - Modern charting library that helps developers to create beautiful and interactive visualizations for web pages.



