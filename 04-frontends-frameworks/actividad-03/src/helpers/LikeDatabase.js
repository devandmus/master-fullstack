const getLikes = id => parseInt(localStorage.getItem(id)) || 0;

const setLikes = (id, likes) => {
  localStorage.setItem(id, likes || 0);
  return likes;
}

export {
  getLikes,
  setLikes,
}