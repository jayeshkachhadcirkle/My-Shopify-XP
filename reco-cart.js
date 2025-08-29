function performRecommendationsOnCart() {
    // let recommendor = document.getElementsByClassName('cart-reco-container')[0]
    let recommendors = Array.from(document.getElementsByClassName('cart-reco-container'))

    recommendors.forEach(function (recommendor) {

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
                    let counts = parseInt(recommendor.getElementsByClassName('cart-reco-container-row')[0].getAttribute('reco-count'))
                    if (counts > 2) {
                        setTimeout(function () {
                            let parent = productRecommendationsSection.parentElement.parentElement.parentElement
                            console.log(parent);
                            newCartRecoSlider(2);
                        }, 200)
                    }
                })
                .catch(e => {
                    console.error(e);
                });
        } else {
            setTimeout(function () {
                newCartRecoSlider(2);
            }, 200)
        }
    })
}

function recommendationFetch() {
    const handleIntersection = (entries, observer) => {
        if (!entries[0].isIntersecting) return;

        observer.unobserve(productRecommendationsSection);
        const url = productRecommendationsSection.dataset.url;

        performRecommendationsOnCart()
    };
    const productRecommendationsSection = document.querySelector('.product-recommendations-carter');
    const observer = new IntersectionObserver(handleIntersection, { rootMargin: '0px 0px 0px 0px' });
    observer.observe(productRecommendationsSection);

}



let var_id = minus.parentElement.getElementsByTagName("input")[0].getAttribute("variant");
let erdiv = minus.parentElement.parentElement.parentElement.querySelector(".qty-error");
changeCartDrawerItem(var_id, currentQty, erdiv);
console.log(var_id);







https://jayesh-cirkle.myshopify.com/recommendations/products?section_id=cart-drawer&product_id=8542096982154&limit=10&intent=related

https://jayesh-cirkle.myshopify.com/recommendations/products?section_id=template--18277558288522__main&product_id=8542096982154&limit=10&intent=related
https://jayesh-cirkle.myshopify.com/recommendations/products?section_id=cart-drawer&product_id=8542096982154&limit=10&intent=related


https://jayesh-cirkle.myshopify.com/recommendations/products?section_id=template--18277558288522__main&product_id=8542096982154&limit=10&intent=related
https://jayesh-cirkle.myshopify.com/recommendations/products?section_id=cart-drawer&product_id=8542096982154&limit=10&intent=related
https://jayesh-cirkle.myshopify.com/recommendations/products?section_id=template--18277558288522__main&product_id=8542096982154&limit=10&intent=related
https://jayesh-cirkle.myshopify.com/recommendations/products?section_id=cart-drawer&product_id=8542096982154&limit=10&intent=related



function performRecommendationsOnCart(callfrom) {
    // let recommendor = document.getElementsByClassName('cart-reco-container')[0]
    let recommendors = Array.from(document.getElementsByClassName('cart-reco-container'))
    recommendors.forEach(function (recommendor) {


    })
}



// let recommendor = document.getElementsByClassName('mini_cart_body')[0];
// let productRecommendationsSection = recommendor.querySelector('.product-recommendations-carter');
// let mode = recommendor.getAttribute('mode');
// if (mode == "lastadded") {
//     let url = productRecommendationsSection.dataset.url;
//     fetch(url)
//         .then(response => response.text())
//         .then(text => {
//             // console.log(text);
//             let html = document.createElement('div');
//             html.innerHTML = text;
//             let recommendations = html.querySelector('.product-recommendations-carter');
//             if (recommendations && recommendations.innerHTML.trim().length) {
//                 productRecommendationsSection.innerHTML = recommendations.innerHTML;
//             }
//             let counts = parseInt(recommendor.getElementsByClassName('cart-reco-container-row')[0].getAttribute('reco-count'))
//             if (counts > 2) {
//                 setTimeout(function () {
//                     let parent = productRecommendationsSection.parentElement.parentElement.parentElement
//                     console.log(parent);
//                     if (parent.getAttribute('template') == "cart") {
//                         newCartRecoSlider(5);
//                     } else {
//                         newCartRecoSlider(2);
//                     }
//                 }, 200)
//             }
//         })
//         .catch(e => {
//             console.error(e);
//         });
// } else {
//     setTimeout(function () {
//         let parent = productRecommendationsSection.parentElement.parentElement.parentElement
//         console.log(parent);
//         if (parent.getAttribute('template') == "cart") {
//             newCartRecoSlider(5);
//         } else {
//             newCartRecoSlider(2);
//         }
//     }, 200)
// }


let recommendor = document.getElementsByClassName('mini_cart_body')[0].getElementsByClassName('cart-reco-container')[0];
let productRecommendationsSection = recommendor.querySelector('.product-recommendations-carter');
let mode = recommendor.getAttribute('mode');
if (mode == "lastadded") {
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
            let counts = parseInt(recommendor.getElementsByClassName('cart-reco-container-row')[0].getAttribute('reco-count'))
            if (counts > 2) {
                setTimeout(function () {
                    let parent = productRecommendationsSection.parentElement.parentElement.parentElement
                    // console.log(parent);
                    newCartRecoSlider(2);
                }, 200)
            }
        })
        .catch(e => {
            console.error(e);
        });
} else {
    setTimeout(function () {
        let parent = productRecommendationsSection.parentElement.parentElement.parentElement
        newCartRecoSlider(2);
    }, 200)
}