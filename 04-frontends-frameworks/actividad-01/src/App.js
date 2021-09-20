import React from 'react';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import PostList from './components/PostList/PostList';

function App() {
  return (
    <main>
      <NavBar />
      <div className="container">
        <div className="row pt-3">
          <SearchBar />
        </div>
        <PostList />
      </div>
    </main>
  );
}

export default App;
