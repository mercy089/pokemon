import React from 'react';

const CardInformation = ({ data, index }) => {
  // Function to determine which image URL to use based on available sprite data
  const getImageSrc = () => {
    // Check if dream_world image is available
    if (data.sprites.other.dream_world.front_default) {
      return data.sprites.other.dream_world.front_default;
    }
    // If not, check for front_default sprite
    if (data.sprites.front_default) {
      return data.sprites.front_default;
    }
    // Check for the home image sprite as a fallback
    if (data.sprites.other.home.front_default) {
      return data.sprites.other.home.front_default;
    }
    // Return null if no valid image is available
    return null;
  };

  // Get the image source using the helper function
  const imageSrc = getImageSrc();

  // If no image is available, do not render the card
  if (!imageSrc) {
    return null; // Return null to prevent rendering if no image is found
  }

  return (
    <li className="PokeCard w-80 p-4 border border-gray-300 rounded-3xl shadow-md bg-white text-center flex justify-between flex-col items-center gap-4">
      {/* Image Section */}
      <figure className="PokeImageArea w-32 h-32 bg-green-300 rounded-full cursor-pointer">
        <img
          src={imageSrc} // Image source
          alt={data.name} // Image alt text using Pokémon name
          className="PokeImage w-36 h-36 mx-auto" // Style for image size and positioning
        />
      </figure>

      {/* Pokémon Name and Index */}
      <h3 className="text-xl text-black capitalize">{data.name},{index+1}</h3> {/* Display Pokémon name and its index */}

      {/* Pokémon Types */}
      <p className="text-white bg-black px-3 py-1 rounded-full">
        {data.types[0].type.name} {/* Primary type */}
        {data.types[1] ? `, ${data.types[1].type.name}` : ""} {/* Secondary type if available */}
      </p>

      {/* Pokémon Stats Grid */}
      <div className="w-full h-full rounded-3xl bg-gray-300 p-5 grid grid-cols-3 gap-4">
        {/* Height Stat */}
        <div className="text-black flex flex-col items-center">
          <span className="text-white">{data.height / 10} m</span> {/* Height in meters */}
          <span className="font-bold">Height</span>
        </div>
        {/* Weight Stat */}
        <div className="text-black flex flex-col items-center">
          <span className="text-white">{data.weight / 10} kg</span> {/* Weight in kilograms */}
          <span className="font-bold">Weight</span>
        </div>
        {/* Base Experience Stat */}
        <div className="text-black flex flex-col items-center">
          <span className="text-white">{data.base_experience}</span> {/* Base XP */}
          <span className="font-bold">Base XP</span>
        </div>

        {/* Pokémon Base Stats - Loop through stats array */}
        {data.stats.map((stat, index) => (
          <div key={index} className="text-black flex flex-col items-center">
            <span className="text-white">{stat.base_stat}</span> {/* Stat value */}
            <span className="font-bold capitalize">{stat.stat.name}</span> {/* Stat name */}
          </div>
        ))}
      </div>
    </li>
  );
};

export default CardInformation;
