// (function ($) {
//     "use strict";

//     // Spinner
//     var spinner = function () {
//         setTimeout(function () {
//             if ($('#spinner').length > 0) {
//                 $('#spinner').removeClass('show');
//             }
//         }, 1);
//     };
//     spinner(0);
    
//     // Initiate the wowjs
//     new WOW().init();


//     $(window).scroll(function () {
//         if ($(window).width() > 992) {
//             if ($(this).scrollTop() > 45) {
//                 $('.sticky-top .container').addClass('shadow-sm').css('max-width', '100%');
//             } else {
//                 $('.sticky-top .container').removeClass('shadow-sm').css('max-width', $('.topbar .container').width());
//             }
//         } else {
//             $('.sticky-top .container').addClass('shadow-sm').css('max-width', '100%');
//         }
//     });



//     $(".header-carousel").owlCarousel({
//         items: 1,
//         autoplay: true,
//         smartSpeed: 2000,
//         center: false,
//         dots: false,
//         loop: true,
//         margin: 0,
//         nav : true,
//         navText : [
//             '<i class="bi bi-arrow-left"></i>',
//             '<i class="bi bi-arrow-right"></i>'
//         ]
//     });



//     // Project carousel
//     $(".project-carousel").owlCarousel({
//         autoplay: true,
//         smartSpeed: 1000,
//         center: false,
//         dots: true,
//         loop: true,
//         margin: 25,
//         nav : false,
//         navText : [
//             '<i class="bi bi-arrow-left"></i>',
//             '<i class="bi bi-arrow-right"></i>'
//         ],
//         responsiveClass: true,
//         responsive: {
//             0:{
//                 items:1
//             },
//             576:{
//                 items:1
//             },
//             768:{
//                 items:2
//             },
//             992:{
//                 items:2
//             },
//             1200:{
//                 items:2
//             }
//         }
//     });

//     // testimonial carousel
//     $(".testimonial-carousel").owlCarousel({
//         autoplay: true,
//         smartSpeed: 1500,
//         center: false,
//         dots: true,
//         loop: true,
//         margin: 25,
//         nav : false,
//         navText : [
//             '<i class="bi bi-arrow-left"></i>',
//             '<i class="bi bi-arrow-right"></i>'
//         ],
//         responsiveClass: true,
//         responsive: {
//             0:{
//                 items:1
//             },
//             576:{
//                 items:1
//             },
//             768:{
//                 items:2
//             },
//             992:{
//                 items:2
//             },
//             1200:{
//                 items:2
//             }
//         }
//     });


//     // Facts counter
//     $('[data-toggle="counter-up"]').counterUp({
//         delay: 5,
//         time: 2000
//     });


    
//    // Back to top button
//    $(window).scroll(function () {
//     if ($(this).scrollTop() > 300) {
//         $('.back-to-top').fadeIn('slow');
//     } else {
//         $('.back-to-top').fadeOut('slow');
//     }
//     });
//     $('.back-to-top').click(function () {
//         $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
//         return false;
//     });





// // Wait for Google Translate to finish initializing
// function googleTranslateElementInit() {
//   new google.translate.TranslateElement(
//     {
//       pageLanguage: "en",
//       layout: google.translate.TranslateElement.InlineLayout.SIMPLE
//     },
//     "google_translate_element"
//   );

//   // Mark Google Translate as ready
//   window.googleTranslateReady = true;
//   console.log("✅ Google Translate initialized");
// }

// // Helper: find Google’s hidden dropdown
// function getTranslateSelect() {
//   return document.querySelector("select.goog-te-combo");
// }

// // Translate when a flag is clicked
// function translateLanguage(lang) {
//   if (!window.googleTranslateReady) {
//     console.warn("Google Translate not ready yet...");
//     return;
//   }

//   const selectField = getTranslateSelect();
//   if (!selectField) {
//     console.warn("Dropdown not found yet...");
//     return;
//   }

//   selectField.value = lang;
//   selectField.dispatchEvent(new Event("change"));
// }

// // Show/hide the Google dropdown
// function toggleDropdown() {
//   const dropdownContainer = document.getElementById("google_dropdown");
//   const googleTranslate = document.getElementById("google_translate_element");

//   // Move Google Translate widget into our dropdown area if not already moved
//   if (googleTranslate && !dropdownContainer.contains(googleTranslate)) {
//     dropdownContainer.appendChild(googleTranslate);
//     googleTranslate.style.display = "block";
//   }

//   dropdownContainer.style.display =
//     dropdownContainer.style.display === "none" ? "block" : "none";
// }

// // Wait for DOM to load
// document.addEventListener("DOMContentLoaded", () => {
//   // Flag click
//   document.querySelectorAll(".language-switcher img").forEach(img => {
//     img.addEventListener("click", () => translateLanguage(img.dataset.lang));
//   });

//   // More languages button
//   document.getElementById("moreLanguages").addEventListener("click", toggleDropdown);
// });


// })(jQuery);



//perfected js



(function ($) {
  "use strict";

  if (typeof $ === "undefined" || !$) {
    console.error("❌ jQuery not loaded before main.js");
    return;
  }

    // ===============================
  // ✅ Google Translate Section (robust, non-invasive)
  // ===============================
  (function () {
    // make sure a hidden target exists for Google to render into
    let googleDiv = document.getElementById("google_translate_element");
    if (!googleDiv) {
      googleDiv = document.createElement("div");
      googleDiv.id = "google_translate_element";
      // keep it off-screen until popup opens
      googleDiv.style.position = "absolute";
      googleDiv.style.left = "-9999px";
      googleDiv.style.top = "-9999px";
      document.body.appendChild(googleDiv);
    }

    // global ready flag
    window.__GT_READY = false;

    // callback used by Google Translate script
    window.googleTranslateElementInit = function () {
      try {
        new google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
        console.log("✅ Google Translate initialized");
      } catch (err) {
        console.warn("Google Translate init error:", err);
      }
      // start polling to find the select or menu iframe
      const poll = setInterval(() => {
        const sel = document.querySelector("select.goog-te-combo");
        const iframe = document.querySelector(".goog-te-menu-frame.skiptranslate");
        if (sel || iframe) {
          window.__GT_READY = true;
          console.log("✅ Google Translate UI ready");
          clearInterval(poll);
        }
      }, 300);

      // safety stop after 12 seconds
      setTimeout(() => {
        if (!window.__GT_READY) {
          console.warn("⚠️ Google Translate UI did not appear within timeout");
          clearInterval(poll);
        }
      }, 12000);
    };

    // translate function that uses the select
    window.translateLanguage = function (lang) {
      if (!window.__GT_READY) {
        console.warn("⚠️ Google Translate not ready yet");
        return false;
      }
      const sel = document.querySelector("select.goog-te-combo");
      if (!sel) {
        console.warn("⚠️ .goog-te-combo not found");
        return false;
      }
      sel.value = lang;
      sel.dispatchEvent(new Event("change"));
      return true;
    };

    // Build popup DOM once (doesn't change other code)
    function buildTranslatePopup() {
      if (document.getElementById("translateOverlay")) return;

      const overlay = document.createElement("div");
      overlay.id = "translateOverlay";
      overlay.style.cssText =
        "display:none;position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:99999;justify-content:center;align-items:center;padding:18px;box-sizing:border-box;";

      const box = document.createElement("div");
      box.id = "translateBox";
      box.style.cssText =
        "width:92%;max-width:380px;background:#fff;border-radius:12px;max-height:80vh;overflow:hidden;position:relative;box-shadow:0 8px 30px rgba(0,0,0,.25);display:flex;flex-direction:column;";

      const head = document.createElement("div");
      head.style.cssText = "padding:12px 14px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;";
      const title = document.createElement("div");
      title.textContent = "🌍 Select language";
      title.style.cssText = "font-weight:600";
      const closeBtn = document.createElement("button");
      closeBtn.id = "closeTranslatePopup";
      closeBtn.innerHTML = "✕";
      closeBtn.style.cssText = "background:transparent;border:none;font-size:20px;cursor:pointer";
      closeBtn.addEventListener("click", hideTranslatePopup);
      head.appendChild(title);
      head.appendChild(closeBtn);

      const body = document.createElement("div");
      body.id = "translatePopupBody";
      body.style.cssText = "padding:10px;overflow:auto;-webkit-overflow-scrolling:touch;flex:1;display:flex;align-items:center;justify-content:center;";

      // spinner area (only inside popup)
      const spinnerWrap = document.createElement("div");
      spinnerWrap.id = "translateSpinner";
      spinnerWrap.style.cssText = "display:none;align-items:center;justify-content:center;width:100%;height:160px;";
      spinnerWrap.innerHTML = '<div style="width:40px;height:40px;border:4px solid #eee;border-top-color:#0d6efd;border-radius:50%;animation:gt-spin 0.9s linear infinite"></div>';
      body.appendChild(spinnerWrap);

      // message area
      const msg = document.createElement("div");
      msg.id = "translateMsg";
      msg.style.cssText = "display:none;text-align:center;color:#666;padding:10px";
      body.appendChild(msg);

      // target where we move google's content into
      const googleTarget = document.createElement("div");
      googleTarget.id = "translateGoogleTarget";
      googleTarget.style.cssText = "width:100%;";
      // Initially hide the actual google div (we keep it off-screen). When popup opens we will move it
      body.appendChild(googleTarget);

      box.appendChild(head);
      box.appendChild(body);
      overlay.appendChild(box);
      document.body.appendChild(overlay);

      // add small keyframes for spinner
      const s = document.createElement("style");
      s.textContent = "@keyframes gt-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}";
      document.head.appendChild(s);

      // clicking outside closes
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) hideTranslatePopup();
      });
    }

    function showSpinnerInPopup(show, text) {
      const spinnerWrap = document.getElementById("translateSpinner");
      const msg = document.getElementById("translateMsg");
      if (!spinnerWrap || !msg) return;
      if (show) {
        spinnerWrap.style.display = "flex";
        msg.style.display = "none";
        if (text) msg.textContent = text;
      } else {
        spinnerWrap.style.display = "none";
        if (text) {
          msg.style.display = "block";
          msg.textContent = text;
        } else {
          msg.style.display = "none";
          msg.textContent = "";
        }
      }
    }

    function showTranslatePopup() {
      const overlay = document.getElementById("translateOverlay");
      const googleTarget = document.getElementById("translateGoogleTarget");
      const googleDiv = document.getElementById("google_translate_element");

      if (!overlay || !googleTarget || !googleDiv) return;
      overlay.style.display = "flex";
      // move google div into the popup target (if not already)
      if (!googleTarget.contains(googleDiv)) {
        // keep googleDiv visible inside the popup
        googleDiv.style.position = "";
        googleDiv.style.left = "";
        googleDiv.style.top = "";
        googleDiv.style.display = "block";
        googleTarget.appendChild(googleDiv);
      }

      // show spinner while waiting for Google's UI
      showSpinnerInPopup(true, "Loading languages…");

      // poll for either select or floating iframe menu
      let attempts = 0;
      const maxAttempts = 30; // ~9 seconds (300ms * 30)
      const poll = setInterval(() => {
        attempts++;
        const sel = document.querySelector("select.goog-te-combo");
        const iframe = document.querySelector(".goog-te-menu-frame.skiptranslate");

        if (sel) {
          // hide spinner and show the select (Google may present select inline)
          showSpinnerInPopup(false);
          sel.style.maxWidth = "100%";
          sel.style.display = "block";
          // ensure select is inside googleTarget (if google created it elsewhere)
          if (!googleTarget.contains(sel) && sel.parentElement) {
            try { googleTarget.appendChild(sel); } catch (e) { /* ignore cross-origin placements */ }
          }
          clearInterval(poll);
          window.__GT_READY = true;
          return;
        }

        if (iframe) {
          // style iframe to be visible near popup (Google places it absolute). Try to constrain it.
          try {
            Object.assign(iframe.style, {
              width: "320px",
              height: "320px",
              maxHeight: "75vh",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 100000,
              border: "none",
              display: "block"
            });
          } catch (e) {}
          // once iframe appears, hide spinner as well
          showSpinnerInPopup(false);
          clearInterval(poll);
          window.__GT_READY = true;
          return;
        }

        if (attempts >= maxAttempts) {
          clearInterval(poll);
          showSpinnerInPopup(false, "Unable to load translations right now. Please try again later.");
          console.warn("⚠️ Google Translate UI did not appear within polling timeout");
        }
      }, 300);
    }

    function hideTranslatePopup() {
      const overlay = document.getElementById("translateOverlay");
      if (overlay) overlay.style.display = "none";
      // optionally move google div back off-screen to avoid accidental UI showing
      const googleDiv = document.getElementById("google_translate_element");
      if (googleDiv && !document.getElementById("translateGoogleTarget")?.contains(googleDiv)) {
        googleDiv.style.position = "absolute";
        googleDiv.style.left = "-9999px";
        googleDiv.style.top = "-9999px";
      }
    }

    // create popup DOM now (safe)
    buildTranslatePopup();

    // expose show/hide on window so other code can call if needed
    window.showTranslatePopup = showTranslatePopup;
    window.hideTranslatePopup = hideTranslatePopup;

    // attach click to your translate link — wait for DOM ready
    document.addEventListener("DOMContentLoaded", function () {
      const link = document.getElementById("moreLanguages");
      if (link) {
        link.addEventListener("click", function (ev) {
          ev.preventDefault();
          showTranslatePopup();
        });
      } else {
        console.warn("⚠️ #moreLanguages not found");
      }
    });

    // small safety: if Google script loads before our file, callback will run; otherwise it will run later when script loads.
    // NOTE: ensure your HTML includes the Google script AFTER this main.js:
    // <script src="js/main.js"></script>
    // <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
  })();

  // ===============================
  // ✅ DOM Ready
  // ===============================
  $(document).ready(function () {
    // Spinner
    const spinner = () => {
      setTimeout(() => $("#spinner").removeClass("show"), 1);
    };
    spinner();

    // WOW animation
    if (typeof WOW !== "undefined") new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
      if ($(window).width() > 992) {
        if ($(this).scrollTop() > 45) {
          $(".sticky-top .container")
            .addClass("shadow-sm")
            .css("max-width", "100%");
        } else {
          $(".sticky-top .container")
            .removeClass("shadow-sm")
            .css("max-width", $(".topbar .container").width());
        }
      } else {
        $(".sticky-top .container")
          .addClass("shadow-sm")
          .css("max-width", "100%");
      }
    });

    // Carousels
    $(".header-carousel").owlCarousel({
      items: 1,
      autoplay: true,
      smartSpeed: 2000,
      loop: true,
      dots: false,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>',
      ],
    });

    $(".project-carousel, .testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      dots: true,
      loop: true,
      margin: 25,
      nav: false,
      responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 2 },
        1200: { items: 2 },
      },
    });

    // Counter
    if ($.fn.counterUp) {
      $("[data-toggle='counter-up']").counterUp({ delay: 5, time: 2000 });
    }

    // Back to top
    $(window).scroll(function () {
      $(this).scrollTop() > 300
        ? $(".back-to-top").fadeIn("slow")
        : $(".back-to-top").fadeOut("slow");
    });

    $(".back-to-top").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
      return false;
    });

    // ✅ Flag Click Event
    document.querySelectorAll(".language-switcher img").forEach((img) => {
      img.addEventListener("click", () => translateLanguage(img.dataset.lang));
    });

    // ✅ Initialize Translate Popup
    setupTranslatePopup();
  });

  // ===============================
  // ✅ Animation keyframes (JS injected CSS)
  // ===============================
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    .goog-te-banner-frame.skiptranslate { display: none !important; }
    body { top: 0 !important; }
  `;
  document.head.appendChild(style);

document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById("submitBtn");

  // Disable the button and show spinner
  submitBtn.disabled = true;
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
    Sending...
  `;

  const formData = new FormData(form);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      alert("✅ Message sent successfully!");
      form.reset();
    } else {
      alert("❌ Error: " + result.message);
    }
  } catch (error) {
    alert("⚠️ Something went wrong. Please try again later.");
    console.error("Error:", error);
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
});

})(window.jQuery);



// (function ($) {
//   "use strict";

//   if (typeof $ === "undefined" || !$) {
//     console.error("❌ jQuery not loaded before main.js");
//     return;
//   }

//   // ===============================
//   // 🌍 Google Translate Popup
//   // ===============================
//   (function () {
//     let googleDiv = document.getElementById("google_translate_element");
//     if (!googleDiv) {
//       googleDiv = document.createElement("div");
//       googleDiv.id = "google_translate_element";
//       googleDiv.style.position = "absolute";
//       googleDiv.style.left = "-9999px";
//       googleDiv.style.top = "-9999px";
//       document.body.appendChild(googleDiv);
//     }

//     // 🟢 Initialize Translate
//     window.googleTranslateElementInit = function () {
//       new google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         "google_translate_element"
//       );
//       console.log("✅ Google Translate initialized");
//       window.__GT_READY = true;
//     };

//     // 🌐 Top 25 + Nigerian languages
//     const topLanguages = [
//       { code: "en", name: "English" },
//       { code: "es", name: "Spanish" },
//       { code: "fr", name: "French" },
//       { code: "de", name: "German" },
//       { code: "it", name: "Italian" },
//       { code: "pt", name: "Portuguese" },
//       { code: "ru", name: "Russian" },
//       { code: "zh-CN", name: "Chinese (Simplified)" },
//       { code: "ja", name: "Japanese" },
//       { code: "ko", name: "Korean" },
//       { code: "ar", name: "Arabic" },
//       { code: "hi", name: "Hindi" },
//       { code: "bn", name: "Bengali" },
//       { code: "ur", name: "Urdu" },
//       { code: "tr", name: "Turkish" },
//       { code: "vi", name: "Vietnamese" },
//       { code: "id", name: "Indonesian" },
//       { code: "th", name: "Thai" },
//       { code: "fa", name: "Persian" },
//       { code: "nl", name: "Dutch" },
//       { code: "pl", name: "Polish" },
//       { code: "uk", name: "Ukrainian" },
//       { code: "fi", name: "Finnish" },
//       { code: "sv", name: "Swedish" },
//       { code: "yo", name: "Yoruba" },
//       { code: "ig", name: "Igbo" },
//       { code: "ha", name: "Hausa" },
//     ];

//     // 🧱 Build popup UI
//     function buildTranslatePopup() {
//       if (document.getElementById("translateOverlay")) return;

//       const overlay = document.createElement("div");
//       overlay.id = "translateOverlay";
//       overlay.style.cssText = `
//         display:none;position:fixed;inset:0;background:rgba(0,0,0,0.55);
//         z-index:99999;justify-content:center;align-items:center;padding:18px;
//       `;

//       const box = document.createElement("div");
//       box.id = "translateBox";
//       box.style.cssText = `
//         width:92%;max-width:380px;background:#fff;border-radius:12px;
//         max-height:80vh;overflow:hidden;position:relative;
//         box-shadow:0 8px 30px rgba(0,0,0,.25);
//         display:flex;flex-direction:column;
//         animation:fadeInScale 0.25s ease-out;
//       `;

//       const header = document.createElement("div");
//       header.style.cssText = `
//         padding:12px 14px;border-bottom:1px solid #eee;
//         display:flex;align-items:center;justify-content:space-between;
//       `;
//       header.innerHTML = `<strong>🌍 Select Language</strong>
//         <button id="closeTranslatePopup"
//           style="background:none;border:none;font-size:20px;cursor:pointer">✕</button>`;

//       const body = document.createElement("div");
//       body.id = "translatePopupBody";
//       body.style.cssText = `
//         padding:12px;overflow:auto;-webkit-overflow-scrolling:touch;
//         flex:1;display:grid;grid-template-columns:1fr 1fr;gap:10px;
//       `;

//       // 🏗️ Create language buttons
//       topLanguages.forEach((lang) => {
//         const btn = document.createElement("button");
//         btn.textContent = lang.name;
//         btn.style.cssText = `
//           padding:8px 10px;border:1px solid #ddd;border-radius:6px;
//           background:#f9f9f9;cursor:pointer;text-align:center;
//         `;
//         btn.onclick = () => {
//           if (!window.__GT_READY) {
//             alert("Google Translate is still loading. Please wait a second.");
//             return;
//           }
//           translateLanguage(lang.code);
//           hideTranslatePopup();
//         };
//         body.appendChild(btn);
//       });

//       box.appendChild(header);
//       box.appendChild(body);
//       overlay.appendChild(box);
//       document.body.appendChild(overlay);

//       // Close events
//       document.getElementById("closeTranslatePopup").onclick = hideTranslatePopup;
//       overlay.addEventListener("click", (e) => {
//         if (e.target === overlay) hideTranslatePopup();
//       });
//     }

//     // Show popup
//     function showTranslatePopup() {
//       const overlay = document.getElementById("translateOverlay");
//       if (overlay) overlay.style.display = "flex";
//     }

//     // Hide popup
//     function hideTranslatePopup() {
//       const overlay = document.getElementById("translateOverlay");
//       if (overlay) overlay.style.display = "none";
//     }

//     // Core translation function
//     function translateLanguage(lang) {
//       const select = document.querySelector("select.goog-te-combo");
//       if (select) {
//         select.value = lang;
//         select.dispatchEvent(new Event("change"));
//         console.log(`🌐 Translated to ${lang}`);
//       } else {
//         alert("Google Translate not ready yet.");
//       }
//     }

//     // Initialize
//     buildTranslatePopup();
//     document.addEventListener("DOMContentLoaded", () => {
//       const link = document.getElementById("moreLanguages");
//       if (link) {
//         link.addEventListener("click", (e) => {
//           e.preventDefault();
//           showTranslatePopup();
//         });
//       }
//     });
//   })();

//   // ===============================
//   // ✨ UI Behavior (Existing Code)
//   // ===============================
//   $(document).ready(function () {
//     const spinner = () => setTimeout(() => $("#spinner").removeClass("show"), 1);
//     spinner();

//     if (typeof WOW !== "undefined") new WOW().init();

//     $(window).scroll(function () {
//       if ($(window).width() > 992) {
//         if ($(this).scrollTop() > 45) {
//           $(".sticky-top .container").addClass("shadow-sm").css("max-width", "100%");
//         } else {
//           $(".sticky-top .container")
//             .removeClass("shadow-sm")
//             .css("max-width", $(".topbar .container").width());
//         }
//       } else {
//         $(".sticky-top .container").addClass("shadow-sm").css("max-width", "100%");
//       }
//     });

//     $(".header-carousel").owlCarousel({
//       items: 1,
//       autoplay: true,
//       smartSpeed: 2000,
//       loop: true,
//       dots: false,
//       nav: true,
//       navText: [
//         '<i class="bi bi-arrow-left"></i>',
//         '<i class="bi bi-arrow-right"></i>',
//       ],
//     });

//     $(".project-carousel, .testimonial-carousel").owlCarousel({
//       autoplay: true,
//       smartSpeed: 1000,
//       dots: true,
//       loop: true,
//       margin: 25,
//       nav: false,
//       responsive: {
//         0: { items: 1 },
//         576: { items: 1 },
//         768: { items: 2 },
//         1200: { items: 2 },
//       },
//     });

//     if ($.fn.counterUp) {
//       $("[data-toggle='counter-up']").counterUp({ delay: 5, time: 2000 });
//     }

//     $(window).scroll(function () {
//       $(this).scrollTop() > 300
//         ? $(".back-to-top").fadeIn("slow")
//         : $(".back-to-top").fadeOut("slow");
//     });

//     $(".back-to-top").click(function () {
//       $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
//       return false;
//     });
//   });

//   // Small CSS
//   const style = document.createElement("style");
//   style.textContent = `
//     @keyframes fadeInScale {
//       from { opacity: 0; transform: scale(0.95); }
//       to { opacity: 1; transform: scale(1); }
//     }
//     .goog-te-banner-frame.skiptranslate { display: none !important; }
//     body { top: 0 !important; }
//   `;
//   document.head.appendChild(style);

// document.getElementById("contactForm").addEventListener("submit", async function(e) {
//   e.preventDefault();

//   const form = e.target;
//   const submitBtn = document.getElementById("submitBtn");

//   // Disable the button and show spinner
//   submitBtn.disabled = true;
//   const originalText = submitBtn.innerHTML;
//   submitBtn.innerHTML = `
//     <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//     Sending...
//   `;

//   const formData = new FormData(form);

//   try {
//     const response = await fetch("https://api.web3forms.com/submit", {
//       method: "POST",
//       body: formData
//     });

//     const result = await response.json();

//     if (result.success) {
//       alert("✅ Message sent successfully!");
//       form.reset();
//     } else {
//       alert("❌ Error: " + result.message);
//     }
//   } catch (error) {
//     alert("⚠️ Something went wrong. Please try again later.");
//     console.error("Error:", error);
//   } finally {
//     // Re-enable button
//     submitBtn.disabled = false;
//     submitBtn.innerHTML = originalText;
//   }
// });

// })(window.jQuery);
