function parseCookie(e) {
  var t = JSON.parse(e);
  return "object" != typeof t && (t = JSON.parse(t)), t;
}

!function (e) {
  "use strict";

  var m = e.GOVUK || {};
  m.Modules = m.Modules || {}, m.modules = {
    find: function (e) {
      var t,
          n = "[data-module]";
      t = (e = e || document).querySelectorAll(n);

      for (var o = [], i = 0; i < t.length; i++) o.push(t[i]);

      return e !== document && e.getAttribute("data-module") && o.push(e), o;
    },
    start: function (e) {
      function t(e) {
        return o(n(e));
      }

      function n(e) {
        return e.replace(/-([a-z])/g, function (e) {
          return e.charAt(1).toUpperCase();
        });
      }

      function o(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      }

      for (var i = this.find(e), r = 0, a = i.length; r < a; r++) for (var s = i[r], c = s.getAttribute("data-module").split(" "), l = 0, u = c.length; l < u; l++) {
        var d = t(c[l]),
            p = s.getAttribute("data-" + c[l] + "-module-started");
        "function" != typeof m.Modules[d] || p || m.Modules[d].prototype.init && (new m.Modules[d](s).init(), s.setAttribute("data-" + c[l] + "-module-started", !0));
      }
    }
  }, e.GOVUK = m;
}(window), document.addEventListener("DOMContentLoaded", function () {
  window.GOVUK.modules.start();
}), function () {
  "use strict";

  window.GOVUK = window.GOVUK || {}, window.GOVUK.triggerEvent = function (e, t, n) {
    var o,
        i = n || {},
        r = i.keyCode;
    Object.prototype.hasOwnProperty.call(i, "bubbles") || (i.bubbles = !0), Object.prototype.hasOwnProperty.call(i, "cancelable") || (i.cancelable = !0), "function" == typeof window.CustomEvent ? o = new window.CustomEvent(t, i) : (o = document.createEvent("CustomEvent")).initCustomEvent(t, i.bubbles, i.cancelable, i.detail), r && (o.keyCode = r), e.dispatchEvent(o);
  };
}(window), function () {
  "use strict";

  window.GOVUK = window.GOVUK || {};
  var i = {
    essential: !0,
    settings: !1,
    usage: !1,
    campaigns: !1
  },
      r = {
    cookies_policy: "essential",
    seen_cookie_message: "essential",
    cookie_preferences_set: "essential",
    cookies_preferences_set: "essential",
    "_email-alert-frontend_session": "essential",
    licensing_session: "essential",
    govuk_contact_referrer: "essential",
    multivariatetest_cohort_coronavirus_extremely_vulnerable_rate_limit: "essential",
    dgu_beta_banner_dismissed: "settings",
    global_bar_seen: "settings",
    govuk_browser_upgrade_dismisssed: "settings",
    govuk_not_first_visit: "settings",
    analytics_next_page_call: "usage",
    user_nation: "settings",
    _ga: "usage",
    _gid: "usage",
    _gat: "usage",
    "JS-Detection": "usage",
    TLSversion: "usage",
    _ga_VBLT2V3FZR: "usage",
    _ga_P1DGM6TVYF: "usage",
    _ga_S5RQ7FTGVR: "usage"
  };
  window.GOVUK.cookie = function (e, t, n) {
    return void 0 !== t ? !1 === t || null === t ? window.GOVUK.setCookie(e, "", {
      days: -1
    }) : (void 0 === n && (n = {
      days: 30
    }), window.GOVUK.setCookie(e, t, n)) : window.GOVUK.getCookie(e);
  }, window.GOVUK.setDefaultConsentCookie = function () {
    window.GOVUK.setConsentCookie(i);
  }, window.GOVUK.approveAllCookieTypes = function () {
    var e = {
      essential: !0,
      settings: !0,
      usage: !0,
      campaigns: !0
    };
    window.GOVUK.setCookie("cookies_policy", JSON.stringify(e), {
      days: 365
    });
  }, window.GOVUK.getConsentCookie = function () {
    var e,
        t = window.GOVUK.cookie("cookies_policy");
    if (!t) return null;

    try {
      e = JSON.parse(t);
    } catch (n) {
      return null;
    }

    return "object" != typeof e && null !== e && (e = JSON.parse(e)), e;
  }, window.GOVUK.setConsentCookie = function (e) {
    var t = window.GOVUK.getConsentCookie();

    for (var n in t || (t = JSON.parse(JSON.stringify(i))), e) if (t[n] = e[n], !e[n]) for (var o in r) r[o] === n && window.GOVUK.deleteCookie(o);

    window.GOVUK.setCookie("cookies_policy", JSON.stringify(t), {
      days: 365
    });
  }, window.GOVUK.checkConsentCookieCategory = function (e, t) {
    var n = window.GOVUK.getConsentCookie();
    if (!n && r[e]) return !0;
    n = window.GOVUK.getConsentCookie();

    try {
      return n[t];
    } catch (o) {
      return console.error(o), !1;
    }
  }, window.GOVUK.checkConsentCookie = function (e, t) {
    if ("cookies_policy" === e || null === t || !1 === t) return !0;
    if (e.match("^govuk_surveySeen") || e.match("^govuk_taken")) return window.GOVUK.checkConsentCookieCategory(e, "settings");

    if (r[e]) {
      var n = r[e];
      return window.GOVUK.checkConsentCookieCategory(e, n);
    }

    return !1;
  }, window.GOVUK.setCookie = function (e, t, n) {
    if (window.GOVUK.checkConsentCookie(e, t)) {
      void 0 === n && (n = {});
      var o = e + "=" + t + "; path=/";

      if (n.days) {
        var i = new Date();
        i.setTime(i.getTime() + 24 * n.days * 60 * 60 * 1e3), o = o + "; expires=" + i.toGMTString();
      }

      "https:" === document.location.protocol && (o += "; Secure"), document.cookie = o;
    }
  }, window.GOVUK.getCookie = function (e) {
    for (var t = e + "=", n = document.cookie.split(";"), o = 0, i = n.length; o < i; o++) {
      for (var r = n[o]; " " === r.charAt(0);) r = r.substring(1, r.length);

      if (0 === r.indexOf(t)) return decodeURIComponent(r.substring(t.length));
    }

    return null;
  }, window.GOVUK.getCookieCategory = function (e) {
    return r[e];
  }, window.GOVUK.deleteCookie = function (e) {
    window.GOVUK.cookie(e, null), window.GOVUK.cookie(e) && (document.cookie = e + "=;expires=" + new Date() + ";", document.cookie = e + "=;expires=" + new Date() + ";domain=" + window.location.hostname + ";path=/");
  }, window.GOVUK.deleteUnconsentedCookies = function () {
    var e = window.GOVUK.getConsentCookie();

    for (var t in e) if (!e[t]) for (var n in r) r[n] === t && window.GOVUK.deleteCookie(n);
  };
}(window), function () {
  "use strict";

  window.GOVUK = window.GOVUK || {}, window.GOVUK.extendObject = function (e) {
    e = e || {};

    for (var t = 1; t < arguments.length; t++) if (arguments[t]) for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);

    return e;
  };
}(window), function (e) {
  "use strict";

  function t() {
    return 0 < document.querySelectorAll('meta[name="govuk:static-analytics:strip-dates"]').length;
  }

  function n() {
    return 0 < document.querySelectorAll('meta[name="govuk:static-analytics:strip-postcodes"]').length;
  }

  function o() {
    var e = document.querySelector('meta[name="govuk:static-analytics:strip-query-string-parameters"]'),
        t = !1;
    e && (t = e.getAttribute("content"));
    var n = [];
    if (t) for (var o = t.split(","), i = 0; i < o.length; i++) n.push(o[i].trim());
    return n;
  }

  var i = e.GOVUK || {},
      r = /[^\s=/?&]+(?:@|%40)[^\s=/?&]+/g,
      a = /\b[A-PR-UWYZ][A-HJ-Z]?[0-9][0-9A-HJKMNPR-Y]?(?:[\s+]|%20)*[0-9](?!refund)[ABD-HJLNPQ-Z]{2,3}\b/gi,
      s = /\d{4}(-?)\d{2}(-?)\d{2}/g,
      c = /[|\\{}()[\]^$+*?.]/g,
      l = /reset_password_token=[a-zA-Z0-9-]+/g,
      u = /unlock_token=[a-zA-Z0-9-]+/g,
      d = /state=.[^&]+/g,
      p = function () {
    this.stripDatePII = t(), this.stripPostcodePII = n(), this.queryStringParametersToStrip = o();
  };

  p.prototype.stripPII = function (e) {
    return "string" == typeof e ? this.stripPIIFromString(e) : "[object Array]" === Object.prototype.toString.call(e) || "[object Arguments]" === Object.prototype.toString.call(e) ? this.stripPIIFromArray(e) : "object" == typeof e ? this.stripPIIFromObject(e) : e;
  }, p.prototype.stripPIIFromString = function (e) {
    var t = e.replace(r, "[email]");
    return t = (t = (t = t.replace(l, "reset_password_token=[reset_password_token]")).replace(u, "unlock_token=[unlock_token]")).replace(d, "state=[state]"), t = this.stripQueryStringParameters(t), !0 === this.stripDatePII && (t = t.replace(s, "[date]")), !0 === this.stripPostcodePII && (t = t.replace(a, "[postcode]")), t;
  }, p.prototype.stripPIIFromObject = function (e) {
    if (e) {
      if (e instanceof i.Analytics.PIISafe) return e.value;

      for (var t in e) {
        var n = e[t];
        e[t] = this.stripPII(n);
      }

      return e;
    }
  }, p.prototype.stripPIIFromArray = function (e) {
    for (var t = 0, n = e.length; t < n; t++) {
      var o = e[t];
      e[t] = this.stripPII(o);
    }

    return e;
  }, p.prototype.stripQueryStringParameters = function (e) {
    for (var t = 0; t < this.queryStringParametersToStrip.length; t++) {
      var n = this.queryStringParametersToStrip[t],
          o = n.replace(c, "\\$&"),
          i = new RegExp("((?:\\?|&)" + o + "=)(?:[^&#\\s]*)", "g");
      e = e.replace(i, "$1[" + n + "]");
    }

    return e;
  }, i.Pii = p, e.GOVUK = i;
}(window), function (s) {
  "use strict";

  function c() {
    "function" == typeof s.ga && s.ga.apply(s, arguments);
  }

  var l,
      u = s.GOVUK || {},
      e = function (e, t) {
    function n() {
      c("create", e, t);
    }

    function o() {
      c("set", "anonymizeIp", !0);
    }

    function i() {
      c("set", "allowAdFeatures", !1);
    }

    function r() {
      c("set", "title", l.stripPII(document.title));
    }

    function a() {
      c("set", "location", l.stripPII(window.location.href));
    }

    function s() {
      var e = window.GOVUK.analyticsVars.primaryLinkedDomains;
      e && 0 < e.length && (c("require", "linker"), c("linker:autoLink", e));
    }

    l = new u.Pii(), "string" == typeof t && (t = {
      cookieDomain: t
    }), n(), o(), i(), r(), a(), s();
  };

  e.load = function () {
    var e, t, n, o, i, r, a;
    e = s, t = document, n = "script", o = "https://www.google-analytics.com/analytics.js", i = "ga", e.GoogleAnalyticsObject = i, e[i] = e[i] || function () {
      (e[i].q = e[i].q || []).push(arguments);
    }, e[i].l = 1 * new Date(), r = t.createElement(n), a = t.getElementsByTagName(n)[0], r.async = 1, r.src = o, a.parentNode.insertBefore(r, a);
  }, e.prototype.trackPageview = function (e, t, n) {
    function o(e) {
      if (void 0 === e) return !0;

      for (var t in e) if (Object.prototype.hasOwnProperty.call(e, t)) return !1;

      return JSON.stringify(e) === JSON.stringify({});
    }

    var i,
        r = "";
    "string" == typeof e && (i = {
      page: e
    }), "string" == typeof t && ((i = i || {}).title = t), "object" == typeof n && (i = u.extendObject(i || {}, n), "string" == typeof n.trackerName && (r = n.trackerName + ".", delete n.trackerName)), o(i) ? c(r + "send", "pageview") : c(r + "send", "pageview", i);
  }, e.prototype.trackEvent = function (e, t, n) {
    var o,
        i = "",
        r = {
      hitType: "event",
      eventCategory: e,
      eventAction: t
    };
    "string" == typeof (n = n || {}).label && (r.eventLabel = n.label, delete n.label), (n.value || 0 === n.value) && ("number" != typeof (o = parseInt(n.value, 10)) || isNaN(o) || (n.eventValue = o), delete n.value), "string" == typeof n.trackerName && (i = n.trackerName + ".", delete n.trackerName), n.nonInteraction && (n.nonInteraction = 1), "object" == typeof n && (r = u.extendObject(r, n)), c(i + "send", r);
  }, e.prototype.trackSocial = function (e, t, n, o) {
    var i = {
      hitType: "social",
      socialNetwork: e,
      socialAction: t,
      socialTarget: n
    };
    c("send", i = u.extendObject(i, o));
  }, e.prototype.addLinkedTrackerDomain = function (e, t, n, o) {
    c("create", e, "auto", {
      name: t
    }), c(t + ".require", "linker"), c(t + ".linker:autoLink", n), c(t + ".set", "anonymizeIp", !0), c(t + ".set", "allowAdFeatures", !1), c(t + ".set", "title", l.stripPII(document.title)), c(t + ".set", "location", l.stripPII(window.location.href)), void 0 !== o && !0 !== o || c(t + ".send", "pageview");
  }, e.prototype.setDimension = function (e, t) {
    c("set", "dimension" + e, String(t));
  }, u.GoogleAnalyticsUniversalTracker = e, s.GOVUK = u;
}(window), function (n) {
  "use strict";

  var o = n.GOVUK || {},
      e = function (e) {
    if (this.pii = new o.Pii(), this.trackers = [], "undefined" != typeof e.universalId) {
      var t = e.universalId;
      delete e.universalId, this.trackers.push(new o.GoogleAnalyticsUniversalTracker(t, e));
    }
  },
      t = function (e) {
    this.value = e;
  };

  e.PIISafe = t, e.prototype.sendToTrackers = function (e, t) {
    for (var n = 0, o = this.trackers.length; n < o; n++) {
      var i = this.trackers[n],
          r = i[e];
      "function" == typeof r && r.apply(i, t);
    }
  }, e.load = function () {
    o.GoogleAnalyticsUniversalTracker.load();
  }, e.prototype.defaultPathForTrackPageview = function (e) {
    var t = e.protocol + "//" + e.hostname + (e.port ? ":" + e.port : "");
    return this.pii.stripPIIFromString(e.href.substring(t.length).split("#")[0]);
  }, e.prototype.trackPageview = function () {
    arguments[0] = arguments[0] || this.defaultPathForTrackPageview(window.location), 0 === arguments.length && (arguments.length = 1), this.sendToTrackers("trackPageview", this.pii.stripPII(arguments));
  }, e.prototype.trackEvent = function () {
    this.sendToTrackers("trackEvent", this.pii.stripPII(arguments));
  }, e.prototype.trackShare = function (e, t) {
    this.sendToTrackers("trackSocial", this.pii.stripPII([e, "share", n.location.pathname, t]));
  }, e.prototype.setDimension = function () {
    this.sendToTrackers("setDimension", this.pii.stripPII(arguments));
  }, e.prototype.addLinkedTrackerDomain = function () {
    this.sendToTrackers("addLinkedTrackerDomain", arguments);
  }, o.Analytics = e, n.GOVUK = o;
}(window), function (o) {
  "use strict";

  var i = o.GOVUK || {};
  i.analyticsPlugins = i.analyticsPlugins || {}, i.analyticsPlugins.printIntent = function () {
    var t = function () {
      i.analytics.trackEvent("Print Intent", document.location.pathname), i.analytics.trackPageview("/print" + document.location.pathname);
    };

    if (o.matchMedia) {
      var e = o.matchMedia("print"),
          n = 0;
      e.addListener(function (e) {
        e.matches || 0 !== n || (t(), n++, setTimeout(function () {
          n = 0;
        }, 3e3));
      });
    }

    o.onafterprint && (o.onafterprint = t);
  }, o.GOVUK = i;
}(window), function (i) {
  "use strict";

  var r = i.GOVUK || {};
  r.analyticsPlugins = r.analyticsPlugins || {}, r.analyticsPlugins.error = function (e) {
    function o(e) {
      return !e || !t || !!t.test(e);
    }

    var t = (e = e || {}).filenameMustMatch,
        n = function (e) {
      var t = e.filename,
          n = t + ": " + e.lineno;
      o(t) && r.analytics.trackEvent("JavaScript Error", e.message, {
        label: n,
        value: 1,
        nonInteraction: !0
      });
    };

    i.addEventListener ? i.addEventListener("error", n, !1) : i.attachEvent ? i.attachEvent("onerror", n) : i.onerror = n;
  }, i.GOVUK = r;
}(window), this.Element && function (e) {
  e.matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.msMatchesSelector || function (e) {
    for (var t = this, n = (t.parentNode || t.document).querySelectorAll(e), o = -1; n[++o] && n[o] != t;);

    return !!n[o];
  };
}(Element.prototype), this.Element && function (e) {
  e.closest = e.closest || function (e) {
    for (var t = this; t.matches && !t.matches(e);) t = t.parentNode;

    return t.matches ? t : null;
  };
}(Element.prototype), function (e) {
  "use strict";

  var i = e.GOVUK || {};
  i.analyticsPlugins = i.analyticsPlugins || {}, i.analyticsPlugins.mailtoLinkTracker = function () {
    function o(e, t) {
      var n = {
        transport: "beacon"
      },
          o = e.textContent;
      o && (n.label = o.trim()), i.analytics.trackEvent("Mailto Link Clicked", t, n);
    }

    document.querySelector("body").addEventListener("click", function (e) {
      var t = e.target;

      if ("A" !== t.tagName && (t = t.closest("a")), t) {
        var n = t.getAttribute("href");
        n && "mailto:" === n.substring(0, 7) && o(t, n);
      }
    });
  }, e.GOVUK = i;
}(window), function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t() : "function" == typeof define && define.amd ? define("GOVUKFrontend", t) : t();
}(0, function () {
  "use strict";

  (function () {
    "document" in this && "matches" in document.documentElement || (Element.prototype.matches = Element.prototype.webkitMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || function i(e) {
      for (var t = this, n = (t.document || t.ownerDocument).querySelectorAll(e), o = 0; n[o] && n[o] !== t;) ++o;

      return !!n[o];
    });
  }).call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "document" in this && "closest" in document.documentElement || (Element.prototype.closest = function n(e) {
      for (var t = this; t;) {
        if (t.matches(e)) return t;
        t = "SVGElement" in window && t instanceof SVGElement ? t.parentNode : t.parentElement;
      }

      return null;
    });
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {});
}), function (e) {
  "use strict";

  var a = e.GOVUK || {};
  a.analyticsPlugins = a.analyticsPlugins || {}, a.analyticsPlugins.externalLinkTracker = function (e) {
    e = e || {}, a.analyticsPlugins.externalLinkTracker.options = e, document.querySelector("body").addEventListener("click", a.analyticsPlugins.externalLinkTracker.handleClick);
  }, a.analyticsPlugins.externalLinkTracker.handleClick = function (e) {
    var t = e.target;
    "A" !== t.tagName && (t = t.closest("a")), t && a.analyticsPlugins.externalLinkTracker.isExternalLink(t.getAttribute("href")) && a.analyticsPlugins.externalLinkTracker.trackClickEvent(t);
  }, a.analyticsPlugins.externalLinkTracker.isExternalLink = function (e) {
    if (!e) return !1;
    var t = a.analyticsPlugins.externalLinkTracker.getHostname();
    return "http" === e.substring(0, 4) && -1 === e.indexOf(t) || void 0;
  }, a.analyticsPlugins.externalLinkTracker.trackClickEvent = function (e) {
    var t = {
      transport: "beacon"
    },
        n = e.getAttribute("href"),
        o = e.textContent.trim();
    o && (t.label = o);
    var i = a.analyticsPlugins.externalLinkTracker.options.externalLinkUploadCustomDimension;

    if (i !== undefined) {
      var r = n;
      a.analytics.setDimension(i, r);
    }

    a.analytics.trackEvent("External Link Clicked", n, t);
  }, a.analyticsPlugins.externalLinkTracker.getHostname = function () {
    return e.location.hostname;
  }, e.GOVUK = a;
}(window), function (e) {
  "use strict";

  var r = e.GOVUK || {};
  r.analyticsPlugins = r.analyticsPlugins || {}, r.analyticsPlugins.downloadLinkTracker = function (e) {
    function o(e) {
      var t = e.getAttribute("href"),
          n = {
        transport: "beacon"
      },
          o = e.textContent.trim();
      o && (n.label = o), r.analytics.trackEvent("Download Link Clicked", t, n);
    }

    var t = (e = e || {}).selector,
        i = t.split(",");
    t && document.querySelector("body").addEventListener("click", function (e) {
      var t = e.target;
      if ("A" !== t.tagName && (t = t.closest("a")), t) for (var n = 0; n < i.length; n++) if (t.matches(i[n].trim())) {
        o(t);
        break;
      }
    });
  }, e.GOVUK = r;
}(window), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (e) {
  function t(e) {
    this.$module = e;
  }

  t.prototype.init = function () {
    var e = {
      nonInteraction: 1
    },
        t = this.$module.getAttribute("data-track-category"),
        n = this.$module.getAttribute("data-track-action"),
        o = this.$module.getAttribute("data-track-label"),
        i = parseInt(this.$module.getAttribute("data-track-value"));
    "string" == typeof o && (e.label = o), (i || 0 === i) && (e.value = i), window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent(t, n, e);
  }, e.AutoTrackEvent = t;
}(window.GOVUK.Modules), function () {
  "use strict";

  function e(e) {
    var t = document.querySelector(e);
    if (t) return t.getAttribute("content").toLowerCase();
  }

  function n() {
    return "collections" === e(h) && "taxon" === e(v) && "grid" === e(g);
  }

  function o() {
    return "collections" === e(h) && "taxon" === e(v) && "accordion" === e(g);
  }

  function i() {
    return "collections" === e(h) && "taxon" === e(v) && "leaf" === e(g);
  }

  function r() {
    return "collections" === e(h) && "browse level 2" === e(g);
  }

  function a() {
    return "collections" === e(h) && "cost of living hub" === e(g);
  }

  function s() {
    return "collections" === e(h) && ("browse level 0" === e(g) || "browse level 1" === e(g)) && "mainstream_browse_page" === e(v);
  }

  function c() {
    return "collections" === e(h) && "mainstream_browse_page" === e(v);
  }

  function l() {
    return "collections" === e(h) && "topic" === e(v);
  }

  function u() {
    return "whitehall" === e(h) && "placeholder_policy_area" === e(v);
  }

  function d() {
    return "government-frontend" === e(h) && "document_collection" === e(v);
  }

  function p() {
    return "finder-frontend" === e(h) && "finder" === e(v);
  }

  function m() {
    return "whitehall" === e(h) && "finder" === e(v);
  }

  function f(e) {
    for (var t = 0, n = 0; n < e.length; n++) {
      var o = window.getComputedStyle(e[n]);
      "none" !== o.display && "hidden" !== o.visibility && t++;
    }

    return t;
  }

  window.GOVUK = window.GOVUK || {};

  var t = function () {};

  t.getNumberOfSections = function () {
    switch (!0) {
      case n():
        return 1 + document.querySelectorAll(".parent-topic-contents").length;

      case o():
        return document.querySelectorAll('[data-track-count="accordionSection"]').length;

      case d():
        return document.querySelectorAll(".document-collection .group-title").length;

      case r():
        return document.querySelectorAll('[data-track-count="accordionSection"]').length || document.querySelectorAll("main .govuk-list").length;

      case a():
        return document.querySelectorAll('[data-track-count="accordionSection"]').length;

      case s():
        return document.querySelectorAll('[data-track-count="cardList"]').length;

      case c():
        return f(document.querySelectorAll("#subsection ul")) || document.querySelectorAll("#section ul").length || document.querySelectorAll("#root ul").length;

      case l():
        return document.querySelectorAll(".topics-page nav.index-list").length;

      case u():
        return document.querySelectorAll(".topic section h1.label").length;

      case p():
      case m():
      case i():
        return 1;

      default:
        var e = document.querySelectorAll('[data-track-count="sidebarRelatedItemSection"]').length,
            t = document.querySelectorAll('[data-track-count="sidebarTaxonSection"]').length;
        return e || t;
    }
  }, t.getNumberOfLinks = function () {
    switch (!0) {
      case n():
        return document.querySelectorAll('a[data-track-category="navGridLinkClicked"]').length + document.querySelectorAll('a[data-track-category="navGridLeafLinkClicked"]').length;

      case o():
        return document.querySelectorAll('a[data-track-category="navAccordionLinkClicked"]').length;

      case d():
        return document.querySelectorAll(".document-collection .group-document-list li a").length;

      case r():
      case a():
        return document.querySelectorAll('[data-track-count="contentLink"]').length;

      case s():
        return document.querySelectorAll('[data-track-count="cardLink"]').length;

      case c():
        return f(document.querySelectorAll("#subsection ul a")) || document.querySelectorAll("#section ul a").length || document.querySelectorAll("#root ul a").length;

      case l():
        return document.querySelectorAll(".topics-page .index-list ul a").length || document.querySelectorAll(".topics-page .topics ul a").length;

      case u():
        return document.querySelectorAll("section.document-block a").length + document.querySelectorAll("section .collection-list h2 a").length;

      case p():
        return document.querySelectorAll(".finder-frontend-content li.document a").length;

      case m():
        return document.querySelectorAll(".document-list .document-row h3 a").length;

      case i():
        return document.querySelectorAll('a[data-track-category="navLeafLinkClicked"]').length;

      default:
        return document.querySelectorAll('a[data-track-category="relatedLinkClicked"]').length;
    }
  };
  var h = 'meta[name="govuk:rendering-application"]',
      v = 'meta[name="govuk:format"]',
      g = 'meta[name="govuk:navigation-page-type"]';
  GOVUK.PageContent = t;
}(), function () {
  "use strict";

  function n() {
    var e = {
      dimension15: window.httpStatusCode || 200,
      dimension16: GOVUK.cookie("TLSversion") || "unknown",
      dimension95: GOVUK.analytics.gaClientId
    };
    return window.devicePixelRatio ? e.dimension11 = window.devicePixelRatio : e.dimension11 = window.screen.deviceXDPI / window.screen.logicalXDPI, e;
  }

  function o() {
    for (var e = {
      section: {
        dimension: 1
      },
      format: {
        dimension: 2
      },
      themes: {
        dimension: 3,
        defaultValue: "other"
      },
      "content-id": {
        dimension: 4,
        defaultValue: "00000000-0000-0000-0000-000000000000"
      },
      "search-result-count": {
        dimension: 5
      },
      "publishing-government": {
        dimension: 6
      },
      "political-status": {
        dimension: 7
      },
      "analytics:organisations": {
        dimension: 9
      },
      "analytics:world-locations": {
        dimension: 10
      },
      withdrawn: {
        dimension: 12,
        defaultValue: "not withdrawn"
      },
      "schema-name": {
        dimension: 17
      },
      "rendering-application": {
        dimension: 20
      },
      "search-autocomplete-status": {
        dimension: 21
      },
      "navigation-legacy": {
        dimension: 30,
        defaultValue: "none"
      },
      "navigation-list-type": {
        dimension: 31,
        defaultValue: "none"
      },
      "navigation-page-type": {
        dimension: 32,
        defaultValue: "none"
      },
      "taxon-slug": {
        dimension: 56,
        defaultValue: "other"
      },
      "taxon-id": {
        dimension: 57,
        defaultValue: "other"
      },
      "taxon-slugs": {
        dimension: 58,
        defaultValue: "other"
      },
      "taxon-ids": {
        dimension: 59,
        defaultValue: "other"
      },
      "content-has-history": {
        dimension: 39,
        defaultValue: "false"
      },
      "publishing-app": {
        dimension: 89
      },
      "brexit-audience": {
        dimension: 112
      },
      "brexit-superbreadcrumb": {
        dimension: 111
      },
      stepnavs: {
        dimension: 96
      },
      "relevant-result-shown": {
        dimension: 83
      },
      "spelling-suggestion": {
        dimension: 81
      }
    }, t = document.querySelectorAll("meta[name^='govuk']"), n = {}, o = {}, i = 0; i < t.length; i++) {
      var r = t[i],
          a = r.getAttribute("name").split("govuk:")[1];
      e[a] && (o[a] = r.getAttribute("content"));
    }

    for (var s in e) {
      var c = o[s] || e[s].defaultValue;
      void 0 !== c && (n["dimension" + e[s].dimension] = c);
    }

    return n;
  }

  function i() {
    var e = document.getElementById("content");
    e && (e = e.getAttribute("lang"));
    var t = document.querySelector('[data-module="global-bar"]') || !1;
    return t && (t = "none" !== t.style.display), {
      dimension26: GOVUK.PageContent.getNumberOfSections(),
      dimension27: GOVUK.PageContent.getNumberOfLinks(),
      dimension23: e || "unknown",
      dimension38: t && "Global Banner viewed"
    };
  }

  function r() {
    for (var e = document.querySelectorAll("meta[name^='govuk:ab-test']"), t = {}, n = 0; n < e.length; n++) {
      var o = e[n],
          i = parseInt(o.getAttribute("data-analytics-dimension")),
          r = o.getAttribute("content");
      i && (t["dimension" + i] = r);
    }

    return t;
  }

  window.GOVUK = window.GOVUK || {};

  var e = function () {};

  e.getAndExtendDefaultTrackingOptions = function (e) {
    var t = this.customDimensions();
    return GOVUK.extendObject(t, e);
  }, e.customDimensions = function () {
    var e = GOVUK.extendObject({}, n(), o(), i(), r());

    for (var t in e) e[t] = new GOVUK.Analytics.PIISafe(String(e[t]));

    return e;
  }, GOVUK.CustomDimensions = e;
}(), function () {
  "use strict";

  function o() {
    try {
      var e = n.prototype.getCookie("analytics_next_page_call");
      return n.prototype.setCookie("analytics_next_page_call", null), e || {};
    } catch (t) {
      return {};
    }
  }

  window.GOVUK = window.GOVUK || {};

  var n = function (e) {
    var t = window.GOVUK.getConsentCookie();
    t && !t.usage || (this.analytics = new GOVUK.Analytics(e));
    var n = o();
    ga(function (e) {
      this.gaClientId = e.get("clientId"), GOVUK.triggerEvent(window, "gaClientSet"), GOVUK.Ecommerce.start(), this.trackPageview(null, null, n), GOVUK.analyticsPlugins.error({
        filenameMustMatch: /gov\.uk/
      }), GOVUK.analyticsPlugins.printIntent(), GOVUK.analyticsPlugins.mailtoLinkTracker(), GOVUK.analyticsPlugins.externalLinkTracker({
        externalLinkUploadCustomDimension: 36
      }), GOVUK.analyticsPlugins.downloadLinkTracker({
        selector: 'a[href*="/government/uploads"], a[href*="assets.publishing.service.gov.uk"]'
      });
    }.bind(this));
  };

  n.load = function () {
    GOVUK.Analytics.load();
  }, n.prototype.trackPageview = function (e, t, n) {
    var o = !this.getCookie("seen_cookie_message"),
        i = {
      dimension100: o ? o.toString() : "false"
    };
    n = GOVUK.extendObject(n, i);
    var r = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions(n);
    this.analytics.trackPageview(e, t, r);
  }, n.prototype.trackEvent = function (e, t, n) {
    var o = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions(n);
    this.analytics.trackEvent(e, t, o);
  }, n.prototype.setDimension = function (e, t, n, o) {
    void 0 !== t && this.analytics.setDimension(e, t, n, o);
  }, n.prototype.trackShare = function (e) {
    var t = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions();
    this.analytics.trackShare(e, t);
  }, n.prototype.addLinkedTrackerDomain = function (e, t, n, o) {
    this.analytics.addLinkedTrackerDomain(e, t, n, o);
  }, n.prototype.setOptionsForNextPageview = function (e) {
    if ("object" == typeof e) {
      var t = o();
      t = GOVUK.extendObject(t, e), this.setCookie("analytics_next_page_call", t);
    }
  }, n.prototype.setCookie = function (e, t) {
    GOVUK.cookie && (t ? GOVUK.cookie(e, JSON.stringify(JSON.stringify(t))) : GOVUK.cookie(e, null));
  }, n.prototype.getCookie = function (e) {
    if (GOVUK.cookie) try {
      return JSON.parse(JSON.parse(GOVUK.cookie(e)));
    } catch (t) {
      return null;
    }
  }, n.prototype.stripPII = function (e) {
    return this.analytics.pii.stripPII(e);
  }, GOVUK.StaticAnalytics = n;
}(), function () {
  "use strict";

  window.GOVUK = window.GOVUK || {};

  var v = "Site search results",
      g = "Results",
      n = function () {
    function l(e, t, n, o, i, r, a) {
      var s = {
        position: n,
        list: o,
        dimension71: r
      };
      return i !== undefined && (s.dimension94 = i), e !== undefined && (s.id = e), t !== undefined && (s.name = t), a !== undefined && (s.variant = a), s;
    }

    function f(e, t, n, o, i, r, a) {
      if (e || t) {
        var s = l(e, t, n, i, r, o, a);
        ga("ec:addImpression", s);
      }
    }

    function h(e, t, n, o, i, r, a, s, c) {
      e.addEventListener("click", function () {
        if (t || n) {
          var e = l(t, n, o, r, a, i, s);
          ga("ec:addProduct", e);
        }

        ga("ec:setAction", "click", {
          list: r
        }), GOVUK.analytics.trackEvent("UX", "click", GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions({
          label: c
        }));
      });
    }

    this.init = function (e) {
      for (var t = GOVUK.analytics.stripPII(e.getAttribute("data-search-query")).substring(0, 100).toLowerCase(), n = e.querySelectorAll("[data-ecommerce-row]"), o = parseInt(e.getAttribute("data-ecommerce-start-index"), 10), i = e.getAttribute("data-list-title") || v, r = e.getAttribute("data-ecommerce-variant") || undefined, a = e.getAttribute("data-track-click-label") || g, s = 0; s < n.length; s++) {
        var c = n[s],
            l = c.getAttribute("data-ecommerce-subheading") || undefined,
            u = c.getAttribute("data-ecommerce-content-id") || undefined,
            d = c.getAttribute("data-ecommerce-path"),
            p = c.getAttribute("data-ecommerce-index"),
            m = p ? parseInt(p, 10) - 1 : s;
        f(u, d, m + o, t, i, l, r), h(c, u, d, m + o, t, i, l, r, a);
      }
    };
  };

  n.ecLoaded = !1, n.start = function (e) {
    if (window.ga && 0 < (e = e || document.querySelectorAll("[data-analytics-ecommerce]")).length) {
      n.ecLoaded || (ga("require", "ec"), n.ecLoaded = !0);

      for (var t = 0; t < e.length; t++) {
        new n().init(e[t]);
      }
    }
  }, GOVUK.Ecommerce = n;
}();

var analyticsInit = function () {
  "use strict";

  if (window.GOVUK.analyticsVars || !1) var e = window.GOVUK.analyticsVars.gaProperty || !1,
      t = window.GOVUK.analyticsVars.gaPropertyCrossDomain || !1,
      n = window.GOVUK.analyticsVars.linkedDomains || !1;
  window.GOVUK.Analytics.checkDigitalIdentityConsent = function (e) {
    if (e && e.search) {
      var t = /([?&]cookie_consent=)(accept|reject)/.exec(e.search);
      t && ("accept" === t[2] ? (window.GOVUK.setConsentCookie({
        usage: !0
      }), window.GOVUK.cookie("cookies_preferences_set", "true")) : "reject" === t[2] && (window.GOVUK.setConsentCookie({
        usage: !1
      }), window.GOVUK.cookie("cookies_preferences_set", "true")));
    }
  }, window.GOVUK.Analytics.checkDigitalIdentityConsent(window.location);
  var o = window.GOVUK.getConsentCookie(),
      i = {
    addLinkedTrackerDomain: function () {},
    setDimension: function () {},
    setOptionsForNextPageView: function () {},
    trackEvent: function () {},
    trackPageview: function () {},
    trackShare: function () {}
  },
      r = "ga-disable-" + e;

  if (window[r] = !0, o && o.usage) {
    if (window[r] = !1, window.GOVUK.StaticAnalytics.load(), e) {
      var a = "www.gov.uk" === document.domain ? ".www.gov.uk" : document.domain,
          s = new window.GOVUK.StaticAnalytics({
        universalId: e,
        cookieDomain: a,
        allowLinker: !0
      });
      window.GOVUK.analytics = s, n && 0 < n.length && window.GOVUK.analytics.addLinkedTrackerDomain(t, "govuk", n);
    }
  } else window.GOVUK.analytics = i;
};

window.GOVUK.analyticsInit = analyticsInit, window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (e) {
  function o(e) {
    this.$module = e, this.pageHeight = document.querySelector("body").clientHeight, this.trackedNodes = [], this.config = {
      allowHeadingsInside: ["main"],
      percentages: [20, 40, 60, 80, 100],
      scrollTimeoutDelay: 20,
      resizeTimeoutDelay: 100,
      pageHeightTimeoutDelay: 500
    };
  }

  o.prototype.init = function () {
    var e = window.GOVUK.getConsentCookie();
    e && e.settings ? this.startModule() : (this.startModule = this.startModule.bind(this), window.addEventListener("cookie-consent", this.startModule));
  }, o.prototype.startModule = function () {
    if (!window.GOVUK.analyticsVars.scrollTrackerStarted) {
      this.trackType = this.$module.getAttribute("data-track-type");
      var e = this.$module.getAttribute("data-track-headings");
      if (e) try {
        this.config.trackHeadings = JSON.parse(e);
      } catch (n) {
        return console.error("Scroll tracker configuration error: " + n.message, window.location), void (window.GOVUK.analyticsVars.scrollTrackerStarted = !1);
      }
      window.GOVUK.analyticsVars.scrollTrackerStarted = !0, "headings" === this.trackType ? this.track = new o.Heading(this.config) : this.track = new o.Percentage(this.config), this.getWindowDetails();
      var t = window.location.hash;
      t && document.getElementById(t.substring(1)) || this.trackVisibleNodes(), this.trackedNodes.length && (this.scrollEvent = this.onScroll.bind(this), window.addEventListener("scroll", this.scrollEvent), this.resizeEvent = this.onResize.bind(this), window.addEventListener("resize", this.resizeEvent), this.interval = window.setInterval(function () {
        var e = document.querySelector("body").clientHeight;
        e !== this.pageHeight && (this.pageHeight = e, this.getWindowDetails(), this.trackVisibleNodes());
      }.bind(this), this.config.pageHeightTimeoutDelay));
    }
  }, o.prototype.onScroll = function () {
    clearTimeout(this.scrollTimeout), this.scrollTimeout = setTimeout(function () {
      this.trackVisibleNodes();
    }.bind(this), this.config.scrollTimeoutDelay);
  }, o.prototype.onResize = function () {
    clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function () {
      this.getWindowDetails(), this.trackVisibleNodes();
    }.bind(this), this.config.resizeTimeoutDelay);
  }, o.prototype.getWindowDetails = function () {
    this.pageHeight = document.querySelector("body").clientHeight, this.windowHeight = window.innerHeight, this.trackedNodes = this.track.getTrackingNodes(this.trackedNodes);
  }, o.prototype.trackVisibleNodes = function () {
    for (var e = 0; e < this.trackedNodes.length; e++) {
      var t = this.trackedNodes[e];

      if (this.isVisible(t.top, t.bottom) && !t.alreadySeen) {
        t.alreadySeen = !0, t.node && t.node.setAttribute("data-autoscrolltracker-already-seen", !0);
        var n = t.eventData.action,
            o = t.eventData.label;
        window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent("ScrollTo", n, {
          label: o,
          nonInteraction: !0
        });
      }
    }
  }, o.prototype.isVisible = function (e, t) {
    var n = window.scrollY || document.documentElement.scrollTop;
    return n <= e && n + this.windowHeight >= t;
  }, o.Heading = function (e) {
    this.config = e;
  }, o.Heading.prototype.getTrackingNodes = function () {
    for (var e = [], t = this.findAllowedHeadings(), n = 0; n < t.length; n++) {
      var o = t[n];

      if (this.visible(o)) {
        var i = o.getBoundingClientRect();
        e.push({
          node: o,
          alreadySeen: o.getAttribute("data-autoscrolltracker-already-seen"),
          top: i.top + document.documentElement.scrollTop,
          bottom: i.bottom + document.documentElement.scrollTop,
          eventData: {
            action: "Heading",
            label: o.textContent.replace(/\s+/g, " ").trim()
          }
        });
      }
    }

    return e;
  }, o.Heading.prototype.findAllowedHeadings = function () {
    for (var e = [], t = ["h1", "h2", "h3", "h4", "h5", "h6"], n = this.config.trackHeadings, o = 0; o < this.config.allowHeadingsInside.length; o++) for (var i = document.querySelectorAll(this.config.allowHeadingsInside[o]), r = 0; r < i.length; r++) for (var a = i[r].querySelectorAll(t), s = 0; s < a.length; s++) n ? n.includes(a[s].textContent.trim()) && e.push(a[s]) : e.push(a[s]);

    return e;
  }, o.Heading.prototype.visible = function (e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }, o.Percentage = function (e) {
    this.config = e;
  }, o.Percentage.prototype.getTrackingNodes = function (e) {
    for (var t = document.body, n = document.documentElement, o = Math.max(t.scrollHeight, t.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight), i = [], r = 0; r < this.config.percentages.length; r++) {
      var a = this.config.percentages[r],
          s = o / 100 * a - 1,
          c = !1;
      e.length && (c = e[r].alreadySeen), i.push({
        alreadySeen: c,
        top: s,
        bottom: s,
        eventData: {
          action: "Percent",
          label: String(a)
        }
      });
    }

    return i;
  }, e.AutoScrollTracker = o;
}(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (e) {
  function t(e) {
    this.$module = e;
  }

  t.prototype.init = function () {
    this.attribute = "href", this.attributeValue = this.$module.getAttribute(this.attribute), this.eventType = "click", this.attributeValue || (this.attribute = "action", this.attributeValue = this.$module.getAttribute(this.attribute), this.eventType = "submit"), this.handleEvent = this.handleEvent.bind(this), this.handleCookiesAccepted = this.handleCookiesAccepted.bind(this), this.$module.addEventListener(this.eventType, this.handleEvent);
  }, t.prototype.decorate = function (e, t, n) {
    var o = e.getAttribute(n);
    o && (-1 !== o.indexOf("?") ? o += "&" + t : o += "?" + t, e.setAttribute(n, o));
  }, t.prototype.handleEvent = function (e) {
    e.preventDefault();
    var t = window.GOVUK.cookie("cookies_preferences_set"),
        n = window.GOVUK.getConsentCookie();
    "true" !== t ? this.decorate(this.$module, "cookie_consent=not-engaged", this.attribute) : n && !0 === n.usage ? this.handleCookiesAccepted() : this.decorate(this.$module, "cookie_consent=reject", this.attribute), this.$module.removeEventListener(this.eventType, this.handleEvent), "submit" === this.eventType ? this.$module.submit() : this.$module.click();
  }, t.prototype.handleCookiesAccepted = function () {
    var o = this.$module,
        i = this.attribute;
    this.decorate(o, "cookie_consent=accept", i), window.ga && window.ga(function () {
      var e = window.ga.getAll();

      if (e.length) {
        var t = new window.gaplugins.Linker(e[0]),
            n = o.getAttribute(i);
        o.setAttribute(i, t.decorate(n));
      }
    });
  }, e.ExplicitCrossDomainLinks = t;
}(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (e) {
  function t(e) {
    this.$module = e;
  }

  t.prototype.init = function () {
    this.$module.handleClick = this.handleClick.bind(this);
    var n = this.$module.hasAttribute("data-track-links-only"),
        o = this.$module.getAttribute("data-limit-to-element-class"),
        i = this;
    this.$module.addEventListener("click", function (e) {
      var t = e.target;
      n ? n && "A" === t.tagName && (o ? o && t.closest("." + o) && i.$module.handleClick(t) : i.$module.handleClick(t)) : i.$module.handleClick(t);
    });
  }, t.prototype.handleClick = function (e) {
    var t,
        n = {
      transport: "beacon"
    };

    if (e.hasAttribute("data-track-category") || e.hasAttribute("data-track-action") || (t = e.getAttribute("href"), e = e.closest("[data-track-category][data-track-action]")), e) {
      var o = e.getAttribute("data-track-category"),
          i = e.getAttribute("data-track-action"),
          r = e.getAttribute("data-track-label") || t,
          a = e.getAttribute("data-track-value"),
          s = e.getAttribute("data-track-dimension"),
          c = e.getAttribute("data-track-dimension-index"),
          l = e.getAttribute("data-track-options");
      if (r && (n.label = r), a && (n.value = a), s && c && (n["dimension" + c] = s), l) for (var u in l = JSON.parse(l)) n[u] = l[u];
      window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent(o, i, n);
    }
  }, e.GemTrackClick = t;
}(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (e) {
  function t(e) {
    this.$module = e;
  }

  t.prototype.init = function () {
    this.$module.trackChange = this.trackChange.bind(this), this.$module.fireTrackingChange = this.fireTrackingChange.bind(this), this.$module.addEventListener("change", this.trackChange);
  }, t.prototype.trackChange = function () {
    var e = this.options[this.selectedIndex];
    e.hasAttribute("data-track-category") && e.hasAttribute("data-track-action") && this.fireTrackingChange(e);
  }, t.prototype.fireTrackingChange = function (e) {
    var t = {
      transport: "beacon"
    },
        n = e.getAttribute("data-track-category"),
        o = e.getAttribute("data-track-action"),
        i = e.getAttribute("data-track-label"),
        r = e.getAttribute("data-track-value"),
        a = e.getAttribute("data-track-dimension"),
        s = e.getAttribute("data-track-dimension-index"),
        c = e.getAttribute("data-track-options");
    if (i && (t.label = i), r && (t.value = r), a && s && (t["dimension" + s] = a), c) for (var l in c = JSON.parse(c)) t[l] = c[l];
    window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent(n, o, t);
  }, e.TrackSelectChange = t;
}(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (r) {
  function e(e) {
    this.$module = e, r.crossDomainLinkedTrackers = r.crossDomainLinkedTrackers || [];
  }

  e.prototype.init = function () {
    this.isTrackable(this.$module) ? this.addLinkedTrackerDomain(this.$module) : this.findTrackableElements();
  }, e.prototype.isTrackable = function (e) {
    if (e.getAttribute("href") && e.getAttribute("data-tracking-code") && e.getAttribute("data-tracking-name")) return !0;
  }, e.prototype.findTrackableElements = function () {
    for (var e = this.$module.querySelectorAll("a"), t = 0; t < e.length; t++) this.isTrackable(e[t]) && this.addLinkedTrackerDomain(e[t]);
  }, e.prototype.addLinkedTrackerDomain = function (e) {
    var n = e.getAttribute("data-tracking-name"),
        t = e.getAttribute("data-tracking-code"),
        o = "true" === e.getAttribute("data-tracking-track-event");

    if ("undefined" !== window.GOVUK.analytics) {
      if (-1 === r.crossDomainLinkedTrackers.indexOf(n)) {
        var i = e.hostname;
        window.GOVUK.analytics.addLinkedTrackerDomain(t, n, i), r.crossDomainLinkedTrackers.push(n);
      }

      o && e.addEventListener("click", function (e) {
        var t = e.target;
        window.GOVUK.analytics.trackEvent("External Link Clicked", t.textContent, {
          trackerName: n
        });
      });
    }
  }, r.CrossDomainTracking = e;
}(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {}, function () {
  "use strict";

  var e = {
    load: function () {
      var e = document.getElementsByTagName("script")[0],
          t = document.createElement("script");

      if (t.async = !0, window.GOVUK.analyticsGa4.vars.gtag_id) {
        window.dataLayer = window.dataLayer || [];

        var n = function () {
          window.dataLayer.push(arguments);
        };

        n("js", new Date()), n("config", window.GOVUK.analyticsGa4.vars.gtag_id), t.src = "//www.googletagmanager.com/gtag/js?id=" + window.GOVUK.analyticsGa4.vars.gtag_id, e.parentNode.insertBefore(t, e);
      } else {
        window.dataLayer = window.dataLayer || [], window.dataLayer.push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js"
        });
        var o = window.GOVUK.analyticsGa4.vars.auth || "",
            i = window.GOVUK.analyticsGa4.vars.preview || "";
        o && (o = "&gtm_auth=" + o), i && (i = "&gtm_preview=" + i + "&gtm_cookies_win=x"), this.googleSrc = "https://www.googletagmanager.com/gtm.js?id=" + window.GOVUK.analyticsGa4.vars.id + o + i, t.src = this.googleSrc, e.parentNode.insertBefore(t, e), window.dataLayer.push({
          "gtm.blocklist": ["customPixels", "customScripts", "html", "nonGoogleScripts"]
        });
      }
    },
    sendData: function (e) {
      e.govuk_gem_version = this.getGemVersion(), window.dataLayer.push(e);
    },
    getGemVersion: function () {
      return window.GOVUK.analyticsGa4.vars.gem_version || "not found";
    }
  };
  window.GOVUK.analyticsGa4.core = e;
}(), function (e) {
  "use strict";

  var t = e.GOVUK || {},
      n = function () {
    this.undefined = undefined;
  };

  n.prototype.eventSchema = function () {
    return {
      event: this.undefined,
      event_data: {
        event_name: this.undefined,
        type: this.undefined,
        url: this.undefined,
        text: this.undefined,
        index: this.undefined,
        index_total: this.undefined,
        section: this.undefined,
        action: this.undefined,
        external: this.undefined,
        link_method: this.undefined
      }
    };
  }, t.analyticsGa4 = t.analyticsGa4 || {}, t.analyticsGa4.Schemas = n, e.GOVUK = t;
}(window), function (e) {
  "use strict";

  function t() {
    return 0 < document.querySelectorAll('meta[name="govuk:static-analytics:strip-dates"]').length;
  }

  function n() {
    return 0 < document.querySelectorAll('meta[name="govuk:static-analytics:strip-postcodes"]').length;
  }

  function o() {
    var e = document.querySelector('meta[name="govuk:static-analytics:strip-query-string-parameters"]'),
        t = !1;
    e && (t = e.getAttribute("content"));
    var n = [];
    if (t) for (var o = t.split(","), i = 0; i < o.length; i++) n.push(o[i].trim());
    return n;
  }

  var i = e.GOVUK || {},
      r = /[^\s=/?&#]+(?:@|%40)[^\s=/?&]+/g,
      a = /\b[A-PR-UWYZ][A-HJ-Z]?[0-9][0-9A-HJKMNPR-Y]?(?:[\s+]|%20)*[0-9](?!refund)[ABD-HJLNPQ-Z]{2,3}\b/gi,
      s = /\d{4}(-?)\d{2}(-?)\d{2}/g,
      c = /[|\\{}()[\]^$+*?.]/g,
      l = /reset_password_token=[a-zA-Z0-9-]+/g,
      u = /unlock_token=[a-zA-Z0-9-]+/g,
      d = /state=.[^&]+/g,
      p = function () {
    this.stripDatePII = t(), this.stripPostcodePII = n(), this.queryStringParametersToStrip = o();
  };

  p.prototype.PIISafe = function (e) {
    this.value = e;
  }, p.prototype.stripPII = function (e) {
    return "string" == typeof e ? this.stripPIIFromString(e) : "[object Array]" === Object.prototype.toString.call(e) || "[object Arguments]" === Object.prototype.toString.call(e) ? this.stripPIIFromArray(e) : "object" == typeof e ? this.stripPIIFromObject(e) : e;
  }, p.prototype.stripPIIWithOverride = function (e, t, n) {
    var o = this.stripDatePII,
        i = this.stripPostcodePII;
    this.stripDatePII = t, this.stripPostcodePII = n;
    var r = this.stripPII(e);
    return this.stripDatePII = o, this.stripPostcodePII = i, r;
  }, p.prototype.stripPIIFromString = function (e) {
    var t = e.replace(r, "[email]");
    return t = (t = (t = t.replace(l, "reset_password_token=[reset_password_token]")).replace(u, "unlock_token=[unlock_token]")).replace(d, "state=[state]"), t = this.stripQueryStringParameters(t), !0 === this.stripDatePII && (t = t.replace(s, "[date]")), !0 === this.stripPostcodePII && (t = t.replace(a, "[postcode]")), t;
  }, p.prototype.stripPIIFromObject = function (e) {
    if (e) {
      if (e instanceof this.PIISafe) return e.value;

      for (var t in e) {
        var n = e[t];
        e[t] = this.stripPII(n);
      }

      return e;
    }
  }, p.prototype.stripPIIFromArray = function (e) {
    for (var t = 0, n = e.length; t < n; t++) {
      var o = e[t];
      e[t] = this.stripPII(o);
    }

    return e;
  }, p.prototype.stripQueryStringParameters = function (e) {
    for (var t = 0; t < this.queryStringParametersToStrip.length; t++) {
      var n = this.queryStringParametersToStrip[t],
          o = n.replace(c, "\\$&"),
          i = new RegExp("((?:\\?|&)" + o + "=)(?:[^&#\\s]*)", "g");
      e = e.replace(i, "$1[" + n + "]");
    }

    return e;
  }, i.analyticsGa4 = i.analyticsGa4 || {}, i.analyticsGa4.PIIRemover = p, e.GOVUK = i;
}(window), window.GOVUK = window.GOVUK || {}, window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {}, window.GOVUK.analyticsGa4.analyticsModules = window.GOVUK.analyticsGa4.analyticsModules || {}, function (e) {
  "use strict";

  var t = {
    PIIRemover: new window.GOVUK.analyticsGa4.PIIRemover(),
    nullValue: undefined,
    init: function () {
      if (window.dataLayer) {
        var e = {
          event: "page_view",
          page_view: {
            location: this.getLocation(),
            referrer: this.getReferrer(),
            title: this.getTitle(),
            status_code: this.getStatusCode(),
            document_type: this.getMetaContent("format"),
            publishing_app: this.getMetaContent("publishing-app"),
            rendering_app: this.getMetaContent("rendering-app"),
            schema_name: this.getMetaContent("schema-name"),
            content_id: this.getMetaContent("content-id"),
            section: this.getMetaContent("section"),
            taxon_slug: this.getMetaContent("taxon-slug"),
            taxon_id: this.getMetaContent("taxon-id"),
            themes: this.getMetaContent("themes"),
            taxon_slugs: this.getMetaContent("taxon-slugs"),
            taxon_ids: this.getMetaContent("taxon-ids"),
            language: this.getLanguage(),
            history: this.getHistory(),
            withdrawn: this.getWithDrawn(),
            first_published_at: this.stripTimeFrom(this.getMetaContent("first-published-at")),
            updated_at: this.stripTimeFrom(this.getMetaContent("updated-at")),
            public_updated_at: this.stripTimeFrom(this.getMetaContent("public-updated-at")),
            publishing_government: this.getMetaContent("publishing-government"),
            political_status: this.getMetaContent("political-status"),
            primary_publishing_organisation: this.getMetaContent("primary-publishing-organisation"),
            organisations: this.getMetaContent("analytics:organisations"),
            world_locations: this.getMetaContent("analytics:world-locations")
          }
        };
        window.GOVUK.analyticsGa4.core.sendData(e);
      }
    },
    getLocation: function () {
      return this.PIIRemover.stripPII(document.location.href);
    },
    getReferrer: function () {
      return this.PIIRemover.stripPIIWithOverride(document.referrer, !0, !0);
    },
    getTitle: function () {
      return this.PIIRemover.stripPII(document.title);
    },
    getStatusCode: function () {
      return window.httpStatusCode ? window.httpStatusCode.toString() : "200";
    },
    getMetaContent: function (e) {
      var t = document.querySelector('meta[name="govuk:' + e + '"]');
      return t ? t.getAttribute("content") : this.nullValue;
    },
    getLanguage: function () {
      var e = document.getElementById("content");
      return e && e.getAttribute("lang") || this.nullValue;
    },
    getHistory: function () {
      return "true" === this.getMetaContent("content-has-history") ? "true" : "false";
    },
    getWithDrawn: function () {
      return "withdrawn" === this.getMetaContent("withdrawn") ? "true" : "false";
    },
    stripTimeFrom: function (e) {
      return e !== undefined ? e.split("T")[0] : this.nullValue;
    }
  };
  e.PageViewTracker = t;
}(window.GOVUK.analyticsGa4.analyticsModules), window.GOVUK = window.GOVUK || {}, window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {}, window.GOVUK.analyticsGa4.analyticsModules = window.GOVUK.analyticsGa4.analyticsModules || {}, function () {
  "use strict";

  var e = {
    init: function (e) {
      window.dataLayer && (e = e || {}, this.internalDomains = e.internalDomains || [], this.internalDomains.push(this.getHostname()), this.appendDomainsWithoutWWW(this.internalDomains), this.internalDownloadPaths = e.internalDownloadPaths || ["/government/uploads/"], this.dedicatedDownloadDomains = e.dedicatedDownloadDomains || ["assets.publishing.service.gov.uk"], this.appendDomainsWithoutWWW(this.dedicatedDownloadDomains), this.handleClick = this.handleClick.bind(this), this.handleMousedown = this.handleMousedown.bind(this), e.disableListeners || (document.querySelector("body").addEventListener("click", this.handleClick), document.querySelector("body").addEventListener("contextmenu", this.handleClick), document.querySelector("body").addEventListener("mousedown", this.handleMousedown)));
    },
    stopTracking: function () {
      document.querySelector("body").removeEventListener("click", this.handleClick), document.querySelector("body").removeEventListener("contextmenu", this.handleClick), document.querySelector("body").removeEventListener("mousedown", this.handleMousedown);
    },
    handleClick: function (e) {
      var t = e.target;

      if ("A" !== t.tagName && (t = t.closest("a")), t) {
        var n = {},
            o = t.getAttribute("href");

        if (o) {
          var i = t.getAttribute("data-ga4-link");

          if (i ? (i = JSON.parse(i), "populated-via-js" === (n = window.GOVUK.extendObject(n, i)).external && n.url && (n.external = this.isExternalLink(n.url) ? "true" : "false"), "populated-via-js" === n.link_method && (n.link_method = this.getClickType(e)), n.index && (n.index = parseInt(i.index)), n.index_total && (n.index_total = parseInt(i.index_total))) : this.isMailToLink(o) ? (n.event_name = "navigation", n.type = "email", n.external = "true", n.url = o, n.text = t.textContent.trim(), n.link_method = this.getClickType(e)) : this.isDownloadLink(o) ? (n.event_name = "file_download", n.type = this.isPreviewLink(o) ? "preview" : "generic download", n.external = this.isExternalLink(o) ? "true" : "false", n.url = o, n.text = t.textContent.trim(), n.link_method = this.getClickType(e)) : this.isExternalLink(o) && (n.event_name = "navigation", n.type = "generic link", n.external = "true", n.url = o, n.text = t.textContent.trim(), n.link_method = this.getClickType(e)), 0 < Object.keys(n).length) {
            var r = new window.GOVUK.analyticsGa4.Schemas().eventSchema();

            for (var a in r.event = "event_data", n) a in r.event_data && (r.event_data[a] = n[a]);

            window.GOVUK.analyticsGa4.core.sendData(r);
          }
        }
      }
    },
    appendDomainsWithoutWWW: function (e) {
      for (var t = 0; t < e.length; t++) {
        var n = e[t];

        if (this.stringStartsWith(n, "www.")) {
          var o = n.replace("www.", "");
          e.push(o);
        }
      }
    },
    getClickType: function (e) {
      switch (e.type) {
        case "click":
          return e.ctrlKey ? "ctrl click" : e.metaKey ? "command/win click" : e.shiftKey ? "shift click" : "primary click";

        case "mousedown":
          return "middle click";

        case "contextmenu":
          return "secondary click";
      }
    },
    handleMousedown: function (e) {
      1 === e.button && this.handleClick(e);
    },
    isMailToLink: function (e) {
      return "mailto:" === e.substring(0, 7);
    },
    isDownloadLink: function (e) {
      if (this.isInternalLink(e) && this.hrefPointsToDownloadPath(e)) return !0;

      for (var t = !1, n = 0; n < this.dedicatedDownloadDomains.length; n++) {
        var o = this.dedicatedDownloadDomains[n];
        this.hrefPointsToDomain(e, o) && (t = !0);
      }

      return t;
    },
    isInternalLink: function (e) {
      if (this.hrefIsRelative(e) || this.hrefIsAnchor(e)) return !0;

      for (var t = !1, n = 0; n < this.internalDomains.length; n++) {
        var o = this.internalDomains[n];
        this.hrefPointsToDomain(e, o) && (t = !0);
      }

      return t;
    },
    isExternalLink: function (e) {
      return !this.isInternalLink(e);
    },
    isPreviewLink: function (e) {
      return /\.\w+\/preview/i.test(e);
    },
    hrefPointsToDomain: function (e, t) {
      "/" !== t.substring(t.length) && (t += "/"), "/" !== e.substring(e.length) && (e += "/");
      var n = "http://" + t,
          o = "https://" + t,
          i = "//" + t;
      return this.stringStartsWith(e, t) || this.stringStartsWith(e, n) || this.stringStartsWith(e, o) || this.stringStartsWith(e, i);
    },
    hrefPointsToDownloadPath: function (e) {
      for (var t = !1, n = 0; n < this.internalDownloadPaths.length; n++) {
        var o = this.internalDownloadPaths[n];
        -1 !== e.indexOf(o) && (t = !0);
      }

      return t;
    },
    stringStartsWith: function (e, t) {
      return e.substring(0, t.length) === t;
    },
    hrefIsRelative: function (e) {
      return "/" === e[0] && "/" !== e[1];
    },
    hrefIsAnchor: function (e) {
      return "#" === e[0];
    },
    getHostname: function () {
      return window.location.hostname;
    }
  };
  window.GOVUK.analyticsGa4.analyticsModules.Ga4LinkTracker = e;
}(), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (e) {
  "use strict";

  function t(e) {
    this.module = e, this.trackingTrigger = "data-ga4";
  }

  t.prototype.init = function () {
    var e = window.GOVUK.getConsentCookie();
    e && e.settings ? this.startModule() : (this.startModule = this.startModule.bind(this), window.addEventListener("cookie-consent", this.startModule));
  }, t.prototype.startModule = function () {
    window.dataLayer && this.module.addEventListener("click", this.trackClick.bind(this), !0);
  }, t.prototype.trackClick = function (e) {
    var t = this.findTrackingAttributes(e.target);

    if (t) {
      var n = new window.GOVUK.analyticsGa4.Schemas().eventSchema();

      try {
        var o = t.getAttribute(this.trackingTrigger);
        o = JSON.parse(o);
      } catch (u) {
        return void console.error("GA4 configuration error: " + u.message, window.location);
      }

      for (var i in n.event = "event_data", o) i in n.event_data && (n.event_data[i] = o[i]);

      if (t.closest(".gem-c-accordion")) var r = this.getClosestAttribute(t, "aria-expanded");
      var a = t.closest("details");
      if (r) n.event_data.text = o.text || t.innerText, n.event_data.action = "false" === r ? "opened" : "closed";else if (a) {
        n.event_data.text = o.text || a.textContent;
        var s = a.getAttribute("open");
        n.event_data.action = null == s ? "opened" : "closed";
      }

      if (e.target.closest(".gem-c-tabs")) {
        var c = e.target.closest("a");

        if (c) {
          var l = c.getAttribute("href");
          l && (n.event_data.url = l);
        }
      }

      window.GOVUK.analyticsGa4.core.sendData(n);
    }
  }, t.prototype.findTrackingAttributes = function (e) {
    return e.hasAttribute("[" + this.trackingTrigger + "]") ? e : e.closest("[" + this.trackingTrigger + "]");
  }, t.prototype.getClosestAttribute = function (e, t) {
    var n = e.getAttribute(t),
        o = e.querySelector("[" + t + "]");
    return n || "" === n ? n : o ? o.getAttribute(t) : void 0;
  }, e.Ga4EventTracker = t;
}(window.GOVUK.Modules), function (e) {
  "use strict";

  var p = e.GOVUK || {};
  p.analyticsGa4 = p.analyticsGa4 || {}, p.analyticsGa4.Ga4EcommerceTracker = {
    PIIRemover: new p.analyticsGa4.PIIRemover(),
    DEFAULT_LIST_TITLE: "Site search results",
    init: function (e) {
      if (window.dataLayer) {
        if (this.searchResultsBlocks = document.querySelectorAll("[data-ga4-ecommerce]"), this.isNewPageLoad = e, 0 === !this.searchResultsBlocks.length) return;

        if (!this.isNewPageLoad) {
          var t = window.GOVUK.analyticsGa4.analyticsModules.PageViewTracker;
          t && t.init();
        }

        for (var n = 0; n < this.searchResultsBlocks.length; n++) this.trackSearchResults(this.searchResultsBlocks[n]), this.isNewPageLoad && this.searchResultsBlocks[n].addEventListener("click", this.handleClick.bind(this));
      }
    },
    trackSearchResults: function (e) {
      var t = this.populateEcommerceSchema(e, !1, null);
      this.clearPreviousEcommerceObject(), window.dataLayer.push(t);
    },
    handleClick: function (e) {
      var t = e.target.closest("[data-ga4-ecommerce]");

      if (e.target.getAttribute("data-ecommerce-path")) {
        var n = e.target,
            o = this.populateEcommerceSchema(t, !0, n);
        this.clearPreviousEcommerceObject(), window.dataLayer.push(o);
      }
    },
    populateEcommerceSchema: function (e, t, n) {
      var o = this.PIIRemover.stripPII(e.getAttribute("data-search-query")).substring(0, 100).toLowerCase(),
          i = e.getAttribute("data-ecommerce-variant") || undefined,
          r = e.querySelectorAll("[data-ecommerce-row]"),
          a = e.getAttribute("data-list-title") || this.DEFAULT_LIST_TITLE,
          s = parseInt(e.getAttribute("data-ecommerce-start-index"), 10),
          c = {
        event: "search_results",
        search_results: {
          event_name: t && n ? "select_item" : "view_item_list",
          term: o,
          sort: i,
          results: this.getResultsCount(e),
          ecommerce: {
            items: []
          }
        }
      };
      if (t && n) c.search_results.ecommerce.items.push({
        item_id: n.getAttribute("data-ecommerce-path"),
        item_name: n.textContent,
        item_list_name: a,
        index: this.getIndex(n, s)
      }), c.event_data = {
        external: p.analyticsGa4.analyticsModules.Ga4LinkTracker.isExternalLink(n.getAttribute("data-ecommerce-path")) ? "true" : "false"
      };else for (var l = 0; l < r.length; l++) {
        var u = r[l],
            d = u.getAttribute("data-ecommerce-path");
        u.getAttribute("data-ecommerce-index") || u.setAttribute("data-ecommerce-index", l + 1), c.search_results.ecommerce.items.push({
          item_id: d,
          item_list_name: a,
          index: this.getIndex(u, s)
        });
      }
      return c;
    },
    getIndex: function (e, t) {
      return parseInt(e.getAttribute("data-ecommerce-index")) + t - 1;
    },
    clearPreviousEcommerceObject: function () {
      window.dataLayer.push({
        search_results: {
          ecommerce: null
        }
      });
    },
    getResultsCount: function (e) {
      var t = e.querySelector("#js-result-count");
      return t ? (t = (t = t.textContent.replace(",", "")).split(" ")[0], parseInt(t)) : null;
    }
  }, e.GOVUK = p;
}(window), window.GOVUK = window.GOVUK || {}, window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {};

var initFunction = function () {
  var e = window.GOVUK.getConsentCookie();

  if (e && e.usage) {
    window.GOVUK.analyticsGa4.core.load();
    var t = window.GOVUK.analyticsGa4.analyticsModules;

    for (var n in t) {
      var o = t[n];
      "function" == typeof o.init && o.init();
    }
  } else window.addEventListener("cookie-consent", window.GOVUK.analyticsGa4.init);
};

window.GOVUK.analyticsGa4.init = initFunction;
var linkedDomains = ["access.service.gov.uk", "access.tax.service.gov.uk", "account.companieshouse.gov.uk", "accounts.manage-apprenticeships.service.gov.uk", "account.publishing.service.gov.uk", "add-driving-licence-check-code.service.gov.uk", "analyse-school-performance.service.gov.uk", "appeal-tax-tribunal.service.gov.uk", "apply-basic-criminal-record-check.service.gov.uk", "apply-blue-badge.service.gov.uk", "apply-company-tachograph-card.service.gov.uk", "apply-for-bankruptcy.service.gov.uk", "apply-for-debt-relief-order.service.gov.uk", "apply-for-environmental-permit.service.gov.uk", "apply-for-eu-settled-status.homeoffice.gov.uk", "apply-for-innovation-funding.service.gov.uk", "apply-for-refugee-integration-loan.service.gov.uk", "apply-licence.ozone-depleting-substances.service.gov.uk", "apply-quota.fluorinated-gas.service.gov.uk", "apply-quota.ozone-depleting-substances.service.gov.uk", "beta.companieshouse.gov.uk", "biometric-residence-permit.service.gov.uk", "businessreadinessfund.beis.gov.uk", "catchreturn.service.gov.uk", "checklegalaid.service.gov.uk", "check-mot.service.gov.uk", "check-payment-practices.service.gov.uk", "check-vehicle-recalls.service.gov.uk", "civil-service-careers.gov.uk", "civilservicejobs.service.gov.uk", "claim.redundancy-payments.service.gov.uk", "claim-power-of-attorney-refund.service.gov.uk", "compare-school-performance.service.gov.uk", "complete-deputy-report.service.gov.uk", "contractsfinder.service.gov.uk", "coronavirus.data.gov.uk", "coronavirus-business-volunteers.service.gov.uk", "coronavirus-shielding-support.service.gov.uk", "coronavirus-vulnerable-people.service.gov.uk", "courttribunalfinder.service.gov.uk", "create-energy-label.service.gov.uk", "create-qr-code-poster.service.gov.uk", "cymraeg.registertovote.service.gov.uk", "dartford-crossing-charge.service.gov.uk", "design-system.service.gov.uk", "devtracker.dfid.gov.uk", "digitalmarketplace.service.gov.uk", "eforms.homeoffice.gov.uk", "electronic-visa-waiver.service.gov.uk", "employmenttribunals.service.gov.uk", "eu-settled-status-enquiries.service.gov.uk", "faster-uk-entry.service.gov.uk", "finance.manage-apprenticeships.service.gov.uk", "find-and-update.company-information.service.gov.uk", "findapprenticeship.service.gov.uk", "find-coronavirus-support.service.gov.uk", "flood-map-for-planning.service.gov.uk", "flood-warning-information.service.gov.uk", "follow.company-information.service.gov.uk", "gender-pay-gap.service.gov.uk", "get-fishing-licence.service.gov.uk", "get-information-schools.service.gov.uk", "gro.gov.uk", "helpforhouseholds.campaign.gov.uk", "helpwithcourtfees.service.gov.uk", "help-with-prison-visits.service.gov.uk", "identity.company-information.service.gov.uk", "identity-sandbox.company-information.service.gov.uk", "import-products-animals-food-feed.service.gov.uk", "lastingpowerofattorney.service.gov.uk", "live.email-dvla.service.gov.uk", "live.dvla-web-chat.service.gov.uk", "loststolenpassport.service.gov.uk", "makeaplea.service.gov.uk", "managefleetvehicles.service.gov.uk", "manage-apprenticeships.service.gov.uk", "manage-fish-exports.service.gov.uk", "manage-quota.fluorinated-gas.service.gov.uk", "manage-water-abstraction-impoundment-licence.service.gov.uk", "match.redundancy-payments.service.gov.uk", "mot-testing.service.gov.uk", "nominate-uk-honour.service.gov.uk", "notice.redundancy-payments.service.gov.uk", "passport.service.gov.uk", "paydvlafine.service.gov.uk", "payments.service.gov.uk", "publish-payment-practices.service.gov.uk", "queens-awards-enterprise.service.gov.uk", "recruit.manage-apprenticeships.service.gov.uk", "register.fluorinated-gas.service.gov.uk", "register-trailer.service.gov.uk", "register.ozone-depleting-substances.service.gov.uk", "registertovote.service.gov.uk", "register-vehicle.service.gov.uk", "registers.service.gov.uk", "reminders.mot-testing.service.gov.uk", "renewable-heat-calculator.service.gov.uk", "reply-jury-summons.service.gov.uk", "report-director-conduct.service.gov.uk", "report.fluorinated-gas.service.gov.uk", "report.ozone-depleting-substances.service.gov.uk", "right-to-rent.homeoffice.gov.uk", "right-to-work.service.gov.uk", "ruralpayments.service.gov.uk", "schools-financial-benchmarking.service.gov.uk", "secured.studentfinanceni.co.uk", "secured.studentfinancewales.co.uk", "selfservice.payments.service.gov.uk", "send-money-to-prisoner.service.gov.uk", "signin.service.gov.uk", "sorn.service.gov.uk", "staff.helpwithcourtfees.service.gov.uk", "student-finance.service.gov.uk", "tax.service.gov.uk", "teacherservices.education.gov.uk", "teaching-vacancies.service.gov.uk", "to-visit-or-stay-in-the-uk.homeoffice.gov.uk", "trade-tariff.service.gov.uk", "tribunal-response.employmenttribunals.service.gov.uk", "ukri.org", "update-student-loan-employment-details.service.gov.uk", "vehicle-operator-licensing.service.gov.uk", "vehicleenquiry.service.gov.uk", "viewdrivingrecord.service.gov.uk", "view-and-prove-your-rights.homeoffice.gov.uk", "view-immigration-status.service.gov.uk", "visa-address-update.service.gov.uk", "visas-immigration.service.gov.uk", "your-defra-account.defra.gov.uk"];
window.GOVUK.analyticsVars = window.GOVUK.analyticsVars || {}, window.GOVUK.analyticsVars.gaProperty = "UA-26179049-1", window.GOVUK.analyticsVars.primaryLinkedDomains = ["account.gov.uk"], window.GOVUK.analyticsVars.gaPropertyCrossDomain = "UA-145652997-1", window.GOVUK.analyticsVars.linkedDomains = linkedDomains, "undefined" != typeof window.GOVUK.analyticsInit && window.GOVUK.analyticsInit();
var gtm_id = "GTM-MG7HG5W",
    gtag_id = null;
(gtm_id || gtag_id) && "undefined" != typeof window.GOVUK.analyticsGa4.init && (window.GOVUK.analyticsGa4 = window.GOVUK.analyticsGa4 || {}, window.GOVUK.analyticsGa4.vars = window.GOVUK.analyticsGa4.vars || {}, window.GOVUK.analyticsGa4.vars.gem_version = "31.1.1", gtag_id ? window.GOVUK.analyticsGa4.vars.gtag_id = gtag_id : (window.GOVUK.analyticsGa4.vars.id = gtm_id, window.GOVUK.analyticsGa4.vars.auth = "", window.GOVUK.analyticsGa4.vars.preview = ""), window.GOVUK.analyticsGa4.init()), function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("GOVUKFrontend.Button", t) : (e.GOVUKFrontend = e.GOVUKFrontend || {}, e.GOVUKFrontend.Button = t());
}(this, function () {
  "use strict";

  function e(e) {
    this.$module = e, this.debounceFormSubmitTimer = null;
  }

  (function () {
    "Window" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && function (e) {
      e.constructor ? e.Window = e.constructor : (e.Window = e.constructor = new Function("return function Window() {}")()).prototype = this;
    }(this);
  }).call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "Document" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(), this.Document.prototype = document));
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "Element" in this && "HTMLElement" in this || function () {
      function e() {
        return r-- || clearTimeout(t), !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (l(document, !0), t && document.body.prototype && clearTimeout(t), !!document.body.prototype);
      }

      if (!window.Element || window.HTMLElement) {
        window.Element = window.HTMLElement = new Function("return function Element() {}")();

        var t,
            n = document.appendChild(document.createElement("body")),
            o = n.appendChild(document.createElement("iframe")).contentWindow.document,
            s = Element.prototype = o.appendChild(o.createElement("*")),
            c = {},
            l = function (e, t) {
          var n,
              o,
              i,
              r = e.childNodes || [],
              a = -1;
          if (1 === e.nodeType && e.constructor !== Element) for (n in e.constructor = Element, c) o = c[n], e[n] = o;

          for (; i = t && r[++a];) l(i, t);

          return e;
        },
            u = document.getElementsByTagName("*"),
            i = document.createElement,
            r = 100;

        s.attachEvent("onpropertychange", function (e) {
          for (var t, n = e.propertyName, o = !c.hasOwnProperty(n), i = s[n], r = c[n], a = -1; t = u[++a];) 1 === t.nodeType && (o || t[n] === r) && (t[n] = i);

          c[n] = i;
        }), s.constructor = Element, s.hasAttribute || (s.hasAttribute = function a(e) {
          return null !== this.getAttribute(e);
        }), e() || (document.onreadystatechange = e, t = setInterval(e, 25)), document.createElement = function d(e) {
          var t = i(String(e).toLowerCase());
          return l(t);
        }, document.removeChild(n);
      } else window.HTMLElement = window.Element;
    }();
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    var s, c, l, u;
    "defineProperty" in Object && function () {
      try {
        var e = {};
        return Object.defineProperty(e, "test", {
          value: 42
        }), !0;
      } catch (t) {
        return !1;
      }
    }() || (s = Object.defineProperty, c = Object.prototype.hasOwnProperty("__defineGetter__"), l = "Getters & setters cannot be defined on this javascript engine", u = "A property cannot both have accessors and be writable or have a value", Object.defineProperty = function d(e, t, n) {
      if (s && (e === window || e === document || e === Element.prototype || e instanceof Element)) return s(e, t, n);
      if (null === e || !(e instanceof Object || "object" == typeof e)) throw new TypeError("Object.defineProperty called on non-object");
      if (!(n instanceof Object)) throw new TypeError("Property description must be an object");
      var o = String(t),
          i = "value" in n || "writable" in n,
          r = "get" in n && typeof n.get,
          a = "set" in n && typeof n.set;

      if (r) {
        if ("function" !== r) throw new TypeError("Getter must be a function");
        if (!c) throw new TypeError(l);
        if (i) throw new TypeError(u);

        Object.__defineGetter__.call(e, o, n.get);
      } else e[o] = n.value;

      if (a) {
        if ("function" !== a) throw new TypeError("Setter must be a function");
        if (!c) throw new TypeError(l);
        if (i) throw new TypeError(u);

        Object.__defineSetter__.call(e, o, n.set);
      }

      return "value" in n && (e[o] = n.value), e;
    });
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function (l) {
    (function (e) {
      if (!("Event" in e)) return !1;
      if ("function" == typeof e.Event) return !0;

      try {
        return new Event("click"), !0;
      } catch (t) {
        return !1;
      }
    })(this) || function () {
      function u(e, t) {
        for (var n = -1, o = e.length; ++n < o;) if (n in e && e[n] === t) return n;

        return -1;
      }

      var i = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      };

      if ("undefined" != typeof document && "undefined" != typeof window) {
        var e = window.Event && window.Event.prototype || null;
        window.Event = Window.prototype.Event = function r(e, t) {
          if (!e) throw new Error("Not enough arguments");
          var n;

          if ("createEvent" in document) {
            n = document.createEvent("Event");
            var o = !(!t || t.bubbles === l) && t.bubbles,
                i = !(!t || t.cancelable === l) && t.cancelable;
            return n.initEvent(e, o, i), n;
          }

          return (n = document.createEventObject()).type = e, n.bubbles = !(!t || t.bubbles === l) && t.bubbles, n.cancelable = !(!t || t.cancelable === l) && t.cancelable, n;
        }, e && Object.defineProperty(window.Event, "prototype", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: e
        }), "createEvent" in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function a(e, t) {
          var l = this,
              n = e,
              o = t;
          if (l === window && n in i) throw new Error("In IE8 the event: " + n + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
          l._events || (l._events = {}), l._events[n] || (l._events[n] = function (e) {
            var t,
                n = l._events[e.type].list,
                o = n.slice(),
                i = -1,
                r = o.length;

            for (e.preventDefault = function a() {
              !1 !== e.cancelable && (e.returnValue = !1);
            }, e.stopPropagation = function s() {
              e.cancelBubble = !0;
            }, e.stopImmediatePropagation = function c() {
              e.cancelBubble = !0, e.cancelImmediate = !0;
            }, e.currentTarget = l, e.relatedTarget = e.fromElement || null, e.target = e.target || e.srcElement || l, e.timeStamp = new Date().getTime(), e.clientX && (e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop); ++i < r && !e.cancelImmediate;) i in o && -1 !== u(n, t = o[i]) && "function" == typeof t && t.call(l, e);
          }, l._events[n].list = [], l.attachEvent && l.attachEvent("on" + n, l._events[n])), l._events[n].list.push(o);
        }, window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function s(e, t) {
          var n,
              o = this,
              i = e,
              r = t;
          o._events && o._events[i] && o._events[i].list && -1 !== (n = u(o._events[i].list, r)) && (o._events[i].list.splice(n, 1), o._events[i].list.length || (o.detachEvent && o.detachEvent("on" + i, o._events[i]), delete o._events[i]));
        }, window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(e) {
          if (!arguments.length) throw new Error("Not enough arguments");
          if (!e || "string" != typeof e.type) throw new Error("DOM Events Exception 0");
          var t = this,
              n = e.type;

          try {
            if (!e.bubbles) {
              e.cancelBubble = !0;

              var o = function (e) {
                e.cancelBubble = !0, (t || window).detachEvent("on" + n, o);
              };

              this.attachEvent("on" + n, o);
            }

            this.fireEvent("on" + n, e);
          } catch (i) {
            for (e.target = t; "_events" in (e.currentTarget = t) && "function" == typeof t._events[n] && t._events[n].call(t, e), "function" == typeof t["on" + n] && t["on" + n].call(t, e), (t = 9 === t.nodeType ? t.parentWindow : t.parentNode) && !e.cancelBubble;);
          }

          return !0;
        }, document.attachEvent("onreadystatechange", function () {
          "complete" === document.readyState && document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: !0
          }));
        }));
      }
    }();
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "bind" in Function.prototype || Object.defineProperty(Function.prototype, "bind", {
      value: function G(t) {
        var n,
            e = Array,
            o = Object,
            i = o.prototype,
            r = e.prototype,
            a = function a() {},
            s = i.toString,
            c = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
            l = Function.prototype.toString,
            u = function u(e) {
          try {
            return l.call(e), !0;
          } catch (t) {
            return !1;
          }
        },
            d = "[object Function]",
            p = "[object GeneratorFunction]";

        n = function n(e) {
          if ("function" != typeof e) return !1;
          if (c) return u(e);
          var t = s.call(e);
          return t === d || t === p;
        };

        var m = r.slice,
            f = r.concat,
            h = r.push,
            v = Math.max,
            g = this;
        if (!n(g)) throw new TypeError("Function.prototype.bind called on incompatible " + g);

        for (var y, w = m.call(arguments, 1), b = function () {
          if (this instanceof y) {
            var e = g.apply(this, f.call(w, m.call(arguments)));
            return o(e) === e ? e : this;
          }

          return g.apply(t, f.call(w, m.call(arguments)));
        }, k = v(0, g.length - w.length), E = [], O = 0; O < k; O++) h.call(E, "$" + O);

        return y = Function("binder", "return function (" + E.join(",") + "){ return binder.apply(this, arguments); }")(b), g.prototype && (a.prototype = g.prototype, y.prototype = new a(), a.prototype = null), y;
      }
    });
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {});
  var n = 32,
      t = 1;
  return e.prototype.handleKeyDown = function (e) {
    var t = e.target;
    "button" === t.getAttribute("role") && e.keyCode === n && (e.preventDefault(), t.click());
  }, e.prototype.debounce = function (e) {
    if ("true" === e.target.getAttribute("data-prevent-double-click")) return this.debounceFormSubmitTimer ? (e.preventDefault(), !1) : void (this.debounceFormSubmitTimer = setTimeout(function () {
      this.debounceFormSubmitTimer = null;
    }.bind(this), 1e3 * t));
  }, e.prototype.init = function () {
    this.$module.addEventListener("keydown", this.handleKeyDown), this.$module.addEventListener("click", this.debounce);
  }, e;
}), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, window.GOVUK.Modules.GovukButton = window.GOVUKFrontend.Button, window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (e) {
  function t(e) {
    this.$module = e, this.$module.cookieBanner = document.querySelector(".gem-c-cookie-banner"), this.$module.cookieBannerConfirmationMessage = this.$module.querySelector(".gem-c-cookie-banner__confirmation"), this.$module.cookieBannerConfirmationMessageText = this.$module.querySelector(".gem-c-cookie-banner__confirmation-message");
  }

  t.prototype.init = function () {
    this.$module.hideCookieMessage = this.hideCookieMessage.bind(this), this.$module.showConfirmationMessage = this.showConfirmationMessage.bind(this), this.$module.setCookieConsent = this.setCookieConsent.bind(this), this.$module.rejectCookieConsent = this.rejectCookieConsent.bind(this), this.setupCookieMessage();
  }, t.prototype.setupCookieMessage = function () {
    if (this.$hideLinks = this.$module.querySelectorAll("button[data-hide-cookie-banner]"), this.$hideLinks && this.$hideLinks.length) for (var e = 0; e < this.$hideLinks.length; e++) this.$hideLinks[e].addEventListener("click", this.$module.hideCookieMessage);
    this.$acceptCookiesButton = this.$module.querySelector("button[data-accept-cookies]"), this.$acceptCookiesButton && (this.$acceptCookiesButton.style.display = "block", this.$acceptCookiesButton.addEventListener("click", this.$module.setCookieConsent)), this.$rejectCookiesButton = this.$module.querySelector("button[data-reject-cookies]"), this.$rejectCookiesButton && (this.$rejectCookiesButton.style.display = "block", this.$rejectCookiesButton.addEventListener("click", this.$module.rejectCookieConsent)), this.showCookieMessage();
  }, t.prototype.showCookieMessage = function () {
    this.isInCookiesPage() || this.isInIframe() ? this.$module.style.display = "none" : this.$module && "true" !== window.GOVUK.cookie("cookies_preferences_set") ? (this.$module.style.display = "block", window.GOVUK.cookie("cookies_policy") || window.GOVUK.setDefaultConsentCookie(), window.GOVUK.deleteUnconsentedCookies()) : this.$module.style.display = "none";
  }, t.prototype.hideCookieMessage = function (e) {
    this.$module && (this.$module.hidden = !0, this.$module.style.display = "none", window.GOVUK.cookie("cookies_preferences_set", "true", {
      days: 365
    })), e.target && e.preventDefault();
  }, t.prototype.setCookieConsent = function () {
    "all" === this.$acceptCookiesButton.getAttribute("data-cookie-types") && this.$module.cookieBannerConfirmationMessageText.insertAdjacentHTML("afterbegin", "You have accepted additional cookies. "), window.GOVUK.approveAllCookieTypes(), this.$module.showConfirmationMessage(), this.$module.cookieBannerConfirmationMessage.focus(), window.GOVUK.cookie("cookies_preferences_set", "true", {
      days: 365
    }), window.GOVUK.analyticsInit && window.GOVUK.analyticsInit(), window.GOVUK.globalBarInit && window.GOVUK.globalBarInit.init(), window.GOVUK.triggerEvent(window, "cookie-consent");
  }, t.prototype.rejectCookieConsent = function () {
    this.$module.cookieBannerConfirmationMessageText.insertAdjacentHTML("afterbegin", "You have rejected additional cookies. "), this.$module.showConfirmationMessage(), this.$module.cookieBannerConfirmationMessage.focus(), window.GOVUK.cookie("cookies_preferences_set", "true", {
      days: 365
    }), window.GOVUK.setDefaultConsentCookie();
  }, t.prototype.showConfirmationMessage = function () {
    this.$cookieBannerMainContent = document.querySelector(".js-banner-wrapper"), this.$cookieBannerMainContent.hidden = !0, this.$module.cookieBannerConfirmationMessage.style.display = "block", this.$module.cookieBannerConfirmationMessage.hidden = !1;
  }, t.prototype.isInCookiesPage = function () {
    return "/help/cookies" === window.location.pathname;
  }, t.prototype.isInIframe = function () {
    return window.parent && window.location !== window.parent.location;
  }, e.CookieBanner = t;
}(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (e) {
  function t(e) {
    this.$module = e, this.somethingIsWrongForm = this.$module.querySelector("#something-is-wrong"), this.surveyForm = this.$module.querySelector("#page-is-not-useful"), this.prompt = this.$module.querySelector(".js-prompt"), this.forms = this.$module.querySelectorAll(".js-feedback-form"), this.toggleForms = this.$module.querySelectorAll(".js-toggle-form"), this.closeForms = this.$module.querySelectorAll(".js-close-form"), this.activeForm = !1, this.pageIsUsefulButton = this.$module.querySelector(".js-page-is-useful"), this.pageIsNotUsefulButton = this.$module.querySelector(".js-page-is-not-useful"), this.somethingIsWrongButton = this.$module.querySelector(".js-something-is-wrong"), this.promptQuestions = this.$module.querySelectorAll(".js-prompt-questions"), this.promptSuccessMessage = this.$module.querySelector(".js-prompt-success"), this.surveyWrapper = this.$module.querySelector("#survey-wrapper"), this.jshiddenClass = "js-hidden", this.whatDoingInput = this.$module.querySelector("[name=what_doing]"), this.whatWrongInput = this.$module.querySelector("[name=what_wrong]");
  }

  t.prototype.init = function () {
    this.setInitialAriaAttributes(), this.setHiddenValues(), this.prompt.hidden = !1;

    for (var e = 0; e < this.promptQuestions.length; e++) this.promptQuestions[e].hidden = !1;

    this.surveyForm.hidden = !0;

    for (var t = 0; t < this.toggleForms.length; t++) this.toggleForms[t].addEventListener("click", function (e) {
      e.preventDefault();
      var t = e.target.closest("button");
      this.toggleForm(t.getAttribute("aria-controls")), this.trackEvent(this.getTrackEventParams(t)), this.updateAriaAttributes(t);
    }.bind(this));

    for (var n = 0; n < this.closeForms.length; n++) this.closeForms[n].hidden = !1, this.closeForms[n].addEventListener("click", function (e) {
      e.preventDefault();
      var t = e.target,
          n = t.getAttribute("aria-controls");
      this.toggleForm(n), this.trackEvent(this.getTrackEventParams(t)), this.setInitialAriaAttributes(), this.revealInitialPrompt();
      var o = ".js-" + n;
      this.$module.querySelector(o).focus();
    }.bind(this));

    if (this.pageIsUsefulButton.addEventListener("click", function (e) {
      e.preventDefault(), this.trackEvent(this.getTrackEventParams(this.pageIsUsefulButton)), this.showFormSuccess(), this.revealInitialPrompt();
    }.bind(this)), this.pageIsNotUsefulButton.addEventListener("click", function () {
      var e,
          t = "111111111.1111111111";
      e = null === window.GOVUK.cookie("_ga") || "" === window.GOVUK.cookie("_ga") ? t : window.GOVUK.cookie("_ga").split(".").slice(-2).join("."), this.setHiddenValuesNotUsefulForm(e);
    }.bind(this)), this.somethingIsWrongButton.addEventListener("click", function () {
      this.timerInterval = setInterval(function () {
        this.timer = this.timer + 1, this.timerHoneyPot.setAttribute("value", this.timer);
      }.bind(this), 1e3);
    }.bind(this)), "function" == typeof window.URLSearchParams) for (var o = 0; o < this.forms.length; o++) this.forms[o].addEventListener("submit", function (e) {
      e.preventDefault();
      var t = e.target,
          n = new XMLHttpRequest(),
          o = t.getAttribute("action"),
          i = new FormData(t);
      i = new URLSearchParams(i).toString(), this.done = function () {
        200 === n.status ? (this.trackEvent(this.getTrackEventParams(t)), this.showFormSuccess(n.message), this.revealInitialPrompt(), this.setInitialAriaAttributes(), this.activeForm.hidden = !0, clearInterval(this.timerInterval)) : (this.showError(n), this.enableSubmitFormButton(t));
      }.bind(this), n.addEventListener("loadend", this.done), n.open("POST", o, !0), n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), this.disableSubmitFormButton(t), n.send(i);
    }.bind(this));
  }, t.prototype.disableSubmitFormButton = function (e) {
    e.querySelector('[type="submit"]').setAttribute("disabled", !0);
  }, t.prototype.enableSubmitFormButton = function (e) {
    e.querySelector('[type="submit"]').removeAttribute("disabled");
  }, t.prototype.setInitialAriaAttributes = function () {
    this.pageIsNotUsefulButton.setAttribute("aria-expanded", !1), this.somethingIsWrongButton.setAttribute("aria-expanded", !1);
  }, t.prototype.setHiddenValues = function () {
    var e = document.createElement("input");
    e.setAttribute("type", "hidden"), e.setAttribute("name", "javascript_enabled"), e.setAttribute("value", !0), this.somethingIsWrongForm.appendChild(e);
    var t = document.createElement("input");
    t.setAttribute("type", "hidden"), t.setAttribute("name", "referrer"), t.setAttribute("value", document.referrer || "unknown"), this.somethingIsWrongForm.appendChild(t), this.somethingIsWrongForm.invalidInfoError = ["<h2>Sorry, we\u2019re unable to send your message as you haven\u2019t given us any information.</h2>", " <p>Please tell us what you were doing or what went wrong</p>"].join(""), this.timer = 0, this.timerHoneyPot = document.createElement("input"), this.timerHoneyPot.setAttribute("type", "hidden"), this.timerHoneyPot.setAttribute("name", "timer"), this.timerHoneyPot.setAttribute("value", this.timer), this.somethingIsWrongForm.appendChild(this.timerHoneyPot);
  }, t.prototype.setHiddenValuesNotUsefulForm = function (e) {
    var t = window.location.pathname.replace(/[^\s=?&]+(?:@|%40)[^\s=?&]+/, "[email]"),
        n = encodeURI(t);

    if (this.surveyForm.invalidInfoError = ["<h2>Sorry, we\u2019re unable to send your message as you haven\u2019t given us a valid email address.</h2>", " <p>Enter an email address in the correct format, like name@example.com</p>"].join(""), 0 === document.querySelectorAll('[name="email_survey_signup[ga_client_id]"]').length) {
      var o = document.createElement("input");
      o.setAttribute("type", "hidden"), o.setAttribute("name", "email_survey_signup[ga_client_id]"), o.setAttribute("value", e || "0"), this.surveyForm.appendChild(o);
    }

    if (0 === document.querySelectorAll(".gem-c-feedback__email-link#take-survey").length) {
      var i = document.createElement("a");
      i.setAttribute("href", "https://www.smartsurvey.co.uk/s/gov-uk-banner/?c=" + n + "&amp;gcl=" + e), i.setAttribute("class", "gem-c-feedback__email-link govuk-link"), i.setAttribute("id", "take-survey"), i.setAttribute("target", "_blank"), i.setAttribute("rel", "noopener noreferrer"), i.innerHTML = "Don\u2019t have an email address?", this.surveyWrapper.appendChild(i);
    }
  }, t.prototype.updateAriaAttributes = function (e) {
    e.setAttribute("aria-expanded", !0);
  }, t.prototype.toggleForm = function (e) {
    this.activeForm = this.$module.querySelector("#" + e), this.activeForm.hidden ? this.activeForm.hidden = !1 : this.activeForm.hidden = !0, this.prompt.hidden ? this.prompt.hidden = !1 : this.prompt.hidden = !0, this.activeForm.hidden ? (this.activeForm = !1, clearInterval(this.timerInterval)) : this.activeForm.querySelectorAll(".gem-c-textarea .govuk-textarea, .gem-c-input.govuk-input")[0].focus();
  }, t.prototype.getTrackEventParams = function (e) {
    return {
      category: e.getAttribute("data-track-category"),
      action: e.getAttribute("data-track-action")
    };
  }, t.prototype.trackEvent = function (e) {
    window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && window.GOVUK.analytics.trackEvent(e.category, e.action);
  }, t.prototype.showError = function (e) {
    var t = ["<h2>Sorry, we\u2019re unable to receive your message right now.</h2>", " <p>If the problem persists, we have other ways for you to provide", ' feedback on the <a href="/contact/govuk">contact page</a>.</p>'].join("");
    e = "response" in e ? "object" == typeof e.response && null !== e.response ? "email survey sign up failure" === e.response.message ? t : e.response.message : t : 422 === e.status && this.activeForm.invalidInfoError || t;
    var n = this.activeForm.querySelector(".js-errors");
    n.innerHTML = e, n.hidden = !1, n.focus();
  }, t.prototype.showFormSuccess = function () {
    for (var e = 0; e < this.promptQuestions.length; e++) this.promptQuestions[e].hidden = !0;

    this.promptSuccessMessage.hidden = !1, this.promptSuccessMessage.focus();
  }, t.prototype.revealInitialPrompt = function () {
    this.prompt.hidden = !1, this.prompt.focus();
  }, e.Feedback = t;
}(window.GOVUK.Modules), function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("GOVUKFrontend.Header", t) : (e.GOVUKFrontend = e.GOVUKFrontend || {}, e.GOVUKFrontend.Header = t());
}(this, function () {
  "use strict";

  function e(e) {
    this.$module = e, this.$menuButton = e && e.querySelector(".govuk-js-header-toggle"), this.$menu = this.$menuButton && e.querySelector("#" + this.$menuButton.getAttribute("aria-controls")), this.menuIsOpen = !1, this.mql = null;
  }

  return function () {
    "Window" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && function (e) {
      e.constructor ? e.Window = e.constructor : (e.Window = e.constructor = new Function("return function Window() {}")()).prototype = this;
    }(this);
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "Document" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(), this.Document.prototype = document));
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "Element" in this && "HTMLElement" in this || function () {
      function e() {
        return r-- || clearTimeout(t), !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (l(document, !0), t && document.body.prototype && clearTimeout(t), !!document.body.prototype);
      }

      if (!window.Element || window.HTMLElement) {
        window.Element = window.HTMLElement = new Function("return function Element() {}")();

        var t,
            n = document.appendChild(document.createElement("body")),
            o = n.appendChild(document.createElement("iframe")).contentWindow.document,
            s = Element.prototype = o.appendChild(o.createElement("*")),
            c = {},
            l = function (e, t) {
          var n,
              o,
              i,
              r = e.childNodes || [],
              a = -1;
          if (1 === e.nodeType && e.constructor !== Element) for (n in e.constructor = Element, c) o = c[n], e[n] = o;

          for (; i = t && r[++a];) l(i, t);

          return e;
        },
            u = document.getElementsByTagName("*"),
            i = document.createElement,
            r = 100;

        s.attachEvent("onpropertychange", function (e) {
          for (var t, n = e.propertyName, o = !c.hasOwnProperty(n), i = s[n], r = c[n], a = -1; t = u[++a];) 1 === t.nodeType && (o || t[n] === r) && (t[n] = i);

          c[n] = i;
        }), s.constructor = Element, s.hasAttribute || (s.hasAttribute = function a(e) {
          return null !== this.getAttribute(e);
        }), e() || (document.onreadystatechange = e, t = setInterval(e, 25)), document.createElement = function d(e) {
          var t = i(String(e).toLowerCase());
          return l(t);
        }, document.removeChild(n);
      } else window.HTMLElement = window.Element;
    }();
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    var s, c, l, u;
    "defineProperty" in Object && function () {
      try {
        var e = {};
        return Object.defineProperty(e, "test", {
          value: 42
        }), !0;
      } catch (t) {
        return !1;
      }
    }() || (s = Object.defineProperty, c = Object.prototype.hasOwnProperty("__defineGetter__"), l = "Getters & setters cannot be defined on this javascript engine", u = "A property cannot both have accessors and be writable or have a value", Object.defineProperty = function d(e, t, n) {
      if (s && (e === window || e === document || e === Element.prototype || e instanceof Element)) return s(e, t, n);
      if (null === e || !(e instanceof Object || "object" == typeof e)) throw new TypeError("Object.defineProperty called on non-object");
      if (!(n instanceof Object)) throw new TypeError("Property description must be an object");
      var o = String(t),
          i = "value" in n || "writable" in n,
          r = "get" in n && typeof n.get,
          a = "set" in n && typeof n.set;

      if (r) {
        if ("function" !== r) throw new TypeError("Getter must be a function");
        if (!c) throw new TypeError(l);
        if (i) throw new TypeError(u);

        Object.__defineGetter__.call(e, o, n.get);
      } else e[o] = n.value;

      if (a) {
        if ("function" !== a) throw new TypeError("Setter must be a function");
        if (!c) throw new TypeError(l);
        if (i) throw new TypeError(u);

        Object.__defineSetter__.call(e, o, n.set);
      }

      return "value" in n && (e[o] = n.value), e;
    });
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function (l) {
    (function (e) {
      if (!("Event" in e)) return !1;
      if ("function" == typeof e.Event) return !0;

      try {
        return new Event("click"), !0;
      } catch (t) {
        return !1;
      }
    })(this) || function () {
      function u(e, t) {
        for (var n = -1, o = e.length; ++n < o;) if (n in e && e[n] === t) return n;

        return -1;
      }

      var i = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      };

      if ("undefined" != typeof document && "undefined" != typeof window) {
        var e = window.Event && window.Event.prototype || null;
        window.Event = Window.prototype.Event = function r(e, t) {
          if (!e) throw new Error("Not enough arguments");
          var n;

          if ("createEvent" in document) {
            n = document.createEvent("Event");
            var o = !(!t || t.bubbles === l) && t.bubbles,
                i = !(!t || t.cancelable === l) && t.cancelable;
            return n.initEvent(e, o, i), n;
          }

          return (n = document.createEventObject()).type = e, n.bubbles = !(!t || t.bubbles === l) && t.bubbles, n.cancelable = !(!t || t.cancelable === l) && t.cancelable, n;
        }, e && Object.defineProperty(window.Event, "prototype", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: e
        }), "createEvent" in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function a(e, t) {
          var l = this,
              n = e,
              o = t;
          if (l === window && n in i) throw new Error("In IE8 the event: " + n + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
          l._events || (l._events = {}), l._events[n] || (l._events[n] = function (e) {
            var t,
                n = l._events[e.type].list,
                o = n.slice(),
                i = -1,
                r = o.length;

            for (e.preventDefault = function a() {
              !1 !== e.cancelable && (e.returnValue = !1);
            }, e.stopPropagation = function s() {
              e.cancelBubble = !0;
            }, e.stopImmediatePropagation = function c() {
              e.cancelBubble = !0, e.cancelImmediate = !0;
            }, e.currentTarget = l, e.relatedTarget = e.fromElement || null, e.target = e.target || e.srcElement || l, e.timeStamp = new Date().getTime(), e.clientX && (e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop); ++i < r && !e.cancelImmediate;) i in o && -1 !== u(n, t = o[i]) && "function" == typeof t && t.call(l, e);
          }, l._events[n].list = [], l.attachEvent && l.attachEvent("on" + n, l._events[n])), l._events[n].list.push(o);
        }, window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function s(e, t) {
          var n,
              o = this,
              i = e,
              r = t;
          o._events && o._events[i] && o._events[i].list && -1 !== (n = u(o._events[i].list, r)) && (o._events[i].list.splice(n, 1), o._events[i].list.length || (o.detachEvent && o.detachEvent("on" + i, o._events[i]), delete o._events[i]));
        }, window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(e) {
          if (!arguments.length) throw new Error("Not enough arguments");
          if (!e || "string" != typeof e.type) throw new Error("DOM Events Exception 0");
          var t = this,
              n = e.type;

          try {
            if (!e.bubbles) {
              e.cancelBubble = !0;

              var o = function (e) {
                e.cancelBubble = !0, (t || window).detachEvent("on" + n, o);
              };

              this.attachEvent("on" + n, o);
            }

            this.fireEvent("on" + n, e);
          } catch (i) {
            for (e.target = t; "_events" in (e.currentTarget = t) && "function" == typeof t._events[n] && t._events[n].call(t, e), "function" == typeof t["on" + n] && t["on" + n].call(t, e), (t = 9 === t.nodeType ? t.parentWindow : t.parentNode) && !e.cancelBubble;);
          }

          return !0;
        }, document.attachEvent("onreadystatechange", function () {
          "complete" === document.readyState && document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: !0
          }));
        }));
      }
    }();
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function (p) {
    var e, t, n;
    "DOMTokenList" in this && (!("classList" in (e = document.createElement("x"))) || !e.classList.toggle("x", !1) && !e.className) || ("DOMTokenList" in (t = this) && t.DOMTokenList && (!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg") || document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList) || (t.DOMTokenList = function () {
      var i = !0,
          n = function (e, t, n, o) {
        Object.defineProperty ? Object.defineProperty(e, t, {
          configurable: !1 === i || !!o,
          get: n
        }) : e.__defineGetter__(t, n);
      };

      try {
        n({}, "support");
      } catch (e) {
        i = !1;
      }

      return function (i, r) {
        var a = this,
            s = [],
            c = {},
            l = 0,
            e = 0,
            t = function (e) {
          n(a, e, function () {
            return d(), s[e];
          }, !1);
        },
            u = function () {
          if (e <= l) for (; e < l; ++e) t(e);
        },
            d = function () {
          var e,
              t,
              n = arguments,
              o = /\s+/;
          if (n.length) for (t = 0; t < n.length; ++t) if (o.test(n[t])) throw (e = new SyntaxError('String "' + n[t] + '" contains an invalid character')).code = 5, e.name = "InvalidCharacterError", e;

          for ("" === (s = "object" == typeof i[r] ? ("" + i[r].baseVal).replace(/^\s+|\s+$/g, "").split(o) : ("" + i[r]).replace(/^\s+|\s+$/g, "").split(o))[0] && (s = []), c = {}, t = 0; t < s.length; ++t) c[s[t]] = !0;

          l = s.length, u();
        };

        return d(), n(a, "length", function () {
          return d(), l;
        }), a.toLocaleString = a.toString = function () {
          return d(), s.join(" ");
        }, a.item = function (e) {
          return d(), s[e];
        }, a.contains = function (e) {
          return d(), !!c[e];
        }, a.add = function () {
          d.apply(a, e = arguments);

          for (var e, t, n = 0, o = e.length; n < o; ++n) t = e[n], c[t] || (s.push(t), c[t] = !0);

          l !== s.length && (l = s.length >>> 0, "object" == typeof i[r] ? i[r].baseVal = s.join(" ") : i[r] = s.join(" "), u());
        }, a.remove = function () {
          d.apply(a, e = arguments);

          for (var e, t = {}, n = 0, o = []; n < e.length; ++n) t[e[n]] = !0, delete c[e[n]];

          for (n = 0; n < s.length; ++n) t[s[n]] || o.push(s[n]);

          l = (s = o).length >>> 0, "object" == typeof i[r] ? i[r].baseVal = s.join(" ") : i[r] = s.join(" "), u();
        }, a.toggle = function (e, t) {
          return d.apply(a, [e]), p !== t ? t ? (a.add(e), !0) : (a.remove(e), !1) : c[e] ? (a.remove(e), !1) : (a.add(e), !0);
        }, a;
      };
    }()), "classList" in (n = document.createElement("span")) && (n.classList.toggle("x", !1), n.classList.contains("x") && (n.classList.constructor.prototype.toggle = function i(e, t) {
      var n = t;
      if (n !== p) return this[(n = !!n) ? "add" : "remove"](e), n;
      var o = !this.contains(e);
      return this[o ? "add" : "remove"](e), o;
    })), function () {
      var e = document.createElement("span");

      if ("classList" in e && (e.classList.add("a", "b"), !e.classList.contains("b"))) {
        var o = e.classList.constructor.prototype.add;

        e.classList.constructor.prototype.add = function () {
          for (var e = arguments, t = arguments.length, n = 0; n < t; n++) o.call(this, e[n]);
        };
      }
    }(), function () {
      var e = document.createElement("span");

      if ("classList" in e && (e.classList.add("a"), e.classList.add("b"), e.classList.remove("a", "b"), e.classList.contains("b"))) {
        var o = e.classList.constructor.prototype.remove;

        e.classList.constructor.prototype.remove = function () {
          for (var e = arguments, t = arguments.length, n = 0; n < t; n++) o.call(this, e[n]);
        };
      }
    }());
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    var e;
    "document" in this && "classList" in document.documentElement && "Element" in this && "classList" in Element.prototype && ((e = document.createElement("span")).classList.add("a", "b"), e.classList.contains("b")) || function (e) {
      var u = !0,
          d = function (e, t, n, o) {
        Object.defineProperty ? Object.defineProperty(e, t, {
          configurable: !1 === u || !!o,
          get: n
        }) : e.__defineGetter__(t, n);
      };

      try {
        d({}, "support");
      } catch (t) {
        u = !1;
      }

      var p = function (e, c, l) {
        d(e.prototype, c, function () {
          var e,
              t = this,
              n = "__defineGetter__DEFINE_PROPERTY" + c;
          if (t[n]) return e;

          if (!(t[n] = !0) === u) {
            for (var o, i = p.mirror || document.createElement("div"), r = i.childNodes, a = r.length, s = 0; s < a; ++s) if (r[s]._R === t) {
              o = r[s];
              break;
            }

            o || (o = i.appendChild(document.createElement("div"))), e = DOMTokenList.call(o, t, l);
          } else e = new DOMTokenList(t, l);

          return d(t, c, function () {
            return e;
          }), delete t[n], e;
        }, !0);
      };

      p(e.Element, "classList", "className"), p(e.HTMLElement, "classList", "className"), p(e.HTMLLinkElement, "relList", "rel"), p(e.HTMLAnchorElement, "relList", "rel"), p(e.HTMLAreaElement, "relList", "rel");
    }(this);
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "bind" in Function.prototype || Object.defineProperty(Function.prototype, "bind", {
      value: function G(t) {
        var n,
            e = Array,
            o = Object,
            i = o.prototype,
            r = e.prototype,
            a = function a() {},
            s = i.toString,
            c = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
            l = Function.prototype.toString,
            u = function u(e) {
          try {
            return l.call(e), !0;
          } catch (t) {
            return !1;
          }
        },
            d = "[object Function]",
            p = "[object GeneratorFunction]";

        n = function n(e) {
          if ("function" != typeof e) return !1;
          if (c) return u(e);
          var t = s.call(e);
          return t === d || t === p;
        };

        var m = r.slice,
            f = r.concat,
            h = r.push,
            v = Math.max,
            g = this;
        if (!n(g)) throw new TypeError("Function.prototype.bind called on incompatible " + g);

        for (var y, w = m.call(arguments, 1), b = function () {
          if (this instanceof y) {
            var e = g.apply(this, f.call(w, m.call(arguments)));
            return o(e) === e ? e : this;
          }

          return g.apply(t, f.call(w, m.call(arguments)));
        }, k = v(0, g.length - w.length), E = [], O = 0; O < k; O++) h.call(E, "$" + O);

        return y = Function("binder", "return function (" + E.join(",") + "){ return binder.apply(this, arguments); }")(b), g.prototype && (a.prototype = g.prototype, y.prototype = new a(), a.prototype = null), y;
      }
    });
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), e.prototype.init = function () {
    this.$module && this.$menuButton && this.$menu && ("matchMedia" in window ? (this.mql = window.matchMedia("(min-width: 48.0625em)"), "addEventListener" in this.mql ? this.mql.addEventListener("change", this.syncState.bind(this)) : this.mql.addListener(this.syncState.bind(this)), this.syncState(), this.$menuButton.addEventListener("click", this.handleMenuButtonClick.bind(this))) : this.$menuButton.setAttribute("hidden", ""));
  }, e.prototype.syncState = function () {
    this.mql.matches ? (this.$menu.removeAttribute("hidden"), this.$menuButton.setAttribute("hidden", "")) : (this.$menuButton.removeAttribute("hidden"), this.$menuButton.setAttribute("aria-expanded", this.menuIsOpen), this.menuIsOpen ? this.$menu.removeAttribute("hidden") : this.$menu.setAttribute("hidden", ""));
  }, e.prototype.handleMenuButtonClick = function () {
    this.menuIsOpen = !this.menuIsOpen, this.syncState();
  }, e;
}), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, window.GOVUK.Modules.GovukHeader = window.GOVUKFrontend.Header, function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t() : "function" == typeof define && define.amd ? define("GOVUKFrontend", t) : t();
}(0, function () {
  "use strict";

  (function () {
    var s, c, l, u;
    "defineProperty" in Object && function () {
      try {
        var e = {};
        return Object.defineProperty(e, "test", {
          value: 42
        }), !0;
      } catch (t) {
        return !1;
      }
    }() || (s = Object.defineProperty, c = Object.prototype.hasOwnProperty("__defineGetter__"), l = "Getters & setters cannot be defined on this javascript engine", u = "A property cannot both have accessors and be writable or have a value", Object.defineProperty = function d(e, t, n) {
      if (s && (e === window || e === document || e === Element.prototype || e instanceof Element)) return s(e, t, n);
      if (null === e || !(e instanceof Object || "object" == typeof e)) throw new TypeError("Object.defineProperty called on non-object");
      if (!(n instanceof Object)) throw new TypeError("Property description must be an object");
      var o = String(t),
          i = "value" in n || "writable" in n,
          r = "get" in n && typeof n.get,
          a = "set" in n && typeof n.set;

      if (r) {
        if ("function" !== r) throw new TypeError("Getter must be a function");
        if (!c) throw new TypeError(l);
        if (i) throw new TypeError(u);

        Object.__defineGetter__.call(e, o, n.get);
      } else e[o] = n.value;

      if (a) {
        if ("function" !== a) throw new TypeError("Setter must be a function");
        if (!c) throw new TypeError(l);
        if (i) throw new TypeError(u);

        Object.__defineSetter__.call(e, o, n.set);
      }

      return "value" in n && (e[o] = n.value), e;
    });
  }).call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function (p) {
    var e, t, n;
    "DOMTokenList" in this && (!("classList" in (e = document.createElement("x"))) || !e.classList.toggle("x", !1) && !e.className) || ("DOMTokenList" in (t = this) && t.DOMTokenList && (!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg") || document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList) || (t.DOMTokenList = function () {
      var i = !0,
          n = function (e, t, n, o) {
        Object.defineProperty ? Object.defineProperty(e, t, {
          configurable: !1 === i || !!o,
          get: n
        }) : e.__defineGetter__(t, n);
      };

      try {
        n({}, "support");
      } catch (e) {
        i = !1;
      }

      return function (i, r) {
        var a = this,
            s = [],
            c = {},
            l = 0,
            e = 0,
            t = function (e) {
          n(a, e, function () {
            return d(), s[e];
          }, !1);
        },
            u = function () {
          if (e <= l) for (; e < l; ++e) t(e);
        },
            d = function () {
          var e,
              t,
              n = arguments,
              o = /\s+/;
          if (n.length) for (t = 0; t < n.length; ++t) if (o.test(n[t])) throw (e = new SyntaxError('String "' + n[t] + '" contains an invalid character')).code = 5, e.name = "InvalidCharacterError", e;

          for ("" === (s = "object" == typeof i[r] ? ("" + i[r].baseVal).replace(/^\s+|\s+$/g, "").split(o) : ("" + i[r]).replace(/^\s+|\s+$/g, "").split(o))[0] && (s = []), c = {}, t = 0; t < s.length; ++t) c[s[t]] = !0;

          l = s.length, u();
        };

        return d(), n(a, "length", function () {
          return d(), l;
        }), a.toLocaleString = a.toString = function () {
          return d(), s.join(" ");
        }, a.item = function (e) {
          return d(), s[e];
        }, a.contains = function (e) {
          return d(), !!c[e];
        }, a.add = function () {
          d.apply(a, e = arguments);

          for (var e, t, n = 0, o = e.length; n < o; ++n) t = e[n], c[t] || (s.push(t), c[t] = !0);

          l !== s.length && (l = s.length >>> 0, "object" == typeof i[r] ? i[r].baseVal = s.join(" ") : i[r] = s.join(" "), u());
        }, a.remove = function () {
          d.apply(a, e = arguments);

          for (var e, t = {}, n = 0, o = []; n < e.length; ++n) t[e[n]] = !0, delete c[e[n]];

          for (n = 0; n < s.length; ++n) t[s[n]] || o.push(s[n]);

          l = (s = o).length >>> 0, "object" == typeof i[r] ? i[r].baseVal = s.join(" ") : i[r] = s.join(" "), u();
        }, a.toggle = function (e, t) {
          return d.apply(a, [e]), p !== t ? t ? (a.add(e), !0) : (a.remove(e), !1) : c[e] ? (a.remove(e), !1) : (a.add(e), !0);
        }, a;
      };
    }()), "classList" in (n = document.createElement("span")) && (n.classList.toggle("x", !1), n.classList.contains("x") && (n.classList.constructor.prototype.toggle = function i(e, t) {
      var n = t;
      if (n !== p) return this[(n = !!n) ? "add" : "remove"](e), n;
      var o = !this.contains(e);
      return this[o ? "add" : "remove"](e), o;
    })), function () {
      var e = document.createElement("span");

      if ("classList" in e && (e.classList.add("a", "b"), !e.classList.contains("b"))) {
        var o = e.classList.constructor.prototype.add;

        e.classList.constructor.prototype.add = function () {
          for (var e = arguments, t = arguments.length, n = 0; n < t; n++) o.call(this, e[n]);
        };
      }
    }(), function () {
      var e = document.createElement("span");

      if ("classList" in e && (e.classList.add("a"), e.classList.add("b"), e.classList.remove("a", "b"), e.classList.contains("b"))) {
        var o = e.classList.constructor.prototype.remove;

        e.classList.constructor.prototype.remove = function () {
          for (var e = arguments, t = arguments.length, n = 0; n < t; n++) o.call(this, e[n]);
        };
      }
    }());
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "Document" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(), this.Document.prototype = document));
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "Element" in this && "HTMLElement" in this || function () {
      function e() {
        return r-- || clearTimeout(t), !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (l(document, !0), t && document.body.prototype && clearTimeout(t), !!document.body.prototype);
      }

      if (!window.Element || window.HTMLElement) {
        window.Element = window.HTMLElement = new Function("return function Element() {}")();

        var t,
            n = document.appendChild(document.createElement("body")),
            o = n.appendChild(document.createElement("iframe")).contentWindow.document,
            s = Element.prototype = o.appendChild(o.createElement("*")),
            c = {},
            l = function (e, t) {
          var n,
              o,
              i,
              r = e.childNodes || [],
              a = -1;
          if (1 === e.nodeType && e.constructor !== Element) for (n in e.constructor = Element, c) o = c[n], e[n] = o;

          for (; i = t && r[++a];) l(i, t);

          return e;
        },
            u = document.getElementsByTagName("*"),
            i = document.createElement,
            r = 100;

        s.attachEvent("onpropertychange", function (e) {
          for (var t, n = e.propertyName, o = !c.hasOwnProperty(n), i = s[n], r = c[n], a = -1; t = u[++a];) 1 === t.nodeType && (o || t[n] === r) && (t[n] = i);

          c[n] = i;
        }), s.constructor = Element, s.hasAttribute || (s.hasAttribute = function a(e) {
          return null !== this.getAttribute(e);
        }), e() || (document.onreadystatechange = e, t = setInterval(e, 25)), document.createElement = function d(e) {
          var t = i(String(e).toLowerCase());
          return l(t);
        }, document.removeChild(n);
      } else window.HTMLElement = window.Element;
    }();
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    var e;
    "document" in this && "classList" in document.documentElement && "Element" in this && "classList" in Element.prototype && ((e = document.createElement("span")).classList.add("a", "b"), e.classList.contains("b")) || function (e) {
      var u = !0,
          d = function (e, t, n, o) {
        Object.defineProperty ? Object.defineProperty(e, t, {
          configurable: !1 === u || !!o,
          get: n
        }) : e.__defineGetter__(t, n);
      };

      try {
        d({}, "support");
      } catch (t) {
        u = !1;
      }

      var p = function (e, c, l) {
        d(e.prototype, c, function () {
          var e,
              t = this,
              n = "__defineGetter__DEFINE_PROPERTY" + c;
          if (t[n]) return e;

          if (!(t[n] = !0) === u) {
            for (var o, i = p.mirror || document.createElement("div"), r = i.childNodes, a = r.length, s = 0; s < a; ++s) if (r[s]._R === t) {
              o = r[s];
              break;
            }

            o || (o = i.appendChild(document.createElement("div"))), e = DOMTokenList.call(o, t, l);
          } else e = new DOMTokenList(t, l);

          return d(t, c, function () {
            return e;
          }), delete t[n], e;
        }, !0);
      };

      p(e.Element, "classList", "className"), p(e.HTMLElement, "classList", "className"), p(e.HTMLLinkElement, "relList", "rel"), p(e.HTMLAnchorElement, "relList", "rel"), p(e.HTMLAreaElement, "relList", "rel");
    }(this);
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {});
}), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (e) {
  function t(e) {
    this.$module = e, this.$navigationToggle = this.$module.querySelector("#super-navigation-menu-toggle"), this.$navigationMenu = this.$module.querySelector("#super-navigation-menu"), this.$searchToggle = this.$module.querySelector("#super-search-menu-toggle"), this.$searchMenu = this.$module.querySelector("#super-search-menu"), this.$buttons = this.$module.querySelectorAll("button[aria-controls][data-toggle-mobile-group][data-toggle-desktop-group]"), this.hiddenButtons = this.$module.querySelectorAll("button[hidden]"), this.lastWindowSize = null;
  }

  var o = {
    breakpoint: {
      desktop: 769
    },
    label: {
      hide: "data-text-for-hide",
      show: "data-text-for-show"
    }
  },
      n = function (e, t) {
    var n = e.getAttribute(o.label[t]);
    n && e.setAttribute("aria-label", n);
  },
      l = function (e, t) {
    e.setAttribute("aria-expanded", !1), e.classList.remove("gem-c-layout-super-navigation-header__open-button"), t.setAttribute("hidden", "hidden"), n(e, "show");
  },
      i = function (e, t) {
    e.setAttribute("aria-expanded", !0), e.classList.add("gem-c-layout-super-navigation-header__open-button"), t.removeAttribute("hidden"), n(e, "hide");
  },
      u = function (e, t) {
    var n = "true" === e.getAttribute("aria-expanded"),
        o = e.getAttribute("data-tracking-key");
    n ? l(e, t) : i(e, t), window.GOVUK.analytics && window.GOVUK.analytics.trackEvent && o && window.GOVUK.analytics.trackEvent("headerClicked", o + (n ? "Closed" : "Opened"), {
      label: "none"
    });
  },
      d = function (e, t) {
    return e.tagName.toLowerCase() === t.toLowerCase() ? e : d(e.parentNode, t);
  },
      r = function (e, t) {
    if (null === e) return null;
    if (1 === e.nodeType && e.tagName.toLowerCase() === t.toLowerCase()) return e;
    var n = e.previousElementSibling || e.previousSibling;
    return r(n, t);
  },
      a = function (e) {
    return 0 < e.querySelectorAll('button[aria-expanded="true"]').length;
  },
      s = function () {
    return document.documentElement.clientWidth >= o.breakpoint.desktop ? "desktop" : "mobile";
  };

  t.prototype.windowSize = s, t.prototype.updateStates = function () {
    if ("mobile" === this.windowSize() && "mobile" !== this.lastWindowSize && (this.$navigationToggle.removeAttribute("hidden"), a(this.$navigationMenu) || l(this.$navigationToggle, this.$navigationMenu), this.$module.style.marginBottom = "0"), "desktop" === this.windowSize() && "desktop" !== this.lastWindowSize && (this.$navigationToggle.setAttribute("hidden", "hidden"), this.$navigationMenu.removeAttribute("hidden")), "desktop" === s()) {
      var e = this.$module.querySelector('[aria-expanded="true"][data-toggle-desktop-group="top"]'),
          t = e ? this.$module.querySelector("#" + e.getAttribute("aria-controls")) : null,
          n = t ? t.offsetHeight : 0;
      this.$module.style.marginBottom = n + "px";
    }

    this.lastWindowSize = this.windowSize();
  }, t.prototype.buttonHandler = function (e) {
    for (var t = d(e.target, "button"), n = this.$module.querySelector("#" + t.getAttribute("aria-controls")), o = "data-toggle-" + this.windowSize() + "-group", i = t.getAttribute(o), r = this.$module.querySelectorAll("[" + o + '="' + i + '"]'), a = 0; a < r.length; a++) {
      var s = r[a];

      if (s !== t) {
        var c = this.$module.querySelector("#" + s.getAttribute("aria-controls"));
        l(s, c);
      }
    }

    u(t, n), "desktop" === this.windowSize() && (this.$module.style.marginBottom = n.offsetHeight + "px");
  }, t.prototype.init = function () {
    for (var e = 0; e < this.$buttons.length; e++) {
      this.$buttons[e].addEventListener("click", this.buttonHandler.bind(this), !0);
    }

    for (var t = 0; t < this.hiddenButtons.length; t++) {
      var n = this.hiddenButtons[t];
      n.removeAttribute("hidden");
      var o = r(n, "a");
      o && o.setAttribute("hidden", "hidden");
    }

    this.$module.querySelector(".gem-c-layout-super-navigation-header__search-item-link").setAttribute("hidden", "hidden"), l(this.$searchToggle, this.$searchMenu), this.updateStates(), this.lastWindowSize = this.windowSize(), window.addEventListener("resize", this.updateStates.bind(this), {
      passive: !0
    }), this.$module.classList.add("js-module-initialised");
  }, e.SuperNavigationMegaMenu = t;
}(window.GOVUK.Modules), function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("GOVUKFrontend.SkipLink", t) : (e.GOVUKFrontend = e.GOVUKFrontend || {}, e.GOVUKFrontend.SkipLink = t());
}(this, function () {
  "use strict";

  function e(e) {
    this.$module = e, this.$linkedElement = null, this.linkedElementListener = !1;
  }

  return function () {
    var s, c, l, u;
    "defineProperty" in Object && function () {
      try {
        var e = {};
        return Object.defineProperty(e, "test", {
          value: 42
        }), !0;
      } catch (t) {
        return !1;
      }
    }() || (s = Object.defineProperty, c = Object.prototype.hasOwnProperty("__defineGetter__"), l = "Getters & setters cannot be defined on this javascript engine", u = "A property cannot both have accessors and be writable or have a value", Object.defineProperty = function d(e, t, n) {
      if (s && (e === window || e === document || e === Element.prototype || e instanceof Element)) return s(e, t, n);
      if (null === e || !(e instanceof Object || "object" == typeof e)) throw new TypeError("Object.defineProperty called on non-object");
      if (!(n instanceof Object)) throw new TypeError("Property description must be an object");
      var o = String(t),
          i = "value" in n || "writable" in n,
          r = "get" in n && typeof n.get,
          a = "set" in n && typeof n.set;

      if (r) {
        if ("function" !== r) throw new TypeError("Getter must be a function");
        if (!c) throw new TypeError(l);
        if (i) throw new TypeError(u);

        Object.__defineGetter__.call(e, o, n.get);
      } else e[o] = n.value;

      if (a) {
        if ("function" !== a) throw new TypeError("Setter must be a function");
        if (!c) throw new TypeError(l);
        if (i) throw new TypeError(u);

        Object.__defineSetter__.call(e, o, n.set);
      }

      return "value" in n && (e[o] = n.value), e;
    });
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "bind" in Function.prototype || Object.defineProperty(Function.prototype, "bind", {
      value: function G(t) {
        var n,
            e = Array,
            o = Object,
            i = o.prototype,
            r = e.prototype,
            a = function a() {},
            s = i.toString,
            c = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag,
            l = Function.prototype.toString,
            u = function u(e) {
          try {
            return l.call(e), !0;
          } catch (t) {
            return !1;
          }
        },
            d = "[object Function]",
            p = "[object GeneratorFunction]";

        n = function n(e) {
          if ("function" != typeof e) return !1;
          if (c) return u(e);
          var t = s.call(e);
          return t === d || t === p;
        };

        var m = r.slice,
            f = r.concat,
            h = r.push,
            v = Math.max,
            g = this;
        if (!n(g)) throw new TypeError("Function.prototype.bind called on incompatible " + g);

        for (var y, w = m.call(arguments, 1), b = function () {
          if (this instanceof y) {
            var e = g.apply(this, f.call(w, m.call(arguments)));
            return o(e) === e ? e : this;
          }

          return g.apply(t, f.call(w, m.call(arguments)));
        }, k = v(0, g.length - w.length), E = [], O = 0; O < k; O++) h.call(E, "$" + O);

        return y = Function("binder", "return function (" + E.join(",") + "){ return binder.apply(this, arguments); }")(b), g.prototype && (a.prototype = g.prototype, y.prototype = new a(), a.prototype = null), y;
      }
    });
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function (p) {
    var e, t, n;
    "DOMTokenList" in this && (!("classList" in (e = document.createElement("x"))) || !e.classList.toggle("x", !1) && !e.className) || ("DOMTokenList" in (t = this) && t.DOMTokenList && (!document.createElementNS || !document.createElementNS("http://www.w3.org/2000/svg", "svg") || document.createElementNS("http://www.w3.org/2000/svg", "svg").classList instanceof DOMTokenList) || (t.DOMTokenList = function () {
      var i = !0,
          n = function (e, t, n, o) {
        Object.defineProperty ? Object.defineProperty(e, t, {
          configurable: !1 === i || !!o,
          get: n
        }) : e.__defineGetter__(t, n);
      };

      try {
        n({}, "support");
      } catch (e) {
        i = !1;
      }

      return function (i, r) {
        var a = this,
            s = [],
            c = {},
            l = 0,
            e = 0,
            t = function (e) {
          n(a, e, function () {
            return d(), s[e];
          }, !1);
        },
            u = function () {
          if (e <= l) for (; e < l; ++e) t(e);
        },
            d = function () {
          var e,
              t,
              n = arguments,
              o = /\s+/;
          if (n.length) for (t = 0; t < n.length; ++t) if (o.test(n[t])) throw (e = new SyntaxError('String "' + n[t] + '" contains an invalid character')).code = 5, e.name = "InvalidCharacterError", e;

          for ("" === (s = "object" == typeof i[r] ? ("" + i[r].baseVal).replace(/^\s+|\s+$/g, "").split(o) : ("" + i[r]).replace(/^\s+|\s+$/g, "").split(o))[0] && (s = []), c = {}, t = 0; t < s.length; ++t) c[s[t]] = !0;

          l = s.length, u();
        };

        return d(), n(a, "length", function () {
          return d(), l;
        }), a.toLocaleString = a.toString = function () {
          return d(), s.join(" ");
        }, a.item = function (e) {
          return d(), s[e];
        }, a.contains = function (e) {
          return d(), !!c[e];
        }, a.add = function () {
          d.apply(a, e = arguments);

          for (var e, t, n = 0, o = e.length; n < o; ++n) t = e[n], c[t] || (s.push(t), c[t] = !0);

          l !== s.length && (l = s.length >>> 0, "object" == typeof i[r] ? i[r].baseVal = s.join(" ") : i[r] = s.join(" "), u());
        }, a.remove = function () {
          d.apply(a, e = arguments);

          for (var e, t = {}, n = 0, o = []; n < e.length; ++n) t[e[n]] = !0, delete c[e[n]];

          for (n = 0; n < s.length; ++n) t[s[n]] || o.push(s[n]);

          l = (s = o).length >>> 0, "object" == typeof i[r] ? i[r].baseVal = s.join(" ") : i[r] = s.join(" "), u();
        }, a.toggle = function (e, t) {
          return d.apply(a, [e]), p !== t ? t ? (a.add(e), !0) : (a.remove(e), !1) : c[e] ? (a.remove(e), !1) : (a.add(e), !0);
        }, a;
      };
    }()), "classList" in (n = document.createElement("span")) && (n.classList.toggle("x", !1), n.classList.contains("x") && (n.classList.constructor.prototype.toggle = function i(e, t) {
      var n = t;
      if (n !== p) return this[(n = !!n) ? "add" : "remove"](e), n;
      var o = !this.contains(e);
      return this[o ? "add" : "remove"](e), o;
    })), function () {
      var e = document.createElement("span");

      if ("classList" in e && (e.classList.add("a", "b"), !e.classList.contains("b"))) {
        var o = e.classList.constructor.prototype.add;

        e.classList.constructor.prototype.add = function () {
          for (var e = arguments, t = arguments.length, n = 0; n < t; n++) o.call(this, e[n]);
        };
      }
    }(), function () {
      var e = document.createElement("span");

      if ("classList" in e && (e.classList.add("a"), e.classList.add("b"), e.classList.remove("a", "b"), e.classList.contains("b"))) {
        var o = e.classList.constructor.prototype.remove;

        e.classList.constructor.prototype.remove = function () {
          for (var e = arguments, t = arguments.length, n = 0; n < t; n++) o.call(this, e[n]);
        };
      }
    }());
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "Document" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(), this.Document.prototype = document));
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "Element" in this && "HTMLElement" in this || function () {
      function e() {
        return r-- || clearTimeout(t), !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState)) && (l(document, !0), t && document.body.prototype && clearTimeout(t), !!document.body.prototype);
      }

      if (!window.Element || window.HTMLElement) {
        window.Element = window.HTMLElement = new Function("return function Element() {}")();

        var t,
            n = document.appendChild(document.createElement("body")),
            o = n.appendChild(document.createElement("iframe")).contentWindow.document,
            s = Element.prototype = o.appendChild(o.createElement("*")),
            c = {},
            l = function (e, t) {
          var n,
              o,
              i,
              r = e.childNodes || [],
              a = -1;
          if (1 === e.nodeType && e.constructor !== Element) for (n in e.constructor = Element, c) o = c[n], e[n] = o;

          for (; i = t && r[++a];) l(i, t);

          return e;
        },
            u = document.getElementsByTagName("*"),
            i = document.createElement,
            r = 100;

        s.attachEvent("onpropertychange", function (e) {
          for (var t, n = e.propertyName, o = !c.hasOwnProperty(n), i = s[n], r = c[n], a = -1; t = u[++a];) 1 === t.nodeType && (o || t[n] === r) && (t[n] = i);

          c[n] = i;
        }), s.constructor = Element, s.hasAttribute || (s.hasAttribute = function a(e) {
          return null !== this.getAttribute(e);
        }), e() || (document.onreadystatechange = e, t = setInterval(e, 25)), document.createElement = function d(e) {
          var t = i(String(e).toLowerCase());
          return l(t);
        }, document.removeChild(n);
      } else window.HTMLElement = window.Element;
    }();
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    var e;
    "document" in this && "classList" in document.documentElement && "Element" in this && "classList" in Element.prototype && ((e = document.createElement("span")).classList.add("a", "b"), e.classList.contains("b")) || function (e) {
      var u = !0,
          d = function (e, t, n, o) {
        Object.defineProperty ? Object.defineProperty(e, t, {
          configurable: !1 === u || !!o,
          get: n
        }) : e.__defineGetter__(t, n);
      };

      try {
        d({}, "support");
      } catch (t) {
        u = !1;
      }

      var p = function (e, c, l) {
        d(e.prototype, c, function () {
          var e,
              t = this,
              n = "__defineGetter__DEFINE_PROPERTY" + c;
          if (t[n]) return e;

          if (!(t[n] = !0) === u) {
            for (var o, i = p.mirror || document.createElement("div"), r = i.childNodes, a = r.length, s = 0; s < a; ++s) if (r[s]._R === t) {
              o = r[s];
              break;
            }

            o || (o = i.appendChild(document.createElement("div"))), e = DOMTokenList.call(o, t, l);
          } else e = new DOMTokenList(t, l);

          return d(t, c, function () {
            return e;
          }), delete t[n], e;
        }, !0);
      };

      p(e.Element, "classList", "className"), p(e.HTMLElement, "classList", "className"), p(e.HTMLLinkElement, "relList", "rel"), p(e.HTMLAnchorElement, "relList", "rel"), p(e.HTMLAreaElement, "relList", "rel");
    }(this);
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function () {
    "Window" in this || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && function (e) {
      e.constructor ? e.Window = e.constructor : (e.Window = e.constructor = new Function("return function Window() {}")()).prototype = this;
    }(this);
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), function (l) {
    (function (e) {
      if (!("Event" in e)) return !1;
      if ("function" == typeof e.Event) return !0;

      try {
        return new Event("click"), !0;
      } catch (t) {
        return !1;
      }
    })(this) || function () {
      function u(e, t) {
        for (var n = -1, o = e.length; ++n < o;) if (n in e && e[n] === t) return n;

        return -1;
      }

      var i = {
        click: 1,
        dblclick: 1,
        keyup: 1,
        keypress: 1,
        keydown: 1,
        mousedown: 1,
        mouseup: 1,
        mousemove: 1,
        mouseover: 1,
        mouseenter: 1,
        mouseleave: 1,
        mouseout: 1,
        storage: 1,
        storagecommit: 1,
        textinput: 1
      };

      if ("undefined" != typeof document && "undefined" != typeof window) {
        var e = window.Event && window.Event.prototype || null;
        window.Event = Window.prototype.Event = function r(e, t) {
          if (!e) throw new Error("Not enough arguments");
          var n;

          if ("createEvent" in document) {
            n = document.createEvent("Event");
            var o = !(!t || t.bubbles === l) && t.bubbles,
                i = !(!t || t.cancelable === l) && t.cancelable;
            return n.initEvent(e, o, i), n;
          }

          return (n = document.createEventObject()).type = e, n.bubbles = !(!t || t.bubbles === l) && t.bubbles, n.cancelable = !(!t || t.cancelable === l) && t.cancelable, n;
        }, e && Object.defineProperty(window.Event, "prototype", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: e
        }), "createEvent" in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function a(e, t) {
          var l = this,
              n = e,
              o = t;
          if (l === window && n in i) throw new Error("In IE8 the event: " + n + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
          l._events || (l._events = {}), l._events[n] || (l._events[n] = function (e) {
            var t,
                n = l._events[e.type].list,
                o = n.slice(),
                i = -1,
                r = o.length;

            for (e.preventDefault = function a() {
              !1 !== e.cancelable && (e.returnValue = !1);
            }, e.stopPropagation = function s() {
              e.cancelBubble = !0;
            }, e.stopImmediatePropagation = function c() {
              e.cancelBubble = !0, e.cancelImmediate = !0;
            }, e.currentTarget = l, e.relatedTarget = e.fromElement || null, e.target = e.target || e.srcElement || l, e.timeStamp = new Date().getTime(), e.clientX && (e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop); ++i < r && !e.cancelImmediate;) i in o && -1 !== u(n, t = o[i]) && "function" == typeof t && t.call(l, e);
          }, l._events[n].list = [], l.attachEvent && l.attachEvent("on" + n, l._events[n])), l._events[n].list.push(o);
        }, window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function s(e, t) {
          var n,
              o = this,
              i = e,
              r = t;
          o._events && o._events[i] && o._events[i].list && -1 !== (n = u(o._events[i].list, r)) && (o._events[i].list.splice(n, 1), o._events[i].list.length || (o.detachEvent && o.detachEvent("on" + i, o._events[i]), delete o._events[i]));
        }, window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(e) {
          if (!arguments.length) throw new Error("Not enough arguments");
          if (!e || "string" != typeof e.type) throw new Error("DOM Events Exception 0");
          var t = this,
              n = e.type;

          try {
            if (!e.bubbles) {
              e.cancelBubble = !0;

              var o = function (e) {
                e.cancelBubble = !0, (t || window).detachEvent("on" + n, o);
              };

              this.attachEvent("on" + n, o);
            }

            this.fireEvent("on" + n, e);
          } catch (i) {
            for (e.target = t; "_events" in (e.currentTarget = t) && "function" == typeof t._events[n] && t._events[n].call(t, e), "function" == typeof t["on" + n] && t["on" + n].call(t, e), (t = 9 === t.nodeType ? t.parentWindow : t.parentNode) && !e.cancelBubble;);
          }

          return !0;
        }, document.attachEvent("onreadystatechange", function () {
          "complete" === document.readyState && document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: !0
          }));
        }));
      }
    }();
  }.call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof global && global || {}), e.prototype.init = function () {
    this.$module && (this.$linkedElement = this.getLinkedElement(), this.$linkedElement && this.$module.addEventListener("click", this.focusLinkedElement.bind(this)));
  }, e.prototype.getLinkedElement = function () {
    var e = this.getFragmentFromUrl();
    return !!e && document.getElementById(e);
  }, e.prototype.focusLinkedElement = function () {
    var e = this.$linkedElement;
    e.getAttribute("tabindex") || (e.setAttribute("tabindex", "-1"), e.classList.add("govuk-skip-link-focused-element"), this.linkedElementListener || (this.$linkedElement.addEventListener("blur", this.removeFocusProperties.bind(this)), this.linkedElementListener = !0)), e.focus();
  }, e.prototype.removeFocusProperties = function () {
    this.$linkedElement.removeAttribute("tabindex"), this.$linkedElement.classList.remove("govuk-skip-link-focused-element");
  }, e.prototype.getFragmentFromUrl = function () {
    return !!this.$module.hash && this.$module.hash.split("#").pop();
  }, e;
}), window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, window.GOVUK.Modules.GovukSkipLink = window.GOVUKFrontend.SkipLink, window.GOVUK = window.GOVUK || {}, window.GOVUK.Modules = window.GOVUK.Modules || {}, function (e) {
  function t(e) {
    this.$module = e;
  }

  t.prototype.init = function () {
    function n(e) {
      a(e.getAttribute("href"));
    }

    function o(e) {
      var t = parseCookie(GOVUK.getCookie(s)),
          n = c;
      t && (n = t.version);
      var o = JSON.stringify({
        count: 999,
        version: n
      });
      GOVUK.setCookie(s, o, {
        days: 84
      });
      var i = document.querySelector(".global-bar-additional");
      i && i.classList.remove("global-bar-additional--show");
      var r = document.querySelector(".global-bar__dismiss");
      r && r.classList.remove("global-bar__dismiss--show"), a("Manually dismissed"), e.preventDefault();
    }

    function e(e) {
      e += 1;
      var t = JSON.stringify({
        count: e,
        version: c
      });
      GOVUK.setCookie(s, t, {
        days: 84
      }), 2 === e && a("Automatically dismissed");
    }

    function t() {
      var e = GOVUK.getCookie(s),
          t = parseInt(parseCookie(e).count, 10);
      return isNaN(t) && (t = 0), t;
    }

    function a(e) {
      GOVUK.analytics && "function" == typeof GOVUK.analytics.trackEvent && GOVUK.analytics.trackEvent("Global bar", e, {
        nonInteraction: 1
      });
    }

    var s = "global_bar_seen",
        i = this.$module.getAttribute("data-global-bar-permanent");
    "false" === i && (i = !1);
    var r = GOVUK.getCookieCategory(s);

    if (GOVUK.getConsentCookie()[r]) {
      null !== GOVUK.getCookie(s) && parseCookie(GOVUK.getCookie(s)).count !== undefined || GOVUK.setCookie("global_bar_seen", JSON.stringify({
        count: 0,
        version: 0
      }), {
        days: 84
      });
      var c = parseCookie(GOVUK.getCookie(s)).version,
          l = t();
    }

    this.$module.addEventListener("click", function (e) {
      var t = e.target;
      t.classList.contains("dismiss") ? o(e) : t.classList.contains("js-call-to-action") && n(t);
    }), null === this.$module.offsetParent || i || e(l);
  }, e.GlobalBar = t;
}(window.GOVUK.Modules), window.GOVUK = window.GOVUK || {};
var BANNER_VERSION = 8,
    GLOBAL_BAR_SEEN_COOKIE = "global_bar_seen",
    globalBarInit = {
  getBannerVersion: function () {
    return BANNER_VERSION;
  },
  getLatestCookie: function () {
    return window.GOVUK.cookie("cookies_policy") || window.GOVUK.setDefaultConsentCookie(), window.GOVUK.getCookie(GLOBAL_BAR_SEEN_COOKIE);
  },
  urlBlockList: function () {
    var e = ["^/coronavirus/.*$", "^/brexit(.cy)?$", "^/transition-check/.*$", "^/eubusiness(\\..*)?$", "^/account/.*$"],
        t = document.querySelector(".js-call-to-action");

    if (t) {
      var n = "^" + t.getAttribute("href") + "$";
      e.push(n);
    }

    return new RegExp(e.join("|")).test(window.location.pathname);
  },
  setBannerCookie: function () {
    var e,
        t = window.GOVUK.getCookieCategory(GLOBAL_BAR_SEEN_COOKIE),
        n = GOVUK.getConsentCookie();
    n && n[t] && (e = "/coronavirus" === window.location.pathname ? JSON.stringify({
      count: 999,
      version: globalBarInit.getBannerVersion()
    }) : JSON.stringify({
      count: 0,
      version: globalBarInit.getBannerVersion()
    }), window.GOVUK.setCookie(GLOBAL_BAR_SEEN_COOKIE, e, {
      days: 84
    }));
  },
  makeBannerVisible: function () {
    document.documentElement.className = document.documentElement.className.concat(" show-global-bar");
  },
  init: function () {
    if (globalBarInit.urlBlockList()) null === globalBarInit.getLatestCookie() ? globalBarInit.setBannerCookie() : parseCookie(globalBarInit.getLatestCookie()).version !== globalBarInit.getBannerVersion() && globalBarInit.setBannerCookie();else if (null === globalBarInit.getLatestCookie()) globalBarInit.setBannerCookie(), globalBarInit.makeBannerVisible();else {
      if (parseCookie(globalBarInit.getLatestCookie()).version !== globalBarInit.getBannerVersion() && globalBarInit.setBannerCookie(), 999 === parseCookie(globalBarInit.getLatestCookie()).count) {
        var e = document.querySelector(".global-bar-additional");
        e && e.classList.remove("global-bar-additional--show");
        var t = document.querySelector(".global-bar__dismiss");
        t && t.classList.remove("global-bar__dismiss--show");
      }

      globalBarInit.makeBannerVisible();
    }
  }
};
window.GOVUK.globalBarInit = globalBarInit, window.GOVUK.globalBarInit.init(), function () {
  "use strict";

  window.GOVUK = window.GOVUK || {};

  var e = function (e, t) {
    return "<a " + (t = t ? 'class="' + t + '"' : "") + ' href="{{surveyUrl}}" id="take-survey" target="_blank" rel="noopener noreferrer">' + e + "</a>";
  },
      t = function (e) {
    return '<section id="user-satisfaction-survey" class="visible" aria-hidden="false">  <div class="survey-wrapper govuk-width-container">    <a class="govuk-link survey-close-button" href="#user-survey-cancel" aria-labelledby="survey-title user-survey-cancel" id="user-survey-cancel" role="button">Close</a>    <h2 class="survey-title" id="survey-title">{{title}}</h2>' + e + "  </div></section>";
  },
      o = t("<p>" + e("{{surveyCta}}", "govuk-link survey-primary-link") + ' <span class="postscript-cta">{{surveyCtaPostscript}}</span></p>'),
      i = t('<div id="email-survey-pre">  <a class="govuk-link survey-primary-link" href="#email-survey-form" id="email-survey-open" rel="noopener noreferrer" role="button" aria-expanded="false">    {{surveyCta}}  </a></div><form id="email-survey-form" action="/contact/govuk/email-survey-signup" method="post" class="js-hidden" aria-hidden="true">  <div class="survey-inner-wrapper">    <div id="survey-form-description" class="survey-form-description">{{surveyFormDescription}}      <br> {{surveyFormCtaPostscript}}    </div>    <label class="survey-form-label" for="survey-email-address">      Email Address    </label>    <input name="email_survey_signup[survey_id]" type="hidden" value="{{surveyId}}">    <input name="email_survey_signup[survey_source]" type="hidden" value="{{surveySource}}">    <input name="email_survey_signup[ga_client_id]" type="hidden" value="{{gaClientId}}">    <input class="survey-form-input" name="email_survey_signup[email_address]" id="survey-email-address" type="text" aria-describedby="survey-form-description">    <button class="survey-form-button" type="submit">{{surveyFormCta}}</button>' + e("{{surveyFormNoEmailInvite}}") + '  </div></form><div id="email-survey-post-success" class="js-hidden" aria-hidden="true" tabindex="-1">  {{surveySuccess}}</div><div id="email-survey-post-failure" class="js-hidden" aria-hidden="true" tabindex="-1">  {{surveyFailure}}</div>'),
      n = 2,
      r = "(max-width: 800px)",
      u = {
    defaultSurvey: {
      url: "https://www.smartsurvey.co.uk/s/gov_uk?c={{currentPath}}",
      identifier: "user_satisfaction_survey",
      frequency: 6,
      surveyType: "email"
    },
    smallSurveys: [],
    init: function () {
      if (u.canShowAnySurvey()) {
        var e = u.getActiveSurvey(u.defaultSurvey, u.smallSurveys);

        if (e !== undefined) {
          var t = document.getElementById("global-bar");
          t && (t.style.display = "none"), u.displaySurvey(e);
        }
      }
    },
    canShowAnySurvey: function () {
      var e = document.getElementById("user-satisfaction-survey-container");
      return !u.pathInBlocklist() && !u.otherNotificationVisible() && !u.userCompletedTransaction() && !!e;
    },
    processTemplate: function (e, t) {
      for (var n in e) t = t.replace(new RegExp("{{" + n + "}}", "g"), e[n]);

      return t;
    },
    getUrlSurveyTemplate: function () {
      return {
        render: function (e) {
          var t = {
            title: "Tell us what you think of GOV.UK",
            surveyCta: "Take the 3 minute survey",
            surveyCtaPostscript: "This will open a short survey on another website",
            surveyUrl: u.addParamsToURL(u.getSurveyUrl(e))
          },
              n = window.GOVUK.extendObject(t, e.templateArgs);
          return u.processTemplate(n, o);
        }
      };
    },
    getEmailSurveyTemplate: function () {
      return {
        render: function (e) {
          var t = {
            title: "Tell us what you think of GOV.UK",
            surveyCta: "Take a short survey to give us your feedback",
            surveyFormDescription: "We\u2019ll send you a link to a feedback form. It only takes 2 minutes to fill in.",
            surveyFormCta: "Send me the survey",
            surveyFormCtaPostscript: "Don\u2019t worry: we won\u2019t send you spam or share your email address with anyone.",
            surveyFormNoEmailInvite: "Don\u2019t have an email address?",
            surveySuccess: "Thanks, we\u2019ve sent you an email with a link to the survey.",
            surveyFailure: "Sorry, we\u2019re unable to send you an email right now. Please try again later.",
            surveyId: e.identifier,
            surveySource: u.currentPath(),
            surveyUrl: u.addParamsToURL(u.getSurveyUrl(e)),
            gaClientId: GOVUK.analytics.gaClientId
          },
              n = window.GOVUK.extendObject(t, e.templateArgs);
          return u.processTemplate(n, i);
        }
      };
    },
    getActiveSurveys: function (e) {
      return e.filter(function (e) {
        return u.currentTime() >= e.startTime && u.currentTime() <= e.endTime && u.activeWhen(e);
      });
    },
    getDisplayableSurveys: function (e) {
      return e.filter(function (e) {
        return u.isSurveyToBeDisplayed(e);
      });
    },
    getActiveSurvey: function (e, t) {
      var n = u.getActiveSurveys(t),
          o = [e].concat(n),
          i = u.getDisplayableSurveys(o);
      return i.length < 2 ? i[0] : i[Math.floor(Math.random() * i.length)];
    },
    displaySurvey: function (e) {
      var t = document.getElementById("user-satisfaction-survey-container");
      if ("email" === e.surveyType) u.displayEmailSurvey(e, t);else {
        if ("url" !== e.surveyType && e.surveyType !== undefined) return;
        u.displayURLSurvey(e, t);
      }
      u.incrementSurveySeenCounter(e), u.trackEvent(e.identifier, "banner_shown", "Banner has been shown");
    },
    displayURLSurvey: function (e, t) {
      var n = u.getUrlSurveyTemplate();
      t.innerHTML = n.render(e), u.setURLSurveyEventHandlers(e);
    },
    displayEmailSurvey: function (e, t) {
      var n = u.getEmailSurveyTemplate();
      t.innerHTML = n.render(e), u.setEmailSurveyEventHandlers(e);
    },
    addParamsToURL: function (e) {
      var t = e.replace(/\{\{currentPath\}\}/g, u.currentPath());
      return -1 !== e.indexOf("?c=") ? t + "&gcl=" + GOVUK.analytics.gaClientId : t + "?gcl=" + GOVUK.analytics.gaClientId;
    },
    setEmailSurveyEventHandlers: function (a) {
      var e = document.getElementById("email-survey-open"),
          t = document.getElementById("user-survey-cancel"),
          n = document.getElementById("email-survey-pre"),
          s = document.getElementById("email-survey-form"),
          c = document.getElementById("email-survey-post-success"),
          l = document.getElementById("email-survey-post-failure"),
          o = document.getElementById("survey-email-address"),
          i = document.getElementById("take-survey");
      i && i.addEventListener("click", function () {
        u.setSurveyTakenCookie(a), u.hideSurvey(a), u.trackEvent(a.identifier, "no_email_link", "User taken survey via no email link");
      }), e && e.addEventListener("click", function (e) {
        e.preventDefault(), a.surveyExpanded = !0, u.trackEvent(a.identifier, "email_survey_open", "Email survey opened"), n.classList.add("js-hidden"), n.setAttribute("aria-hidden", "true"), s.classList.remove("js-hidden"), s.setAttribute("aria-hidden", "false"), o.focus(), e.stopPropagation();
      }), t && t.addEventListener("click", function (e) {
        u.setSurveyTakenCookie(a), u.hideSurvey(a), a.surveyExpanded ? u.trackEvent(a.identifier, "email_survey_cancel", "Email survey cancelled") : u.trackEvent(a.identifier, "banner_no_thanks", "No thanks clicked"), e.stopPropagation(), e.preventDefault();
      }), s && s.addEventListener("submit", function (e) {
        var t = function () {
          s.classList.add("js-hidden"), s.setAttribute("aria-hidden", "true"), c.classList.remove("js-hidden"), c.setAttribute("aria-hidden", "false"), c.focus(), u.setSurveyTakenCookie(a), u.trackEvent(a.identifier, "email_survey_taken", "Email survey taken"), u.trackEvent(a.identifier, "banner_taken", "User taken survey");
        },
            n = function () {
          s.classList.add("js-hidden"), s.setAttribute("aria-hidden", "true"), l.classList.remove("js-hidden"), l.setAttribute("aria-hidden", "false"), l.focus();
        },
            o = s.getAttribute("action");

        /\.js$/.test(o) || (o += ".js");
        var i = new XMLHttpRequest(),
            r = new FormData(s);
        r = new URLSearchParams(r).toString(), i.open("POST", o, !0), i.onreadystatechange = function () {
          4 === i.readyState && 200 === i.status ? t() : n();
        }, i.send(r), e.stopPropagation(), e.preventDefault();
      });
    },
    setURLSurveyEventHandlers: function (t) {
      var e = document.getElementById("user-survey-cancel"),
          n = document.getElementById("take-survey");
      e && e.addEventListener("click", function (e) {
        u.setSurveyTakenCookie(t), u.hideSurvey(t), u.trackEvent(t.identifier, "banner_no_thanks", "No thanks clicked"), e.stopPropagation(), e.preventDefault();
      }), n && n.addEventListener("click", function () {
        u.setSurveyTakenCookie(t), u.hideSurvey(t), u.trackEvent(t.identifier, "banner_taken", "User taken survey");
      });
    },
    isSurveyToBeDisplayed: function (e) {
      return !(u.isBeingViewedOnMobile() && !u.surveyIsAllowedOnMobile(e)) && "true" !== GOVUK.cookie(u.surveyTakenCookieName(e)) && !u.surveyHasBeenSeenTooManyTimes(e) && u.randomNumberMatches(e.frequency);
    },
    pathInBlocklist: function () {
      return new RegExp("^/(?:" + /service-manual/.source + /|coronavirus/.source + /|account/.source + ")(?:/|$)").test(u.currentPath());
    },
    userCompletedTransaction: function () {
      function e(e, t) {
        return -1 < e.indexOf(t);
      }

      var t = u.currentPath();
      if (e(t, "/done") || e(t, "/transaction-finished") || e(t, "/driving-transaction-finished")) return !0;
    },
    trackEvent: function (e, t, n) {
      window.GOVUK.analytics.trackEvent(e, t, {
        label: n,
        value: 1,
        nonInteraction: !0
      });
    },
    setSurveyTakenCookie: function (e) {
      window.GOVUK.cookie(u.surveyTakenCookieName(e), !0, {
        days: 90
      });
    },
    incrementSurveySeenCounter: function (e) {
      var t = u.surveySeenCookieName(e),
          n = u.surveySeenCount(e) + 1,
          o = u.seenTooManyTimesCooloff(e);
      o ? window.GOVUK.cookie(t, n, {
        days: o
      }) : window.GOVUK.cookie(t, n, {
        days: 730
      });
    },
    seenTooManyTimesCooloff: function (e) {
      return e.seenTooManyTimesCooloff ? s(e.seenTooManyTimesCooloff, undefined, 1) : undefined;
    },
    hideSurvey: function () {
      var e = document.getElementById("user-satisfaction-survey");
      e.classList.remove("visible"), e.setAttribute("aria-hidden", "true");
    },
    randomNumberMatches: function (e) {
      return 0 === Math.floor(Math.random() * e);
    },
    getSurveyUrl: function (e) {
      return e.url instanceof Array ? e.url[Math.floor(Math.random() * e.url.length)] : e.url;
    },
    otherNotificationVisible: function () {
      function e(e) {
        return null !== e.offsetParent;
      }

      for (var t = [".emergency-banner", "#taxonomy-survey", "#global-bar"], n = 0, o = 0; o < t.length; o++) {
        var i = document.querySelector(t[o]);
        i && e(i) && n++;
      }

      return 0 < n;
    },
    surveyHasBeenSeenTooManyTimes: function (e) {
      return u.surveySeenCount(e) >= u.surveySeenTooManyTimesLimit(e);
    },
    surveySeenTooManyTimesLimit: function (e) {
      var t = e.seenTooManyTimesLimit;
      return "unlimited" === String(t).toLowerCase() ? Infinity : s(t, n, 1);
    },
    surveySeenCount: function (e) {
      return s(GOVUK.cookie(u.surveySeenCookieName(e)), 0, 0);
    },
    surveyTakenCookieName: function (e) {
      return a("taken_" + e.identifier);
    },
    surveySeenCookieName: function (e) {
      return a("survey_seen_" + e.identifier);
    },
    isBeingViewedOnMobile: function () {
      return window.matchMedia(r).matches;
    },
    surveyIsAllowedOnMobile: function (e) {
      return e.hasOwnProperty("allowedOnMobile") && !0 === e.allowedOnMobile;
    },
    pathMatch: function (e) {
      function t(e) {
        return /[\^$]/.test(e) ? "(?:" + e + ")" : "(?:/" + e + "(?:/|$))";
      }

      if (e === undefined) return !1;

      for (var n = [], o = 0; o < e.length; o++) n.push(t(e[o]));

      return (n = new RegExp(n.join("|"))).test(u.currentPath());
    },
    breadcrumbMatch: function (e) {
      return e !== undefined && new RegExp(e.join("|"), "i").test(u.currentBreadcrumb());
    },
    sectionMatch: function (e) {
      if (e === undefined) return !1;
      var t = new RegExp(e.join("|"), "i");
      return t.test(u.currentSection()) || t.test(u.currentThemes());
    },
    organisationMatch: function (e) {
      return e !== undefined && new RegExp(e.join("|")).test(u.currentOrganisation());
    },
    tlsCookieMatch: function (e) {
      var t = u.currentTlsVersion();
      return e !== undefined && "" !== t && t < e[0];
    },
    activeWhen: function (e) {
      if (e.hasOwnProperty("activeWhen")) {
        if (e.activeWhen.hasOwnProperty("path") || e.activeWhen.hasOwnProperty("breadcrumb") || e.activeWhen.hasOwnProperty("section") || e.activeWhen.hasOwnProperty("organisation") || e.activeWhen.hasOwnProperty("tlsCookieVersionLimit")) {
          var t = e.activeWhen.matchType || "include",
              n = u.tlsCookieMatch(e.activeWhen.tlsCookieVersionLimit),
              o = u.pathMatch(e.activeWhen.path),
              i = u.breadcrumbMatch(e.activeWhen.breadcrumb),
              r = u.sectionMatch(e.activeWhen.section),
              a = u.organisationMatch(e.activeWhen.organisation),
              s = n || o || i || r || a;
          return "exclude" !== t ? s : !s;
        }

        return !0;
      }

      return !0;
    },
    currentTime: function () {
      return new Date().getTime();
    },
    currentPath: function () {
      return window.location.pathname;
    },
    currentBreadcrumb: function () {
      var e = document.querySelector(".gem-c-breadcrumbs");
      return e ? e.textContent : "";
    },
    currentSection: function () {
      var e = document.querySelector('meta[name="govuk:section"]');
      return e ? e.getAttribute("content") : "";
    },
    currentThemes: function () {
      var e = document.querySelector('meta[name="govuk:themes"]');
      return e ? e.getAttribute("content") : "";
    },
    currentOrganisation: function () {
      var e = document.querySelector('meta[name="govuk:analytics:organisations"]');
      return e ? e.getAttribute("content") : "";
    },
    currentTlsVersion: function () {
      var e = GOVUK.getCookie("TLSversion");
      return null === e || "unknown" === e ? "" : parseFloat(e.replace("TLSv", "")) || "";
    }
  },
      a = function (e) {
    return "govuk_" + e.replace(/(_\w)/g, function (e) {
      return e.charAt(1).toUpperCase();
    });
  },
      s = function (e, t, n) {
    var o = parseInt(e, 10);
    return isNaN(o) || o < n ? t : o;
  };

  window.GOVUK.userSurveys = u, GOVUK.userSurveys && (GOVUK.analytics && GOVUK.analytics.gaClientId ? window.GOVUK.userSurveys.init() : window.addEventListener("gaClientSet", function () {
    window.GOVUK.userSurveys.init();
  }));
}();