/**
 * YouTube Grid Pro — content.js
 * Applies CSS overrides to the YouTube home feed based on stored settings.
 */

const STYLE_ID = 'yt-grid-pro-styles';

const DEFAULTS = {
  videosPerRow: 5,
  shortsPerRow: 8,
  showShorts: true,
  minWidth: 1800
};

function applyStyles(settings) {
  const existing = document.getElementById(STYLE_ID);
  if (existing) existing.remove();

  if (window.innerWidth < settings.minWidth) return;

  const videoWidth = `calc((100% - ${(settings.videosPerRow - 1) * 16}px) / ${settings.videosPerRow})`;
  const shortWidth = `calc((100% - ${(settings.shortsPerRow - 1) * 8}px) / ${settings.shortsPerRow})`;

  const css = `
    /* Videos per row */
    ytd-rich-grid-renderer {
      --ytd-rich-grid-items-per-row: ${settings.videosPerRow} !important;
    }
    ytd-rich-item-renderer {
      width: ${videoWidth} !important;
      max-width: ${videoWidth} !important;
    }

    /* Shorts per row */
    ytd-rich-shelf-renderer[is-shorts] #items ytd-rich-item-renderer,
    ytd-reel-shelf-renderer #items yt-reel-item-renderer,
    ytd-rich-section-renderer ytd-rich-item-renderer {
      width: ${shortWidth} !important;
      max-width: ${shortWidth} !important;
    }

    /* Show/hide Shorts shelf */
    ${!settings.showShorts ? `
    ytd-rich-shelf-renderer[is-shorts],
    ytd-reel-shelf-renderer {
      display: none !important;
    }` : ''}
  `;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

function loadAndApply() {
  browser.storage.local.get(DEFAULTS).then(settings => {
    applyStyles(settings);
  });
}

// Apply on load
loadAndApply();

// Re-apply on YouTube SPA navigation
const observer = new MutationObserver(() => loadAndApply());
observer.observe(document.body, { childList: true, subtree: false });

// Re-apply on resize
window.addEventListener('resize', loadAndApply);

// Listen for settings changes from popup
browser.storage.onChanged.addListener((changes, area) => {
  if (area === 'local') loadAndApply();
});
