import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import axios from "axios";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";

const overrideLoaderCss = css`
  display: block;
  margin: 10px auto;
  width: 100%;
`;
const PokemonList = ({ setSelectedPokemon, selectedPokemon }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [offset, setOffset] = useState(0);

  const urlFetch = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}}&limit=30`;

  const nextPage = (e) => {
    e.preventDefault();
    setOffset((prev) => prev + 30);

    if (offset >= 100) return;
  };

  const prevPage = (e) => {
    e.preventDefault();
    setOffset((prev) => prev - 30);
    if (offset <= 0) return;
  };

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(urlFetch)
        .then((response) => {
          setPokemonList(response.data.results);
        })
        .catch((e) => {
          setIsError(true);
        })
        .then(() => {
          setIsLoading(false);
        });
    };

    if (!ignore) {
      fetchData();
    }
    return () => {
      ignore = true;
    };
  }, [offset]);

  return (
    <Box sx={{ p: 1 }} className="pokemonList-container">
      {isError ? (
        <Typography variant="h6">Something went wrong</Typography>
      ) : isLoading ? (
        <BeatLoader
          color="#cccccc"
          loading={isLoading}
          size={15}
          margin={10}
          css={overrideLoaderCss}
        />
      ) : (
        <>
          <Box
            sx={{
              maxHeight: "calc(100% - 50px)",
              overflow: "hidden",
              overflowY: "auto",
            }}
            className="pokemonList"
          >
            {pokemonList?.map((pokemon, idx) => {
              return (
                <Box
                  key={idx}
                  onClick={(e) => {
                    setSelectedPokemon(pokemon.name);
                  }}
                  className={
                    selectedPokemon === pokemon.name
                      ? "active pokemon"
                      : "pokemon"
                  }
                >
                  <Typography variant="h6" className="pokemonName">
                    {pokemon.name}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              onClick={prevPage}
              disabled={offset === 0 ? true : false}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton onClick={nextPage}>
              <ChevronRight />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
};

export default PokemonList;
