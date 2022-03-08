import React, { useEffect, useState, useCallback } from 'react';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList';
import Profile from './components/Profile';
import Login from './components/Login';
import { Switch, Route } from 'react-router-dom';
import { removeUser, storeUser, getUser } from './services.helpers';
import { useHistory } from 'react-router-dom';
import { GetPosts, ValidateUser } from './services';

const App = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const { replace, location: { pathname }} = useHistory();

  const onClickLogout = () => loggout();

  const initSession = async user => {
    await storeUser(user);
    setCurrentUser({...user});
  }

  const onLoginComplete = async user => {
    await initSession(user);
    await getPosts();
  }

  const loggout = useCallback(() => {
    removeUser();
    replace('/login');
    setCurrentUser({...{}});
  }, [replace, setCurrentUser])

  const getPosts = useCallback(async () => {
    if (getUser())
      await GetPosts({ loggout })
        .then(({ data }) => {
          setPosts(data);
          replace('/');
        });
    else loggout()
  }, [loggout, replace])

  useEffect(() => {
    if (Object.keys(currentUser).length === 0 && getUser())
      ValidateUser({ loggout })
        .then(({ data }) => {
          initSession(data);
          replace('/');
        });
    else if(pathname === '/' && posts.length === 0)
      getPosts();
  }, [currentUser, posts, pathname, loggout, getPosts, replace]);

  return (
    <main>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <SearchBar value={search} onSearch={setSearch} />
          <PostList posts={posts.filter(post => post.text.includes(search))} />
        </Route>
        <Route path="/profile" exact>
          <Profile
            avatar={currentUser.avatar || ''}
            username={currentUser.username || ''}
            bio={currentUser.bio || ''}
            onClickLogout={onClickLogout}
          />
        </Route>
        <Route path="/login" exact>
          <Login onLoginComplete={onLoginComplete} />
        </Route>
        <Route render={() => replace('/login')} />
      </Switch>
    </main>
  )
}

export default App;
