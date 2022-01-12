import React, { useState } from "react";
import { Box } from "@mui/material";
import PokemonList from "./components/PokemonList";
import PokemonInfo from "./components/PokemonInfo";

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "neutral.light",
        display: "flex",
      }}
    >
      <PokemonList
        setSelectedPokemon={setSelectedPokemon}
        selectedPokemon={selectedPokemon}
      />
      <PokemonInfo pokemonName={selectedPokemon} />
    </Box>
  );
};

export default App;
