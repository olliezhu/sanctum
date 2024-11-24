const feedSelectors = [
  '[aria-label="Timeline: Your Home Timeline"]',
  '[data-testid="primaryColumn"] div[aria-label="Timeline"]',
  '[role="region"][aria-label*="Timeline"]',
];

// Combine selectors for efficient querying
const combinedSelector = feedSelectors.join(",");

// Flag to prevent multiple executions
let isHiding = false;

function hideTwitterFeed() {
  if (isHiding) return;
  isHiding = true;

  // Disconnect observer to prevent recursive triggers
  observer.disconnect();

  const feeds = document.querySelectorAll(combinedSelector);
  feeds.forEach((feed) => {
    if (feed.style.display !== "none") {
      feed.style.display = "none";
    }
  });

  // Reconnect observer
  observer.observe(mainContent, {
    childList: true,
    subtree: true,
  });

  isHiding = false;
}

// Use MutationObserver with optimized callback
const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.type === "childList") {
      for (let node of mutation.addedNodes) {
        if (node.nodeType === 1) {
          // ELEMENT_NODE
          if (
            node.matches(combinedSelector) ||
            node.querySelector(combinedSelector)
          ) {
            hideTwitterFeed();
            return; // Exit early
          }
        }
      }
    }
  }
});

// Start observing a specific container if possible
const mainContent = document.querySelector('[role="main"]') || document.body;

observer.observe(mainContent, {
  childList: true,
  subtree: true,
});

// Initial hide
hideTwitterFeed();
