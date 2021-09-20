const likesParser = l => l > 1000 ? `${(l/1000).toFixed(1)}K` : l;

export {
  likesParser,
}