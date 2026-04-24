import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    return fetch("http://localhost:3000/users");
  }

  function postUser(person) {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }

  function deleteUser(id) {
    return fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
  }

  function removeOneCharacter(id) {
  deleteUser(id)
    .then((response) => {
      if (response.status !== 204) {
        throw new Error("User was not deleted");
      }

      setCharacters((prevCharacters) =>
        prevCharacters.filter((character) => character._id !== id)
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("User was not created");
        }
        return response.json();
      })
      .then((createdUser) => {
        setCharacters((prevCharacters) => [...prevCharacters, createdUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
