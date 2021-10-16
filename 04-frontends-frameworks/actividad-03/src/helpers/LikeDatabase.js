const getLikes = id => parseInt(localStorage.getItem(id));

const setLikes = (id, likes) => {
  localStorage.setItem(id, likes || 0);
  return likes;
}

export {
  getLikes,
  setLikes,
}