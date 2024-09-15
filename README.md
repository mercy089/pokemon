# Pokémon Card Viewer

A React application that fetches and displays Pokémon data with infinite scrolling. Built with Vite for fast development and Tailwind CSS for styling.

## Features

- **Infinite Scrolling**: Loads more Pokémon data as you scroll.
- **Pokémon Information**: Displays Pokémon images, names, types, and stats.
- **Responsive Design**: Works on various screen sizes with Tailwind CSS.

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool and development server.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Pokémon API**: Provides Pokémon data.

## Setup

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

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

   Your application should now be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

- **`src/`**: Contains the source code for the application.
  - **`components/`**: Reusable components.
    - **`CardInformation.jsx`**: Displays individual Pokémon card information.
    - **`Card.jsx`**: Handles fetching and rendering of Pokémon cards with infinite scrolling.
  - **`pages/`**: Contains page components.
    - **`Pokemon.jsx`**: Main page that displays the Pokémon cards.
  - **`App.jsx`**: Main application component.
  - **`index.jsx`**: Entry point for the React application.
- **`public/`**: Static assets.
- **`tailwind.config.js`**: Tailwind CSS configuration file.
- **`vite.config.js`**: Vite configuration file.

## Usage

- The application will fetch and display Pokémon data as you scroll down the page.
- Each Pokémon card shows an image, name, types, and stats.

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

Feel free to modify the instructions and information as needed for your specific project.