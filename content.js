const selectorPatterns = [
  // navigation
  '[aria-label="Grok"]',
  '[aria-label="Jobs"]',
  '[aria-label="Communities"]',
  '[aria-label="Premium"]',
  '[aria-label="Verified Orgs"]',
  '[aria-label="Community Notes"]',

  // feed list
  // TODO: this is used everywhere so don't filter yet
  // '[data-testid="ScrollSnap-SwipeableList"]',

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
];

const STYLE_ID = 'sanctum-feed-blocker-style';
let style = document.getElementById(STYLE_ID)
if (!style) {
  style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `${selectorPatterns.join(',')} { display:none !important; }`;
  document.head.appendChild(style);
}
