const currencyRoundMap = {
    AFN: 100,
    ALL: 100,
    DZD: 100,
    AOA: 100,
    ARS: 1,
    AMD: 100,
    AWG: 1,
    AUD: 1,
    AZN: 1,
    BSD: 1,
    BDT: 100,
    BBD: 1,
    BZD: 1,
    BOB: 1,
    BAM: 1,
    BWP: 1,
    BRL: 1,
    GBP: 1,
    BND: 1,
    BGN: 1,
    BIF: 1,
    KHR: 1000,
    CAD: 1,
    CVE: 100,
    KYD: 1,
    XAF: 100,
    XPF: 100,
    CLP: 100,
    CNY: 1,
    COP: 1000,
    KMF: 100,
    CDF: 1000,
    CRC: 100,
    CZK: 1,
    DKK: 1,
    DJF: 100,
    DOP: 100,
    XCD: 1,
    EGP: 1,
    ETB: 1,
    EUR: 1,
    FKP: 1,
    FJD: 1,
    GMD: 1,
    GEL: 1,
    GTQ: 1,
    GNF: 1000,
    GYD: 100,
    HTG: 100,
    HNL: 1,
    HKD: 1,
    HUF: 100,
    ISK: 100,
    INR: 100,
    IDR: 1000,
    ILS: 1,
    JMD: 100,
    JPY: 100,
    KZT: 100,
    KES: 100,
    KGS: 100,
    LAK: 1000,
    LBP: 1000,
    LSL: 1,
    LRD: 100,
    MOP: 1,
    MKD: 100,
    MWK: 100,
    MYR: 1,
    MVR: 1,
    MUR: 1,
    MXN: 1,
    MDL: 1,
    MNT: 1000,
    MAD: 1,
    MZN: 100,
    MMK: 1000,
    NAD: 1,
    NPR: 100,
    ANG: 1,
    TWD: 1,
    NZD: 1,
    NIO: 1,
    NGN: 100,
    NOK: 1,
    PKR: 100,
    PGK: 1,
    PYG: 1000,
    PEN: 1,
    PHP: 100,
    PLN: 1,
    QAR: 1,
    RON: 1,
    RUB: 100,
    RWF: 100,
    WST: 1,
    STD: 1000,
    SAR: 1,
    RSD: 100,
    SCR: 1,
    SLL: 1000,
    SGD: 1,
    SBD: 1,
    ZAR: 1,
    KRW: 1000,
    LKR: 100,
    SHP: 1,
    SRD: 1,
    SZL: 1,
    SEK: 1,
    CHF: 1,
    TJS: 1,
    TZS: 1000,
    THB: 1,
    TOP: 1,
    TTD: 1,
    TRY: 1,
    UGX: 1000,
    UAH: 1,
    AED: 1,
    UYU: 1,
    USD: 1,
    UZS: 1000,
    VUV: 100,
    VND: 1000,
    XOF: 100,
    YER: 100,
    ZMW: 1
};


const price = 156555; // cents
const currency = 'USD';

function getRoundedPrice(priceInCents, currencyCode) {
    const roundBase = currencyRoundMap[currencyCode] || 1;
    const roundBy = roundBase * 100; // match Liquid: round_by | times: 100

    return Math.ceil(priceInCents / roundBy) * roundBy;
}

function formatMoney(cents, currency) {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency
    }).format(cents / 100);
}


// document.addEventListener('variant:change', function (event) {
//     const variant = event.detail.variant;
//     if (!variant) return;

//     const currencyCode = Shopify.currency.active; // e.g. "USD"
//     const roundedCents = getRoundedPrice(variant.price, currencyCode);

//     const priceEl = document.querySelector('[data-product-price]');
//     if (priceEl) {
//         priceEl.textContent = formatMoney(roundedCents, currencyCode);
//     }
// });

// manuall call



const rounded = getRoundedPrice(price * 100, currency);
console.log(rounded);
console.log(formatMoney(rounded, currency));
