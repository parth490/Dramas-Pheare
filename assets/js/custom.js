/*  jQuery Nice Select - v1.0
https://github.com/hernansartorio/jquery-nice-select
Made by HernÃ¡n Sartorio  */
!function (e) { e.fn.niceSelect = function (t) { function s(t) { t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>')); var s = t.next(), n = t.find("option"), i = t.find("option:selected"); s.find(".current").html(i.data("display") || i.text()), n.each(function (t) { var n = e(this), i = n.data("display"); s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text())) }) } if ("string" == typeof t) return "update" == t ? this.each(function () { var t = e(this), n = e(this).next(".nice-select"), i = n.hasClass("open"); n.length && (n.remove(), s(t), i && t.next().trigger("click")) }) : "destroy" == t ? (this.each(function () { var t = e(this), s = e(this).next(".nice-select"); s.length && (s.remove(), t.css("display", "")) }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this; this.hide(), this.each(function () { var t = e(this); t.next().hasClass("nice-select") || s(t) }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function (t) { var s = e(this); e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus() }), e(document).on("click.nice_select", function (t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function (t) { var s = e(this), n = s.closest(".nice-select"); n.find(".selected").removeClass("selected"), s.addClass("selected"); var i = s.data("display") || s.text(); n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change") }), e(document).on("keydown.nice_select", ".nice-select", function (t) { var s = e(this), n = e(s.find(".focus") || s.find(".list .option.selected")); if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1; if (40 == t.keyCode) { if (s.hasClass("open")) { var i = n.nextAll(".option:not(.disabled)").first(); i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus")) } else s.trigger("click"); return !1 } if (38 == t.keyCode) { if (s.hasClass("open")) { var l = n.prevAll(".option:not(.disabled)").first(); l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus")) } else s.trigger("click"); return !1 } if (27 == t.keyCode) s.hasClass("open") && s.trigger("click"); else if (9 == t.keyCode && s.hasClass("open")) return !1 }); var n = document.createElement("a").style; return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this } }(jQuery);

$(document).ready(function () {

    /*********Nice Select Image *********/
    // Toggle dropdown open/close
    document.querySelectorAll('.nice-select').forEach(select => {
        select.addEventListener('click', function (e) {
            e.stopPropagation();
            document.querySelectorAll('.nice-select').forEach(el => {
                if (el !== this) el.classList.remove('open');
            });
            this.classList.toggle('open');
        });
    });
    // Click outside to close dropdown
    window.addEventListener('click', () => {
        document.querySelectorAll('.nice-select').forEach(el => el.classList.remove('open'));
    });
    // Handle option click and update current content
    document.querySelectorAll('.nice-select .option').forEach(option => {
        option.addEventListener('click', function (e) {
            e.stopPropagation();
            const select = this.closest('.nice-select');
            const current = select.querySelector('.current');
            current.innerHTML = this.innerHTML;
            select.classList.remove('open');
        });
    });

    // /********* On scroll heder Sticky *********/
    function initHeaderSticky() {
        if (jQuery(document).height() > jQuery(window).height()) {
            if (jQuery(this).scrollTop() > 100) {
                jQuery('.site-header').addClass("fixed");
            } else {
                jQuery('.site-header').removeClass("fixed");
            }
        }
    }

    $(document).ready(function () {
        initHeaderSticky()
    });
    $(window).on('resize scroll', function () {
        initHeaderSticky()
    });


    /******  Nice Select  ******/
    $('select').niceSelect();

    /******  menu hover  ******/
    $(".menu-lnk.has-item").hover(function () {
        $(this).toggleClass("menu_active");
        $(this).find(".menu-dropdown").toggleClass("open_menu");
        $("body").toggleClass("no_scroll");
    }); 

    /******  Sidebar Toggle  ******/
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleBtn");
    const closeSidebarBtn = document.getElementById("closeSidebarBtn");

    // ----------------------------------------------------
    // HELPER FUNCTION: CLOSE SIDEBAR (for mobile/tablet only)
    // ----------------------------------------------------
    function closeMobileSidebar() {
        sidebar.classList.remove("active");
        document.body.classList.remove("mobile-overlay-active");
    }

    // ----------------------------------------------------
    // EVENT LISTENER: OPEN/TOGGLE SIDEBAR
    // ----------------------------------------------------
    toggleBtn.addEventListener("click", () => {
        // Logic now applies for screens wider than 1199px
        if (window.innerWidth > 1199) {
            // Desktop Toggle (Collapse/Expand)
            sidebar.classList.toggle("collapsed");
            document.body.classList.toggle("desktop-sidebar");
        } else {
            // Mobile/Tablet Toggle (Slide In/Out)
            sidebar.classList.toggle("active");
            
            // Toggle the overlay class on the body
            document.body.classList.toggle("mobile-overlay-active");
        }
    });

    // ----------------------------------------------------
    // EVENT LISTENER: CLOSE SIDEBAR BUTTON
    // ----------------------------------------------------
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener("click", closeMobileSidebar);
    }

    // ----------------------------------------------------
    // HANDLE OVERLAY CLICK TO CLOSE (Required for the overlay effect)
    // ----------------------------------------------------
    document.body.addEventListener("click", (event) => {
        // Only proceed if we are in mobile view and the overlay is active
        if (window.innerWidth <= 1199 && sidebar.classList.contains("active")) {
            
            // Check if the click occurred on the body and not inside the sidebar itself
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggle = toggleBtn.contains(event.target);
            
            if (!isClickInsideSidebar && !isClickOnToggle) {
                // This condition is met when the user clicks outside the open sidebar (on the overlay)
                closeMobileSidebar();
            }
        }
    });

    /********* Datepicker *********/  
    $(document).ready(function () {
        $('.dob-picker').each(function () {
            flatpickr(this, {
                enableTime: false,
                dateFormat: "Y-m-d",
                altInput: true,
                altFormat: "F j, Y",
                minDate: "today",
                defaultDate: null,
                monthSelectorType: "dropdown",
                yearSelectorType: "dropdown",
                disableMobile: true
            });
        });
    });


    //-- Filter Toggle Menu Js Script Start --//
    document.getElementById('openFilter').onclick = function () {
        document.getElementById('overlay').classList.replace('opacity-0', 'opacity-100');
        document.getElementById('overlay').classList.remove('pointer-events-none');
        document.getElementById('filterSidebar').classList.remove('translate-x-full');
    };
    document.getElementById('closeFilter').onclick = function () {
        document.getElementById('overlay').classList.replace('opacity-100', 'opacity-0');
        document.getElementById('overlay').classList.add('pointer-events-none');
        document.getElementById('filterSidebar').classList.add('translate-x-full');
    }; 
    document.getElementById('overlay').onclick = function () {
        this.classList.replace('opacity-100', 'opacity-0');
        this.classList.add('pointer-events-none');
        document.getElementById('filterSidebar').classList.add('translate-x-full');
    };
    //-- Filter Toggle Menu Js Script End --//

    //-- Click Button So Hide And Show Different Pages Start --//
    (function () {
        // Query all triggers and the section container
        const triggers = document.querySelectorAll('.open-section-btn[data-target]');
        const content = document.querySelector('.content');
        if (!content) return;

        // All direct sections inside .content that we will toggle
        const sections = Array.from(content.querySelectorAll('section'));

        // Initialize: ensure only first visible stays visible (optionally)
        function init() {
            let anyVisible = false;
            sections.forEach((sec, i) => {
                // mark panels with utility classes for consistent state
                sec.classList.add('section-panel', 'section-fade');
                if (!sec.classList.contains('hidden')) {
                    sec.classList.add('visible');
                    anyVisible = true;
                } else {
                    sec.classList.remove('visible');
                }
            });
            // If none visible, show first (optional behavior)
            if (!anyVisible && sections[0]) {
                showSection(sections[0].id, false);
            }
        }

        // Hide all sections then show the target
        function showSection(targetId, smooth = true) {
            sections.forEach(sec => {
                if (sec.id === targetId) {
                    // show
                    sec.classList.remove('hidden');
                    sec.classList.add('visible');
                    // remove height:0 if previously hidden
                    sec.style.height = '';
                } else {
                    // hide
                    sec.classList.add('hidden');
                    sec.classList.remove('visible');
                    // (optional) collapse to remove visual gap
                    // sec.style.height = '0';
                }
            });

            // Optional: move focus into first focusable element inside opened section
            const target = document.getElementById(targetId);
            if (target && smooth) {
                // scroll into view inside main content (nice UX)
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const focusable = target.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
                if (focusable) focusable.focus({ preventScroll: true });
            }
        }

        // Attach click handlers to each trigger
        triggers.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = btn.getAttribute('data-target');
                if (!targetId) return;
                // If target doesn't exist, do nothing
                const targetEl = document.getElementById(targetId);
                if (!targetEl) return;
                showSection(targetId, true);
            });
        });

        // init on load
        init();
    })();  
    //-- Click Button So Hide And Show Different Pages End--//
 
    //-- Delet Popup Start --//
    // Select modal and control buttons
const modal = document.getElementById('deleteModal');
const cancelBtn = document.getElementById('cancelModalBtn');
const confirmBtn = document.getElementById('confirmDeleteBtn');
const modalCard = modal.querySelector('.modal-card');

// Variable to store which item is being deleted
let currentDeleteId = null;

// Show modal
function showModal() {
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

// Hide modal
function hideModal() {
  modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  currentDeleteId = null; // reset
}

// Attach to ALL delete buttons
document.querySelectorAll('.openModalBtn').forEach(button => {
  button.addEventListener('click', () => {
    currentDeleteId = button.dataset.itemId; // store id or any unique data
    showModal();
  });
});

// Cancel button
cancelBtn.addEventListener('click', hideModal);

// Confirm delete
confirmBtn.addEventListener('click', () => {
  console.log("Deleting item with ID:", currentDeleteId);
  // Your actual delete logic here (e.g., API call or remove row)
  hideModal();
});

// Close when clicking backdrop
modal.addEventListener('click', (event) => {
  if (!modalCard.contains(event.target)) hideModal();
});

    //-- Delet Popup Start --//
});

//-- Sidebar Submenu Toggle --//
function toggleSubmenu(element) {
    const parentLi = element.closest('li');
    const submenu = parentLi.querySelector('.submenu');
    const arrow = element.querySelector('.dropdown-arrow');
    
    // Toggle active class on parent menu item
    element.classList.toggle('active');
    
    // Toggle submenu
    if (submenu) {
        submenu.classList.toggle('active');
    }
    
    // Rotate arrow
    if (arrow) {
        arrow.classList.toggle('rotate');
    }
}
