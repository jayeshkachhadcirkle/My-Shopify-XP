$(document).ready(function () {
  /*********START On scroll heder Sticky *********/
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 150) {
      $("header").addClass("head-sticky");
    } else {
      $("header").removeClass("head-sticky");
    }
  });
  /*********  Header Search Popup Mobile ********/
  $(".searchlink").click(function (e) {
    e.preventDefault();
    $(".search-form").toggleClass("active");
    $(".overlay-custome").toggleClass("active");
    $("body,html").toggleClass("scrollno");
    $(".search-form").toggle();
    $("#textbox").focus();
  });
  $(".overlay-custome").click(function (e) {
    e.preventDefault();
    $(".search-form").removeClass("active");
    $(".overlay-custome").removeClass("active");
    $("body,html").removeClass("scrollno");
  });
  /*********  Header Search Popup Mobile ********/
  //FAQ ACCORDIAN
  $(".set > .set-title").on("click", function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).siblings(".content").slideUp(200);
    } else {
      $(".set > .set-title").removeClass("active");
      $(this).addClass("active");
      $(".content").slideUp(200);
      $(this).siblings(".content").slideDown(200);
    }
  });
  /********* START MOBILE MENU ********/
  $(".hamburger").click(function (k) {
    k.preventDefault();
    $(this).toggleClass("is-active");
    $(".mega-menu").toggleClass("is-open");
    $("body,html").toggleClass("scrollno");
    var headerheight = $("header").height();
    $(".mega-menu ").css("top", headerheight);
    $(".mega-menu").css({ height: `calc(100% - ${headerheight}px)` });
  });
  //* tab js start here
  $(".filter-btn").click(function () {
    $(".skin-filter").addClass("is-open");
    $(".skin-filter-overlay").addClass("is-open");
  });
  $(".skin-filter-overlay").click(function () {
    $(".skin-filter").removeClass("is-open");
    $(".skin-filter-overlay").removeClass("is-open");
  });
  $(".mega-menu-category-block ul li").click(function () {
    var tab_id = $(this).attr("data-tab");

    $(".mega-menu-category-block ul li").removeClass("current");
    $(".mega-menu-tabs").removeClass("current");

    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });
  //* tab js end here
  /*********  Quntity  *********/
  // $(".minus").click(function () {
  //   var $input = $(this).parent().find("input");
  //   var count = parseInt($input.val()) - 1;
  //   count = count < 1 ? 1 : count;
  //   $input.val(count);
  //   $input.change();
  //   return false;
  // });
  // $(".plus").click(function () {
  //   var $input = $(this).parent().find("input");
  //   $input.val(parseInt($input.val()) + 1);
  //   $input.change();
  //   return false;
  // });
  /*********Best seller slider *********/
  $(".best-seller-slider").slick({
    autoplay: false,
    centerMode: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    buttons: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
  $(".slider-subscribe").slick({
    dots: false,
    infinite: false,
    arrows: false,
    speed: 600,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });
  /*Start slider product details js end here*/
  $(".prod-slide-row").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: ".prod-slide-nav",
    autoplay: false,
  });
  $(".prod-slide-nav").slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: ".prod-slide-row",
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    vertical: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          vertical: false,
          slidesToShow: 5,
          arrows: true,
          centerMode: false,
        },
      },
    ],
  });
  /*End slider product details js end here*/
  /********* Mobile Menu strat********/
  $(".mobile-menu").click(function (e) {
    e.preventDefault();
    $(".mobile-menu-button").toggleClass("on");
    $(".mobile-navbar").toggleClass("active");
    $("header").toggleClass("menu-active");
    $("body").toggleClass("no-scroll");
    $(".overlay-custome").toggleClass("active");
  });
  $(".close-menu").click(function (e) {
    e.preventDefault();
    $(".mobile-menu-button").removeClass("on");
    $(".mobile-navbar").removeClass("active");
    $("header").removeClass("menu-active");
    $("body").removeClass("no-scroll");
    $("body,html").removeClass("scrollno");
    $(".overlay-custome").removeClass("active");
  });
  $(".overlay-custome").click(function (e) {
    e.preventDefault();
    $(".mobile-menu-button").removeClass("on");
    $(".mobile-navbar").removeClass("active");
    $("header").removeClass("menu-active");
    $("body").removeClass("no-scroll");
  });
  /********* Mobile Menu end********/
  // ==========================================================================
  //  Multi-level accordion nav
  // ==========================================================================
  $(".acnav__label").click(function () {
    var label = $(this);
    var parent = label.parent(".has-children");
    var list = label.siblings(".acnav__list");
    if (parent.hasClass("is-open")) {
      list.slideUp("fast");
      parent.removeClass("is-open");
    } else {
      list.slideDown("fast");
      parent.addClass("is-open");
    }
  });
  // ==========================================================================
});
$(window).on("load resize orientationchange", function () {
  /*********START FOOTER SPACE *********/
  $("footer").css("height", "auto");
  var e = $("footer").outerHeight();
  $("body").css("padding-bottom", e), $("footer").css("height", e);
});

// ====================

const recommendationsFetch = (function () {
  function recommendationsFetch(container) {
    var $container = (this.$container = $(container));
    var baseUrl = $container.data("baseUrl");
    var productId = $container.data("productId");
    var limit = $container.data("limit");
    var intent = $container.data("intent");
    var productRecommendationsUrlAndContainerClass =
      baseUrl +
      "?section_id=product-recommendations&limit=" +
      limit +
      "&product_id=" +
      productId +
      "&intent=" +
      intent +
      " .product-recommendations";
    $container.parent().load(productRecommendationsUrlAndContainerClass);
  }
  return recommendationsFetch;
})();

// const form = document.querySelector("#proform");
// form.addEventListener(
//   "input",
//   (event) => {
//     const data = new FormData(form);
//     let output = "";
//     for (const entry of data) {
//       //   output = `${output}${entry[0]}=${entry[1]}\r`;
//       console.log(entry);
//     }
//     // log.innerText = output;

//     // console.log(data)
//     event.preventDefault();
//   },
//   false
// );

Array.from(document.getElementsByClassName("color_radio")).forEach(function (
  item
) {
  item.addEventListener("click", function () {
    const form = document.querySelector("#main_product_form");
    setTimeout(function () {
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      console.log(data);
    }, 200);
  });
});

class MyQtyElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {

    Array.from(this.getElementsByClassName("minus")).forEach(function (minus) {
      minus.addEventListener("click", function () {
        console.log("minus clicked");

        var $input = $(this).parent().find("input");
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
      });
    });

    Array.from(this.getElementsByClassName("plus")).forEach(function (plus) {
      plus.addEventListener("click", function () {
        var $input = $(this).parent().find("input");
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
      });
    });

  }
}

customElements.define("my-qty", MyQtyElement);

Array.from(document.getElementsByClassName("var-input-radio")).forEach(
  function (inp) {
    inp.addEventListener("click", function (e) {
      let wrap =
        inp.parentElement.parentElement.parentElement.parentElement
          .parentElement;
      console.log(wrap);
    });
  }
);


// shopify-product-form


Array.from(document.getElementsByClassName('AddToCart ')).forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    let wrap = btn.parentElement.parentElement.parentElement.parentElement;
    let id = wrap.getElementsByClassName('qtyAdjust')[0].getElementsByClassName('item-quantity')[0].getAttribute('id')
    let qty = wrap.getElementsByClassName('qtyAdjust')[0].getElementsByClassName('item-quantity')[0].value
    let form = wrap.getElementsByClassName('shopify-product-form')
    sendItemToCart(id, qty, form)
    console.log(id)
  })
})

