import React from "react";
import Card from "../components/Card";

const Pokemon = () => {
  return (
    <div className="flex items-center flex-col gap-10 mt-10">
      <header>
        <h1 className="ewert-regular text-white text-2xl sm:text-3xl md:text-5xl select-none">
          Let&apos;s Catch Pokemon
        </h1>
      </header>
      <Card />
    </div>
  );
};

export default Pokemon;
