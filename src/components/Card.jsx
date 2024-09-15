import React, { useEffect, useState } from "react";
import CardInformation from "./CardInformation";
import InfiniteScroll from "react-infinite-scroll-component";

const Card = () => {
  // State variables for storing Pokémon data, filtered data, and various status flags
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0); // Offset for pagination (API fetch)
  const [hasMore, setHasMore] = useState(true); // Boolean to track if more Pokémon can be loaded
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering Pokémon

  // Function to fetch Pokémon data with the current offset
  const fetchPokemonData = async () => {
    setLoading(true); // Set loading state before fetching data
    try {
      // Fetch basic Pokémon data with limit and offset
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const data = await response.json();

      // Fetch detailed information for each Pokémon
      const detailPokemonData = await Promise.all(
        data.results.map(async (currPokemon) => {
          const res = await fetch(currPokemon.url);
          const pokemonDetails = await res.json();
          return pokemonDetails;
        })
      );

      // Merge new data with existing data and remove duplicates by Pokémon ID
      setPokemonData((prevData) => {
        const newPokemonData = [...prevData, ...detailPokemonData];
        const uniquePokemonData = newPokemonData.filter(
          (pokemon, index, self) =>
            index === self.findIndex((p) => p.id === pokemon.id) // Filter to ensure uniqueness
        );
        return uniquePokemonData;
      });

      // Check if more data exists; if not, set `hasMore` to false to stop fetching
      if (data.results.length > 0) {
        setOffset((prevOffset) => prevOffset + 5); // Increment offset for the next fetch
      } else {
        setHasMore(false); // No more data to fetch
      }
    } catch (error) {
      console.error(error);
      setError(error); // Set error state in case of failure
    } finally {
      setLoading(false); // Reset loading state after fetching
    }
  };

  // Fetch initial Pokémon data when the component mounts
  useEffect(() => {
    fetchPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this effect runs only once

  // Effect for filtering Pokémon based on search term
  useEffect(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim(); // Normalize search term

    // Filter Pokémon based on the search term
    setFilteredData(
      pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(normalizedSearchTerm) // Check if Pokémon name includes the search term
      )
    );
  }, [searchTerm, pokemonData]); // Re-run effect when either search term or Pokémon data changes

  // Error handling: if an error occurred, show error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Search input for Pokémon */}
      <input
        type="text"
        placeholder="Search Pokémon"
        className="p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
      />

      {/* Infinite scroll component for loading more Pokémon */}
      <InfiniteScroll
        dataLength={filteredData.length} // Tracks the number of displayed Pokémon
        next={fetchPokemonData} // Function to fetch more Pokémon when user scrolls down
        hasMore={hasMore} // Boolean flag to determine if more data can be loaded
        loader={loading ? <span className="loading loading-bars loading-md"></span> : null} // Show loading spinner while fetching data
        endMessage={<p>No more Pokémon to load</p>} // Message to show when no more data can be loaded
      >
        {/* Display Pokémon in a responsive grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredData.map((currPokemon) => (
            // Render CardInformation component for each Pokémon
            <CardInformation key={currPokemon.id} data={currPokemon} />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default Card;
