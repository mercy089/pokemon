# Pokémon Card Viewer

A React application for viewing Pokémon information with a search feature and infinite scrolling. Built using Vite for rapid development and Tailwind CSS for styling.

## Features

- **Search Functionality**: Find and display specific Pokémon by name.
- **Infinite Scrolling**: Automatically loads more Pokémon as you scroll.
- **Detailed Pokémon Cards**: Shows Pokémon images, names, types, and stats.
- **Responsive Design**: Adapts to various screen sizes using Tailwind CSS.

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Pokémon API**: Provides Pokémon data.

## Setup

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repository-name
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Your application will be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

- **`src/`**: Contains the source code for the application.
  - **`components/`**: Reusable components.
    - **`CardInformation.jsx`**: Displays individual Pokémon card information.
    - **`Card.jsx`**: Handles fetching and rendering of Pokémon cards with infinite scrolling.
    - **`SearchBar.jsx`**: Allows users to search for specific Pokémon.
  - **`pages/`**: Contains page components.
    - **`Pokemon.jsx`**: Main page that displays the Pokémon cards and search functionality.
  - **`App.jsx`**: Main application component.
  - **`index.jsx`**: Entry point for the React application.
- **`public/`**: Static assets.
- **`tailwind.config.js`**: Tailwind CSS configuration file.
- **`vite.config.js`**: Vite configuration file.

## Usage

1. **Search for Pokémon**:
   - Use the search bar to enter a Pokémon name.
   - The app will fetch and display the corresponding Pokémon card.

2. **View Pokémon Data**:
   - Scroll down to load more Pokémon cards.
   - Each card includes an image, name, types, and stats.

## Adding the Search Feature

1. **SearchBar Component**:
   - Create a `SearchBar.jsx` component for handling search input and updating the displayed Pokémon data.

2. **Card Component**:
   - Update the `Card.jsx` component to fetch and display the Pokémon based on the search input.

3. **Pokemon Page**:
   - Integrate the search functionality with the `Pokemon.jsx` page.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Pokémon API](https://pokeapi.co/)

```

This `README.md` file includes instructions for adding the search feature and is tailored for a professional presentation. Adjust any URLs or paths to match your actual project details.