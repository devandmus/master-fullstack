const likesParser = l => l > 1000 ? `${(l/1000).toFixed(1)}K` : l;

const cooldownParser = time => {
  const secondsRef = {
    day: 86400,
    hour: 3600,
    minute: 60,
  }
  const totalSeconds = parseInt((new Date().getTime() - time.getTime()) / 1000);
  const days = parseInt(totalSeconds / secondsRef.day);
  if (days > 0)
    return days + ' day' + (days > 1 ? 's' : '');

  const hours = parseInt((totalSeconds % secondsRef.day) / secondsRef.hour);
  if (hours > 0)
    return hours + ' hour' + (hours > 1 ? 's' : '');

  const minutes = parseInt((totalSeconds % secondsRef.hour) / secondsRef.minute);
  if (minutes > 0)
    return minutes + ' minute' + (minutes > 1 ? 's' : '');

  const seconds = (totalSeconds % secondsRef.minute);
  return seconds + ' second' + (seconds > 1 ? 's' : '');
}

export {
  likesParser,
  cooldownParser,
}