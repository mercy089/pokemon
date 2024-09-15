import React, { useEffect, useState } from "react";
import CardInformation from "./CardInformation";
import InfiniteScroll from "react-infinite-scroll-component";

const Card = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPokemonData = async () => {
    setLoading(true);
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

      setPokemonData((prevData) => {
        const newPokemonData = [...prevData, ...detailPokemonData];
        const uniquePokemonData = newPokemonData.filter(
          (pokemon, index, self) =>
            index === self.findIndex((p) => p.id === pokemon.id)
        );
        return uniquePokemonData;
      });

      if (data.results.length > 0) {
        setOffset((prevOffset) => prevOffset + 5);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();

    setFilteredData(
      pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(normalizedSearchTerm)
      )
    );
  }, [searchTerm, pokemonData]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon"
        className="p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <InfiniteScroll
        dataLength={filteredData.length}
        next={fetchPokemonData}
        hasMore={hasMore}
        loader={loading ? <span className="loading loading-bars loading-md"></span> : null}
        endMessage={<p>No more Pokémon to load</p>}
      >
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredData.map((currPokemon) => (
            <CardInformation key={currPokemon.id} data={currPokemon} />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default Card;
