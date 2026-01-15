
setTimeout(function () {

    let countryName = document.querySelector('[aria-controls="HeaderCountry-country-results"]').innerText
    console.log('Contry ::: ', countryName)
    let PDPstring = document.querySelector('.price-item').innerText
    let pdpNum = PDPstring.replace(/[^0-9]/g, '');
    console.log("PDP Price ::: ", pdpNum)
    let match = false;
    let appNum = "N/A"

    try {

        let appString = document.querySelector('.cs_FD_progress_dis_item ').innerText
        appNum = appString.replace(/[^0-9]/g, '');
        console.log("App Price ::: ", appNum)

        // match app and PDP price and make a green and red console log
        if (pdpNum == appNum) {
            console.log('%c Prices Match ✅ ', 'background: #222; color: #bada55');
            match = true;
        } else {
            console.log('%c Prices Do Not Match ❌ ', 'background: #222; color: #ff0000');
        }

    } catch (e) {
        console.log("Error in App Block")
        match = false;
    }

    let ccObj = {
        country: countryName,
        PDPprice: pdpNum,
        AppPrice: appNum,
        match: match
    }

    let alldata = JSON.parse(localStorage.getItem("cc")) || []
    // console.log(alldata)

    alldata.push(ccObj)
    localStorage.setItem("cc", JSON.stringify(alldata))
    console.log(alldata)

    // Next
    document.querySelector('.disclosure__link[aria-current="true"]').closest('li').nextSibling.querySelector('a').click()

}, 10000)



// ===================================================

let ccArray = JSON.parse(localStorage.getItem('cc'))

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

const csv = arrayToCSV(ccArray);
console.log(csv);

// Download CSV
function downloadCSV(csv, filename = "Compared_Price.csv") {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

downloadCSV(csv);

