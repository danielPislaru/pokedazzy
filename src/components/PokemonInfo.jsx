import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import PokeballImage from "../../src/assets/pokeball.png";
import axios from "axios";

const PokemonInfo = ({ pokemonName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const urlFetch = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  const [pokemon, setPokemon] = useState({
    name: "",
    type: "",
    experience: 0,
    height: 0,
    weight: 0,
    image: "",
    stats: [],
    urlSpecies: null,
    species: {},
  });
  useEffect(() => {
    let ignore = false;

    setIsError(false);
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(urlFetch)
        .then((response) => {
          console.log(response.data);
          setPokemon({
            ...pokemon,
            name: response.data.name,
            type: response.data.types[0].type.name,
            experience: response.data.base_experience,
            height: response.data.height,
            weight: response.data.weight,
            image: response.data.sprites.other.dream_world.front_default,
            stats: response.data.stats,
            urlSpecies: response.data.species.url,
          });
        })
        .catch((e) => {
          setIsError(true);
        })
        .then(() => {
          setIsLoading(false);
        });
    };

    if (!ignore && pokemonName) {
      pokemonName && fetchData();
    }
    return () => {
      ignore = true;
    };
  }, [pokemonName]);

  const StartScreen = () => {
    return (
      <Box
        className="startScreen-container"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={PokeballImage}
          alt="pokeball"
          style={{ width: "100%", maxWidth: "200px" }}
        />
        <Typography variant="h4">Please select a pokemon</Typography>
      </Box>
    );
  };

  return (
    <Box className="pokemon-infoContainer">
      {isError ? (
        <Typography variant="h6">Something went wrong</Typography>
      ) : isLoading ? (
        <>Loading...</>
      ) : (
        <>
          {!pokemonName && <StartScreen />}
          {pokemonName && (
            <Box className={`pokemonContainer ${pokemon.type}`}>
              <Box className="basicInfo">
                <img
                  src={pokemon.image}
                  alt="pokemon"
                  className="imagePokemon"
                />
                <Typography variant="h1" align="center" className="name">
                  {pokemonName}
                </Typography>
              </Box>
              <Box className="measure">
                <Box className={`iconType ${pokemon.type}`}>
                  <img src={`../assets/icons/${pokemon.type}.svg`} alt="type" />
                </Box>
                <Box className="weight">
                  <Typography variant="h4" className="value">
                    {pokemon.weight} lbs
                  </Typography>
                  <Typography variant="h6" className="title">
                    Weight
                  </Typography>
                </Box>
                <Box className="experience">
                  <Typography variant="h4" className="value">
                    {pokemon.experience}
                  </Typography>
                  <Typography variant="h6" className="title">
                    Experience
                  </Typography>
                </Box>
                <Box className="height">
                  <Typography variant="h4" className="value">
                    {pokemon.height} "
                  </Typography>
                  <Typography variant="h6" className="title">
                    Height
                  </Typography>
                </Box>
              </Box>
              <Box className={`stats ${pokemon.type} `}>
                {pokemon.stats.map((item, idx) => {
                  return (
                    <Box key={idx} className={item.stat.name}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Typography
                          variant="h6"
                          className="title"
                          color="primary.neutral.light"
                          sx={{
                            color: "primary.neutral.light",
                          }}
                        >
                          {item.stat.name}
                        </Typography>
                        <Typography variant="h4" className="value">
                          {item.base_stat}
                        </Typography>
                      </Box>
                      <Box className="progress">
                        <Box
                          className="linear"
                          sx={{ width: `${item.base_stat}%` }}
                        ></Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default PokemonInfo;
