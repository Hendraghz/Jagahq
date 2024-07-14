import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../api/queries";
import { useParams } from "react-router-dom";

interface CharacterData {
  character: {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    image: string;
    created: string;
  };
}

interface CharacterVars {
  id: string;
}

const DetailCharacter: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery<CharacterData, CharacterVars>(
    GET_CHARACTER,
    {
      variables: { id: id || "" },
      skip: !id,
    }
  );

  if (!id) {
    return <div>Error: No character ID provided</div>;
  }

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("Error loading character:", error);
    return <div>Error loading character</div>;
  }

  const character = data?.character;

  return (
    <div className="text-black pt-[2rem] px-10">
      {character && (
        <div className="character-details flex gap-5">
          <img
            src={character.image}
            alt={character.name}
            className="mb-4 rounded-lg"
          />
          <div className="text">
            <h1 className="text-2xl font-bold">{character.name}</h1>
            <p>
              <strong>Status:</strong> {character.status}
            </p>
            <p>
              <strong>Species:</strong> {character.species}
            </p>
            <p>
              <strong>Type:</strong> {character.type}
            </p>
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {new Date(character.created).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCharacter;
