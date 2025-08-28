// Commands stub for MV3; add shortcuts in manifest if needed
chrome.runtime.onInstalled.addListener(() => {
  // Placeholder: ready for future setup
});

chrome.commands?.onCommand?.addListener((command) => {
  // Example: open popup or launch a game based on command
  console.log("Command:", command);
});
