(function () {
  "use strict";

  var config = window.ESIM_TRIAL_CONFIG || {};
  var affiliateUrl = config.affiliateUrl || "";
  var isConfigured = /^https:\/\//.test(affiliateUrl) && affiliateUrl !== "https://example.com";

  document.querySelectorAll(".affiliate-link").forEach(function (link) {
    if (isConfigured) {
      link.href = affiliateUrl;
      return;
    }

    link.href = "#offer";
    link.removeAttribute("target");
    link.setAttribute("aria-disabled", "true");
  });

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  var tabRoot = document.querySelector("[data-tabs]");
  if (tabRoot) {
    var tabs = Array.prototype.slice.call(tabRoot.querySelectorAll("[data-tab]"));
    var panels = Array.prototype.slice.call(tabRoot.querySelectorAll("[data-panel]"));

    function selectTab(selected) {
      var key = selected.dataset.tab;
      tabs.forEach(function (tab) {
        var active = tab === selected;
        tab.classList.toggle("active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      panels.forEach(function (panel) {
        var active = panel.dataset.panel === key;
        panel.classList.toggle("active", active);
        panel.hidden = !active;
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { selectTab(tab); });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        var offset = event.key === "ArrowRight" ? 1 : -1;
        var next = tabs[(index + offset + tabs.length) % tabs.length];
        selectTab(next);
        next.focus();
      });
    });
  }

  document.querySelectorAll("details").forEach(function (details) {
    details.addEventListener("toggle", function () {
      var icon = details.querySelector("[data-lucide]");
      if (icon) icon.setAttribute("data-lucide", details.open ? "minus" : "plus");
      if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
    });
  });

  var header = document.querySelector("[data-header]");
  var mobileCta = document.querySelector("[data-mobile-cta]");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 18);
    if (mobileCta) mobileCta.classList.toggle("visible", window.scrollY > window.innerHeight * 0.65);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
})();
