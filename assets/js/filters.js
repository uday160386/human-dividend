// Filter case records by area of life (cases pages).
(function () {
  var chips = document.querySelectorAll('.chip');
  var cases = document.querySelectorAll('article.case');
  var empty = document.getElementById('empty');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-f');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      var shown = 0;
      cases.forEach(function (a) {
        var match = f === 'all' || a.getAttribute('data-cat').split(' ').indexOf(f) !== -1;
        a.hidden = !match;
        if (match) shown++;
      });
      empty.hidden = shown !== 0;
    });
  });
})();
