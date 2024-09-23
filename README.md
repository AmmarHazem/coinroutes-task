# Cryptocurrency Order Book

This React application displays a real-time order book for cryptocurrencies using data from the Coinbase WebSocket API. It provides a live view of bids and asks for selected trading pairs, allowing users to observe market depth and price movements in real-time.

## Features

- Real-time order book updates via WebSocket connection
- Display of bids and asks in separate tables
- Aggregation options for price levels
- Responsive design for various screen sizes

## Technologies Used

- React
- Redux Toolkit for state management
- TypeScript for type safety
- Chakra UI for styling and components
- WebSocket API for real-time data

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/crypto-order-book.git
   ```

2. Navigate to the project directory:
   ```
   cd crypto-order-book
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Project Structure

- `src/components`: React components for the UI
- `src/redux`: Redux store setup and slices
- `src/models`: TypeScript interfaces and types
- `src/constants`: Constant values used throughout the app

## Key Components

- `OrderBook`: Main component that renders the entire order book
- `OrderBookBidsTable` and `OrderBookAsksTable`: Components for displaying bids and asks
- `OrderBookAggregationSelect`: Component for selecting price aggregation levels

## State Management

The application uses Redux Toolkit for state management. The `orderBookSlice` handles the state updates for the order book data, including:

- Setting the initial snapshot
- Updating bids and asks
- Handling price aggregation

## WebSocket Connection

The application establishes a WebSocket connection to the Coinbase API to receive real-time order book updates. The connection is managed in a separate service, and updates are dispatched to the Redux store.

## Styling

Chakra UI is used for styling components and providing a consistent look and feel across the application. Custom color constants are defined in the `constants.ts` file.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Deployed App URL

https://coinroutes-task.vercel.app
