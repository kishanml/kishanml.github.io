(function () {
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  function apply(theme) {
    var next = theme === "dark" ? "light" : "dark";
    toggle.textContent = next;
    toggle.setAttribute("aria-label", "Switch to " + next + " theme");
    toggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  apply(document.documentElement.dataset.theme);

  toggle.addEventListener("click", function () {
    var current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    var next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    apply(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });

  // Follow the OS unless the visitor has made an explicit choice.
  if (window.matchMedia) {
    var mq = matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      var stored;
      try { stored = localStorage.getItem("theme"); } catch (err) { stored = null; }
      if (stored === "light" || stored === "dark") return;
      var theme = e.matches ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      apply(theme);
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }
})();
