
let allLinks = [
    "https://styleunion.in/collections/mens-casual-wear/products/regular-fit-solid-shirt-smss00014",
    "https://styleunion.in/collections/mens-casual-wear/products/regular-fit-structured-t-shirt-mfk00028",
    "https://styleunion.in/collections/mens-casual-wear/products/regular-fit-structured-t-shirt-msft00013"
]

let proJsonDataArray = [];

async function scrapper(links) {
    for (let i = 0; i < links.length; i++) {
        const res = await fetch(links[i]);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        let proData = JSON.parse(doc.getElementsByClassName('product-json')[0].innerHTML);

        proJsonDataArray.push(proData);
        console.log(`Fetched (${i + 1}/${links.length}):`, proData.title);

        await new Promise(r => setTimeout(r, 3000));
    }

    downloadJSON(proJsonDataArray, 'products.json');
}

function downloadJSON(data, filename) {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);   
}

scrapper(allLinks);