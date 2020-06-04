import React, { useState } from 'react';
function GithubData() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [repositories, setRepositories] = useState();

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const profile = await fetch(
      `https://api.github.com/search/users?q=${userName}`
    );
    const profileJson = await profile.json();
    setUsers(profileJson.items);
    console.log(profileJson);
  };

  let data;

  const getRepositries = (id) => async (e) => {
    e.preventDefault();
    const repositories = await fetch(
      `https://api.github.com/users/${id}/repos`
    );
    const repositoriesJson = await repositories.json();
    console.log('workingggggg22222', repositoriesJson);
    data = repositoriesJson;
    console.log(data, 'data');
    setRepositories(repositoriesJson);
    console.log(repositories, 'repoiouiygfhvds');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <input
          type="text"
          placeholder="Search Github User"
          onChange={handleChange}
        ></input>
        <button type="submit" style={{ cursor: 'pointer' }}>
          Serach
        </button>
      </form>
      {users.map((elem, i) => {
        return (
          <div style={{ marginTop: '50px' }}>
            <li
              onClick={getRepositries(elem.login)}
              style={{
                cursor: 'pointer',
                float: 'left',
                width: '500px',
                listStyleType: 'none',
              }}
              id="liValue"
              key={i}
            >
              {elem.login}{' '}
              <img
                src={elem.avatar_url}
                alt="avatar"
                height="20px"
                width="20px"
              ></img>
            </li>
          </div>
        );
      })}
      <div style={{ marginRight: '100px' }}>
        {repositories ? (
          <h2>Number of repositories: {repositories.length}</h2>
        ) : null}{' '}
      </div>

      <table style={{ marginLeft: '100px' }}>
        {repositories ? (
          <thead>
            <tr style={{ border: '1px solid #333' }}>
              <th> S.no</th>
              <th>Project Name</th>
              <th>Project Date</th>
            </tr>
          </thead>
        ) : null}
        <tbody>
          {repositories
            ? repositories.map((elem, index = 1) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{elem.name}</td>
                    <td>{new Date(elem.created_at).toLocaleDateString()}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default GithubData;
