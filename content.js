const hostname = window.location.hostname;
const service = getService(hostname);
if (!service) {
  throw new Error('Unhandled hostname ${hostname}')
}

const selectorPatternsByService = {
  'reddit': [
    // home feed
    'shreddit-feed[reload-url*="home-feed"]',

    // recent posts
    'recent-posts',
  ],
  'twitter': [
    // navigation
    '[aria-label="Grok"]',
    '[aria-label="Jobs"]',
    '[aria-label="Communities"]',
    '[aria-label="Premium"]',
    '[aria-label="Verified Orgs"]',
    '[aria-label="Community Notes"]',

    // feed, timeline, home
    '[aria-label="Timeline: Your Home Timeline"]',
    '[data-testid="primaryColumn"] div[aria-label="Timeline"]',
    '[role="region"][aria-label*="Timeline"]',

    // new posts
    '[aria-label="New posts are available. Push the period key to go to the them."]',

    // explore
    '[aria-label="Timeline: Explore"]',

    // trending, sidebar
    '[aria-label="Trending"]',
    '[data-testid="sideColumn"] div[aria-label="Timeline"]',
  ],
};
const selectorPatterns = selectorPatternsByService[service];

const STYLE_ID = 'sanctum-feed-blocker-style';
if (document.getElementById(STYLE_ID)) return;

const style = document.createElement('style');
style.id = STYLE_ID;
style.textContent = `${selectorPatterns.join(',')} { display:none !important; }`;

document.head.appendChild(style);

function getService(hostname) {
  const baseDomain = hostname.split('.').slice(-2).join('.');
  switch (baseDomain) {
    case 'reddit.com':
      return 'reddit';
    case 'twitter.com':
    case 'x.com':
      return 'twitter';
    default:
      return null;
  }
}
