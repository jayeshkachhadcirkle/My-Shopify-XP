function setCartListners() {
  let cart_bt = document.getElementById("cart_bt");
  let toggle_cart = document.getElementById("mini-cart");
  let cart_close = document.getElementById("cart_colse_icon");
  let cart_overlay = document.querySelector("#cart_overlay");

  cart_bt.addEventListener("click", function () {
    console.log("cart Clicked");
    toggle_cart.classList.add("active");
    updateCartDrawer();
    // setEventListnersDrawer();
  });
  cart_close.onclick = () => {
    console.log("cart Closed");
    toggle_cart.classList.remove("active");
  };
  cart_overlay.onclick = () => {
    console.log("cart overlayed");
    toggle_cart.classList.remove("active");
  };
  let allProCards = Array.from(document.querySelectorAll(".product-card-jk"));
  allProCards.forEach(function (pro) {
    pro.addEventListener("click", function (e) {
      pushToRecent(pro.innerHTML);
      // console.log(pro.getAttribute('handle'));
    });
  });
}

setCartListners();

function updateCartDrawer() {
  let pDoc;
  const parser = new DOMParser();
  fetch(window.Shopify.routes.root + "?sections=cart-drawer")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      pDoc = parser.parseFromString(data["cart-drawer"], "text/html");
      // console.log(pDoc.getElementById('mini-cart'));
      document.getElementById("mini-cart").innerHTML = "";
      document.getElementById("mini-cart").innerHTML =
        pDoc.getElementById("mini-cart").innerHTML;
      setCartListners();
      setEventListnersDrawer();
    });
}

function setEventListnersDrawer() {
  let allPlus = document.querySelectorAll(".plus-dr");
  allPlus.forEach(function (plus) {
    // console.log(plus)
    plus.addEventListener("click", function (e) {
      e.preventDefault();
      // console.log("fsdgd")
      let currentQty =
        plus.parentElement.getElementsByTagName("input")[0].value;
      currentQty++;
      plus.parentElement.getElementsByTagName("input")[0].value = currentQty;
      let var_id = plus.parentElement
        .getElementsByTagName("input")[0]
        .getAttribute("variant");
      let erdiv =
        plus.parentElement.parentElement.parentElement.querySelector(
          ".qty-error"
        );
      changeCartDrawerItem(var_id, currentQty, erdiv);
    });
  });

  let allMinus = document.querySelectorAll(".minus-dr");
  allMinus.forEach(function (minus) {
    minus.addEventListener("click", function (e) {
      e.preventDefault();
      let currentQty =
        minus.parentElement.getElementsByTagName("input")[0].value;
      currentQty--;
      currentQty = currentQty < 1 ? 1 : currentQty;
      minus.parentElement.getElementsByTagName("input")[0].value = currentQty;
      let var_id = minus.parentElement
        .getElementsByTagName("input")[0]
        .getAttribute("variant");
      let erdiv =
        minus.parentElement.parentElement.parentElement.querySelector(
          ".qty-error"
        );
      changeCartDrawerItem(var_id, currentQty, erdiv);
    });
  });

  let allDels = document.querySelectorAll(".item-remove-btn-dr");
  allDels.forEach(function (del) {
    del.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("del");
      // del.parentElement.parentElement.querySelector('.get-qty-dr').value = 0;
      let var_id = del.parentElement.parentElement.parentElement
        .querySelector(".get-qty-dr")
        .getAttribute("variant");
      let erdiv =
        del.parentElement.parentElement.parentElement.parentElement.querySelector(
          ".qty-error"
        );
      let delDone = changeCartDrawerItem(var_id, 0, erdiv);
      // Updating Cart Body Elemet
    });
  });

  document.querySelectorAll(".get-qty-dr").forEach(function (e) {
    e.addEventListener("click", function (event) {
      event.preventDefault();
      console.log("reach 335");
    });
  });
}

function changeCartDrawerItem(varId, newQty, errorDiv) {
  console.log(varId);
  fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: varId,
      quantity: newQty * 1,
    }),
  })
    .then((response) => response.json())
    .then((cart) => {
      let data = cart;
      console.log(data);
      if (data["message"]) {
        errorDiv.innerText = data["message"];
      } else if (data["item_count"] == 0) {
        updateCartDrawer();
      } else {
        document.getElementById("cart-count").innerText = data["item_count"];
        document.getElementById("cart-subtotal-dr").innerText =
          Shopify.formatMoney(data["items_subtotal_price"]);
        // document.getElementById('total-price').innerText = Shopify.formatMoney(data['total_price']);
        // document.getElementById('original-total').innerText = Shopify.formatMoney(data['original_total_price']);
        if (newQty == 0) {
          updateCartDrawer();
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function sendToCartSingle(varId) {
  let formData = {
    items: [
      {
        id: varId * 1,
        quantity: 1,
      },
    ],
  };
  fetch(window.Shopify.routes.root + "cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let countElement = document.getElementById("cart-count");
      if (countElement) {
        let cartQty = countElement.innerText * 1;
        cartQty++;
        countElement.innerText = cartQty;
        cart_bt.click();
        updateCartDrawer();
      } else {
        let counter = document.createElement("span");
        counter.classList.add("count");
        counter.id = "cart-count";
        counter.innerText = 1;
        document.getElementsByClassName("cart-btn")[0].appendChild(counter);
        cart_bt.click();
        updateCartDrawer();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function pushToRecent(handle) {
  let x = localStorage.getItem("recents");
  if (x == null) {
    let recents = [];
    recents.push(handle);
    localStorage.setItem("recents", recents);
  } else {
    let y = localStorage.getItem("recents").split(",");
    let z = new Set(y);
    let refinedRecents = [];
    z.forEach(function (e) {
      refinedRecents.push(e);
    });
    refinedRecents.push(handle);
    localStorage.setItem("recents", refinedRecents);
  }
}

// ==============================================

document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("/products/")) {
    const productHandle = window.location.pathname.split("/products/")[1];
    let recentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    if (!recentlyViewed.includes(productHandle)) {
      recentlyViewed.push(productHandle);
      // if (recentlyViewed.length > 5) {
      //     recentlyViewed.shift();
      // }
      localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }
  }
});

let vids = document.querySelectorAll(".m3u8player");
vids.forEach(function (vid) {
  var player = videojs(vid);
  player.play();
});

const addBtn = document.getElementById("addToCart");
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let id = document
    .querySelector(".qtyAdjust")
    .querySelector(".item-quantity")
    .getAttribute("id");
  let qty = document
    .querySelector(".qtyAdjust")
    .querySelector(".item-quantity").value;

  // sendItemToCart(id, qty);
});

// ===================  send to cart Using FormData =========================
function sendItemToCart(var_id, quantity) {
  let form = document.getElementById("main_product_form");
  let realFormData = new FormData(form);
  fetch(window.Shopify.routes.root + "cart/add.js", {
    method: "POST",
    body: realFormData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data["message"]) {
        document.querySelector(".qty-error").innerText = data["message"];
        cart_close.click();
      } else {
        let countElement = document.getElementById("cart-count");
        if (countElement) {
          let cartQty = countElement.innerText * 1;
          cartQty = cartQty + parseInt(quantity);
          countElement.innerText = cartQty;
          document.querySelector(".qtyAdjust").querySelector("input").value = 1;
          cart_bt.click();
          updateCartDrawer();
        } else {
          let counter = document.createElement("span");
          counter.classList.add("count");
          counter.id = "cart-count";
          counter.innerText = quantity;
          document.getElementsByClassName("cart-btn")[0].appendChild(counter);
          document.querySelector(".qtyAdjust").querySelector("input").value = 1;
          cart_bt.click();
          updateCartDrawer();
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// ===================  search =========================
fetch(window.Shopify.routes.root + "search/suggest.json?q=klair")
  .then((response) => response.json())
  .then((suggestions) => {
    const productSuggestions = suggestions.resources.results.products;
    console.log(suggestions.resources);
  });

fetch(
  window.Shopify.routes.root +
  "search/suggest.json?q=a&resources[limit_scope]=each"
)
  .then((response) => response.json())
  .then((suggestions) => {
    const productSuggestions = suggestions.resources.results.products;
    console.log(suggestions.resources);
  });

// ===================  sort collection products =========================

//jayesh-cirkle.myshopify.com/collections/monitors?sort_by=price-ascending

https: fetch(
  "https://jayesh-cirkle.myshopify.com/collections/monitors?sort_by=price-ascending"
)
  .then((response) => response.text())
  .then((data) => {
    console.log(data);
  });

// note:
// 1. predictive search througth section render only single section ok
// 2. blank conditions in predictive search and Main  ok
// 3. 404 template ok
// 4. Mega Menu with blocks felxible
// 5. customisation seperation using header type

// =======================================================

fetch(
  window.Shopify.routes.root +
  "products/shoes?section=main-product&variant=46342463029386"
)
  .then((res) => res.text())
  .then((data) => {
    let doc = new DOMParser().parseFromString(data, "text/html");
    console.log(doc);
    document.getElementsByClassName("product-info-wrap")[0].innerHTML =
      doc.getElementsByClassName("product-info-wrap")[0].innerHTML;
  });

// ==================================================

let allData = [];
Array.from(document.getElementsByClassName("var-div")).forEach(function (v) {
  let id = v.getElementsByClassName("var-id")[0].innerText;
  let title = v.getElementsByClassName("var-title")[0].innerText;

  let varObj = {
    id: id,
    title: title,
  };

  allData.push(varObj);
});

// task
// = variant not available management
// = manage title price availability on variant bases
// = use section id for unique in form and input
// = use input instead of label for change event

// product info wrap section using handle
Array.from(document.getElementsByClassName("pro-like")).forEach(function (p) {
  p.addEventListener("click", function (e) {
    let handle = p.getAttribute("pro-handle");
    fetch("/products/" + handle + "?section-id=main-product")
      .then((response) => response.text())
      .then((data) => {
        let doc = new DOMParser().parseFromString(data, "text/html");
        console.log(
          doc
            .getElementsByClassName("product-info-sec")[0]
            .getElementsByClassName("product-info-wrap")[0]
        );
      });

    e.preventDefault();
  });
});

function setVariantListeners() {
  Array.from(document.getElementsByClassName("")).forEach(function (item) {
    item.addEventListener("change", function () {
      updateVariation();
    });
  });

  Array.from(document.getElementsByClassName("option_select")).forEach(
    function (item) {
      item.addEventListener("change", function () {
        updateVariation();
      });
    }
  );
}

function updateVariation() {
  setTimeout(function () {
    let wrap = document.getElementsByClassName("product-info-wrap")[0];
    let secId = wrap.getAttribute("section");
    let data = createForm();
    if (options == 1) {
      varriantSelected = data[`${secId}-Option1`];
    }
    if (options == 2) {
      varriantSelected =
        data[`${secId}-Option1`] + " / " + data[`${secId}-Option2`];
    }
    if (options == 3) {
      varriantSelected =
        data[`${secId}-Option1`] +
        " / " +
        data[`${secId}-Option2`] +
        " / " +
        data[`${secId}-Option3`];
    }
    let selectedVarObj = allVarData.filter(function (item) {
      return item.title == varriantSelected;
    });
    // console.log(selectedVarObj)
    if (selectedVarObj.length == 1) {
      wrap.getElementsByClassName("form-var-id")[0].value =
        selectedVarObj[0]["id"];
      wrap.getElementsByClassName("pro-name")[0].innerText =
        selectedVarObj[0]["name"];
      wrap.getElementsByClassName("variant-price")[0].innerText = (
        parseInt(selectedVarObj[0]["price"]) / 100
      ).toFixed(2);
      wrap.getElementsByClassName("price-div")[0].style.display = "block";
      if (selectedVarObj[0]["available"]) {
        wrap
          .getElementById(`${secId}-addToCart`)
          .getElementsByTagName("span")[0].innerText = "ADD TO CART";
        wrap.getElementById(`${secId}-addToCart`).disabled = false;
        window.history.replaceState(
          {},
          `${selectedVarObj[0]["name"]}`,
          `${window.location.pathname}?variant=${selectedVarObj[0]["id"]}`
        );
      } else {
        wrap
          .getElementById(`${secId}-addToCart`)
          .getElementsByTagName("span")[0].innerText = "Sold Out";
        wrap.getElementById(`${secId}-addToCart`).disabled = true;
        window.history.replaceState(
          {},
          `${selectedVarObj[0]["name"]}`,
          `${window.location.pathname}?variant=${selectedVarObj[0]["id"]}`
        );
      }
      try {
        wrap.getElementsByClassName(
          "prod-img"
        )[0].innerHTML = `<img src="${selectedVarObj[0]["featured_image"]["src"]}" alt="${selectedVarObj[0]["name"]}">`;
      } catch {
        // console.log('Image Not Available')
      }
    } else {
      wrap.getElementsByClassName("pro-name")[0].innerText = wrap
        .getElementsByClassName("pro-name")[0]
        .innerText.split("-")[0];
      wrap.getElementsByClassName("price-div")[0].style.display = "none";
      wrap
        .getElementById(`${secId}-addToCart`)
        .getElementsByTagName("span")[0].innerText = "Unavailable";
      wrap.getElementById(`${secId}-addToCart`).disabled = true;
    }
  }, 100);
}

// ============================ Cart drawer Recommendation ===============================

fetch(
  window.Shopify.routes.root +
  "recommendations/products.json?product_id=8544341524618&intent=related"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

let localId = localStorage.getItem("cartRecosId").split(",");
let pID = localId[0];
fetch(
  window.Shopify.routes.root +
  "recommendations/products.json?product_id=" +
  pID +
  "&intent=related"
)
  .then((res) => res.json())
  .then((data) => {
    data["products"].forEach(function (pro) {
      // console.log(pro['handle'])

      let prosInCart = localStorage.getItem("cartRecosHandle");
      if (prosInCart.includes(pro["handle"])) {
        console.log("Match Found");
      } else {
        fetch(
          window.Shopify.routes.root +
          "products/" +
          pro["handle"] +
          "?view=card2"
        )
          .then((res) => res.text())
          .then((data) => {
            let doc = new DOMParser().parseFromString(data, "text/html");
            console.log(doc);

          });
      }
    });
  });

fetch(window.Shopify.routes.root + "products/shoes?view=card2")
  .then((res) => res.text())
  .then((data) => {
    let doc = new DOMParser().parseFromString(data, "text/html");
    console.log(doc);

    let createCard = document.createElement("div");
    createCard.classList.add("product-widget");
    createCard.classList.add("best-seller-itm");
    createCard.classList.add("product-card-jk");
    createCard.setAttribute("handle", "shoes");

    createCard.innerHTML =
      doc.getElementsByClassName("product-widget")[0].innerHTML;

    document
      .getElementsByClassName("cart-reco-container-row")[0]
      .appendChild(createCard);
  });

Array.from(
  document
    .getElementsByClassName("cart-reco-container")[0]
    .getElementsByClassName("product-widget-inner")
).forEach(function (wid) {
  wid.getElementsByClassName("pro-colors")[0].style.display = "none";
  wid.getElementsByClassName("pro-title")[0].style.display = "none";
});

let pro_handle_cart = document
  .querySelector(".prod-content-wrp")
  .getAttribute("handle");

function passToCartReco(pro_handle) {
  let x = localStorage.getItem("cartRecos");
  if (x == null) {
    let cartRecos = [];
    cartRecos.unshift(pro_handle);
    localStorage.setItem("cartRecos", cartRecos);
  } else {
    let y = localStorage.getItem("cartRecos").split(",");
    y.unshift(pro_handle);
    // console.log(y)
    let newsss = new Set();
    y.forEach(function (s) {
      newsss.add(s);
    });
    newsss = Array.from(newsss);
    // console.log(newsss)
    localStorage.setItem("cartRecos", newsss);
  }
}

// ===============================================================

let page = 1;
let hasMore = true;
let loader = 1;
window.addEventListener("scroll", () => {
  console.log("has: ", hasMore, "loader : ", loader);
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 500) {
    // console.log("gdshkg")
    if (loader && hasMore) {
      loader = 0;
      page++;
      fetch(window.location.pathname + "?page=" + page)
        .then((res) => res.text())
        .then((data) => {
          let doc = new DOMParser().parseFromString(data, "text/html");
          console.log(doc);
          let proGrid = doc
            .getElementsByClassName("AjaxinateContainer")[0]
            .getElementsByClassName("product-row")[0].innerText;
          if (proGrid.length > 100) {
            document.getElementsByClassName(
              "AjaxinateContainer"
            )[0].innerHTML +=
              doc.getElementsByClassName("AjaxinateContainer")[0].innerHTML;
            loader = 1;
          } else {
            hasMore = false;
          }
        });
    }
  }
});

fetch(window.location.pathname + "?page=" + page)
  .then((res) => res.text())
  .then((data) => {
    let doc = new DOMParser().parseFromString(data, "text/html");
    console.log(doc);
    document.getElementsByClassName("AjaxinateContainer")[0].innerHTML +=
      doc.getElementsByClassName("AjaxinateContainer")[0].innerHTML;
  });

function updateCartDrawer() {
  let pDoc;
  const parser = new DOMParser();
  fetch(window.Shopify.routes.root + "?sections=cart-drawer")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)
      console.log("Updating Cart");
      pDoc = parser.parseFromString(data["cart-drawer"], "text/html");
      // console.log(pDoc.getElementById('mini-cart'));
      document.getElementById("mini-cart").innerHTML = "";
      document.getElementById("mini-cart").innerHTML =
        pDoc.getElementById("mini-cart").innerHTML;
      // setCartListners();
      setEventListnersDrawer();

      let recommendor = document.getElementsByClassName(
        "cart-recommendations"
      )[0];
      if (recommendor.getAttribute("mode") == "lastadded") {
        if (localStorage.getItem("cartRecosId") != null) {
          let localId = localStorage.getItem("cartRecosId").split(",");
          let pID = localId[0];
          if (pID.length) {
            fetch(
              window.Shopify.routes.root +
              "recommendations/products.json?product_id=" +
              pID +
              "&intent=related"
            )
              .then((res) => res.json())
              .then((data) => {
                data["products"].forEach(function (pro) {
                  // console.log(pro['handle'])

                  let prosInCart = localStorage.getItem("cartRecosHandle");
                  if (prosInCart.includes(pro["handle"])) {
                    console.log("Match Found");
                  } else {
                    createProductCard(pro["handle"]);
                  }
                });
                setTimeout(function () {
                  applySliderToCardReco();
                }, 500);
              });
          }
        } else {
          console.log("No Product In cart");
        }
      } else if (recommendor.getAttribute("mode") == "selected") {
        let pros = JSON.parse(recommendor.innerText);

        console.log(pros);
        pros.forEach(function (pro) {
          // console.log(pro['handle'])

          let prosInCart = localStorage.getItem("cartRecosHandle");
          if (prosInCart.includes(pro["handle"])) {
            console.log("Match Found");
          } else {
            createProductCard(pro["handle"]);
          }
        });
        setTimeout(function () {
          applySliderToCardReco();
        }, 500);
      }
    });
}



//  save product handle to localStorage

function passToBundledPro(varId) {
  let x = localStorage.getItem("bundledPro");
  if (x == null) {
    let pros = [];
    pros.unshift(varId);
    localStorage.setItem("bundledPro", pros);
  } else {
    let y = localStorage.getItem("bundledPro").split(",");
    y.unshift(varId);
    let newsss = new Set();
    y.forEach(function (s) {
      newsss.add(s);
    });
    newsss = Array.from(newsss);
    localStorage.setItem("bundledPro", newsss);
  }
}

function passToBundledPro(varId, checked) {
  let stored = localStorage.getItem("bundledPro");
  let pros = stored ? stored.split(",") : [];
  if (checked) {
    if (!pros.includes(varId)) {
      pros.unshift(varId);
    }
  } else {
    pros = pros.filter((id) => id !== varId);
  }
  let uniquePros = Array.from(new Set(pros));
  localStorage.setItem("bundledPro", uniquePros);
}

// get product cart and append to a div
function getProductCard(handle, toDiv) {
  fetch(window.Shopify.routes.root + "products/" + handle + "?view=card2")
    .then((res) => res.text())
    .then((data) => {
      let doc = new DOMParser().parseFromString(data, "text/html");
      console.log(doc);

      let createCard = document.createElement("div");
      createCard.classList.add("product-widget");
      createCard.classList.add("best-seller-itm");
      createCard.classList.add("product-card-jk");
      createCard.setAttribute("handle", handle);

      createCard.innerHTML =
        doc.getElementsByClassName("product-widget")[0].innerHTML;

      toDiv.appendChild(createCard);
    });
}

// cart multiple add
let bundled = localStorage.getItem("bundledPro").split(",");
let items = [];
bundled.forEach(function (i) {
  console.log(i);
  let obj = {
    quantity: 1,
    id: i,
  };
  items.push(obj);
});

function addMultiplePros(Array) {
  let formData = {
    items: Array,
  };
  fetch(window.Shopify.routes.root + "cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// let updates = {
//     794864053: 2,
//     794864233: 3
// };

let ups = {};
let cartItems = Array.from(
  document
    .getElementsByClassName("container-cart")[0]
    .getElementsByClassName("item-quantity")
);
cartItems.forEach(function (i) {
  let keyGen = i.getAttribute("item-key");
  let valueGen = i.value;
  ups[keyGen] = parseInt(valueGen);
});
console.log(ups);

fetch(window.Shopify.routes.root + "cart/update.js", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ ups }),
})
  .then((response) => {
    return response.json();
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// async function changeCallAsync(id, qty) {
//   let res = await fetch("/cart/change.js", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       id: id,
//       quantity: qty,
//     }),
//   }).then((response) => {
//     response.json();
//     return true;
//   });
//   return true;
//}

await function changeCallAsync(id, qty) {
  fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      quantity: qty,
    }),
  }).then((response) => {
    response.json();
    return true;
  });
};


let options = productData.options.length;
for (let i = 1; i <= options; i++) {
  let optionString = "option" + i;
  console.log(optionString);
}

// <div id="container">
// <input type="text" id="query"/>
// <div id="autocomplete">
// </div>
// </div>
// hide div on click of its outside
let containingElement = document.querySelector("#container");
document.body.addEventListener("click", function (event) {
  if (containingElement.contains(event.target)) {
    // do nothing, click was inside container
  } else {
    // hide autocomplete, click was outside container.
  }
});

function productAddedToCompare(varId) {
  let x = localStorage.getItem("compares");
  if (x == null) {
    let pros = [];
    pros.unshift(varId);
    localStorage.setItem("compares", pros);
  } else {
    let y = localStorage.getItem("compares").split(",");
    y.unshift(varId);
    let newPros = new Set();
    y.forEach(function (s) {
      newPros.add(s);
    });
    newPros = Array.from(newPros);
    localStorage.setItem("compares", newPros);
  }
}

async function addToCartCall(formData) {
  let response = await fetch(window.Shopify.routes.root + "cart/add.js", {
    method: "POST",
    body: formData,
  });
  if (response.ok) {
    let id = formData.get("id");
    let cartBody = document.getElementsByClassName("mini_cart_body")[0];
    let incarts = cartBody.dataset.inCartVars;
    let incartsVar = incarts.split(",");
    if (incartsVar.includes(shippingChargeVarId)) {
      console.log("in sgfgd s", incartsVar);
      console.log("Performing");
      let myData = {
        id: shippingChargeVarId,
        quantity: 1,
      };
      let fd = new FormData();
      for (let key in myData) {
        fd.append(key, myData[key]);
      }
      let data = await fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        body: fd,
      });
      updateCartDrawer();
    }
  }
  // let data = await response.json();
  // console.log(data);

  return await response.json();
}


document.body.addEventListener("change", async function (e) {
  // console.log(e.target);
  if (e.target.matches("#shipping-plus")) {
    let inGet = e.target;
    let shippingPlusForm = document.getElementById("shipping-plus-form");
    let check = inGet.checked;
    // console.log(inGet);
    if (check) {
      inGet.setAttribute("checked", "checked");
      localStorage.setItem("sChargeManual", true);
      let myData = {
        id: shippingChargeVarId,
        quantity: 1,
      };
      let formData = new FormData();
      for (let key in myData) {
        formData.append(key, myData[key]);
      }
      let data = await fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        body: formData,
      });
      updateCartDrawer();
    } else {
      let data = await cartChangeCall(shippingChargeVarId, 0);
      localStorage.setItem("sChargeManual", false);
      updateCartDrawer();
    }
  }
});



// Working Dawn
// fetch(`${routes.cart_url}?section_id=cart-drawer`)
//   .then((response) => response.text())
//   .then((responseText) => {
//     const html = new DOMParser().parseFromString(responseText, 'text/html');
//     document.getElementsByTagName('cart-drawer')[0].innerHTML = html.getElementsByTagName('cart-drawer')[0].innerHTML
//   })


// fetch(`${routes.cart_url}?section_id=cart-drawer`)
//   .then((response) => response.text())
//   .then((responseText) => {
//     const html = new DOMParser().parseFromString(responseText, 'text/html');
//     document.getElementsByTagName('cart-drawer-items')[0].innerHTML = html.getElementsByTagName('cart-drawer-items')[0].innerHTML
//   })





// ============================= MCP to AI search  ================================
// https://shopify.dev/docs/apps/build/storefront-mcp/servers/storefront

const storeDomain = 'jayesh-cirkle.myshopify.com';
const mcpEndpoint = `https://${storeDomain}/api/mcp`;

// Example request using the endpoint
fetch(mcpEndpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'tools/call',
    id: 1,
    params: {
      name: 'search_shop_catalog',
      arguments: { query: 'klair', context: 'face cosmatics' }
    }
  })
}).then(response => response.json())
  .then(data => {
    console.log(data)
    // let doc = new DOMParser().parseFromString(data, "text/html");
    document.body.innerHTML = data
  });




async function updateCartDrawer() {
  document.getElementById("mini_cart_main").innerHTML = `<div class="spin-wrapper spinner demo3"></div>`
  let cartDom = await cartCallHtml();
  let pDoc = new DOMParser().parseFromString(cartDom, "text/html");
  document.getElementById("mini_cart_main").innerHTML =
    pDoc.getElementById("mini_cart_main").innerHTML;
  setTimeout(function () {
    addComplementaryProduct()
  }, 200)
  performRecommendationsOnCart();
  fetch("/cart.js").then(cartRes => cartRes.json()).then(data => {
    updateCartStatus(data)
  })
  Array.from(document.getElementsByClassName("free-shipping-limit")).forEach(function (i) {
    i.innerHTML = pDoc.getElementsByClassName("free-shipping-limit")[0].innerHTML;
  })
  if (document.getElementsByClassName('container-cart')[0]) {
    replaceCartBody()
  }
}


// 'sections': 'cart-drawer,header,main-cart'

function cartUpdateOnTheGo(JSONdata) {
  console.log("Data Given To me ", JSONdata)
  if (template != 'cart') {
    toggle_cart.classList.add("active");
  } else { console.log("Template Cart") }
  let cartDrawerSec = JSONdata.sections['cart-drawer'];
  let html = new DOMParser().parseFromString(cartDrawerSec, "text/html");
  document.getElementById("mini_cart_main").innerHTML = html.getElementById("mini_cart_main").innerHTML;
  Array.from(document.getElementsByClassName("free-shipping-limit")).forEach(function (i) {
    i.innerHTML = html.getElementsByClassName("free-shipping-limit")[0].innerHTML;
  })
  let headerSec = JSONdata.sections['header'];
  let htmlHeader = new DOMParser().parseFromString(headerSec, "text/html");
  document.getElementById("cart_bt").innerHTML = htmlHeader.getElementById("cart_bt").innerHTML;
}


// form to url params convert
const formData = new FormData(document.getElementById('FacetFiltersForm'));
let sss = new URLSearchParams(formData).toString();
console.log(sss)


// need notification permission
var notification = new Notification("Hi there!", {
  body: "This is a test notification."
});


// Example of creating a metafield for a customer using the Shopify Admin API But used static token key
let metafieldData = {
  "metafield": {
    "namespace": "custom",
    "key": "personalised_data_set_jk",
    "value": "YOyo custom",
    "type": "multi_line_text_field"
  }
}

fetch(`${window.Shopify.routes.root}admin/api/2024-07/customers/838784506 2794/metafields.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': 'app_token'
  },
  body: JSON.stringify(metafieldData)
})
  .then(response => response.json())
  .then(data => {
    console.log('Metafield created:', data);
  })
  .catch(error => {

    console.error('Error creating metafield:', error);
  });




// Example of Fetching metafields for a product using the Shopify Admin API But used static token key
fetch(`${window.Shopify.routes.root}admin/api/2024-07/products/8542096982154/metafields.json`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': 'app_token'
  },
})
  .then(response => response.json())
  .then(data => {
    console.log('Metafield created:', data);
  })
  .catch(error => {
    console.error('Error creating metafield:', error);
  });


// ================= klaviyo =========================

let dataToReceived = {
  "image": "https://jayesh-cirkle.myshopify.com/cdn/shop/files/black_large.jpg?v=1748328109",
  "product_title": "Shoes",
  "variant_title": "Black / S",
  "url": "https://jayesh-cirkle.myshopify.com/pages/wishlist",
  "product_handle": "shoes",
  "variant_id": "46342462931082"
}

window._klOnsite = window._klOnsite || [];
window._klOnsite.push(['identify', {
  email: 'roboje1250@blaxion.com'
}]);

window._klOnsite.push(['track', 'notify1', {
  product_title: 'Shoes',
  product_handle: 'shoes',
  variant_id: '46342462931082',
  variant_title: "Black / S",
  image: "https://jayesh-cirkle.myshopify.com/cdn/shop/files/black_large.jpg?v=1748328109",
  url: window.location.href
}]);



// product detail call from resource id

// let proDataArray = [];
let proDataArray = new Set();

let productId = 6849611071621;
fetch("https://admin.shopify.com/api/shopify/hemp-hash?operation=AdminProductDetails&type=query", {
  "headers": {
    "accept": "application/json",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "apollographql-client-name": "core",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "shopify-build-version": "6325.432292f4a37fe8aa618f26088fc1492675ebdb7d.0",
    "shopify-proxy-api-enable": "true",
    "target-manifest-route-id": "products:update",
    "target-pathname": "/store/:storeHandle/products/:productId",
    "target-slice": "products-section",
    "traceparent": "00-e5a43577c81b513175b4bbaf1db07301-b6432b345815830c-01",
    "x-cloud-trace-context": "e5a43577c81b513175b4bbaf1db07301/13133388442158596876;o=1",
    "x-csrf-token": "Mx7Mq2Uqzx-VW1nhP2LdKdRwNJ8JQFnT2BhthM",
    "x-shopify-trace-context": "e5a43577c81b513175b4bbaf1db07301/13133388442158596876;o=1",
    "x-shopify-trace-hint": "true",
    "x-shopify-web-force-proxy": "1"
  },
  "referrer": `https://admin.shopify.com/store/hemp-hash/products/${productId}`,
  "body": `{\"operationName\":\"AdminProductDetails\",\"variables\":{\"fetchShopifyPaymentsField\":false,\"isCreating\":false,\"hasPreferencesPermission\":true,\"hasEditThemeCodePermission\":true,\"productId\":\"gid://shopify/Product/${productId}\",\"locationsFirst\":250,\"supportedChannelsFirst\":50},\"query\":\"query AdminProductDetails($productId: ID!, $locationsFirst: Int!, $fetchShopifyPaymentsField: Boolean = false, $isCreating: Boolean = false, $hasPreferencesPermission: Boolean = false, $hasEditThemeCodePermission: Boolean = false, $supportedChannelsFirst: Int!) {\\n  shop {\\n    id\\n    url\\n    industry\\n    trialPlan\\n    enabledPresentmentCurrencies\\n    features {\\n      giftCards\\n      hsCodeSelectorEnabled\\n      unitPriceEnabled\\n      richMedia\\n      insightsProductShowInsightsExperience\\n      __typename\\n    }\\n    weightUnit\\n    resourceLimits {\\n      redirectLimitReached\\n      __typename\\n    }\\n    fulfillmentServices {\\n      id\\n      inventoryManagement\\n      permitsSkuSharing\\n      serviceName\\n      handle\\n      location {\\n        id\\n        name\\n        __typename\\n      }\\n      __typename\\n    }\\n    taxesIncluded\\n    __typename\\n  }\\n  productsCount {\\n    count\\n    __typename\\n  }\\n  shopLocales @include(if: $hasPreferencesPermission) {\\n    locale\\n    __typename\\n  }\\n  shopifyPayments: paymentProvider(id: \\\"gid://shopify/PaymentProvider/87\\\") @include(if: $fetchShopifyPaymentsField) {\\n    id\\n    configuration {\\n      id\\n      enabled\\n      __typename\\n    }\\n    __typename\\n  }\\n  appLocations: locations(\\n    first: $locationsFirst\\n    includeLegacy: true\\n    query: \\\"legacy:true\\\"\\n  ) {\\n    edges {\\n      node {\\n        ...ProductLocation\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  merchantLocations: locations(first: $locationsFirst) {\\n    edges {\\n      node {\\n        ...ProductLocation\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  product(id: $productId) @skip(if: $isCreating) {\\n    id\\n    activeSuspension {\\n      createdAt\\n      disputeUrl\\n      disputeStatus\\n      noticeBody\\n      daysToSuspension\\n      pending\\n      __typename\\n    }\\n    combinedListingRole\\n    description\\n    defaultCursor\\n    handle\\n    status\\n    totalVariants\\n    totalInventory\\n    mediaCount\\n    hasOnlyDefaultVariant\\n    onlineStoreUrl\\n    tracksInventory\\n    productParents(first: 0, query: \\\"bundles:true\\\") {\\n      totalCount\\n      __typename\\n    }\\n    resourceAlerts {\\n      content\\n      dismissed\\n      dismissibleHandle\\n      severity\\n      title\\n      actions {\\n        primary\\n        title\\n        url\\n        __typename\\n      }\\n      __typename\\n    }\\n    isGiftCard\\n    isStaticBundle: hasVariantWithBundleComponents\\n    isBundle: hasVariantsThatRequiresComponents\\n    requiresSellingPlan\\n    supportedChannels(first: $supportedChannelsFirst) {\\n      edges {\\n        node {\\n          id\\n          app {\\n            id\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    feedback {\\n      details {\\n        app {\\n          id\\n          __typename\\n        }\\n        messages {\\n          message\\n          __typename\\n        }\\n        link {\\n          url\\n          label\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    options {\\n      id\\n      name\\n      position\\n      linkedMetafield {\\n        namespace\\n        key\\n        __typename\\n      }\\n      optionValues {\\n        id\\n        name\\n        linkedMetafieldValue\\n        hasVariants\\n        __typename\\n      }\\n      __typename\\n    }\\n    inferredProductAttributes {\\n      name\\n      values {\\n        rawPrediction\\n        metafieldValue\\n        metaobjectDetails {\\n          metaobjectGid\\n          displayName\\n          baseValueGids\\n          __typename\\n        }\\n        __typename\\n      }\\n      customDataSettings {\\n        metafieldType\\n        metafieldIdentifier\\n        __typename\\n      }\\n      __typename\\n    }\\n    vendor\\n    ...AppOwnership\\n    ...ThemeTemplatesProduct\\n    ...SEOCardProduct\\n    ...TitleAndDescriptionProduct\\n    ...ProductCategory\\n    ...TaxonomyCategory\\n    ...ProductType\\n    __typename\\n  }\\n  onlineStore {\\n    passwordProtection {\\n      enabled\\n      __typename\\n    }\\n    currentTheme {\\n      id\\n      brandingSettings @include(if: $hasEditThemeCodePermission) {\\n        favicon {\\n          id\\n          url\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    ...ThemeTemplatesShop\\n    __typename\\n  }\\n  staffMember {\\n    id\\n    permissions {\\n      appPermissions\\n      __typename\\n    }\\n    privateData {\\n      ...ProductPreferencesFragment\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment ProductLocation on Location {\\n  id\\n  isActive\\n  name\\n  fulfillmentService {\\n    id\\n    permitsSkuSharing\\n    inventoryManagement\\n    serviceName\\n    handle\\n    appInstallation {\\n      id\\n      launchUrl\\n      __typename\\n    }\\n    requiresSkuForProductVariants\\n    __typename\\n  }\\n  shipsInventory\\n  __typename\\n}\\n\\nfragment AppOwnership on Product {\\n  sectionOwnership {\\n    optionsSection {\\n      app {\\n        id\\n        icon {\\n          id\\n          altText\\n          url\\n          __typename\\n        }\\n        title\\n        __typename\\n      }\\n      deleted\\n      manageUrl\\n      __typename\\n    }\\n    inventorySection {\\n      app {\\n        id\\n        icon {\\n          id\\n          altText\\n          url\\n          __typename\\n        }\\n        title\\n        __typename\\n      }\\n      deleted\\n      manageUrl\\n      __typename\\n    }\\n    __typename\\n  }\\n  productProfile {\\n    readonlyOptions\\n    readonlyVariants\\n    readonlyInventory\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ThemeTemplatesProduct on Product {\\n  templateSuffix\\n  giftCardTemplateSuffix\\n  isGiftCard\\n  __typename\\n}\\n\\nfragment SEOCardProduct on Product {\\n  seo {\\n    title\\n    description\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment TitleAndDescriptionProduct on Product {\\n  id\\n  descriptionHtml\\n  title\\n  __typename\\n}\\n\\nfragment ProductCategory on Product {\\n  productCategory {\\n    productTaxonomyNodeId\\n    parentProductTaxonomyNodeId\\n    name\\n    fullName\\n    isLeaf\\n    isRoot\\n    level\\n    __typename\\n  }\\n  inferredProductMetadata: inferredProductCategory(includeLegacy: false) {\\n    productCategory {\\n      productTaxonomyNodeId\\n      parentProductTaxonomyNodeId\\n      name\\n      fullName\\n      isLeaf\\n      isRoot\\n      level\\n      __typename\\n    }\\n    source\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment TaxonomyCategory on Product {\\n  category {\\n    id\\n    name\\n    fullName\\n    isArchived\\n    migratedTo {\\n      id\\n      name\\n      fullName\\n      isArchived\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ProductType on Product {\\n  productType\\n  __typename\\n}\\n\\nfragment ThemeTemplatesShop on OnlineStore {\\n  availableProductTemplateOptions: availableTemplateOptions(resourceType: PRODUCT)\\n  availableGiftCardTemplateOptions: availableTemplateOptions(\\n    resourceType: GIFT_CARD\\n  )\\n  __typename\\n}\\n\\nfragment ProductPreferencesFragment on StaffMemberPrivateData {\\n  productPreferences {\\n    showInternationalShipping\\n    showSkuAndBarcode\\n    __typename\\n  }\\n  __typename\\n}\\n\"}`,
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}).then(response => response.json())
  .then(data => {
    console.log(data);
    let productDetails = {
      id: productId,
      title: data.data.product.title,
      handle: data.data.product.handle,
      status: data.data.product.status,
    }
    console.log(productDetails);
    proDataArray.add(productDetails);

    // Process the product details data as needed
  })



// get product details by resource id
let rid = 6849611071621
let storeHandle = 'hemp-hash';
fetch(`https://admin.shopify.com/store/${storeHandle}/products/${rid}.json?fields=id,title,handle`)
  .then(res => res.json())
  .then(data => {
    console.log(data['product'])
  })


fetch(`https://admin.shopify.com/store/hemp-hash/products.json`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })


// just a test to fetch product details
fetch(window.Shopify.routes.root + 'products/tropical-express-cbd-flower-indoor-14-cbd.js')
  .then(response => response.json())
  .then(product => {
    console.log(product)
  });


// Fetching the user's IP address using ipify API
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    console.log("Your IP address is:", data.ip);
  })
  .catch(error => console.error('Error fetching IP address:', error));


fetch("https://admin.shopify.com/api/shopify/hemp-hash?operation=AdminProductDetails&type=query", {
  "headers": {
    "accept": "application/json",
    "content-type": "application/json",

  },
  "body": JSON.stringify([

  ]),
  "method": "POST",
}).then(response => response.json())
  .then(data => {
    console.log(data);
  })