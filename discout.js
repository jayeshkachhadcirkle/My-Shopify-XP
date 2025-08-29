// We're looking to hire a developer experienced in Shopify + Recharge API to build a custom in-cart subscription toggle. We do not want the usual "subscribe & save" buttons under each product, instead, we want a single button at the bottom of the cart that says: "Autoship this order and save 10%" Basic summary of work needed... One-click toggle at bottom of cart (not per product): Converts all cart items to subscription items. Customer chooses delivery frequency (2 weeks, 1 month, or 2 months). 


// Dynamic discount logic: Only apply the 10 % discount to non - sale items.Items already discounted(e.g.with a strikethrough price or in our Shopify "Sale" collection) should remain at their current price. 

// If all items are already discounted, display a message like: "You're already receiving the best price, Autoship now to lock in this discount for future orders." Popup at checkout click: When customer clicks "Go to Checkout" and hasn't selected autoship yet, show a popup offering to upgrade to autoship. If they accept, run the above logic. If they decline, proceed to checkout as normal. Conditional visibility is really important too as we want to minimise low AOV subscriptions... 


// The autoship toggle / button should only appear when the cart subtotal is over £25. If items are removed and the total drops below £25, the button disappears unless autoship was already selected, in which case it stays visible.Dynamic discount validation is super important too... Recharge doesn't support partial discounting (only some products), so this solution must dynamically apply the 10% discount to only qualifying items.
//  Since products regularly go on / off sale, we want this handled dynamically using logic such as: If compare_at_price > 0 Or, if product is in the Shopify "Sale" collection We want the solution to be reliable despite theme updates or Recharge app changes.


// We're open to using Mechanic or other supporting apps if necessary. Lastly, if you believe Recharge isn't the best tool for this approach, we're open to hearing whether Skio or Loop would be better suited for this kind of subscription UX. We'd also like your view on how to future - proof the setup.Please provide a estimate of feasibility, a quote and timeframe for the build.Examples of similar work would be appreciated.Thank you!


// koi na jane kithho aaya hai tu sabke dilon me 



// 10 % off discount code 

// 1920139402  = 2 week
// 1920172170  = 1 month
// 1920204938  = 2 month

// No off

// 1920303242  = 2 week
// 1920336010  = 1 month
// 1920368778  = 2 month




fetch("https://subscriptions-app-remix.shopify.prod.shopifyapps.com/app/plans/952991882.data?embedded=1&hmac=46256e5e423b1d9f0d38b9873b4d5a8150742f4441593e0c203a96b2d69c925e&host=YWRtaW4uc2hvcGlmeS5jb20vc3RvcmUvamF5ZXNoLWNpcmtsZQ&id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczpcL1wvamF5ZXNoLWNpcmtsZS5teXNob3BpZnkuY29tXC9hZG1pbiIsImRlc3QiOiJodHRwczpcL1wvamF5ZXNoLWNpcmtsZS5teXNob3BpZnkuY29tIiwiYXVkIjoiMTcxZjE1ZDNkZGRlNTkzZTk4NjhiNWVjNDg5YjliZWMiLCJzdWIiOiI5MzYzNDY1ODQ0MiIsImV4cCI6MTc1NjE4MTk0MywibmJmIjoxNzU2MTgxODgzLCJpYXQiOjE3NTYxODE4ODMsImp0aSI6IjRlZWIyMDA4LWRhODMtNGRiOS1hOWY3LWIyZjNmYWYzYmY4ZSIsInNpZCI6IjI2MDVmMjhkLTRkNmUtNDQyOC1hODAzLThhOTVkMDdmNGVmOSIsInNpZyI6IjZlNDRlNzFjOGNhYzE5Njc3MDQ3MGIwZDQ2MGIzOGQwMGZlNjAyZmZiOTlmYjM0YThlZGE4MGE4ZmM1NmRkZDkifQ.nR-k7KAY6iaVplFRzDwIY8rkIQFtVe-VNXrJWjWOTp4&locale=en&session=845743439de2292874621cfe55f5f312705ef26335dbb9747002b300a7d44c93&shop=jayesh-cirkle.myshopify.com&timestamp=1756181883", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en",
        "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczpcL1wvamF5ZXNoLWNpcmtsZS5teXNob3BpZnkuY29tXC9hZG1pbiIsImRlc3QiOiJodHRwczpcL1wvamF5ZXNoLWNpcmtsZS5teXNob3BpZnkuY29tIiwiYXVkIjoiMTcxZjE1ZDNkZGRlNTkzZTk4NjhiNWVjNDg5YjliZWMiLCJzdWIiOiI5MzYzNDY1ODQ0MiIsImV4cCI6MTc1NjE4MjI4MywibmJmIjoxNzU2MTgyMjIzLCJpYXQiOjE3NTYxODIyMjMsImp0aSI6ImRjZTEyZWY5LTk0MDctNGFjZi05MDljLWY3N2M3YjM0ZWUzYyIsInNpZCI6IjI2MDVmMjhkLTRkNmUtNDQyOC1hODAzLThhOTVkMDdmNGVmOSIsInNpZyI6IjBmYjczZWJmMTY3NWI5MTNhNTM2NjYzOGQ2OTk3ZGMzYjMxMzQ3ZjViMDZjOTRjMzE1Y2NmYTI2MWZmMWE1MjAifQ.J-iVdKpzo-Dkxl_vnqLec5jew_AvghexL5wOl5Y_ZSI",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-fetch-storage-access": "active",
        "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://subscriptions-app-remix.shopify.prod.shopifyapps.com/app/plans/952991882?embedded=1&hmac=46256e5e423b1d9f0d38b9873b4d5a8150742f4441593e0c203a96b2d69c925e&host=YWRtaW4uc2hvcGlmeS5jb20vc3RvcmUvamF5ZXNoLWNpcmtsZQ&id_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczpcL1wvamF5ZXNoLWNpcmtsZS5teXNob3BpZnkuY29tXC9hZG1pbiIsImRlc3QiOiJodHRwczpcL1wvamF5ZXNoLWNpcmtsZS5teXNob3BpZnkuY29tIiwiYXVkIjoiMTcxZjE1ZDNkZGRlNTkzZTk4NjhiNWVjNDg5YjliZWMiLCJzdWIiOiI5MzYzNDY1ODQ0MiIsImV4cCI6MTc1NjE4MTk0MywibmJmIjoxNzU2MTgxODgzLCJpYXQiOjE3NTYxODE4ODMsImp0aSI6IjRlZWIyMDA4LWRhODMtNGRiOS1hOWY3LWIyZjNmYWYzYmY4ZSIsInNpZCI6IjI2MDVmMjhkLTRkNmUtNDQyOC1hODAzLThhOTVkMDdmNGVmOSIsInNpZyI6IjZlNDRlNzFjOGNhYzE5Njc3MDQ3MGIwZDQ2MGIzOGQwMGZlNjAyZmZiOTlmYjM0YThlZGE4MGE4ZmM1NmRkZDkifQ.nR-k7KAY6iaVplFRzDwIY8rkIQFtVe-VNXrJWjWOTp4&locale=en&session=845743439de2292874621cfe55f5f312705ef26335dbb9747002b300a7d44c93&shop=jayesh-cirkle.myshopify.com&timestamp=1756181883",
    "body": "planName=10%25+off&merchantCode=10%25+discount&productSearch=&selectedProductIds=gid%3A%2F%2Fshopify%2FProduct%2F8554361421962%2Cgid%3A%2F%2Fshopify%2FProduct%2F8631976231050%2Cgid%3A%2F%2Fshopify%2FProduct%2F8580412473482&selectedVariantIds=&removedProductIds=&removedVariantIds=&offerDiscount=true&shopCurrencyCode=USD&discountType=PERCENTAGE&discountDeliveryOptions%5B0%5D.id=gid%3A%2F%2Fshopify%2FSellingPlan%2F1920139402&discountDeliveryOptions%5B0%5D.deliveryFrequency=2&discountDeliveryOptions%5B0%5D.deliveryInterval=WEEK&discountDeliveryOptions%5B0%5D.discountValue=10&discountDeliveryOptions%5B1%5D.id=gid%3A%2F%2Fshopify%2FSellingPlan%2F1920172170&discountDeliveryOptions%5B1%5D.deliveryFrequency=1&discountDeliveryOptions%5B1%5D.deliveryInterval=MONTH&discountDeliveryOptions%5B1%5D.discountValue=10&discountDeliveryOptions%5B2%5D.id=gid%3A%2F%2Fshopify%2FSellingPlan%2F1920204938&discountDeliveryOptions%5B2%5D.deliveryFrequency=2&discountDeliveryOptions%5B2%5D.deliveryInterval=MONTH&discountDeliveryOptions%5B2%5D.discountValue=10",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
}).then(res => res.json()).then(data => console.log(data));