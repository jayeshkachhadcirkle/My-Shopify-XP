$(document).ready(function () {
  if (
    window.location.href.includes("collections/") &&
    window.location.href.includes("oseid") == !1 &&
    !window.location.href.includes("/products/")
  ) {
    var new_location = window.location.href + "?",
      params = 0;
    window.location.href.includes("filter.v.availability=1") == !1 &&
      ((new_location += "filter.v.availability=1"), params++),
      params > 0 && (new_location += "&"),
      window.location.href.includes("filter.p.m.cgarden.expiring_soon") == !1 &&
        ((new_location += "filter.p.m.cgarden.expiring_soon=0"), params++),
      params > 0 && window.location.replace(new_location);
  }
  $(".mob_hamburger").click(function () {
    $(".header_bottom, body").addClass("active_menu"),
      $("body").addClass("overflow-hidden");
  }),
    $(".close_menu").click(function () {
      $(".header_bottom, body").removeClass("active_menu"),
        $("body").removeClass("overflow-hidden");
    }),
    $("body").on("click", ".accordian_title", function (e) {
      e.preventDefault(),
        $(this)
          .closest(".accordian_ul_wrp")
          .find(".accordian_title.active")
          .next()
          .slideUp(),
        $(this)
          .closest(".accordian_ul_wrp")
          .find(".accordian_info")
          .removeClass("active"),
        $(this)
          .closest(".accordian_ul_wrp")
          .find(".accordian_title")
          .removeClass("active"),
        $(this).next().is(":visible") ||
          ($(this).next().slideDown(),
          $(this).addClass("active"),
          $(this).closest(".accordian_info").toggleClass("active"));
    });
  var swiper = new Swiper(".hero_banner_slider", {
    slidesPerView: 1,
    draggable: !0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
  });
  $("body").on("click", ".filter_cat", function (e) {
    $(this).hasClass("active")
      ? ($(this).next().slideUp(), $(this).removeClass("active"))
      : $(this).next().is(":visible") ||
        ($("body").find(".filter_cat.active").length &&
          ($("body").find(".filter_cat.active").next().slideUp(),
          $("body").find(".filter_cat.active").removeClass("active")),
        $(this).next().slideDown(),
        $(this).addClass("active"));
  }),
    $("body")
      .find(".collection_menu_icon")
      .click(function () {
        $(".product_grid").toggleClass("hide_menu"),
          $(window).width() < 768 && $("body").toggleClass("overflow-hidden");
      }),
    $("body").on("click", ".close_filter", function () {
      $(".product_grid").removeClass("hide_menu"),
        $("body").removeClass("overflow-hidden");
    }),
    $("body").on("click", ".incremant-spinner .btn", function (e) {
      e.preventDefault;
      var input = $(this).closest(".incremant-spinner").find("input.quantity"),
        ip = parseInt(input.val());
      if (
        ($(this).hasClass("quantity-increment") ? (ip = ip + 1) : (ip = ip - 1),
        ip == 0)
      )
        return !1;
      input.attr("value", ip);
    }),
    $("body").on("click", ".custome_dropdown_select", function () {
      $(this).toggleClass("open");
    }),
    $("body").on("click", ".custome_dropdown_select .list li", function () {
      var itemValue = $(this).data("value");
      $(".custome_dropdown_select .list li").removeClass("selected"),
        $(".custome_dropdown_select span")
          .text($(this).text())
          .parent()
          .attr("data-value", itemValue),
        $(this).toggleClass("selected");
    }),
    $("body").on("click", ".logo_fix", function (e) {
      e.preventDefault(),
        $(".np_popup").toggleClass("active"),
        $("body").toggleClass("overflow-hidden");
    }),
    $("body").on("click", ".account_wrp .login_icon", function (e) {
      e.preventDefault(),
        $(".account_wrp").toggleClass("active_popup"),
        $("body").addClass("overflow-hidden");
    }),
    $("body").on("click", ".cart-wrp .cart_icon_wrp", function (e) {
      e.preventDefault(),
        $(".mini_cart").length &&
          ($(".cart-wrp").addClass("cart_active"),
          $("body").addClass("overflow-hidden"));
    }),
    $("body").on("click", ".mini_cart_wrp .close_cart", function (e) {
      e.preventDefault(),
        $(".cart-wrp").removeClass("cart_active"),
        $("body").removeClass("overflow-hidden");
    }),
    $("#credits-lnk").on("click", function (e) {
      e.preventDefault(),
        console.info("credits-lnk clicked!"),
        $("#popup").fadeIn();
    }),
    $(".close-btn").on("click", function () {
      $("#popup").fadeOut();
    }),
    $(window).on("click", function (event2) {
      $(event2.target).is("#popup") && $("#popup").fadeOut();
    }),
    $("body").on("click", ".overlay", function () {
      $(".account_wrp.active_popup").length
        ? $(".account_wrp").removeClass("active_popup")
        : $(".cart-wrp.cart_active").length
        ? $(".cart-wrp").removeClass("cart_active")
        : $(".np_popup.active").length
        ? $(".np_popup").removeClass("active")
        : $(".quick_search.active").length
        ? ($(".quick_search").find(".search_input").val(""),
          $(".quick_search").find("#predictive-search").css("display", "none"),
          $(".quick_search").removeClass("active"))
        : $(".product_grid.hide_menu").length
        ? $(".product_grid").removeClass("hide_menu")
        : $(".notify-us-popup.active").length
        ? $(".notify-us-popup").removeClass("active")
        : $(".notify-us-success.active").length &&
          $(".notify-us-success").removeClass("active"),
        $("body").removeClass("overflow-hidden");
    }),
    $("body").on("click", ".custome_dropdown_select .list li", function (e) {
      var sort_val = $(this).attr("data-value"),
        old_sort_val = $(".custome-select").val();
      if (sort_val != old_sort_val) {
        $(".custome-select").val(sort_val).change();
        let filter_url = serialize_form($(this));
        setTimeout(function () {
          update_collection(filter_url);
        }, 300);
      }
    }),
    $("body").on("click", ".rm_filter", function (e) {
      e.preventDefault();
      var new_url = $(this).find("a").attr("href");
      $(this).hasClass("reset_filters") &&
        (new_url =
          new_url +
          "?filter.v.availability=1&filter.p.m.cgarden.expiring_soon=0"),
        setTimeout(function () {
          update_collection(new_url);
        }, 300);
    }),
    $("body").on(
      "change",
      '.radio-btn-block .filter_input, .price-block input[type="number"]',
      function () {
        let filter_url = serialize_form($(this));
        setTimeout(function () {
          update_collection(filter_url);
        }, 300);
      }
    );
  function serialize_form(obj) {
    var form = obj.closest("form"),
      col_url = form.data("url"),
      form_data = form.serialize(),
      new_url =
        col_url +
        "?filter.v.availability=1&filter.p.m.cgarden.expiring_soon=0&" +
        form_data;
    return new_url;
  }
  function update_collection(this_url) {
    $("html,body").animate(
      { scrollTop: $(".filter_form").offset().top - 10 },
      100
    ),
      $.get(this_url, function (data) {
        window.history.pushState("", "", this_url),
          this_url.includes("collection") &&
            ($("body")
              .find(".filter_form")
              .html($(data).find(".filter_form").html()),
            $(".product_grid").removeClass("hide_menu")),
          $("body").removeClass("overflow-hidden");
      });
  }
  $("body").on("click", ".add-to-basket,.add_cart_btn", function (e) {
    e.preventDefault();
    let this_obj = $(this),
      form = $(this).closest(".pdp-right, .product_card"),
      KEY = form.find(".product_id").val(),
      QTY = form.find(".pdp_quantity").val();
    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      data: { id: KEY, quantity: QTY },
      dataType: "json",
      beforeSend: function () {
        this_obj.addClass("adding");
      },
      success: function (data) {
        update_mini_cart(), $("input.quantity").attr("value", 1);
      },
      error: function (response) {
        $("input.quantity").attr("value", 1),
          alert(response.responseJSON.description);
      },
      complete: function () {
        this_obj.removeClass("adding");
      },
    });
  });
  function update_mini_cart() {
    $.get("/cart?view=mini-cart", function (data) {
      $("body")
        .find(".mini_cart_wrp")
        .html($(data).find(".mini_cart_wrp").html()),
        $("body")
          .find(".cart_item_count")
          .html($(data).find(".cart_item_count").html());
    }),
      window.scrollTo(0, 0),
      setTimeout(function () {
        $(".cart-wrp").addClass("cart_active"),
          $("body").addClass("overflow-hidden");
      }, 500);
  }
  $("body").on("click", ".remove_product", function (e) {
    var line_key = $(this).attr("data-key");
    $.ajax({
      type: "POST",
      url: "/cart/change.js",
      data: { id: line_key, quantity: 0 },
      dataType: "json",
      success: function (data) {
        $.get("/cart?view=mini-cart", function (data2) {
          $("body")
            .find(".mini_cart_wrp")
            .html($(data2).find(".mini_cart_wrp").html()),
            $("body")
              .find(".cart_item_count")
              .html($(data2).find(".cart_item_count").html());
        }),
          window.scrollTo(0, 0);
      },
      error: function (response) {
        alert(response.responseJSON.message);
      },
    });
  }),
    $("body").on("click", ".cart_refresh", function (e) {
      $(this).find("img").addClass("rotate"),
        $("body").find(".cart_section .container").css("opacity", "0.6");
      var line_item = $(this).closest(".cart_table_row "),
        line_key = line_item.data("id"),
        line_quantity = parseInt(line_item.find(".item_quantity").val());
      isNaN(line_quantity) && (console.log("nannn"), (line_quantity = 1)),
        $.ajax({
          type: "POST",
          url: "/cart/change.js",
          data: { id: line_key, quantity: line_quantity },
          dataType: "json",
          success: function (data) {
            console.log("successsssss"), update_main_cart();
          },
          error: function (response) {
            alert(response.responseJSON.message), update_main_cart();
          },
        });
    }),
    $("body").on("keydown", 'input[name="updates[]"]', function (e) {
      event.key == "Enter" &&
        (e.preventDefault(),
        $(this)
          .closest(".cart_table_quantity")
          .find(".cart_refresh")
          .trigger("click"));
    });
  function update_main_cart() {
    $.get("/cart", function (data) {
      $("body")
        .find(".cart_section .container")
        .html($(data).find(".cart_section .container").html()),
        $("body")
          .find(".cart_item_count")
          .html($(data).find(".cart_item_count").html()),
        $("body").find(".cart_section .container").css("opacity", "1");
    });
  }
  $("body").on("click", ".scroll_more", function () {
    var target = $(".product_grid:eq(0)");
    if (target.length)
      return (
        $("html,body").animate({ scrollTop: target.offset().top }, 100), !1
      );
  }),
    $(".search_input").on("change focus keyup", function () {
      $(this).val() !== ""
        ? $(this).closest("form").find(".empty_input").addClass("active")
        : $(this).closest("form").find(".empty_input").removeClass("active");
    });
  function clearSearch(obj) {
    obj
      .closest("predictive-search")
      .find("#predictive-search")
      .css("display", "none"),
      obj.closest("form").find("input[type=search]").val(""),
      obj.removeClass("active"),
      obj
        .closest("form")
        .find("input[type=search]")
        .attr("autofocus", "autofocus")
        .focus();
  }
  $("body").on("click", ".empty_input", function (event2) {
    var $this = $(this);
    setTimeout(function () {
      clearSearch($this);
    }, 400);
  }),
    $("body").on("click", ".search_icon.mobile", function () {
      $(".quick_search.active").length
        ? ($(".quick_search").remove("active"),
          $("body").removeClass("overflow-hidden"))
        : ($(".quick_search").addClass("active"),
          $("body").addClass("overflow-hidden"));
    });
  var interests = [];
  $("body").on("click", ".interest", function (e) {
    var interest = $(this).attr("data-value");
    $(this).hasClass("selected")
      ? ((interests = interests.filter(function (value) {
          return value !== interest;
        })),
        $(this).removeClass("selected"))
      : (interests.push(interest), $(this).addClass("selected")),
      interests.length
        ? $(".input_field_interest input").val(interests)
        : $(".input_field_interest input").val("");
  }),
    $("body").on("click", ".hd_menu .has_child_items", function () {
      $(this).hasClass("show_dropdown")
        ? ($(this).hasClass("root-childs")
            ? $(this).removeClass("show_dropdown")
            : $(".has_child_items.show_dropdown").removeClass("show_dropdown"),
          (($(this).next().find(".root-child-container").is(":visible") &&
            $(window).width() < 768) ||
            ($(this).next().is(":visible") && $(window).width() < 768)) &&
            $(".root-child-container").slideUp())
        : ($(".has_child_items.show_dropdown").length &&
            ($(this).closest("li").hasClass("dropdown") &&
            $(this).hasClass("root-childs")
              ? ($(".has_child_items.show_dropdown").addClass("show_dropdown"),
                $(window).width() < 768 && $(this).next().slideDown())
              : ($(".has_child_items.show_dropdown").removeClass(
                  "show_dropdown"
                ),
                $(window).width() < 768 &&
                  $(".root-child-container").slideUp())),
          $(this).addClass("show_dropdown"));
    });
  var menu = $(".hd_menu_wrp");
  $("body").click(function (event2) {
    var isMenuClick = $(event2.target).closest(menu).length > 0;
    !isMenuClick &&
      menu.find(".has_child_items.show_dropdown").length &&
      ($(window).width() < 768 && $(".root-child-container").slideUp(),
      menu.find(".has_child_items.show_dropdown").removeClass("show_dropdown"));
  });
  class LocalizationForm extends HTMLElement {
    constructor() {
      super(),
        (this.elements = {
          input: this.querySelector(
            'input[name="locale_code"], input[name="country_code"]'
          ),
        }),
        this.querySelectorAll("a").forEach((item) =>
          item.addEventListener("click", this.onItemClick.bind(this))
        );
    }
    onItemClick(event2) {
      event2.preventDefault();
      const form = this.querySelector("form");
      console.log("adad", event2.currentTarget),
        (this.elements.input.value = event2.currentTarget.dataset.value),
        console.log("1. Selected lang:" + event2.currentTarget.dataset.value),
        window.Shopify.loadFeatures(
          [{ name: "consent-tracking-api", version: "0.1" }],
          function (error) {
            if (error) throw error;
            window.Shopify.customerPrivacy.preferencesProcessingAllowed() &&
              setCookie(event2.currentTarget.dataset.value),
              form && form.submit();
          }
        );
    }
  }
  if (
    (customElements.define("localization-form", LocalizationForm),
    window.screen.width < 768)
  ) {
    $("body").on("click", ".language_wrp .dropdown_select", function () {
      $(this).closest(".dropdown_select_wrp").toggleClass("active"),
        console.log("1. Selected lang:" + this);
    });
    let lang = $(".language_wrp");
    $("body").click(function (event2) {
      !($(event2.target).closest(lang).length > 0) &&
        lang.find(".dropdown_select_wrp.active").length &&
        lang.find(".dropdown_select_wrp.active").removeClass("active");
    });
  }
  let sortbydrop = $(".filter-select");
  $("body").click(function (event2) {
    !($(event2.target).closest(sortbydrop).length > 0) &&
      sortbydrop.find(".custome_dropdown_select.open").length &&
      sortbydrop.find(".custome_dropdown_select.open").removeClass("open");
  }),
    $("body").on("click", ".predictive-btn", function (e) {
      e.preventDefault(),
        $(this).closest("predictive-search").find("form").submit();
    });
  function add_height_button() {
    let header_height = $("#shopify-section-header").height(),
      banner_height = $(".collection_banner").height(),
      total_height = header_height + banner_height;
    $(".collection_menu_icon").css("top", total_height + "px"),
      $(".collection_menu_icon").css("display", "flex");
  }
  $(".collection_menu_icon").length &&
    window.screen.width > 767 &&
    add_height_button();
}),
  $(".nice-select").each(function () {
    var select = $(this),
      name = select.attr("name");
    select.hide(), select.wrap('<div class="nice-select-wrap"></div>');
    var parent = select.parent(".nice-select-wrap");
    parent.append("<ul id=" + name + ' style="display:none"></ul>'),
      select.find("option").each(function () {
        var option = $(this),
          value = option.attr("value"),
          label = option.text();
        option.is(":first-child")
          ? $('<a href="#" class="drop">' + label + "</a>").insertBefore(
              parent.find("ul")
            )
          : parent
              .find("ul")
              .append(
                '<li><a href="#" id="' + value + '">' + label + "</a></li>"
              );
      }),
      parent.find("a").on("click", function (e) {
        parent.toggleClass("down").find("ul").slideToggle(300),
          e.preventDefault();
      }),
      parent.find("ul a").on("click", function (e) {
        var niceOption = $(this),
          value = niceOption.attr("id"),
          text = niceOption.text();
        select.val(value), parent.find(".drop").text(text), e.preventDefault();
      });
  });
//# sourceMappingURL=/cdn/shop/t/57/assets/custom.js.map?v=113571232516508714181743425110
