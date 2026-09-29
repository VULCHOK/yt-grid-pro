const DEFAULTS = {
  videosPerRow: 5,
  shortsPerRow: 8,
  showShorts: true,
  minWidth: 1800
};

const $ = id => document.getElementById(id);

const controls = {
  videosPerRow: { el: $('videosPerRow'), val: $('videosPerRowVal') },
  shortsPerRow:  { el: $('shortsPerRow'),  val: $('shortsPerRowVal') },
  minWidth:      { el: $('minWidth'),      val: $('minWidthVal') },
};

// Sync range label
Object.entries(controls).forEach(([key, { el, val }]) => {
  el.addEventListener('input', () => { val.textContent = el.value; });
});

// Load stored settings
browser.storage.local.get(DEFAULTS).then(settings => {
  controls.videosPerRow.el.value = settings.videosPerRow;
  controls.videosPerRow.val.textContent = settings.videosPerRow;
  controls.shortsPerRow.el.value = settings.shortsPerRow;
  controls.shortsPerRow.val.textContent = settings.shortsPerRow;
  controls.minWidth.el.value = settings.minWidth;
  controls.minWidth.val.textContent = settings.minWidth;
  $('showShorts').checked = settings.showShorts;
});

// Save
$('save').addEventListener('click', () => {
  const settings = {
    videosPerRow: parseInt(controls.videosPerRow.el.value),
    shortsPerRow:  parseInt(controls.shortsPerRow.el.value),
    minWidth:      parseInt(controls.minWidth.el.value),
    showShorts:    $('showShorts').checked
  };
  browser.storage.local.set(settings).then(() => {
    const btn = $('save');
    btn.textContent = '✓ Saved';
    setTimeout(() => { btn.textContent = 'Apply'; }, 1200);
  });
});

// Reset
$('reset').addEventListener('click', () => {
  browser.storage.local.set(DEFAULTS).then(() => {
    controls.videosPerRow.el.value = DEFAULTS.videosPerRow;
    controls.videosPerRow.val.textContent = DEFAULTS.videosPerRow;
    controls.shortsPerRow.el.value = DEFAULTS.shortsPerRow;
    controls.shortsPerRow.val.textContent = DEFAULTS.shortsPerRow;
    controls.minWidth.el.value = DEFAULTS.minWidth;
    controls.minWidth.val.textContent = DEFAULTS.minWidth;
    $('showShorts').checked = DEFAULTS.showShorts;
  });
});
