import React, { useEffect, useState } from "react";
import CardInformation from "./CardInformation";
import InfiniteScroll from "react-infinite-scroll-component";

const Card = () => {
  // State variables
  const [pokemonData, setPokemonData] = useState([]); // Store all fetched Pokémon data
  const [filteredData, setFilteredData] = useState([]); // Store Pokémon data after search filtering
  const [loading, setLoading] = useState(true); // Track loading state for API fetches
  const [error, setError] = useState(null); // Track any error during data fetching
  const [offset, setOffset] = useState(0); // Offset for pagination (API fetch)
  const [hasMore, setHasMore] = useState(true); // Boolean to track if more Pokémon can be loaded
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering Pokémon

  // Function to fetch Pokémon data based on current offset
  const fetchPokemonData = async () => {
    setLoading(true); // Start loading before fetching data
    try {
      // Fetch Pokémon list (limit 20) based on the offset
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${offset}`);
      const data = await response.json();

      // Fetch detailed Pokémon information for each Pokémon in the results
      const detailPokemonData = await Promise.all(
        data.results.map(async (currPokemon) => {
          const res = await fetch(currPokemon.url); // Fetch detailed data from Pokémon URL
          const pokemonDetails = await res.json();
          return pokemonDetails; // Return Pokémon details
        })
      );

      // Merge new Pokémon data with existing data and remove duplicates by Pokémon ID
      setPokemonData((prevData) => {
        const newPokemonData = [...prevData, ...detailPokemonData]; // Combine old and new data
        const uniquePokemonData = newPokemonData.filter(
          (pokemon, index, self) => 
            index === self.findIndex((p) => p.id === pokemon.id && p.name === pokemon.name) // Ensure uniqueness by Pokémon ID
        );
        return uniquePokemonData;
      });

      // Check if more data is available, else stop loading more
      if (data.results.length > 0) {
        setOffset((prevOffset) => prevOffset + 8); // Increase offset for next API fetch
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.error(error);
      setError(error); // Set error if fetching fails
    } finally {
      setLoading(false); // Stop loading after fetching is complete
    }
  };

  // Fetch Pokémon data when the component is first rendered (on mount)
  useEffect(() => {
    fetchPokemonData(); // Initial data fetch
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures it runs only once

  // Effect to filter Pokémon based on the search term
  useEffect(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim(); // Normalize search term for case-insensitivity

    // Filter Pokémon whose names match the search term
    setFilteredData(
      pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(normalizedSearchTerm) // Check if Pokémon name includes the search term
      )
    );
  }, [searchTerm, pokemonData]); // Re-run filtering when search term or Pokémon data changes

  // If an error occurs, show error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Search input to filter Pokémon by name */}
      <input
        type="text"
        placeholder="Search Pokémon"
        className="p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
      />

      {/* Infinite scroll to load more Pokémon */}
      <InfiniteScroll
        dataLength={filteredData.length} // Track the number of displayed Pokémon
        next={fetchPokemonData} // Fetch more Pokémon when scrolling
        hasMore={hasMore} // If `hasMore` is true, keep fetching more
        loader={loading ? <span className="loading loading-bars loading-md"></span> : null} // Show loading indicator while data is being fetched
        endMessage={<p>No more Pokémon to load</p>} // Message when no more data can be loaded
      >
        {/* Display Pokémon in a responsive grid layout */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredData.map((currPokemon, index) => (
            // Render each Pokémon using the CardInformation component
            <CardInformation key={currPokemon.id} data={currPokemon} index={index} />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default Card;
