function changeCartItemNew(varId, newQty, errorDiv) {
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
                if (document.getElementById('cart-count')) { document.getElementById('cart-count').innerText = data['item_count'] };
                if (document.getElementById('cart-items')) { document.getElementById('cart-items').innerText = data['item_count'] + ' Items' };
                if (document.getElementById('cart-subtotal')) { document.getElementById('cart-subtotal').innerText = Shopify.formatMoney(data['items_subtotal_price']) };
                if (document.getElementById('total-price')) { document.getElementById('total-price').innerText = Shopify.formatMoney(data['total_price']) };
                if (document.getElementById('original-total-cart')) { document.getElementById('original-total-cart').innerText = Shopify.formatMoney(data['original_total_price']) };
                if (document.getElementById("cart-subtotal-dr")) { document.getElementById("cart-subtotal-dr").innerText = Shopify.formatMoney(data["items_subtotal_price"]) };
            }
            if (data["item_count"] == 0) {
                updateCartDrawer();
                document.getElementById("cart-count").remove();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


//   drawer

function changeCartDrawerItem(varId, newQty, errorDiv) {
    // console.log(varId)
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
            if (data["message"]) {
                errorDiv.innerText = data["message"];
            } else if (data["item_count"] == 0) {
                console.log("Calling cart from 403")

                updateCartDrawer();
                document.getElementById("cart-count").remove();
            } else {
                document.getElementById("cart-count").innerText = data["item_count"];

            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
