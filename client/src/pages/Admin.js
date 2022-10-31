import React, { useEffect, useState } from "react";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const changeHandler = (value) => {
    setType(value.target.value);
    console.log(value.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
      email: email,
      type: type,
    };
    console.log(user);
    async function postData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
    postData("http://localhost:8080/api/v1/admin", user).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  }
  

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container m-5 border border-5 shadow d-flex flex-column align-items-center"
      >
        <label for user>
          Username
        </label>
        <br></br>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          id="user"
          size="50"
        ></input>
        <br></br>
        <label for email>
          Email
        </label>
        <br></br>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          size="50"
        ></input>
        <br></br>
        <label for pass>
          Password
        </label>
        <br></br>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="pass"
          size="50"
        ></input>
        <br></br>
        <select
          value={type}
          onChange={changeHandler}
          name="type"
          id="cars"
          width="100"
        >
          <br></br>
          <option value="Instructor">Instructor</option>
          <option value="Coporate trainee">Coporate trainee</option>
          <option value="Adminstrator">Adminstrator</option>
        </select>
        <br />
        <input type="submit" className="btn btn-outline-primary m-2" onClick={() => {alert('Added Succeesfully');}}></input>
      </form>
 
    </>
  );
}