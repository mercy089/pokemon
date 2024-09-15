import React, { useEffect, useState } from "react";
import CardInformation from "./CardInformation";
import InfiniteScroll from "react-infinite-scroll-component";

const Card = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading set to true
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemonData = async () => {
    setLoading(true); // Set loading to true before fetching the data
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const data = await response.json();

      const detailPokemonData = await Promise.all(
        data.results.map(async (currPokemon) => {
          const res = await fetch(currPokemon.url);
          const pokemonDetails = await res.json();
          return pokemonDetails;
        })
      );

      // Check for duplicates and append only unique Pokémon
      setPokemonData((prevData) => {
        const newPokemonData = [...prevData, ...detailPokemonData];
        const uniquePokemonData = newPokemonData.filter(
          (pokemon, index, self) =>
            index === self.findIndex((p) => p.id === pokemon.id)
        );
        return uniquePokemonData;
      });

      // Check if more data exists
      if (data.next) {
        setOffset((prevOffset) => prevOffset + 20); // Update the offset for the next batch
      } else {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    fetchPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <InfiniteScroll
      dataLength={pokemonData.length}
      next={fetchPokemonData}
      hasMore={hasMore}
      loader={loading ? <span className="loading loading-bars loading-md"></span> : null} // Display the loader if loading is true
      endMessage={<p>No more Pokémon to load</p>}
    >
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pokemonData.map((currPokemon) => (
          <CardInformation key={currPokemon.id} data={currPokemon} />
        ))}
      </ul>
    </InfiniteScroll>
  );
};

export default Card;
