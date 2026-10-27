// Removes any [data-show-until="YYYY-MM-DDTHH:MM"] element once Europe/London time passes it.
// Test with ?now=YYYY-MM-DDTHH:MM (London local time).
(function () {
  var els = document.querySelectorAll('[data-show-until]');
  if (!els.length) return;

  function londonNow() {
    var parts = {};
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    return parts.year + '-' + parts.month + '-' + parts.day + 'T' + parts.hour + ':' + parts.minute;
  }

  var override = new URLSearchParams(location.search).get('now');
  var now = override && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(override) ? override : londonNow();

  els.forEach(function (el) {
    if (now > el.getAttribute('data-show-until')) el.remove();
  });
})();
