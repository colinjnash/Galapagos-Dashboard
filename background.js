chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "/newtab.html";
  chrome.tabs.create({ url: newURL });
});


