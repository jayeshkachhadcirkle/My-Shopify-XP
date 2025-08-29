let popper = document.getElementsByClassName("products-preview")[0],
  popDiv = document.getElementsByClassName("products-pop")[0],
  wishWrapper = document.getElementsByClassName("wishlister")[0],
  mediaPopper = document.getElementsByClassName("products-med-preview")[0],
  mediaPopDiv = document.getElementsByClassName("products-med-pop")[0],
  toggle_cart = document.getElementById("mini-cart"),
  cart_bt = document.getElementById("cart_bt"),
  cart_btn = document
    .getElementsByClassName("cart-btn")[0]
    .getElementsByTagName("img")[0],
  cart_close = document.getElementById("cart_colse_icon"),
  cart_overlay = document.querySelector("#cart_overlay");
document.addEventListener("click", function (e) {
  let targetElement = e.target;
  if (targetElement.parentElement.matches(".viewer-eye"))
    openProductPopUp(targetElement.parentElement);
  else if (targetElement.matches(".empty-cart-bt"))
    console.log("cart empty call"),
      fetch(window.Shopify.routes.root + "cart/clear")
        .then((response) => response.text())
        .then((data) => (updateCartDrawer(), data));
  else if (targetElement.matches(".pro-cart")) {
    let var_id = targetElement.getAttribute("variant"),
      template = document
        .getElementsByClassName("template-name-display")[0]
        .getAttribute("template");
    targetElement
      .closest(".product-widget")
      .getElementsByClassName("card-variant-id")[0].value = var_id;
    let formEl = targetElement.getElementsByTagName("form")[0];
    sendItemToCart(var_id, 1, formEl, ""),
      template != "cart"
        ? toggle_cart.classList.add("active")
        : console.log("Template Cart");
  } else if (targetElement.matches(".AddToCart")) {
    addToCartBtn(targetElement.parentElement);
    let wrap = targetElement.parentElement.parentElement.parentElement;
    toggle_cart.classList.add("active");
  } else if (targetElement.matches(".minus")) {
    console.log("minus doc");
    let qtyGet = parseInt(
      targetElement.parentElement.getElementsByClassName("item-quantity")[0]
        .value
    );
    qtyGet--,
      (qtyGet = qtyGet < 1 ? 1 : qtyGet),
      (targetElement.parentElement.getElementsByClassName(
        "item-quantity"
      )[0].value = qtyGet);
  } else if (targetElement.matches(".plus")) {
    let qtyGet = parseInt(
      targetElement.parentElement.getElementsByClassName("item-quantity")[0]
        .value
    );
    qtyGet++,
      (targetElement.parentElement.getElementsByClassName(
        "item-quantity"
      )[0].value = qtyGet);
  } else if (targetElement.matches(".cart-minus")) {
    e.preventDefault(), console.log("minus doc");
    let qtyGet = parseInt(
      targetElement.parentElement.getElementsByClassName("item-quantity")[0]
        .value
    );
    qtyGet--,
      (qtyGet = qtyGet < 1 ? 1 : qtyGet),
      (targetElement.parentElement.getElementsByClassName(
        "item-quantity"
      )[0].value = qtyGet);
    let var_id = targetElement.parentElement
        .getElementsByTagName("input")[0]
        .getAttribute("item-key"),
      erdiv = targetElement
        .closest(".cart-tble-row")
        .querySelector(".qty-error"),
      isInBundle = targetElement
        .closest(".cart-tble-row")
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundled"),
      bundleId = targetElement
        .closest(".cart-tble-row")
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundleId");
    isInBundle
      ? bundleQtyUpdate(bundleId, qtyGet, "cart-tble-row")
      : changeCartItemNew(var_id, qtyGet, erdiv),
      console.log(var_id);
  } else if (targetElement.matches(".cart-plus")) {
    e.preventDefault();
    let qtyGet = parseInt(
      targetElement.parentElement.getElementsByClassName("item-quantity")[0]
        .value
    );
    qtyGet++,
      (targetElement.parentElement.getElementsByClassName(
        "item-quantity"
      )[0].value = qtyGet);
    let var_id = targetElement.parentElement
        .getElementsByTagName("input")[0]
        .getAttribute("item-key"),
      erdiv = targetElement
        .closest(".cart-tble-row")
        .querySelector(".qty-error"),
      isInBundle = targetElement
        .closest(".cart-tble-row")
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundled"),
      bundleId = targetElement
        .closest(".cart-tble-row")
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundleId");
    isInBundle
      ? bundleQtyUpdate(bundleId, qtyGet, "cart-tble-row")
      : changeCartItemNew(var_id, qtyGet, erdiv);
  } else if (targetElement.matches(".item-remove-btn-main")) {
    e.preventDefault();
    let qtyGet = parseInt(
      targetElement.parentElement.parentElement.getElementsByClassName(
        "item-quantity"
      )[0].value
    );
    (qtyGet = 0),
      (targetElement.parentElement.parentElement.getElementsByClassName(
        "item-quantity"
      )[0].value = qtyGet);
    let var_id = targetElement.parentElement.parentElement
        .getElementsByTagName("input")[0]
        .getAttribute("item-key"),
      erdiv = targetElement
        .closest(".cart-tble-row")
        .querySelector(".qty-error"),
      isInBundle = targetElement
        .closest(".cart-tble-row")
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundled"),
      bundleId = targetElement
        .closest(".cart-tble-row")
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundleId");
    isInBundle
      ? bundleQtyUpdate(bundleId, qtyGet, "cart-tble-row")
      : (targetElement.parentElement.parentElement.parentElement.remove(),
        changeCartItemNew(var_id, qtyGet, erdiv));
  } else if (targetElement.matches(".dr-minus")) {
    e.preventDefault();
    let lineItem = targetElement.closest(".mini_cart_item"),
      qtyGet = parseInt(
        targetElement.parentElement.getElementsByClassName("item-quantity")[0]
          .value
      );
    qtyGet--,
      (qtyGet = qtyGet < 1 ? 1 : qtyGet),
      (targetElement.parentElement.getElementsByClassName(
        "item-quantity"
      )[0].value = qtyGet);
    let var_id = targetElement.parentElement
        .getElementsByTagName("input")[0]
        .getAttribute("item-key"),
      erdiv = lineItem.querySelector(".qty-error"),
      isInBundle = lineItem
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundled"),
      bundleId = lineItem
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundleId"),
      allRow = Array.from(document.getElementsByClassName("mini_cart_item"));
    isInBundle
      ? bundleQtyUpdate(bundleId, qtyGet, "mini_cart_item")
      : changeCartItemNew(var_id, qtyGet, erdiv),
      console.log(var_id);
  } else if (targetElement.matches(".dr-plus")) {
    e.preventDefault();
    let lineItem = targetElement.closest(".mini_cart_item"),
      qtyGet = parseInt(
        targetElement.parentElement.getElementsByClassName("item-quantity")[0]
          .value
      );
    qtyGet++,
      (targetElement.parentElement.getElementsByClassName(
        "item-quantity"
      )[0].value = qtyGet);
    let var_id = targetElement.parentElement
        .getElementsByTagName("input")[0]
        .getAttribute("item-key"),
      erdiv = lineItem.querySelector(".qty-error"),
      isInBundle = lineItem
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundled"),
      bundleId = lineItem
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundleId");
    isInBundle
      ? bundleQtyUpdate(bundleId, qtyGet, "mini_cart_item")
      : changeCartItemNew(var_id, qtyGet, erdiv);
  } else if (targetElement.matches(".item-remove-btn-dr")) {
    console.log("Delete Clicked"), e.preventDefault();
    let lineItem = targetElement.closest(".mini_cart_item"),
      qtyGet = parseInt(
        lineItem.getElementsByClassName("item-quantity")[0].value
      );
    (qtyGet = 0),
      (lineItem.getElementsByClassName("item-quantity")[0].value = qtyGet);
    let var_id = targetElement.parentElement.parentElement.parentElement
        .getElementsByTagName("input")[0]
        .getAttribute("item-key"),
      erdiv = lineItem.querySelector(".qty-error"),
      isInBundle = lineItem
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundled"),
      bundleId = lineItem
        .getElementsByClassName("qtyAdjust")[0]
        .getAttribute("bundleId"),
      allRow = Array.from(document.getElementsByClassName("mini_cart_item"));
    isInBundle
      ? bundleQtyUpdate(bundleId, qtyGet, "mini_cart_item")
      : ((targetElement.parentElement.closest(".mini_cart_item").style.display =
          "none"),
        changeCartItemNew(var_id, qtyGet, erdiv),
        setTimeout(function () {
          recommendationFetch();
        }, 200)),
      fetch("/cart.js")
        .then((cartRes) => cartRes.json())
        .then((data) => {
          updateCartStatus(data);
        });
  } else if (targetElement.parentElement.matches(".cart-btn"))
    toggle_cart.classList.add("active"),
      setTimeout(function () {
        console.log("reaching update Time"), updateCartDrawer();
      }, 100);
  else if (targetElement.matches(".cart_colse_icon"))
    toggle_cart.classList.remove("active");
  else if (targetElement.matches(".overlay"))
    toggle_cart.classList.remove("active");
  else if (targetElement.matches(".pro-pop-close"))
    popper.style.display = "none";
  else if (targetElement.matches(".products-med-preview"))
    mediaPopper.style.display = "none";
  else if (targetElement.matches(".pro-med-pop-close"))
    mediaPopper.style.display = "none";
  else if (targetElement.matches(".tilli")) {
    let allVars = Array.from(
        targetElement.parentElement.getElementsByClassName("tilli")
      ),
      proWidget = targetElement.closest(".product-widget");
    allVars.forEach(function (v) {
      v.style.border = "none";
    }),
      (targetElement.style.border = "1px solid black"),
      targetElement.parentElement.setAttribute("selected", targetElement.id);
    let allOption = Array.from(
        targetElement.parentElement.parentElement.getElementsByClassName(
          "option-parent"
        )
      ),
      jsonData = JSON.parse(
        proWidget.getElementsByClassName("card-var-json")[0].innerText
      );
    applyVariantCheck(proWidget, jsonData, ".option-parent", ".tilli");
    let title = "";
    allOption.forEach(function (o) {
      title = title + " / " + o.getAttribute("selected");
    });
    let title2 = title.replace(" / ", ""),
      selectedVariant = jsonData.filter(function (item) {
        return item.title == title2;
      })[0];
    console.log(selectedVariant);
    let proCart = proWidget.getElementsByClassName("pro-cart")[0];
    proWidget.getElementsByClassName("selected-pro")[0].checked = !1;
    let mainImage = targetElement
      .closest(".product-widget-top")
      .getElementsByClassName("product-media")[0]
      .getAttribute("first-image");
    selectedVariant != null
      ? ((proWidget.getElementsByClassName("var-price")[0].style.display =
          "block"),
        (proWidget.getElementsByClassName("var-price")[0].innerText =
          Shopify.formatMoney(selectedVariant.price) +
          " " +
          Shopify.currency.active),
        selectedVariant.featured_image != null
          ? proWidget
              .querySelector(".product-media img")
              .setAttribute("src", selectedVariant.featured_image.src)
          : proWidget
              .querySelector(".product-media img")
              .setAttribute("src", mainImage),
        selectedVariant.available
          ? ((proCart.style.display = "block"),
            proCart.removeAttribute("disabled"),
            proCart.setAttribute("available", "1"),
            proWidget.closest("#recommendor") &&
              (proWidget.getElementsByClassName(
                "selected-pro"
              )[0].style.display = "block"),
            proCart.setAttribute("variant", selectedVariant.id))
          : ((proCart.style.display = "none"),
            proCart.setAttribute("disabled", "disabled"),
            proCart.setAttribute("available", "0"),
            (proWidget.getElementsByClassName("selected-pro")[0].style.display =
              "none")))
      : ((proCart.style.display = "none"),
        proCart.setAttribute("disabled", "disabled"),
        proCart.setAttribute("available", "0"),
        (proWidget.getElementsByClassName("selected-pro")[0].style.display =
          "none"),
        (proWidget.getElementsByClassName("var-price")[0].style.display =
          "none"),
        console.log("Not Listed"));
  } else if (targetElement.matches("#reco_submit")) {
    let recoGrid = targetElement.closest(".buy-it-section"),
      pros = Array.from(recoGrid.getElementsByClassName("product-widget")),
      defaultBundle = recoGrid
        .getElementsByClassName("product-row")[0]
        .getAttribute("bundledpro"),
      bundleId = recoGrid
        .getElementsByClassName("product-row")[0]
        .getAttribute("bundleId");
    recoGrid
      .getElementsByClassName("product-row")[0]
      .setAttribute("bundleId", parseInt(bundleId) + 1);
    let products = [];
    pros.forEach(function (i, index) {
      let check = i.getElementsByClassName("selected-pro")[0],
        perId = i.getElementsByClassName("pro-cart")[0].getAttribute("variant");
      check.checked &&
      i.getElementsByClassName("pro-cart")[0].getAttribute("disabled") !=
        "disabled"
        ? (console.log(perId), products.unshift(perId))
        : console.log("Else Checked");
    });
    let items = [];
    products.forEach(function (i) {
      console.log(i);
      let obj = {
        quantity: 1,
        id: i,
        properties: {_isRecommended: !0, _bundleId: bundleId},
      };
      items.push(obj);
    }),
      console.log(items),
      addMultiplePros(items);
  } else if (targetElement.matches(".selected-pro")) {
    console.log("bundle slect", targetElement.checked);
    let recoGrid = targetElement.closest(".buy-it-section"),
      pros = Array.from(recoGrid.getElementsByClassName("product-widget")),
      setPrice = 0;
    pros.forEach(function (i, index) {
      let check = i.getElementsByClassName("selected-pro")[0],
        perId = i.getElementsByClassName("pro-cart")[0].getAttribute("variant"),
        availability = parseInt(
          i.getElementsByClassName("pro-cart")[0].getAttribute("available")
        ),
        buttonReco = document.getElementById("reco_submit"),
        price3 = i
          .getElementsByClassName("var-price")[0]
          .innerText.replace("$", "")
          .replace("USD", ""),
        priceClean = parseFloat(price3.trim());
      check.checked &&
        availability &&
        (console.log(perId, " price: ", priceClean),
        (setPrice += priceClean),
        console.log("Total : ", setPrice.toFixed(2)),
        (buttonReco.innerText = "BUY NOW @ " + setPrice.toFixed(2)));
    });
  } else console.log("click else");
});
function bundleQtyUpdate(bundleId, upQty, lineItemClass) {
  let allRow = Array.from(document.getElementsByClassName(lineItemClass)),
    ups = {};
  allRow.forEach(function (i) {
    console.log(i);
    let iBundleId = i
      .getElementsByClassName("qtyAdjust")[0]
      .getAttribute("bundleId");
    if (
      i.getElementsByClassName("qtyAdjust")[0].getAttribute("bundled") &&
      iBundleId == bundleId
    ) {
      let upKey = i
        .getElementsByClassName("item-quantity")[0]
        .getAttribute("item-key");
      (i.getElementsByClassName("item-quantity")[0].value = upQty),
        (ups[upKey] = parseInt(upQty)),
        upQty == 0 && (i.style.display = "none");
    }
  }),
    console.log(ups),
    callForUpdate(ups);
}
function addMultiplePros(Array2) {
  let formData = {items: Array2};
  fetch(window.Shopify.routes.root + "cart/add.js", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(formData),
  })
    .then(
      (response) => (
        cart_btn.click(),
        fetch("/cart.js")
          .then((cartRes) => cartRes.json())
          .then((data) => {
            updateCartStatus(data);
          }),
        response.json()
      )
    )
    .catch((error) => {
      console.error("Error:", error);
    });
}
$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    scroll >= 150
      ? $("header").addClass("head-sticky")
      : $("header").removeClass("head-sticky");
  }),
    $(".searchlink").click(function (e) {
      e.preventDefault(),
        $(".search-form").toggleClass("active"),
        $(".overlay-custome").toggleClass("active"),
        $("body,html").toggleClass("scrollno"),
        $(".search-form").toggle(),
        $("#textbox").focus();
    }),
    $(".overlay-custome").click(function (e) {
      e.preventDefault(),
        $(".search-form").removeClass("active"),
        $(".overlay-custome").removeClass("active"),
        $("body,html").removeClass("scrollno");
    }),
    $(".set > .set-title").on("click", function () {
      $(this).hasClass("active")
        ? ($(this).removeClass("active"),
          $(this).siblings(".content").slideUp(200))
        : ($(".set > .set-title").removeClass("active"),
          $(this).addClass("active"),
          $(".content").slideUp(200),
          $(this).siblings(".content").slideDown(200));
    }),
    $(".hamburger").click(function (k) {
      k.preventDefault(),
        $(this).toggleClass("is-active"),
        $(".mega-menu").toggleClass("is-open"),
        $("body,html").toggleClass("scrollno");
      var headerheight = $("header").height();
      $(".mega-menu ").css("top", headerheight),
        $(".mega-menu").css({height: `calc(100% - ${headerheight}px)`});
    }),
    $(".filter-btn").click(function () {
      $(".skin-filter").addClass("is-open"),
        $(".skin-filter-overlay").addClass("is-open");
    }),
    $(".skin-filter-overlay").click(function () {
      $(".skin-filter").removeClass("is-open"),
        $(".skin-filter-overlay").removeClass("is-open");
    }),
    $(".mega-menu-category-block ul li").click(function () {
      var tab_id = $(this).attr("data-tab");
      $(".mega-menu-category-block ul li").removeClass("current"),
        $(".mega-menu-tabs").removeClass("current"),
        $(this).addClass("current"),
        $("#" + tab_id).addClass("current");
    }),
    bestSellerSlider(),
    subscribeSlider(),
    productMediaSlider(),
    $(".mobile-menu").click(function (e) {
      e.preventDefault(),
        $(".mobile-menu-button").toggleClass("on"),
        $(".mobile-navbar").toggleClass("active"),
        $("header").toggleClass("menu-active"),
        $("body").toggleClass("no-scroll"),
        $(".overlay-custome").toggleClass("active");
    }),
    $(".close-menu").click(function (e) {
      e.preventDefault(),
        $(".mobile-menu-button").removeClass("on"),
        $(".mobile-navbar").removeClass("active"),
        $("header").removeClass("menu-active"),
        $("body").removeClass("no-scroll"),
        $("body,html").removeClass("scrollno"),
        $(".overlay-custome").removeClass("active");
    }),
    $(".overlay-custome").click(function (e) {
      e.preventDefault(),
        $(".mobile-menu-button").removeClass("on"),
        $(".mobile-navbar").removeClass("active"),
        $("header").removeClass("menu-active"),
        $("body").removeClass("no-scroll");
    }),
    $(".acnav__label").click(function () {
      var label = $(this),
        parent = label.parent(".has-children"),
        list = label.siblings(".acnav__list");
      parent.hasClass("is-open")
        ? (list.slideUp("fast"), parent.removeClass("is-open"))
        : (list.slideDown("fast"), parent.addClass("is-open"));
    });
}),
  $(window).on("load resize orientationchange", function () {
    $("footer").css("height", "auto");
    var e = $("footer").outerHeight();
    $("body").css("padding-bottom", e), $("footer").css("height", e);
  });
async function cartCallHtml() {
  return await (
    await fetch(window.Shopify.routes.root + "?section_id=cart-drawer")
  ).text();
}
async function updateCartDrawer() {
  let cartDom = await cartCallHtml(),
    pDoc = new DOMParser().parseFromString(cartDom, "text/html");
  (document.getElementById("mini-cart").innerHTML =
    pDoc.getElementById("mini-cart").innerHTML),
    setTimeout(function () {
      addComplementaryProduct();
    }, 200),
    performRecommendationsOnCart(),
    fetch("/cart.js")
      .then((cartRes) => cartRes.json())
      .then((data) => {
        updateCartStatus(data);
      }),
    Array.from(document.getElementsByClassName("free-shipping-limit")).forEach(
      function (i) {
        i.innerHTML = pDoc.getElementsByClassName(
          "free-shipping-limit"
        )[0].innerHTML;
      }
    ),
    document.getElementsByClassName("container-cart")[0] && replaceCartBody();
}
function updateMainCartTable() {
  let cartTable = document.getElementsByClassName("cart-tabl-body")[0];
  cartTable &&
    fetch("/cart")
      .then((res) => res.text())
      .then((data) => {
        let doc = new DOMParser().parseFromString(data, "text/html");
        console.log(doc),
          (cartTable.innerHTML =
            doc.getElementsByClassName("cart-tabl-body")[0].innerHTML);
      });
}
function replaceCartBody() {
  fetch(window.Shopify.routes.root + "cart")
    .then((res) => res.text())
    .then((data) => {
      let doc = new DOMParser().parseFromString(data, "text/html");
      (document.querySelector(".container-cart").innerHTML =
        doc.querySelector(".container-cart").innerHTML),
        (document.querySelector("#cart_bt").innerHTML =
          doc.querySelector("#cart_bt").innerHTML),
        performRecommendationsOnCart();
    });
}
function recommendationFetch() {
  const handleIntersection = (entries, observer2) => {
      if (!entries[0].isIntersecting) return;
      observer2.unobserve(productRecommendationsSection);
      const url = productRecommendationsSection.dataset.url;
      performRecommendationsOnCart();
    },
    productRecommendationsSection = document.querySelector(
      ".product-recommendations-carter"
    );
  new IntersectionObserver(handleIntersection, {
    rootMargin: "0px 0px 0px 0px",
  }).observe(productRecommendationsSection);
}
function performRecommendationsOnCart() {
  Array.from(document.getElementsByClassName("cart-reco-container")).forEach(
    function (recommendor) {
      let productRecommendationsSection = recommendor.querySelector(
        ".product-recommendations-carter"
      );
      if (recommendor.getAttribute("mode") == "lastadded") {
        let url = productRecommendationsSection.dataset.url;
        fetch(url)
          .then((response) => response.text())
          .then((text) => {
            let html = document.createElement("div");
            html.innerHTML = text;
            let recommendations = html.querySelector(
              ".product-recommendations-carter"
            );
            recommendations &&
              recommendations.innerHTML.trim().length &&
              (productRecommendationsSection.innerHTML =
                recommendations.innerHTML),
              parseInt(
                recommendor
                  .getElementsByClassName("cart-reco-container-row")[0]
                  .getAttribute("reco-count")
              ) > 3 &&
                setTimeout(function () {
                  newCartRecoSlider();
                }, 200);
          })
          .catch((e) => {
            console.error(e);
          });
      } else
        setTimeout(function () {
          newCartRecoSlider();
        }, 200);
    }
  );
}
async function deleteItem(varid) {
  let cartTable = document.querySelector(".cart-table-lft");
  cartTable.innerHTML = '<div id = "loading_indicator"> </div>';
  let cart = await cartChangeCall(varid, 0);
  console.log(cart);
  let docGet = new DOMParser(cart).parseFromString(cart, "text/html");
  return (
    console.log(docGet),
    (document.querySelector(".container-cart").innerHTML =
      docGet.querySelector(".container-cart").innerHTML),
    (document.querySelector("#cart_bt").innerHTML =
      docGet.querySelector("#cart_bt").innerHTML),
    setEventListners(),
    fetch("/cart.js")
      .then((response) => response.json())
      .then((data) => {
        updateCartStatus(data);
      }),
    updateCartDrawer()
  );
}
async function cartChangeCall(id, qty) {
  return await (
    await fetch("/cart/change.js", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id, quantity: parseInt(qty)}),
    })
  ).json();
}
async function changeCartItemNew(varId, newQty, errorDiv) {
  let data = await cartChangeCall(varId, newQty);
  console.log(data),
    data.message
      ? ((errorDiv.innerText = data.message),
        console.log("Error On Change: ", data.message))
      : updateCartStatus(data),
    data.item_count == 0 && updateCartDrawer(),
    newQty == 0 && addComplementaryProduct();
}
async function setPredictiveSearch(term, limit, scope) {
  const url =
    "/search/suggest?q=" +
    term +
    "&section_id=predictive-search&resources[limit]=" +
    limit +
    "&resources[limit_scope]=" +
    scope;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const data = await response.text();
    let doc = new DOMParser().parseFromString(data, "text/html");
    return (
      (document.getElementsByClassName("mini-search")[0].innerHTML =
        doc.getElementById("predictive-search-results").innerHTML),
      (document.getElementsByClassName("mini-search")[0].style.display =
        "block"),
      !0
    );
  } catch (error) {
    console.error(error.message);
  }
}
let timer;
const searchInput = document.querySelector(".search__input");
searchInput.addEventListener("input", function (event2) {
  if (
    ((document.getElementsByClassName("mini-search")[0].innerHTML = ""),
    event2.target.value.trim().length > 0)
  ) {
    let searchPopup = (document.getElementsByClassName(
      "mini-search"
    )[0].style.display = "block");
    clearTimeout(timer);
    let limit = parseInt(
        document.getElementById("limiter").getAttribute("limit")
      ),
      limit_scope = document.getElementById("limiter").getAttribute("scope");
    timer = setTimeout(function () {
      setPredictiveSearch(event2.target.value, limit, limit_scope);
    }, 700);
  } else {
    let searchPopup = (document.getElementsByClassName(
      "mini-search"
    )[0].style.display = "none");
  }
});
const mobile_search = document.getElementsByClassName("search-mobile")[0];
let timer2;
mobile_search.addEventListener("input", function (event2) {
  if (
    ((document.getElementsByClassName("mini-search")[0].innerHTML = ""),
    event2.target.value.trim().length > 0)
  ) {
    let searchPopup = (document.getElementsByClassName(
      "mini-search"
    )[0].style.display = "block");
    clearTimeout(timer2);
    let limit = parseInt(
        document.getElementById("limiter").getAttribute("limit")
      ),
      limit_scope = document.getElementById("limiter").getAttribute("scope");
    timer2 = setTimeout(function () {
      let isDone = setPredictiveSearch(event2.target.value, limit, limit_scope),
        runner = setInterval(function () {
          if (isDone) {
            let overlay = document.getElementsByClassName("overlay-custome")[0];
            overlay.innerHTML = "";
            let mini =
                document.getElementsByClassName("mini-search")[0].innerHTML,
              mini_insert = document.createElement("div");
            (mini_insert.innerHTML = mini),
              overlay.appendChild(mini_insert),
              clearInterval(runner);
          }
        }, 500);
    }, 700);
  } else {
    let searchPopup = (document.getElementsByClassName(
      "mini-search"
    )[0].style.display = "none");
  }
});
function addToCartBtn(btn) {
  let wrap = btn.parentElement.parentElement.parentElement.parentElement,
    id = wrap
      .getElementsByClassName("qtyAdjust")[0]
      .getElementsByClassName("item-quantity")[0]
      .getAttribute("id"),
    qty = wrap
      .getElementsByClassName("qtyAdjust")[0]
      .getElementsByClassName("item-quantity")[0].value,
    form = wrap.getElementsByClassName("shopify-product-form")[0],
    errDiv = wrap.getElementsByClassName("qty-error-pdp")[0];
  sendItemToCart(id, qty, form, errDiv);
}
async function addToCartCall(formData) {
  return await (
    await fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      body: formData,
    })
  ).json();
}
async function sendItemToCart(var_id, quantity, formElement, errDiv) {
  if ((event.preventDefault(), formElement.reportValidity())) {
    let formDataAdd = new FormData(formElement);
    console.log(formDataAdd);
    let data = await addToCartCall(formDataAdd);
    updateCartDrawer(),
      fetch("/cart.js")
        .then((response) => response.json())
        .then((dataCart) => {
          updateCartStatus(dataCart);
        }),
      data.message
        ? ((errDiv.innerText = data.message), cart_close.click())
        : formElement.reset();
  } else {
    for (let element of formElement.elements)
      element.validationMessage &&
        ((element.style.border = "1px solid red"),
        console.log(`${element.name} error: ${element.validationMessage}`));
    toggle_cart.classList.remove("active");
  }
}
async function updateCartStatus(cartJSON) {
  let count = parseInt(cartJSON.item_count);
  if (count == 0) {
    let cartDom = await cartCallHtml(),
      pDoc = new DOMParser().parseFromString(cartDom, "text/html");
    document.getElementById("mini-cart").innerHTML =
      pDoc.getElementById("mini-cart").innerHTML;
  }
  let totalPrice = parseInt(cartJSON.total_price),
    countElement = document.getElementById("cart-count");
  countElement &&
    (count > 0
      ? ((countElement.innerText = count),
        (countElement.style.display = "block"))
      : ((countElement.innerText = count),
        (countElement.style.display = "none"))),
    document.getElementById("cart-items") &&
      (document.getElementById("cart-items").innerText = count + " Items"),
    document.getElementById("cart-subtotal") &&
      (document.getElementById("cart-subtotal").innerText = Shopify.formatMoney(
        cartJSON.items_subtotal_price
      )),
    document.getElementById("total-price") &&
      (document.getElementById("total-price").innerText = Shopify.formatMoney(
        cartJSON.total_price
      )),
    document.getElementById("original-total-cart") &&
      (document.getElementById("original-total-cart").innerText =
        Shopify.formatMoney(cartJSON.original_total_price)),
    document.getElementById("cart-subtotal-dr") &&
      (document.getElementById("cart-subtotal-dr").innerText =
        Shopify.formatMoney(cartJSON.items_subtotal_price));
}
function openProductPopUp(eye) {
  let handle = eye.getAttribute("pro-handle");
  fetch("/products/" + handle)
    .then((response) => response.text())
    .then((data) => {
      let doc = new DOMParser().parseFromString(data, "text/html");
      (popDiv.innerHTML = ""), (popper.style.display = "flex");
      let section = document.createElement("section");
      section.classList.add("product-info-sec"),
        section.classList.add("pt-50"),
        (section.innerHTML =
          doc.getElementsByClassName("product-info-sec")[0].innerHTML),
        popDiv.appendChild(section),
        (popDiv.innerHTML += '<span class="pro-pop-close"> X </span>'),
        manualVariantListeners(),
        productMediaSlider();
    });
}
function variantPerform(wrap) {
  setTimeout(function () {
    let secId = wrap.getAttribute("section"),
      options = parseInt(
        wrap
          .getElementsByClassName("option-size")[0]
          .getAttribute("option-size")
      ),
      varriantSelected,
      formData = new FormData(
        wrap.getElementsByClassName("shopify-product-form")[0]
      ),
      data = {},
      proVarsData = JSON.parse(
        wrap.getElementsByClassName("product-json")[0].innerText
      );
    applyVariantCheck(wrap, proVarsData, ".radio_container", ".color_radio"),
      formData.forEach((value, key) => {
        data[key] = value;
      });
    let option2Data = proVarsData
      .filter(function (item) {
        return item.option1 == data[`${secId}-Option1`];
      })
      .filter(function (item) {
        return item.option2 == data[`${secId}-Option2`];
      });
    options == 1 && (varriantSelected = data[`${secId}-Option1`]),
      options == 2 &&
        (varriantSelected =
          data[`${secId}-Option1`] + " / " + data[`${secId}-Option2`]),
      options == 3 &&
        (varriantSelected =
          data[`${secId}-Option1`] +
          " / " +
          data[`${secId}-Option2`] +
          " / " +
          data[`${secId}-Option3`]);
    let selectedVarObj = proVarsData.filter(function (item) {
      return item.title == varriantSelected;
    });
    if (selectedVarObj.length == 1) {
      let varQTY = JSON.parse(
        wrap.getElementsByClassName("variants-json")[0].innerText
      ).filter(function (item) {
        return item.id == selectedVarObj[0].id;
      });
      (wrap.getElementsByClassName("form-var-id")[0].value =
        selectedVarObj[0].id),
        varQTY[0].available == "true"
          ? varQTY[0].qty != "0"
            ? (wrap.getElementsByClassName("available-qty")[0].innerText =
                "Available Qty: (" + varQTY[0].qty + ")")
            : (wrap.getElementsByClassName("available-qty")[0].innerText =
                "In Stock")
          : (wrap.getElementsByClassName("available-qty")[0].innerText =
              "Out Of Stock!"),
        (wrap.getElementsByClassName("pro-name")[0].innerText =
          selectedVarObj[0].name),
        (wrap.getElementsByClassName("variant-price")[0].innerText = (
          parseInt(selectedVarObj[0].price) / 100
        ).toFixed(2)),
        (wrap.getElementsByClassName("price-div")[0].style.display = "block"),
        selectedVarObj[0].available
          ? ((wrap
              .getElementsByClassName("AddToCart")[0]
              .getElementsByTagName("span")[0].innerText = "ADD TO CART"),
            (wrap.getElementsByClassName("AddToCart")[0].disabled = !1),
            window.history.replaceState(
              {},
              `${selectedVarObj[0].name}`,
              `${window.location.pathname}?variant=${selectedVarObj[0].id}`
            ))
          : ((wrap
              .getElementsByClassName("AddToCart")[0]
              .getElementsByTagName("span")[0].innerText = "Sold Out"),
            (wrap.getElementsByClassName("AddToCart")[0].disabled = !0),
            window.history.replaceState(
              {},
              `${selectedVarObj[0].name}`,
              `${window.location.pathname}?variant=${selectedVarObj[0].id}`
            ));
      try {
        wrap
          .querySelector(".prod-img a")
          .setAttribute("href", selectedVarObj[0].featured_image.src),
          wrap
            .querySelector(".prod-img a img")
            .setAttribute("src", selectedVarObj[0].featured_image.src);
      } catch {}
    } else (wrap.getElementsByClassName("pro-name")[0].innerText = wrap.dataset.title), (wrap.getElementsByClassName("price-div")[0].style.display = "none"), (wrap.getElementsByClassName("AddToCart")[0].getElementsByTagName("span")[0].innerText = "Unavailable"), (wrap.getElementsByClassName("AddToCart")[0].disabled = !0);
  }, 100);
}
function manualVariantListeners() {
  Array.from(document.getElementsByClassName("product-info-wrap")).forEach(
    function (wrap, index) {
      let vardata = JSON.parse(
        wrap.getElementsByClassName("product-json")[0].innerText
      );
      applyVariantCheck(wrap, vardata, ".radio_container", ".color_radio"),
        Array.from(wrap.getElementsByClassName("var-input-radio")).forEach(
          function (inp) {
            inp.addEventListener("change", function (e) {
              variantPerform(wrap),
                e.target
                  .closest(".radio_container")
                  .setAttribute("selected", e.target.closest("input").value),
                e.target.parentElement
                  .querySelectorAll("input")
                  .forEach(function (i) {
                    i.removeAttribute("checked");
                  }),
                e.target.closest("input").setAttribute("checked", "checked");
            });
          }
        ),
        Array.from(wrap.getElementsByClassName("option_select")).forEach(
          function (inp) {
            inp.addEventListener("change", function (e) {
              variantPerform(wrap);
            });
          }
        );
    }
  );
}
manualVariantListeners();
function applyVariantCheck(element, Data, opParent, op) {
  let optionParents = element.querySelectorAll(opParent),
    opSelected = [],
    dataFiltered = [];
  (dataFiltered[0] = Data),
    optionParents.forEach(function (parent, index) {
      (opSelected[index] = parent.getAttribute("selected")),
        (dataFiltered[index + 1] = dataFiltered[index].filter(function (i) {
          return i[`option${index + 1}`] == opSelected[index];
        }));
    }),
    optionParents.forEach(function (parent, index) {
      parent.querySelectorAll(op).forEach(function (cell) {
        let opGot = cell.dataset.variant;
        dataFiltered[index]
          .filter(function (v) {
            return v[`option${index + 1}`] == opGot;
          })
          .filter(function (av) {
            return av.available == !0;
          }).length
          ? cell.classList.remove("variant-disabled")
          : cell.classList.add("variant-disabled");
      });
    });
}
function applyFilter(query) {
  let sortBy = document.getElementById("SortBy").value,
    url = window.location.pathname + query;
  setTimeout(function () {
    window.history.replaceState(
      {},
      "Filter",
      `${window.location.pathname}${query}`
    ),
      fetch(url)
        .then((response) => response.text())
        .then((data) => {
          let doc = new DOMParser().parseFromString(data, "text/html");
          console.log(doc),
            document.getElementsByClassName("AjaxinateContainer")[0] &&
              document
                .getElementsByClassName("AjaxinateContainer")[0]
                .setAttribute("hasmore", 1),
            (document.getElementsByClassName("pro-grid-wrapper")[0].innerHTML =
              doc.getElementsByClassName("pro-grid-wrapper")[0].innerHTML),
            (document.getElementsByClassName(
              "product-count__text"
            )[0].innerHTML = doc.getElementsByClassName(
              "product-count__text"
            )[0].innerHTML),
            (document.getElementsByClassName("active-facets")[0].innerHTML =
              doc.getElementsByClassName("active-facets")[0].innerHTML);
          try {
            document.getElementsByClassName("AjaxinateContainer")[0].innerHTML =
              doc.getElementsByClassName("AjaxinateContainer")[0].innerHTML;
          } catch {
            console.log("Got Catch ajaxi 1");
          }
          try {
            document.getElementsByClassName(
              "AjaxinatePagination"
            )[0].innerHTML = doc.getElementsByClassName(
              "AjaxinatePagination"
            )[0].innerHTML;
          } catch {
            console.log("Got Catch ajaxi 2");
          }
          try {
            document.getElementsByClassName("pagination-wrapper")[0].innerHTML =
              doc.getElementsByClassName("pagination-wrapper")[0].innerHTML;
          } catch {
            console.log("Got Catch pagi");
            try {
              document.getElementsByClassName(
                "pagination-wrapper"
              )[0].innerHTML = "";
            } catch {}
          }
        });
  }, 100);
}
function callForUpdate(updates) {
  fetch(window.Shopify.routes.root + "cart/update.js", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({updates}),
  })
    .then((response) => response.json())
    .then(
      (data) => (
        console.log(data),
        updateCartStatus(data),
        data.item_count == 0 && replaceCartBody(),
        data
      )
    )
    .catch((error) => {
      console.error("Error:", error);
    });
}
async function addComplementaryProduct() {
  if (document.querySelector("#cart_bt").getAttribute("offer") == "true") {
    let oCollection = document
        .querySelector("#cart_bt")
        .getAttribute("offer-collection"),
      oProduct = document
        .querySelector("#cart_bt")
        .getAttribute("offer-product-id"),
      colString = "",
      inCartVars = new Set();
    document.querySelectorAll(".mini_cart_item").forEach(function (i) {
      let eachCollection = i.getAttribute("collection");
      (colString += eachCollection),
        inCartVars.add(
          i.querySelector(".qtyAdjust input").getAttribute("variant")
        );
    });
    let uniqueCols = new Set();
    if (
      (colString.split(",").forEach(function (c) {
        uniqueCols.add(c);
      }),
      uniqueCols.has(oCollection))
    ) {
      if (!inCartVars.has(oProduct)) {
        let myData = {id: oProduct, quantity: 1},
          formData = new FormData();
        for (let key in myData) formData.append(key, myData[key]);
        let data = await addToCartCall(formData);
        updateCartDrawer(),
          fetch("/cart.js")
            .then((response2) => response2.json())
            .then((dataCart) => {
              updateCartStatus(dataCart);
            });
      }
    } else
      inCartVars.has(oProduct) &&
        (await cartChangeCall(oProduct, 0),
        updateCartDrawer(),
        updateMainCartTable());
  }
}
class MyVarSwatcher extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    let wid = this.closest(".product-widget"),
      data = JSON.parse(wid.querySelector(".card-var-json").innerText);
    applyVariantCheck(wid, data, ".option-parent", ".tilli");
  }
}
customElements.define("my-ops", MyVarSwatcher);
