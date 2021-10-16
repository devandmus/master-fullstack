import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Login as ServiceLogin } from '../services';

const Login = ({ onLoginComplete }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlerSubmit = () => {
    setLoading(true);
    ServiceLogin({
      username,
      password,
    })
      .then(user => {
        if (user)
          onLoginComplete(user)
        else throw new Error('logging error');
      })
    .catch(() => {
      setError(true);
      setLoading(false);
      setUsername('');
      setPassword('');
    });
  };

  return (
    <section className="py-5 px-3 mx-auto" style={{ maxWidth: 500 }}>
      {loading ? <h3>Loading...</h3> : (
        <>
          {error && (
            <div className="alert alert-danger" role="alert">
              Invalid username or password
            </div>
          )}
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlerSubmit}
          >Login</button>
        </>
      )}
    </section>
  );
};

Login.propTypes = {
  onLoginComplete: PropTypes.func.isRequired,
}

export default Login;
