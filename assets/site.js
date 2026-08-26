/* Carolina BuySide - shared behaviour
   1. Mobile nav toggle
   2. Scroll reveal for [data-reveal] elements
   3. Seamless marquee duplication + optional firm-logo swap
*/
(function () {
  "use strict";

  /* ---------------------------------------------------------- mobile nav -- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Collapse the menu if the viewport grows back to desktop width
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* -------------------------------------------------------- scroll reveal -- */
  var reveals = document.querySelectorAll("[data-reveal]");

  if (reveals.length) {
    var reduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var show = function (el, delay) {
      if (el.classList.contains("is-visible")) return;
      if (delay) {
        setTimeout(function () {
          el.classList.add("is-visible");
        }, delay);
      } else {
        el.classList.add("is-visible");
      }
    };

    if (reduced || !("IntersectionObserver" in window)) {
      // Show everything immediately rather than leaving content invisible
      Array.prototype.forEach.call(reveals, function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            // Stagger siblings slightly so groups cascade instead of popping
            show(el, parseInt(el.getAttribute("data-reveal-delay") || "0", 10));
            observer.unobserve(el);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );

      Array.prototype.forEach.call(reveals, function (el) {
        observer.observe(el);
      });

      // Safety net. A fast or programmatic scroll (anchor jump, scroll-restore,
      // flicking on a trackpad) can outrun the observer, and an element that
      // never gets its callback would stay at opacity 0 forever. Sweep on scroll
      // and reveal anything already at or above the fold, observer or not.
      var ticking = false;

      var sweep = function () {
        ticking = false;
        var pending = false;

        Array.prototype.forEach.call(reveals, function (el) {
          if (el.classList.contains("is-visible")) return;
          if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
            show(el, 0);
            observer.unobserve(el);
          } else {
            pending = true;
          }
        });

        if (!pending) {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      };

      var onScroll = function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(sweep);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);

      // Catch anything above the fold on first paint, and anything the page
      // restored a scroll position into.
      onScroll();
      window.addEventListener("load", onScroll);
    }
  }

  /* ------------------------------------------------------------- marquee -- */
  var track = document.querySelector(".marquee-track");

  if (track) {
    // The CSS loop translates by -50%, which only lines up if the track holds
    // exactly two identical copies of the firm list. Build the second copy here
    // so the markup stays a single, editable list.
    var originals = Array.prototype.slice.call(track.children);

    originals.forEach(function (node) {
      var copy = node.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });

    // Optional logo upgrade. Set data-logos="on" on .marquee once real logo
    // files exist in assets/firm-logos/ (see the README in that folder).
    var marquee = track.closest(".marquee");

    if (marquee && marquee.getAttribute("data-logos") === "on") {
      Array.prototype.forEach.call(track.querySelectorAll(".firm"), function (firm) {
        var file = firm.getAttribute("data-logo");
        var name = firm.getAttribute("data-name") || "";
        if (!file) return;

        var img = new Image();
        img.onload = function () {
          img.className = "firm-logo";
          img.alt = name;
          firm.insertBefore(img, firm.firstChild);
          firm.classList.add("has-logo");
        };
        // If the file is missing we simply keep the wordmark - no action needed.
        img.onerror = function () {};
        img.src = "assets/firm-logos/" + file;
      });
    }
  }
})();
