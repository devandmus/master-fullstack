import React, {useEffect, useState} from 'react';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';
import Profile from './components/Profile';
import data from './components/PostList/data.json';

const App = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [section, setSection] = useState('home');

  const onLogoClick = () => setSection('home');
  const onProfileClick = () => setSection('profile');

  useEffect(() => {
    if (search === '') setPosts([...data]);
    else setPosts([
      ...data
        .filter(post => post.text
          .toLowerCase()
          .includes(search.toLowerCase())
        )]
    );
  }, [search]);

  return (
    <main>
      <NavBar onLogoClick={onLogoClick} onProfileClick={onProfileClick} />
      {section === 'home' && (
        <>
          <SearchBar value={search} onSearch={setSearch} />
          <PostList posts={posts} />
        </>
      )}

      {section === 'profile' &&
        <Profile
          avatar="./img/avatar.png"
          username="@alex"
          bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />}
    </main>
  )
}

export default App;
