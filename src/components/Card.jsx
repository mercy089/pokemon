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
  const [isSearching, setIsSearching] = useState(false); // Track if user is searching

  // Function to fetch Pokémon data based on current offset or search term
  const fetchPokemonData = async (pokemonName = "") => {
    setLoading(true); // Start loading before fetching data
    try {
      if (pokemonName) {
        // If searching, fetch the specific Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        const pokemonDetails = await response.json();
        setFilteredData([pokemonDetails]); // Display only the searched Pokémon
        setIsSearching(true); // Mark that we're in search mode
        setHasMore(false); // Disable infinite scroll since it's a specific result
      } else {
        // If not searching, fetch the Pokémon list with pagination
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${offset}`);
        const data = await response.json();

        // Fetch detailed Pokémon information for each Pokémon in the results
        const detailPokemonData = await Promise.all(
          data.results.map(async (currPokemon) => {
            const res = await fetch(currPokemon.url);
            const pokemonDetails = await res.json();
            return pokemonDetails;
          })
        );

        // Merge new Pokémon data with existing data and remove duplicates by Pokémon ID
        setPokemonData((prevData) => {
          const newPokemonData = [...prevData, ...detailPokemonData]; // Combine old and new data
          const uniquePokemonData = newPokemonData.filter(
            (pokemon, index, self) =>
              index === self.findIndex((p) => p.id === pokemon.id && p.name === pokemon.name) // Ensure uniqueness
          );
          return uniquePokemonData;
        });

        // Set filtered data to the full dataset (used when not searching)
        setFilteredData((prevData) => [...prevData, ...detailPokemonData]);

        // Check if more data is available, else stop loading more
        if (data.results.length > 0) {
          setOffset((prevOffset) => prevOffset + 8); // Increase offset for next API fetch
        } else {
          setHasMore(false); // No more data to load
        }
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

  // Effect to handle search and reset when search term is cleared
  useEffect(() => {
    if (searchTerm === "") {
      // If search term is cleared, reset to default fetch behavior
      setFilteredData(pokemonData); // Reset filtered data to full Pokémon list
      setIsSearching(false); // Exit search mode
      setHasMore(true); // Enable infinite scroll again
    }
  }, [searchTerm, pokemonData]);

  // Handle form submission for the search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchPokemonData(searchTerm); // Fetch the specific Pokémon by search term
    }
  };

  // If an error occurs, show error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Search form to filter Pokémon by name */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search Pokémon"
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
                    // Update search term on input change
        />
        <button type="submit" className="p-2 ml-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      {/* Infinite scroll to load more Pokémon */}
      {!isSearching && (
        <InfiniteScroll
          dataLength={filteredData.length} // Track the number of displayed Pokémon
          next={() => fetchPokemonData()} // Fetch more Pokémon when scrolling
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
      )}

      {/* Display search results without infinite scroll if searching */}
      {isSearching && (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredData.map((currPokemon, index) => (
            // Render each Pokémon using the CardInformation component
            <CardInformation key={currPokemon.id} data={currPokemon} index={index} />
          ))}
        </ul>
      )}

      {/* Loading and feedback messages */}
      {loading && <p>Loading...</p>}
      {!loading && filteredData.length === 0 && <p>No Pokémon found.</p>}
    </div>
  );
};

export default Card;

