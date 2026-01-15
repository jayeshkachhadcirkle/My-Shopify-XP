// =================== Scroller =================

let lastHeight = 0;
let sameHeightCount = 0;

let scrollInterval = setInterval(() => {
    window.scrollBy(0, window.innerHeight);

    let newHeight = document.body.scrollHeight;

    if (newHeight === lastHeight) {
        sameHeightCount++;
    } else {
        sameHeightCount = 0;
        lastHeight = newHeight;
    }

    if (sameHeightCount >= 3) {
        clearInterval(scrollInterval);
        console.log("No more content to load");
    }
}, 1000);

// ========================================= Links Array

let links = localStorage.getItem('restyLinks') || []
document.querySelectorAll('.jumbo-tracker').forEach(function (r) {
    let link = r.querySelector('a').href
    links.push(link)
})
let singleLinks = new Set(links)
let cleanLinks = [...singleLinks]
localStorage.setItem('restyLinks', JSON.stringify(cleanLinks))

console.log(cleanLinks)


    // ======================================== Data Extraction and Navigation


    (async function () {
        const links = JSON.parse(localStorage.getItem("restyLinks") || "[]");
        const tag = 'mumbai'
        if (!links.length) {
            console.error("No links found in localStorage");
            return;
        }

        let index = 0;

        async function loadNextPage() {
            if (index >= links.length) {
                console.log("All pages loaded");
                return;
            }

            const url = links[index];
            console.log("Loading:", url);

            try {
                const response = await fetch(url, { credentials: "same-origin" });
                const html = await response.text();

                // Replace entire document
                document.open();
                document.write(html);
                document.close();

                index++;

                let name = document.querySelector('h1').innerText
                let phone = document.querySelector('.sc-bFADNz .euONpu').querySelector('a').href
                let phone2 = phone.replace("tel:+", "")

                console.log(name, " ::: ", phone2)

                links.push({ name: name, phone: phone2, tag: tag, source: url })

                localStorage.setItem('restyLinks', JSON.stringify(links))

                setTimeout(loadNextPage, 3000);

            } catch (err) {
                console.error("Failed to load:", url, err);
            }
        }

        loadNextPage();
    })();



rr.forEach(function (r) {

    let cleanNo = r.phone.replace("tel:+", "")
    r.phone = cleanNo

})



// ================== CSV Download =====================

// let ccArray = JSON.parse(localStorage.getItem('cc'))

function arrayToCSV(arr) {
    if (!arr.length) return "";

    const headers = Object.keys(arr[0]);
    const escape = (value) =>
        `"${String(value).replace(/"/g, '""')}"`;

    const rows = arr.map(obj =>
        headers.map(h => escape(obj[h] ?? "")).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
}

const csv = arrayToCSV(rr);
console.log(csv);

// Download CSV
function downloadCSV(csv, filename = Date.now() + "z.csv") {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

downloadCSV(csv);


