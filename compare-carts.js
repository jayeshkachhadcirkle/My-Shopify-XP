if (targetElement.matches('.cart-minus')) {
    e.preventDefault();
    console.log('minus doc')
    let qtyGet = parseInt(targetElement.parentElement.getElementsByClassName('item-quantity')[0].value)
    qtyGet--
    qtyGet = qtyGet < 1 ? 1 : qtyGet;
    targetElement.parentElement.getElementsByClassName('item-quantity')[0].value = qtyGet;
    let var_id = targetElement.parentElement.getElementsByTagName("input")[0].getAttribute("item-key");
    let erdiv = targetElement.closest('.cart-tble-row').querySelector(".qty-error");
    let isInBundle = targetElement.closest('.cart-tble-row').getElementsByClassName('qtyAdjust')[0].getAttribute('bundled')
    let bundleId = targetElement.closest('.cart-tble-row').getElementsByClassName('qtyAdjust')[0].getAttribute('bundleId')
    if (isInBundle) {
        bundleQtyUpdate(bundleId, qtyGet, "cart-tble-row")
    } else {
        changeCartItemNew(var_id, qtyGet, erdiv);
    }

    console.log(var_id);
}
else if (targetElement.matches('.cart-plus')) {
    e.preventDefault();
    let qtyGet = parseInt(targetElement.parentElement.getElementsByClassName('item-quantity')[0].value)
    qtyGet++
    targetElement.parentElement.getElementsByClassName('item-quantity')[0].value = qtyGet;
    let var_id = targetElement.parentElement.getElementsByTagName("input")[0].getAttribute("item-key");
    let erdiv = targetElement.closest('.cart-tble-row').querySelector(".qty-error");
    let isInBundle = targetElement.closest('.cart-tble-row').getElementsByClassName('qtyAdjust')[0].getAttribute('bundled')
    let bundleId = targetElement.closest('.cart-tble-row').getElementsByClassName('qtyAdjust')[0].getAttribute('bundleId')
    if (isInBundle) {
        bundleQtyUpdate(bundleId, qtyGet, "cart-tble-row")
    } else {
        changeCartItemNew(var_id, qtyGet, erdiv);
    }//
}
else if (targetElement.matches('.item-remove-btn-main')) {
    e.preventDefault();
    let qtyGet = parseInt(targetElement.parentElement.parentElement.getElementsByClassName('item-quantity')[0].value)
    qtyGet = 0
    targetElement.parentElement.parentElement.getElementsByClassName('item-quantity')[0].value = qtyGet;
    let lineItem = targetElement.closest('.cart-tble-row')
    let var_id = targetElement.parentElement.parentElement.getElementsByTagName("input")[0].getAttribute("item-key");
    let erdiv = lineItem.querySelector(".qty-error");
    let isInBundle = lineItem.getElementsByClassName('qtyAdjust')[0].getAttribute('bundled')
    let bundleId = lineItem.getElementsByClassName('qtyAdjust')[0].getAttribute('bundleId')
    let shippingVariant = lineItem.getElementsByClassName('item-quantity')[0].getAttribute('variant')
    if (shippingVariant == shippingChargeVarId) {
        localStorage.setItem('sChargeManual', false)
    }
    if (isInBundle) {
        bundleQtyUpdate(bundleId, qtyGet, "cart-tble-row")
    } else {
        targetElement.parentElement.parentElement.parentElement.remove();
        changeCartItemNew(var_id, qtyGet, erdiv);
        setTimeout(function () {
            recommendationFetch();
        }, 200)
    }
}

// ================================================

else if (targetElement.matches('.dr-minus')) {
    e.preventDefault();
    let lineItem = targetElement.closest('.mini_cart_item')
    let qtyGet = parseInt(targetElement.parentElement.getElementsByClassName('item-quantity')[0].value)
    qtyGet--
    qtyGet = qtyGet < 1 ? 1 : qtyGet;
    targetElement.parentElement.getElementsByClassName('item-quantity')[0].value = qtyGet;
    let var_id = targetElement.parentElement.getElementsByTagName("input")[0].getAttribute("item-key");
    let erdiv = lineItem.querySelector(".qty-error");
    let isInBundle = lineItem.getElementsByClassName('qtyAdjust')[0].getAttribute('bundled')
    let bundleId = lineItem.getElementsByClassName('qtyAdjust')[0].getAttribute('bundleId')
    if (isInBundle) {
        bundleQtyUpdate(bundleId, qtyGet, "mini_cart_item")
    } else {
        changeCartItemNew(var_id, qtyGet, erdiv);
    }//   
    console.log(var_id);
}
else if (targetElement.matches('.dr-plus')) {
    e.preventDefault();
    let lineItem = targetElement.closest('.mini_cart_item')
    let qtyGet = parseInt(targetElement.parentElement.getElementsByClassName('item-quantity')[0].value)
    qtyGet++
    targetElement.parentElement.getElementsByClassName('item-quantity')[0].value = qtyGet;
    let var_id = targetElement.parentElement.getElementsByTagName("input")[0].getAttribute("item-key");
    let erdiv = lineItem.querySelector(".qty-error");
    let isInBundle = lineItem.getElementsByClassName('qtyAdjust')[0].getAttribute('bundled')
    let bundleId = lineItem.getElementsByClassName('qtyAdjust')[0].getAttribute('bundleId')
    if (isInBundle) {
        bundleQtyUpdate(bundleId, qtyGet, "mini_cart_item")
    } else {
        changeCartItemNew(var_id, qtyGet, erdiv);
    }//      
    // changeCartItemNew(var_id, qtyGet, erdiv);
}
else if (targetElement.matches('.item-remove-btn-dr')) {
    console.log('Delete Clicked')
    e.preventDefault();
    let lineItem = targetElement.closest('.mini_cart_item')
    let qtyGet = parseInt(lineItem.getElementsByClassName('item-quantity')[0].value)
    qtyGet = 0
    lineItem.getElementsByClassName('item-quantity')[0].value = qtyGet;
    let var_id = targetElement.parentElement.parentElement.parentElement.getElementsByTagName("input")[0].getAttribute("item-key");
    let erdiv = lineItem.querySelector(".qty-error");
    let isInBundle = lineItem.getElementsByClassName('qtyAdjust')[0].getAttribute('bundled')
    let bundleId = lineItem.getElementsByClassName('qtyAdjust')[0].getAttribute('bundleId')
    let allRow = Array.from(document.getElementsByClassName('mini_cart_item'))
    let shippingVariant = lineItem.getElementsByClassName('item-quantity')[0].dataset.quantityVariantId
    if (shippingVariant == shippingChargeVarId) {
        console.log("Matched");
        localStorage.setItem('sChargeManual', false)
    }
    if (isInBundle) {
        bundleQtyUpdate(bundleId, qtyGet, "mini_cart_item")
    } else {
        targetElement.parentElement.closest('.mini_cart_item').style.display = 'none';
        changeCartItemNew(var_id, qtyGet, erdiv);
        setTimeout(function () {
            recommendationFetch();
        }, 200)
    }//   
}