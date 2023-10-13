var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);


document.addEventListener('tResponse', function (e) {
  var data = e.detail;
  console.log("received response")
  console.log(`coordinates:\n ${data.coords[0]}, ${data.coords[1]}`);
});