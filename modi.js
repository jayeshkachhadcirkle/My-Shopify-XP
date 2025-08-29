


// ================================

let allPlus = document.querySelectorAll('.plus')
allPlus.forEach(function (plus) {
  plus.addEventListener('click', function () {
    let currentQty = plus.parentElement.getElementsByTagName('input')[0].value
    currentQty++;
    plus.parentElement.getElementsByTagName('input')[0].value = currentQty;
  })
});

let allMinus = document.querySelectorAll('.minus')
allMinus.forEach(function (minus) {
  minus.addEventListener('click', function () {
    let currentQty = minus.parentElement.getElementsByTagName('input')[0].value
    currentQty--;
    currentQty = currentQty < 1 ? 1 : currentQty;
    minus.parentElement.getElementsByTagName('input')[0].value = currentQty;
  })
});

// ================================
// ================================
let proCards = document.querySelectorAll('.pro-cart')
proCards.forEach(function (p) {
  p.addEventListener('click', function () {
    let var_id = p.getAttribute('variant')
    // console.log(var_id);
    sendToCartSingle(var_id);
  })
})


// ================================
$.get("/cart", function (data) {
  console.log(data);
});
// ================================


let parsedDocument;
const parser = new DOMParser();
fetch('/cart')
  .then(response => response.text())
  .then(cart => {
    console.log('Updated cart:', cart);
    parsedDocument = parser.parseFromString(cart, "text/html");
    console.log(parsedDocument);
    document.getElementsByClassName('cart-table-layout')[0].innerHTML = parsedDocument.getElementsByClassName('cart-table-layout')[0].innerHTML
  });

fetch('/products.json?limit=20&page=1')
  .then(response => response.text())
  .then(data => {
    console.log('products:', data);
  });





let changeItem = {
  'id': 46239762350218,
  'quantity': 5
}
fetch(window.Shopify.routes.root + 'cart/change.js', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(changeItem)
})
  .then(response => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
// ================================



// ===================== okkkk ===========
fetch('/cart/change.js', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: '46264892358794',
    quantity: 1 * 1
  })
})
  .then(response => response.json())
  .then(cart => {
    console.log(cart);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// //  error response
// {
//     "status": 422,
//         "message": "Only 5 items were added to your cart due to availability.",
//             "description": "Only 5 items were added to your cart due to availability."
// }

// =====================================

if (countElement) {

} else {
  let counter = document.createElement('span');
  counter.classList.add('count');
  counter.id = cart - count;
  counter.innerText = 1;
  document.getElementsByClassName('cart-btn')[0].appendChild(counter);
}
// =====================================

let updates = {
  794864053: 0,
  794864233: 0
};

fetch(window.Shopify.routes.root + 'cart/update.js', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ updates })
})
  .then(response => {
    return response.json();
  })
  .catch((error) => {
    console.error('Error:', error);
  });

//   =============update Shortvut

fetch(window.Shopify.routes.root + 'cart/update.js', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ updates: [3, 2, 1] })
})
  .then(response => response.json())
  .then(data => console.log(data));
// =====================================


// =====================================
// =====================================


//   =====================================

let timer;
const searchInput = document.querySelector('.search__input')
searchInput.addEventListener('input', function (event) {
  if (event.target.value.length > 0) {
    let searchPopup = document.getElementsByClassName('mini-search')[0].style.display = 'block';
    clearTimeout(timer);
    let placerSrc = "https://cdn.shopify.com/s/files/1/0697/6975/6810/files/placer.svg?v=1747889981";
    let limit = parseInt(document.getElementById('limiter').getAttribute('limit'))
    let limit_scope = document.getElementById('limiter').getAttribute('scope')
    // console.log(url)
    let url = window.Shopify.routes.root + "search?q=" + event.target.value + "&options%5Bprefix%5D=last&view=predictive";
    timer = setTimeout(function () {

      fetch(url)
        .then(response => response.text())
        .then(data => {
          let parser = new DOMParser();
          let doc = parser.parseFromString(data, 'text/html');
          document.getElementsByClassName('mini-search')[0].innerHTML = doc.getElementById('predictive-search-results').innerHTML;
          document.getElementsByClassName('mini-search')[0].style.display = 'block';
        });
    }, 700)
  } else {
    let searchPopup = document.getElementsByClassName('mini-search')[0].style.display = 'none';
  }
});
searchInput.addEventListener('blur', function () {
  document.getElementsByClassName('mini-search')[0].style.display = 'none';
})





async function fetchData() {

  try {
    const response = await fetch('https://jayesh-cirkle.myshopify.com/products/klairs-midnight-blue-calming-cream-60-ml-6');
    const data = await response.text();
    console.log(data);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchData();

// ================ Working Predictive Search Section ================
async function getData() {
  const url = "/search/suggest?q=a&section_id=predictive-search";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.text();
    //   console.log(data);
    let parser = new DOMParser();
    let doc = parser.parseFromString(data, 'text/html');
    console.log(doc);
  } catch (error) {
    console.error(error.message);
  }
}
getData();


let selected = varData.filter(function (item) {
  return item.option1 == 'Black'
})

console.log(selected)



//  replace element with itself to remove event listners
const element = document.getElementsByClassName('product-info-wrap')[0];
const clonedElement = element.cloneNode(true);
element.parentNode.replaceChild(clonedElement, element);





https://jayesh-cirkle.myshopify.com/collections/all?filter.v.availability=1&filter.v.availability=0&filter.v.price.gte=&filter.v.price.lte=&filter.v.option.size=S&filter.v.option.size=M&filter.v.option.size=L&filter.v.option.size=Large&filter.v.option.size=Regular&sort_by=title-ascending

let facetForm = document.getElementById('FacetFiltersForm')
facetForm.addEventListener('change', function (e) {
  e.preventDefault();
  let formData = new FormData(facetForm);
  let data = {};
  let query = "";
  formData.forEach((value, key) => {
    console.log()
    data[key] = value;
    query += ("&" + key + "=" + value)

  });
  let q2 = query.replace("&", "?")



})
// iterate all data


document.addEventListener('click', function (e) {
  // e.preventDefault()
  let targetElement = event.target;
  let selector = 'li';
  console.log(" Target 0 ", targetElement)
  console.log(" Target 1 ", targetElement.parentElement)
  console.log(" Target 2 ", targetElement.parentElement.parentElement)
  console.log(" Target 3 ", targetElement.parentElement.parentElement.parentElement)
  console.log(" Target 4 ", targetElement.parentElement.parentElement.parentElement.parentElement)

  let tgc = targetElement.parentElement.className
  if (tgc.includes('viewer-eye')) {
    openProductPopUp(targetElement.parentElement)
  }
  if (tgc.includes('pro-cart')) {
    let var_id = targetElement.parentElement.getAttribute('variant')
    sendToCartSingle(var_id);
  }


})



let cart_bt = document.getElementById("cart_bt");
let toggle_cart = document.getElementById("mini-cart");
let cart_close = document.getElementById("cart_colse_icon");
let cart_overlay = document.querySelector("#cart_overlay");

cart_bt.addEventListener("click", function () {
  toggle_cart.classList.add("active");
  console.log("Calling cart from 259")
  updateCartDrawer();
  // setEventListnersDrawer();
});
cart_close.onclick = () => {
  toggle_cart.classList.remove("active");
};
cart_overlay.onclick = () => {
  toggle_cart.classList.remove("active");
};





function setEventListners() {
  let allPlus = document.querySelectorAll('.plus-cart');
  allPlus.forEach(function (plus) {
    plus.addEventListener('click', function (e) {
      e.preventDefault()
      let currentQty = plus.parentElement.getElementsByTagName('input')[0].value;
      currentQty++;
      plus.parentElement.getElementsByTagName('input')[0].value = currentQty;
      let var_id = plus.parentElement.getElementsByTagName('input')[0].getAttribute('variant');
      let erdiv = plus.parentElement.parentElement.parentElement.querySelector('.qty-error')
      changeCartItem(var_id, currentQty, erdiv);
    });
  });

  let allMinus = document.querySelectorAll('.minus-cart');
  allMinus.forEach(function (minus) {
    minus.addEventListener('click', function (e) {
      e.preventDefault()
      let currentQty = minus.parentElement.getElementsByTagName('input')[0].value;
      currentQty--;
      currentQty = currentQty < 1 ? 1 : currentQty;
      minus.parentElement.getElementsByTagName('input')[0].value = currentQty;
      let var_id = minus.parentElement.getElementsByTagName('input')[0].getAttribute('variant');
      let erdiv = minus.parentElement.parentElement.parentElement.querySelector('.qty-error')
      changeCartItem(var_id, currentQty, erdiv);
    });
  });

  let allDels = document.querySelectorAll('.item-remove-btn');
  allDels.forEach(function (del) {
    del.addEventListener('click', function (e) {
      e.preventDefault()
      del.parentElement.parentElement.querySelector('.get-qty').value = 0;
      let var_id = del.parentElement.parentElement.querySelector('.get-qty').getAttribute('variant');
      let erdiv = del.parentElement.parentElement.parentElement.querySelector('.qty-error')
      // let delDone = changeCartItem(var_id, 0, erdiv);
      // del.parentElement.parentElement.parentElement.remove();
      deleteItem(var_id);
    });
  });
}

const url = '/cart.js';
let cart_data;
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    cart_data = data;
    console.log(cart_data);
    setEventListners();
  })
  .catch((e) => {
    console.error(e);
  });

function changeCartItem(varId, newQty, errorDiv) {
  fetch('/cart/change.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: varId,
      quantity: newQty * 1
    })
  })
    .then(response => response.json())
    .then(cart => {
      let data = cart
      console.log(data);
      if (data['message']) {
        errorDiv.innerText = data['message'];
      }
      else {
        document.getElementById('cart-count').innerText = data['item_count'];
        document.getElementById('cart-items').innerText = data['item_count'] + ' Items';
        document.getElementById('cart-subtotal').innerText = Shopify.formatMoney(data['items_subtotal_price']);
        document.getElementById('total-price').innerText = Shopify.formatMoney(data['total_price']);
        document.getElementById('original-total-cart').innerText = Shopify.formatMoney(data['original_total_price']);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


function deleteItem(varid) {
  let cartTable = document.querySelector('.cart-table-lft');
  cartTable.innerHTML = `<div id = "loading_indicator"> </div>`
  fetch('/cart/change', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: varid,
      quantity: 0
    })
  })
    .then(response => response.text())
    .then(cart => {
      // console.log(cart);
      let docGet = new DOMParser(cart).parseFromString(cart, "text/html");
      console.log(docGet)
      document.querySelector('.container-cart').innerHTML = docGet.querySelector('.container-cart').innerHTML;
      document.querySelector('#cart_bt').innerHTML = docGet.querySelector('#cart_bt').innerHTML;
      setEventListners();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


setTimeout(function () {


  let recommendor = document.getElementsByClassName('cart-page-wrapper')[0].getElementsByClassName('cart-reco-container')[0]
  let mode = recommendor.getAttribute('mode');
  if (mode == "lastadded") {
    let productRecommendationsSection = recommendor.querySelector('.product-recommendations-carter');
    let url = productRecommendationsSection.dataset.url;
    fetch(url)
      .then(response => response.text())
      .then(text => {
        // console.log(text);
        let html = document.createElement('div');
        html.innerHTML = text;
        let recommendations = html.querySelector('.product-recommendations-carter');
        if (recommendations && recommendations.innerHTML.trim().length) {
          productRecommendationsSection.innerHTML = recommendations.innerHTML;
        }
        setTimeout(function () {
          applySliderToCardRecoMain();
        }, 200)
      })
      .catch(e => {
        console.error(e);
      });
  } else {
    setTimeout(function () {
      applySliderToCardRecoMain();
    }, 200)
  }


}, 1000)



let cc = document.getElementById('Recipient-checkbox-template--18277558747274__main')
let gcon = document.getElementsByClassName('recipient-fields')[0]
cc.addEventListener('change', function (e) {
  // console.log("Clicked");
  if (cc.checked) {
    cc.setAttribute('checked', false)
    gcon.style.display = 'flex'
  }
  else {
    gcon.style.display = 'none'
    cc.setAttribute('checked', true)
  }
  console.log(cc.getAttribute('checked'));
})


// product - form - installment - template--18268740190346__main

let formData = new FormData(document.getElementById('product-form-template--18268740190346__main'));
let data = {};
formData.forEach((value, key) => {
  data[key] = value;
});
console.log('data', data);


let cc = document.getElementsByClassName('gc-checkbox')[0]
let gcon = document.getElementsByClassName('recipient-fields')[0]
cc.addEventListener('change', function (e) {
  if (cc.checked) {
    cc.setAttribute('checked', false)
    gcon.style.display = 'block'
    Array.from(document.getElementsByClassName('recipient-fields__field')).forEach(function (i) {
      i.getElementsByTagName('input')[0].setAttribute('disabled', false);
    })
  }
  else {
    gcon.style.display = 'none'
    cc.setAttribute('checked', true)
    Array.from(document.getElementsByClassName('recipient-fields__field')).forEach(function (i) {
      i.getElementsByTagName('input')[0].setAttribute('disabled', true);
    })
  }
  console.log(cc.getAttribute('checked'));
})



// < div style = "padding:56.25% 0 0 0;position:relative;" > <iframe src="https://player.vimeo.com/video/290710439?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="Nonfacial Portrait"></iframe></div > <script src="https://player.vimeo.com/api/player.js"></script>


function sendItemToCart(var_id, quantity, formElement, errDiv) {
  event.preventDefault();
  if (formElement.reportValidity()) {
    let realFormData = new FormData(formElement)
    fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      body: realFormData
    })
      .then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
        if (data['message']) {
          errDiv.innerText = data['message'];
          cart_close.click();
        } else {
          formElement.reset();
          updateCartStatus(quantity)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } else {
    for (let element of formElement.elements) {
      if (element.validationMessage) {
        element.style.border = "1px solid red";
        console.log(`${element.name} error: ${element.validationMessage}`);
      }
    }
    toggle_cart.classList.remove("active");
  }
}



const box = document.getElementsByClassName("AjaxinatePagination")[0];
let enableInfinite = parseInt(box.getAttribute('infinite'));
observer.observe(box);

const observer = new IntersectionObserver((arr) => {
  if (enableInfinite) {
    let countResult = document.getElementById('ProductCountDesktop').getAttribute('pro-count')
    document.getElementsByClassName("AjaxinatePagination")[0].setAttribute('count', countResult)
    pages = Math.ceil(countResult / per_page)

    for (const entry of arr) {
      if (entry.isIntersecting) {

        let newpage = parseInt(document.getElementsByClassName("AjaxinatePagination")[0].getAttribute('current')) + 1
        document.getElementsByClassName("AjaxinatePagination")[0].setAttribute('current', newpage)
        console.log(newpage)

        if ((newpage <= pages) && (countResult >= per_page)) {
          fetchNewPage(newpage)
        } else {
          console.log("Got Else Observ")
          observer.unobserve(box);
          document.getElementsByClassName("AjaxinatePagination")[0].style.display = 'none';
        }
      }
    }
  } else {
    console.log("False");
    loadmore_btn.addEventListener('click', function (e) {
      console.log('Clicked LBT');

      let newpage = parseInt(box.getAttribute('current')) + 1
      box.setAttribute('current', newpage)
      fetchNewPage(newpage)
    })
  }
});


// recommendation bundle post
function recommendationPost() {
  let pro_post = []
  const reco_submit = document.getElementById('reco_submit');
  reco_submit.addEventListener('click', function () {
    // console.log('Recomendation Clicked')
    let url = 'https://' + window.Shopify.shop + document.getElementById('recommendor').getAttribute('data-url').replace('products', 'products.json')
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        // console.log(data["products"])
        let pArray = (data["products"]);
        pArray.forEach(function (p) {
          products.push(p)
          let jsonObject = {
            id: p['variants'][0]['id'],
            quantity: 1
          }
          pro_post.push(jsonObject);
        })

        let formData = {
          'items': pro_post
        };
        console.log(formData)
        fetch(window.Shopify.routes.root + 'cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
          .then(response => {
            return response.json();
            console.log(response)
          }).then((response) => {
            cart_bt.click();
            // window.location.href = '/cart';
          })
          .catch((error) => {
            console.error('Error:', error);
          });

      })
      .catch((error) => {
        console.log(error);
      });
  })
}

function passToBundledPro(varId) {
  let x = localStorage.getItem('bundledPro')
  if (x == null) {
    let pros = [];
    pros.unshift(varId);
    localStorage.setItem("bundledPro", pros);
  } else {
    let y = localStorage.getItem('bundledPro').split(',');
    // let y = [];
    y.unshift(varId);
    let newsss = new Set()
    y.forEach(function (s) {
      newsss.add(s)
    })
    newsss = Array.from(newsss)
    localStorage.setItem("bundledPro", newsss);
  }
}

// 
if (targetElement.className.includes('cart-plus')) {
  event.preventDefault();
  let qtyGet = parseInt(targetElement.parentElement.getElementsByClassName('item-quantity')[0].value)
  qtyGet++
  targetElement.parentElement.getElementsByClassName('item-quantity')[0].value = qtyGet;
  let var_id = targetElement.parentElement.getElementsByTagName("input")[0].getAttribute("item-key");
  let erdiv = targetElement.parentElement.parentElement.parentElement.querySelector(".qty-error");

  let isInBundle = targetElement.closest('.cart-tble-row').getElementsByClassName('qtyAdjust')[0].getAttribute('bundled')
  let cartTable = targetElement.closest('.cart-tabl-body')
  let allRow = Array.from(document.getElementsByClassName('cart-tble-row'))
  if (isInBundle) {
    let ups = {};
    allRow.forEach(function (i) {
      if (i.getElementsByClassName('qtyAdjust')[0].getAttribute('bundled')) {
        let upKey = i.getElementsByClassName('item-quantity')[0].getAttribute('item-key')
        i.getElementsByClassName('item-quantity')[0].value = qtyGet;
        ups[upKey] = parseInt(qtyGet)
      }
    })
    console.log(ups);
    callForUpdate(ups)

  } else {
    changeCartItemNew(var_id, qtyGet, erdiv);
  }//
}


async function addComplementaryProduct() {
  let offerOn = document.querySelector('#cart_bt').getAttribute('offer')
  if (offerOn == "true") {
    let oCollection = document.querySelector('#cart_bt').getAttribute('offer-collection')
    let oProduct = document.querySelector('#cart_bt').getAttribute('offer-product-id')
    let colString = "";
    let inCartVars = new Set();
    document.querySelectorAll('.mini_cart_item').forEach(function (i) {
      let eachCollection = i.getAttribute('collection')
      colString += eachCollection
      inCartVars.add(i.querySelector('.qtyAdjust input').getAttribute('variant'))
    })
    console.log(inCartVars);
    let uniqueCols = new Set()
    let colArray = colString.split(',')
    colArray.forEach(function (c) {
      uniqueCols.add(c)
    })
    // console.log("Unique Has: ", uniqueCols.has(oCollection))

    if (uniqueCols.has(oCollection)) {
      if (inCartVars.has(oProduct)) {
        // console.log("Already Added");
      } else {
        let formData = {
          'items': [{
            'id': oProduct,
            'quantity': 1
          }]
        };

        await addToCartAsync(formData)
        updateCartDrawer();
      }
    } else {
      if (inCartVars.has(oProduct)) {
        await changeCallAsync(oProduct, 0)
        updateCartDrawer();
        updateMainCartTable()
      }
    }
  }
}


function changeCallAsync(id, qty) {
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
    return response.json();
  });
};

function addToCartAsync(formData) {
  fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => {
      return response.json();
    })
}



changeCallAsync(id, qty)

const getCards = localStorage.getItem('recents_p').split(',')
if (getCards.length > 1) {
  document.querySelector('.recent-products').style.display = 'flex';
} else {
  document.querySelector('.recent-products').style.display = 'none';
}
let rContainer = document.querySelector('.recent-row')
let limit = parseInt(rContainer.getAttribute('limit')) + 1;
let url_handle = (window.location.pathname).split('/').at(-1)

let looper = 0;
if (getCards.length < limit) {
  looper = getCards.length;
} else {
  looper = limit;
}

for (let i = 0; i < looper; i++) {

  if (url_handle == getCards[i]) {
    continue;
  } else {

    let cardDiv = document.createElement('div')
    rContainer.appendChild(cardDiv)
    fetch("https://jayesh-cirkle.myshopify.com/products/" + getCards[i] + "?view=card2").then(response => response.text()).then(data => {
      console.log(data);
      let card = dom.getElementsByClassName('product-card-jk')[0].outerHTML;
      cardDiv.innerHTML = card
    })
  }

}



//  =================================================

async function updateCartDrawer(cartData = null) {
  document.getElementById("mini_cart_main").innerHTML = `<div class="spin-wrapper spinner demo3"></div>`;

  // Use provided cart data or fetch it if not given
  if (!cartData) {
    cartData = await cartCallHtml(); // no "let" here
  }

  let pDoc = new DOMParser().parseFromString(cartData, "text/html");
  document.getElementById("mini_cart_main").innerHTML =
    pDoc.getElementById("mini_cart_main").innerHTML;
  addComplementaryProduct();
  performRecommendationsOnCart();
  Array.from(document.getElementsByClassName("free-shipping-limit")).forEach(function (i) {
    i.innerHTML = pDoc.getElementsByClassName("free-shipping-limit")[0].innerHTML;
  });

  if (document.getElementsByClassName('container-cart')[0]) {
    replaceCartBody();
  }
}



//  ============================= Custom Element Quantity manager start =======================
class MyQtyManager extends HTMLElement {
  constructor() {
    super();
    this._isBound = false;
  }
  connectedCallback() {
    if (this._isBound) return;
    let minusBtn = this.querySelector('[name="minus"]');
    let plusBtn = this.querySelector('[name="plus"]');
    let removeBtn = this.querySelector('.remove-btn');
    let inputField = this.querySelector('.item-quantity');
    let varId = this.getAttribute('variant');
    let itemKey = this.getAttribute('item-key');
    let errDiv = this.querySelector(".qty-error");

    this.addEventListener('click', (e) => {
      e.preventDefault(e);
      if (e.target === minusBtn) {
        let currentQty = parseInt(inputField.value);
        if (currentQty > 1) {
          inputField.value = currentQty - 1;
          this.dispatchEvent(new CustomEvent('qty-changed', { detail: { qty: currentQty - 1 } }));
        }
      } else if (e.target === plusBtn) {
        let currentQty = parseInt(inputField.value);
        inputField.value = currentQty + 1;
        this.dispatchEvent(new CustomEvent('qty-changed', { detail: { qty: currentQty + 1 } }));
      } else if (e.target === removeBtn) {
        console.log("Remove clicked");
        this.dispatchEvent(new CustomEvent('qty-changed', { detail: { qty: 0 } }));
        inputField.value = 0;
      }
    });

    this.addEventListener('qty-changed', (e) => {
      let newQty = e.detail.qty;
      changeCartItemNew(itemKey, newQty, errDiv);
      if (varId == shippingChargeVarId) {
        localStorage.setItem('sChargeManual', false)
      }
      newQty == 0 ? recommendationFetch() : null;
    })
  }
}
customElements.define("cart-qty-manager", MyQtyManager);
// ============================= Custom Element Quantity manager end =======================




async function sendItemToCart(var_id, quantity, formElement, errDiv) {
  event.preventDefault();
  if (formElement.reportValidity()) {
    let formData = new FormData(formElement)
    let data = await fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
    console.log(data);
    cartUpdateOnTheGo(data)
    if (data['message']) {
      errDiv.innerText = data['message'];
      cart_close.click();
    }

  } else {
    for (let element of formElement.elements) {
      if (element.validationMessage) {
        element.style.border = "1px solid red";
        console.log(`${element.name} error: ${element.validationMessage}`);
      }
    }
    toggle_cart.classList.remove("active");
  }
}

function addToCartBtn(btn) {
  let wrap = btn.parentElement.parentElement.parentElement.parentElement;
  let id = wrap.getElementsByClassName('qtyAdjust')[0].getElementsByClassName('item-quantity')[0].getAttribute('id')
  let qty = wrap.getElementsByClassName('qtyAdjust')[0].getElementsByClassName('item-quantity')[0].value
  let form = wrap.getElementsByClassName('shopify-product-form')[0]
  // btn.preventDefault();
  let errDiv = wrap.getElementsByClassName('qty-error-pdp')[0]
  sendItemToCart(id, qty, form, errDiv)
}



// ======================================================




document.body.addEventListener('click', function (e) {
  // console.log('Target: ', e.target); 
  if (e.target.matches('.minus')) {
    console.log('minus doc')
    let qtyGet = parseInt(e.target.closest('.pdp-hero-right-qty').querySelector('[name="quantity"]').value)
    qtyGet--
    qtyGet = qtyGet < 1 ? 1 : qtyGet;
    e.target.closest('.pdp-hero-right-qty').querySelector('[name="quantity"]').value = qtyGet;
  }
  else if (e.target.matches('.plus')) {
    let qtyGet = parseInt(e.target.closest('.pdp-hero-right-qty').querySelector('[name="quantity"]').value)
    qtyGet++
    e.target.closest('.pdp-hero-right-qty').querySelector('[name="quantity"]').value = qtyGet;
  } else if (e.target.matches('.add-to-cart')) {
    console.log("Add Cleickd");
    e.preventDefault();
    let wrap = e.target.closest('.main-pro-wrap')
    let varId = wrap.querySelector('[name="id"]').value
    let qty = wrap.querySelector('[name="quantity"]').value
    let formEl = wrap.querySelector('.product-form')
    let errDiv = wrap.querySelector('.err-message')
    sendItemToCart(varId, qty, formEl, errDiv);
  }
  else {
    console.log("Ele not found");
    // console.log(e.target);
  }
})


async function sendItemToCart(var_id, quantity, formElement, errDiv) {
  event.preventDefault();
  if (formElement.reportValidity()) {
    let formData = new FormData(formElement)
    let data = await fetch(window.Shopify.routes.root + 'cart/add.js', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
    console.log(data);
    // cartUpdateOnTheGo(data)
    if (data['message']) {
      errDiv.innerText = data['message'];
      cart_close.click();
    }

  } else {
    for (let element of formElement.elements) {
      if (element.validationMessage) {
        element.style.border = "1px solid red";
        console.log(`${element.name} error: ${element.validationMessage}`);
      }
    }
    toggle_cart.classList.remove("active");
  }
}


// ============================================ Con

// create a laravel project for personal notes

// like i can login
// i can write personal notes
// use vs web cause i need to take code notes
// keep all things dark, minimal images and minimal colors
// provide feature like can upload files which are linked to a note
// files linked to any notes should be visible in all files page
// provide search feature