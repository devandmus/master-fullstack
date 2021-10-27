import React, { useLayoutEffect, useState } from 'react';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';
import Profile from './components/Profile';
import * as Users from './helpers/Users';
import Login from './components/Login';
import data from './components/PostList/data.json';
import { BsFillLightningFill } from 'react-icons/bs';

const App = () => {
  const [search, setSearch] = useState('');
  const [posts, ] = useState([...data]);
  const [section, setSection] = useState('home');
  const [loginOk, setLoginOk] = useState(false);
  const [loading, setLoading] = useState(true);

  const onLogoClick = () => setSection('home');
  const onProfileClick = () => setSection('profile');
  const onLoginComplete = async id => {
    await Users.storeUser(id);
    setLoginOk(true);
  }

  useLayoutEffect(() => {
    (async() => {
      const response = await Users.checkLoggedUser();
      if (response)
        setLoginOk(true);
      setLoading(false);
    })();
  }, []);

  if (loading)
    // decidí dejar esto como pantalla de espera para la validación
    return (
      <div className="p-5 text-center">
        <BsFillLightningFill style={{ transform: 'scale(2)' }}/>
        <h1 className="mt-3">Three Pics</h1>
        <p>Validating</p>
      </div>
    );

  return (
    <main>
      <NavBar onLogoClick={onLogoClick} onProfileClick={onProfileClick} loginOk={loginOk}/>
      {loginOk ? (
        <>
          {section === 'home' && (
            <>
              <SearchBar value={search} onSearch={setSearch} />
              <PostList posts={posts} search={search} />
            </>
          )}

          {section === 'profile' &&
          <Profile
            avatar="./img/avatar.png"
            username="@alex"
            bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />}
        </>
      ) : (
        <Login onLoginComplete={onLoginComplete} />
      )}
    </main>
  )
}

export default App;
