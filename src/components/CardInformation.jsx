import React from 'react';

const CardInformation = ({ data }) => {
  // Determine which image URL to use
  const getImageSrc = () => {
    if (data.sprites.other.dream_world.front_default) {
      return data.sprites.other.dream_world.front_default;
    }
    if (data.sprites.front_default) {
      return data.sprites.front_default;
    }
    if (data.sprites.other.home.front_default) {
      return data.sprites.other.home.front_default;
    }
    // Fallback to a default image or a placeholder if no image is available
    return 'path/to/default-image.png'; // Replace with the path to your default image
  };

  return (
    <li className="PokeCard w-80 p-4 border border-gray-300 rounded-3xl shadow-md bg-white text-center flex justify-between flex-col items-center gap-4">
      {/* Image Section */}
      <figure className="PokeImageArea w-32 h-32 bg-green-300 rounded-full cursor-pointer">
        <img
          src={getImageSrc()}
          alt={data.name}
          className="PokeImage w-28 h-28 mx-auto"
        />
      </figure>

      {/* Pokémon Name */}
      <h3 className="text-xl text-black capitalize">{data.name}</h3>

      {/* Pokémon Types */}
      <p className="text-white bg-black px-3 py-1 rounded-full">
        {data.types[0].type.name}
        {data.types[1] ? `, ${data.types[1].type.name}` : ""}
      </p>

      {/* Pokémon Stats Grid */}
      <div className="w-full h-full rounded-3xl bg-gray-300 p-5 grid grid-cols-3 gap-4">
        {/* Stat Block Example */}
        <div className="text-black flex flex-col items-center">
          <span className="text-white">{data.height / 10} m</span> {/* height in meters */}
          <span className="font-bold">Height</span>
        </div>
        <div className="text-black flex flex-col items-center">
          <span className="text-white">{data.weight / 10} kg</span> {/* weight in kilograms */}
          <span className="font-bold">Weight</span>
        </div>
        <div className="text-black flex flex-col items-center">
          <span className="text-white">{data.base_experience}</span>
          <span className="font-bold">Base XP</span>
        </div>

        {/* Pokémon Base Stats */}
        {data.stats.map((stat, index) => (
          <div key={index} className="text-black flex flex-col items-center">
            <span className="text-white">{stat.base_stat}</span>
            <span className="font-bold capitalize">{stat.stat.name}</span>
          </div>
        ))}
      </div>
    </li>
  );
};

export default CardInformation;
