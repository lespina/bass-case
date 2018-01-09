const ONE_MINUTE = 60;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_WEEK = 7 * ONE_DAY;
const ONE_MONTH = 30 * ONE_DAY;
const ONE_YEAR = 365 * ONE_DAY;

export const timeSince = (oldTime) => {
  const currentTime = new Date();
  const now = currentTime.getTime() / 1000;
  const then = new Date(oldTime).getTime() / 1000;
  const secondsSince = Math.floor(now - then);

  if (secondsSince < ONE_MINUTE) {
    return ((secondsSince === 1) ? `1 second ago` : `${secondsSince} seconds ago`);
  } else if (secondsSince < ONE_HOUR) {
    const minutesSince = Math.floor(secondsSince / ONE_MINUTE);
    return ((minutesSince === 1) ? `1 minute ago` : `${minutesSince} minutes ago`);
  } else if (secondsSince < ONE_DAY) {
    const hoursSince = Math.floor(secondsSince / ONE_HOUR);
    return ((hoursSince === 1) ? `1 hour ago` : `${hoursSince} hours ago`);
  } else if (secondsSince < ONE_WEEK) {
    const daysSince = Math.floor(secondsSince / ONE_DAY);
    return ((daysSince === 1) ? `1 day ago` : `${daysSince} days ago`);
  } else if (secondsSince < ONE_MONTH) {
    const weeksSince = Math.floor(secondsSince / ONE_WEEK);
    return ((weeksSince === 1) ? `1 week ago` : `${weeksSince} weeks ago`);
  } else if (secondsSince < ONE_YEAR) {
    const monthsSince = Math.floor(secondsSince / ONE_MONTH);
    return ((monthsSince === 1) ? `1 month ago` : `${monthsSince} months ago`);
  } else {
    const yearsSince = Math.floor(secondsSince / ONE_YEAR);
    return ((yearsSince === 1) ? `1 year ago` : `${yearsSince} years ago`);
  }
};

export const formatPlays = (plays) => {
  if (plays < 1000) { return plays; }
  if (plays < 1000000) { return `${Math.floor(plays / 100) / 10}K`; }
  if (plays < 1000000000) { return `${Math.floor(plays / 100000) / 10}M`; }
  return plays;
};
