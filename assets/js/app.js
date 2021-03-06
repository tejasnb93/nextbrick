// Hide header on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta)
    return;
  // If scrolled down and past the navbar, add class .nav-up.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('.navbar').removeClass('nav-down').addClass('nav-up');
    $('.phoneFixed').removeClass('phone-down').addClass('phone-up');
    $('body').removeClass('nav-down').addClass('nav-up');
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('.navbar').removeClass('nav-up').addClass('nav-down');
      $('body').removeClass('nav-up').addClass('nav-down');
      $('.phoneFixed').removeClass('phone-up').addClass('phone-down');

    }
  }
  lastScrollTop = st;
}

// Menu Button Script
const $menuBtn = document.querySelector(".menu-btn");
const $html = document.querySelector("html");
let isMenuOpen = false;
$menuBtn.addEventListener("click", () => {
  if (!isMenuOpen) {
    $menuBtn.classList.add("open");
    $html.classList.add("prevent-scroll");
  } else {
    $menuBtn.classList.remove("open");
    $html.classList.remove("prevent-scroll");
  }
  isMenuOpen = !isMenuOpen;
});

// Form validation
var form = document.getElementById('needs-validation');
if (form) {
  (function () {
    "use strict";
    window.addEventListener("load", function () {
      form.addEventListener("submit", function (event) {
        if (form.checkValidity() == false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      }, false);
    }, false);
  }());
}


// Navigation more link script
const container = document.querySelector('.tabs')
const primary = container.querySelector('.-primary')
const primaryItems = container.querySelectorAll('.-primary > li:not(.-more)')
container.classList.add('--jsfied')

// insert "more" button and duplicate the list
primary.insertAdjacentHTML('beforeend', `
  <li class="-more nav-item"  data-target="#submenuCollapse">
  <a class="nav-link moreBtn" href="#">More <i class="fa fa-angle-down"></i> </a>
    <ul id="submenuCollapse" class="-secondary submenu">
      ${primary.innerHTML}
    </ul>
  </li>
`)
const secondary = container.querySelector('.-secondary')
const secondaryItems = secondary.querySelectorAll('li')
const allItems = container.querySelectorAll('li')
const moreLi = primary.querySelector('.-more')
const moreBtn = moreLi.querySelector('.moreBtn')
moreBtn.addEventListener('click', (e) => {
  e.preventDefault()
  container.classList.toggle('--show-secondary')
  moreBtn.setAttribute('aria-expanded', container.classList.contains('--show-secondary'))
})

// adapt tabs

const doAdapt = () => {
  // reveal all items for the calculation
  allItems.forEach((item) => {
    item.classList.remove('--hidden')
  })

  // hide items that won't fit in the Primary
  let stopWidth = moreBtn.offsetWidth
  let hiddenItems = []
  const primaryWidth = primary.offsetWidth
  primaryItems.forEach((item, i) => {
    if (primaryWidth >= stopWidth + item.offsetWidth) {
      stopWidth += item.offsetWidth
    } else {
      item.classList.add('--hidden')
      hiddenItems.push(i)
    }
  })

  // toggle the visibility of More button and items in Secondary
  if (!hiddenItems.length) {
    moreLi.classList.add('--hidden')
    container.classList.remove('--show-secondary')
    moreBtn.setAttribute('aria-expanded', false)
  }
  else {
    secondaryItems.forEach((item, i) => {
      if (!hiddenItems.includes(i)) {
        item.classList.add('--hidden')
      }
    })
  }
}

doAdapt() // adapt immediately on load
window.addEventListener('load', doAdapt) // adapt on window resize
window.addEventListener('resize', doAdapt)
// hide Secondary on the outside click

document.addEventListener('click', (e) => {
  let el = e.target
  while (el) {
    if (el === secondary || el === moreBtn) {
      return;
    }
    el = el.parentNode
  }
  container.classList.remove('--show-secondary')
  moreBtn.setAttribute('aria-expanded', false)
})

// Device detection

var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.iOS() || isMobile.Windows());
  }
};

$(window).scroll(function () {
  if ($(window).scrollTop() >= 150) {
    $('.navbar').addClass('whiteSticky');
    $('body').addClass('is-scrolled');
  }
  else {
    $('.navbar').removeClass('whiteSticky');
    $('body').removeClass('is-scrolled');
  }
});
$(document).ready(function () {
  AOS.init();
});

var stickyNay = document.getElementById('mainnav')

if (stickyNay) {
  var sections = $('.scrollableDiv')
    , nav = $('.mainnav')
    , nav_height = nav.outerHeight();
  var offsettop = $('.innerContentSection').offset().top
  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    if (cur_pos > offsettop) {
      $('.stickyNavigation').addClass('sticky');
    }
    else {
      $('.stickyNavigation').removeClass('sticky');
    }
  });
}

// Slider baner
TweenMax.fromTo($('.slide-content .button'), 1, { autoAlpha: 0, x: 200 }, { autoAlpha: 1, x: 0, ease: Power2.easeOut });
TweenMax.fromTo($('.slide-content h2'), 1, { autoAlpha: 0, x: -300 }, { autoAlpha: 1, x: 0, ease: Power2.easeOut }, '-0.1');
TweenMax.fromTo($('.slide-content p'), 1, { autoAlpha: 0, x: 100 }, { autoAlpha: 1, x: 0, ease: Power2.easeOut });


$(document).ready(function () {
  let slider = $('.feature-carousel');
  slider.each(function () {
    $(this).owlCarousel({
      nav: false,
      loop: true,
      autoplay: true,
      smartSpeed: 800,
      dots: false,
      pagination: false,
      margin: 30,

      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
          nav: false
        },
        1000: {
          items: 3,
          loop: false
        }
      }
    });
  });


  $('.review-carousel').each(function () {
    $(this).owlCarousel({
      nav: false,
      loop: true,
      autoplay: false,
      smartSpeed: 800,
      dots: true,
      pagination: false,
      margin: 30,

      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
          nav: false
        },
        1000: {
          items: 1,
          loop: false
        }
      }
    });
  });

  $('.blog-carousel').each(function () {
    $(this).owlCarousel({
      nav: false,
      loop: true,
      autoplay: false,
      smartSpeed: 800,
      dots: true,
      pagination: false,
      margin: 30,

      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
          nav: false
        },
        1000: {
          items: 3,
          loop: false
        }
      }
    });
  });
});


// Form validation
if (document.getElementById('needs-validation')) {
  (function () {
    'use strict';
    window.addEventListener('load', function () {
      var form = document.getElementById('needs-validation');
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    }, false);
  })();
}
