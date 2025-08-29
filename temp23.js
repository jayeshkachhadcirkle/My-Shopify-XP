
try {
    document.querySelector('button[aria-label="Show HTML"]').click()
} catch {

}
setTimeout(function () {

    let divContent = document.querySelector('.cm-content').innerText;

    // Create a Blob from the div content
    let blob = new Blob([divContent], { type: 'text/plain' });

    // Create a link to download the file
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    function getLastSegmentFromBreadcrumb(text) {
        const parts = text.split('›').map(part => part.trim());
        return parts[parts.length - 1];
    }

    let saveName = getLastSegmentFromBreadcrumb(document.getElementsByClassName('Polaris-Text--root Polaris-Text--bodySm Polaris-Text--subdued')[0].innerText)

    link.download = saveName + '.txt'; // Name the file 'content.txt'
    link.click();

    let doc = new DOMParser().parseFromString(``, "text/html");


    doc.querySelectorAll('a[href]').forEach(anchor => {
        const href = anchor.getAttribute('href');

        console.log(anchor)
        // Skip if aria-label already exists
        if (anchor.hasAttribute('aria-label')) return;

        console.log(anchor.outerHTML)
        let label = prompt("Label for", anchor.innerHTML);

        anchor.setAttribute('aria-label', label);

        if (anchor.hasAttribute('aria-describedby')) {

        } else {
            anchor.setAttribute('aria-describedby', "Opens in a new window")
        }

        // divContent.innerText = doc.innerText
        // navigator.clipboard.writeText()

    });

    console.log(doc.body.innerHTML)

}, 1000)




let i = 0;
let runner = setInterval(function () {
    let blogBody;
    let id = abs[i]['rid']
    fetch("https://admin.shopify.com/api/shopify/mytravelpro?operation=ArticleDetails&type=query", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
            "apollographql-client-name": "core",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
            "sec-ch-ua-arch": "\"x86\"",
            "sec-ch-ua-bitness": "\"64\"",
            "sec-ch-ua-full-version": "\"138.0.7204.158\"",
            "sec-ch-ua-full-version-list": "\"Not)A;Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"138.0.7204.158\", \"Google Chrome\";v=\"138.0.7204.158\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": "\"\"",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-ch-ua-platform-version": "\"10.0.0\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "shopify-build-version": "5773.510ffafa6eecab629f049751977da37a13bf6f4d.0",
            "shopify-proxy-api-enable": "true",
            "target-manifest-route-id": "articles:update",
            "target-pathname": "/store/:storeHandle/content/articles/:id",
            "target-slice": "content-section",
            "traceparent": "00-9221a31164bbf81cb2daa98d0c19070b-5ac85a0dc0d1aa9e-01",
            "x-cloud-trace-context": "9221a31164bbf81cb2daa98d0c19070b/6541577473871686302;o=1",
            "x-csrf-token": "10p2Om9JW4-wMOd-om5OastwVRiyqOAKLrK438",
            "x-shopify-trace-context": "9221a31164bbf81cb2daa98d0c19070b/6541577473871686302;o=1",
            "x-shopify-trace-hint": "true",
            "x-shopify-web-force-proxy": "1"
        },
        "referrer": `https://admin.shopify.com/store/mytravelpro/content/articles/${id}`,
        "body": `{\"operationName\":\"ArticleDetails\",\"variables\":{\"hasArticleId\":true,\"articleId\":\"gid://shopify/OnlineStoreArticle/${id}\",\"blogsFirst\":150},\"query\":\"query ArticleDetails($articleId: ID!, $hasArticleId: Boolean!, $blogsFirst: Int!) {\\n  onlineStore {\\n    availableTemplateOptions(resourceType: ARTICLE)\\n    article(id: $articleId) @include(if: $hasArticleId) {\\n      ...ArticleDetailsFragment\\n      blog {\\n        id\\n        title\\n        handle\\n        commentPolicy\\n        __typename\\n      }\\n      defaultCursor\\n      relativeStorefrontPath\\n      __typename\\n    }\\n    blogs(first: $blogsFirst) {\\n      nodes {\\n        value: id\\n        label: title\\n        handle\\n        __typename\\n      }\\n      __typename\\n    }\\n    currentTheme {\\n      id\\n      __typename\\n    }\\n    __typename\\n  }\\n  shop {\\n    id\\n    storefrontURL: url\\n    features {\\n      storefront\\n      __typename\\n    }\\n    resourceLimits {\\n      redirectLimitReached\\n      __typename\\n    }\\n    showAppLinks: appLinks(type: ARTICLES, location: SHOW, resourceId: $articleId) @include(if: $hasArticleId) {\\n      ...AppLinksFragment\\n      __typename\\n    }\\n    newAppLinks: appLinks(type: ARTICLES, location: NEW) @skip(if: $hasArticleId) {\\n      ...AppLinksFragment\\n      __typename\\n    }\\n    __typename\\n  }\\n  currentUser: staffMember {\\n    id\\n    name\\n    __typename\\n  }\\n}\\n\\nfragment ArticleDetailsFragment on OnlineStoreArticle {\\n  id\\n  title\\n  body\\n  handle\\n  published\\n  publishDate\\n  summary\\n  seo {\\n    title\\n    description\\n    __typename\\n  }\\n  image {\\n    id\\n    altText\\n    src: url\\n    __typename\\n  }\\n  tags\\n  author {\\n    name\\n    __typename\\n  }\\n  templateSuffix\\n  __typename\\n}\\n\\nfragment AppLinksFragment on AppLink {\\n  id\\n  text\\n  url\\n  icon {\\n    id\\n    originalSrc: url\\n    __typename\\n  }\\n  __typename\\n}\\n\"}`,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    }).then(response => response.json()).then(data => {
        blogBody = data['data']['onlineStore']['article']['body']
        console.log(blogBody)

        let elem = new DOMParser().parseFromString(blogBody, 'text/html');

        let blob = new Blob([elem.body.innerHTML], { type: 'text/plain' });

        // Create a link to download the file
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);

        link.download = id + '.txt';
        link.click();

    })
    console.log("Finished : ", i);
    i++;
}, 5000)




// ======================= update =========================


fetch("https://admin.shopify.com/api/shopify/mytravelpro?operation=ArticleDetailsUpdate&type=mutation", {
    "headers": {
        "accept": "application/json",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "apollographql-client-name": "core",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
        "sec-ch-ua-arch": "\"x86\"",
        "sec-ch-ua-bitness": "\"64\"",
        "sec-ch-ua-full-version": "\"138.0.7204.158\"",
        "sec-ch-ua-full-version-list": "\"Not)A;Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"138.0.7204.158\", \"Google Chrome\";v=\"138.0.7204.158\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": "\"\"",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-ch-ua-platform-version": "\"10.0.0\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "shopify-build-version": "5773.510ffafa6eecab629f049751977da37a13bf6f4d.0",
        "shopify-proxy-api-enable": "true",
        "target-manifest-route-id": "articles:update",
        "target-pathname": "/store/:storeHandle/content/articles/:id",
        "target-slice": "content-section",
        "traceparent": "00-d18906d850d625305cf54872687c4184-33c04779d4e2dfbf-01",
        "x-cloud-trace-context": "d18906d850d625305cf54872687c4184/3729059080051023807;o=1",
        "x-csrf-token": "d8HbLVruZN-QnQDL5hC1qnUNBlWQT0BDOba5OA",
        "x-shopify-trace-context": "d18906d850d625305cf54872687c4184/3729059080051023807;o=1",
        "x-shopify-trace-hint": "true",
        "x-shopify-web-force-proxy": "1"
    },
    "referrer": "https://admin.shopify.com/store/mytravelpro/content/articles/555518394466",
    "body": `{"operationName":"ArticleDetailsUpdate","variables":{"id":"gid://shopify/OnlineStoreArticle/555518394466","article":{"body":"<p>&nbsp;</p>\\n<p class=\\"content-description\\">We get a lot of questions that we love answering about luggage and packing. But there is one popular inquiry we would not have thought to answer if you hadn’t asked – mainly because it’s a topic that we at Travelpro® take for granted:</p>\\n<p>What is the difference between luggage and baggage?</p>\\n<p>While people, both inside and outside of the travel industry, use these terms mutually, the definition of baggage and the definition of luggage vary. Their definitions are similar but with a subtly important difference.&nbsp;<span style=\\"font-weight: 400;\\"></span></p>\\n<h2>What is the Definition of Luggage?</h2>\\n<p class=\\"content-description\\">The meaning of <em>luggage</em> is the same in most dictionaries: “suitcases or other bags in which to pack personal belongings for travel; something lugged; bags and suitcases that contain possessions you take with you when traveling,” and so on.&nbsp;<span style=\\"font-weight: 400;\\">Even a </span><a aria-label=\\"Backpack vs Brief Article\\" href=\\"https://travelpro.com/pages/work-backpack-vs-briefcase-which-works-best-for-you\\" title=\\"Backpack vs Brief Article\\"><span style=\\"font-weight: 400;\\">work backpack or computer briefcase</span></a><span style=\\"font-weight: 400;\\"> can be called “luggage.”</span></p>\\n<p>In many cases, dictionaries include “baggage” in the luggage definition as a synonym. But can “baggage” always be used in place of the word “luggage” and vice versa?</p>\\n<p>Is <em>luggage vs. baggage</em> the same thing? And if not, what is the difference between luggage and baggage? To answer these questions, we first need to dig into <em>baggage</em> and its definition.</p>\\n<h2>What Does “Baggage” mean?</h2>\\n<p class=\\"content-description\\">At first glance, <em>baggage</em> and <em>luggage</em> seem to have the same definition, but look closer. <em>Baggage</em> is defined as: “personal belongings packed in suitcases for traveling.” So, in some cases, “baggage” refers to what is inside the bags.</p>\\n<p>Other baggage definitions are almost identical to luggage, including, “the trunks, bags, parcels, and suitcases you take while traveling.” Some dictionaries even list “luggage” in the definition, but there is more packed into <em>baggage.</em></p>\\n<p>In military terms, baggage refers to movable equipment and supplies that can be carried or hauled. The Old French word baggage, translates as “military equipment,\\" and bague, for \\"bag or bundle.\\" <em>Luggage</em> does not share this definition.</p>\\n<p>Finally, the most important difference between luggage vs. baggage is the subtext. While we use both words here at Travelpro®, baggage carries a different weight on the street.</p>\\n<p>If someone says, “You have a lot of baggage,” and you’re not hauling anything, consider yourself insulted. This baggage refers to emotions about the past getting in the way of the present. So, losing your baggage isn’t always a bad thing.</p>\\n<h2>What is the difference between luggage and baggage?</h2>\\n<p class=\\"content-description\\">In short, luggage is:</p>\\n<ul>\\n<li><span style=\\"font-weight: 400;\\">Suitcases and other containers used to carry your belongings while traveling</span></li>\\n</ul>\\n<p class=\\"content-description\\">And baggage is:</p>\\n<ul>\\n<li><span style=\\"font-weight: 400;\\">Suitcases and other containers used to carry your belongings while traveling</span></li>\\n<li><span style=\\"font-weight: 400;\\">The belongings carried in those suitcases and travel bags </span></li>\\n<li><span style=\\"font-weight: 400;\\">Military equipment and supplies that is moveable</span></li>\\n<li><span style=\\"font-weight: 400;\\">Emotional residue from past experience</span></li>\\n</ul>\\n<h2>The Travelpro® Commitment to Quality</h2>\\n<p class=\\"content-description\\">Whether we call it “luggage” vs. “baggage,”&nbsp;<span style=\\"font-weight: 400;\\">a </span><a aria-label=\\"carry-on luggage\\" href=\\"https://travelpro.com/collections/carry-on-luggage\\" title=\\"carry-on luggage\\"><span style=\\"font-weight: 400;\\">carry-on</span></a><span style=\\"font-weight: 400;\\">, </span><a aria-label=\\"checked luggage\\" href=\\"https://travelpro.com/collections/checked-luggage\\" title=\\"checked luggage\\"><span style=\\"font-weight: 400;\\">checked bag</span></a><span style=\\"font-weight: 400;\\">, </span><a aria-label=\\"duffel bags\\" href=\\"https://travelpro.com/collections/duffel-bags\\" title=\\"duffel bags\\"><span style=\\"font-weight: 400;\\">duffel bag</span></a><span style=\\"font-weight: 400;\\">, or your favorite travel companion, Travelpro® JKJKJKJKJK manufactures to the highest standards of quality with built-in durability and innovative features designed to make every trip the best it can be. Because how you get what you need where you are going is serious business, and nobody wants to have baggage about their luggage JK</span></p>"}},"extensions":{"client_context":{"page_view_token":"b9581f5e-b5b0-47bf-b9c2-ed0c948e4ece","client_route_handle":"articles:update","client_pathname":"/store/mytravelpro/content/articles/555518394466","client_normalized_pathname":"/store/:storeHandle/content/articles/:id","shopify_session_token":"0486c85e-67ca-423a-84bc-6bf50304bc00","shopify_multitrack_token":"0a99087b-3763-44E2-ABB9-0440E27B3DFC"}},"query":"mutation ArticleDetailsUpdate($id: ID!, $article: OnlineStoreArticleInput!, $blog: OnlineStoreArticleBlogInput) {\\n  onlineStoreArticleUpdate(id: $id, article: $article, blog: $blog) {\\n    userErrors {\\n      field\\n      message\\n      __typename\\n    }\\n    article {\\n      ...ArticleDetailsFragment\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment ArticleDetailsFragment on OnlineStoreArticle {\\n  id\\n  title\\n  body\\n  handle\\n  published\\n  publishDate\\n  summary\\n  seo {\\n    title\\n    description\\n    __typename\\n  }\\n  image {\\n    id\\n    altText\\n    src: url\\n    __typename\\n  }\\n  tags\\n  author {\\n    name\\n    __typename\\n  }\\n  templateSuffix\\n  __typename\\n}\\n"}`,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
}).then(res => res.json()).then(data => {
    console.log(data);
})




// {
//     "operationName": "ArticleDetailsUpdate",
//     "variables": {
//         "id": "gid://shopify/OnlineStoreArticle/555518394466",
//         "article": {
//             "body": `<p>&nbsp;</p>\n<p class=\"content-description\">We get a lot of questions that we love answering about luggage and packing. But there is one popular inquiry we would not have thought to answer if you hadn’t asked – mainly because it’s a topic that we at Travelpro® take for granted:</p>\n<p>What is the difference between luggage and baggage?</p>\n<p>While people, both inside and outside of the travel industry, use these terms mutually, the definition of baggage and the definition of luggage vary. Their definitions are similar but with a subtly important difference.&nbsp;<span style=\"font-weight: 400;\"></span></p>\n<h2>What is the Definition of Luggage?</h2>\n<p class=\"content-description\">The meaning of <em>luggage</em> is the same in most dictionaries: “suitcases or other bags in which to pack personal belongings for travel; something lugged; bags and suitcases that contain possessions you take with you when traveling,” and so on.&nbsp;<span style=\"font-weight: 400;\">Even a </span><a aria-label=\"Backpack vs Brief Article\" href=\"https://travelpro.com/pages/work-backpack-vs-briefcase-which-works-best-for-you\" title=\"Backpack vs Brief Article\"><span style=\"font-weight: 400;\">work backpack or computer briefcase</span></a><span style=\"font-weight: 400;\"> can be called “luggage.”</span></p>\n<p>In many cases, dictionaries include “baggage” in the luggage definition as a synonym. But can “baggage” always be used in place of the word “luggage” and vice versa?</p>\n<p>Is <em>luggage vs. baggage</em> the same thing? And if not, what is the difference between luggage and baggage? To answer these questions, we first need to dig into <em>baggage</em> and its definition.</p>\n<h2>What Does “Baggage” mean?</h2>\n<p class=\"content-description\">At first glance, <em>baggage</em> and <em>luggage</em> seem to have the same definition, but look closer. <em>Baggage</em> is defined as: “personal belongings packed in suitcases for traveling.” So, in some cases, “baggage” refers to what is inside the bags.</p>\n<p>Other baggage definitions are almost identical to luggage, including, “the trunks, bags, parcels, and suitcases you take while traveling.” Some dictionaries even list “luggage” in the definition, but there is more packed into <em>baggage.</em></p>\n<p>In military terms, baggage refers to movable equipment and supplies that can be carried or hauled. The Old French word baggage, translates as “military equipment,\" and bague, for \"bag or bundle.\" <em>Luggage</em> does not share this definition.</p>\n<p>Finally, the most important difference between luggage vs. baggage is the subtext. While we use both words here at Travelpro®, baggage carries a different weight on the street.</p>\n<p>If someone says, “You have a lot of baggage,” and you’re not hauling anything, consider yourself insulted. This baggage refers to emotions about the past getting in the way of the present. So, losing your baggage isn’t always a bad thing.</p>\n<h2>What is the difference between luggage and baggage?</h2>\n<p class=\"content-description\">In short, luggage is:</p>\n<ul>\n<li><span style=\"font-weight: 400;\">Suitcases and other containers used to carry your belongings while traveling</span></li>\n</ul>\n<p class=\"content-description\">And baggage is:</p>\n<ul>\n<li><span style=\"font-weight: 400;\">Suitcases and other containers used to carry your belongings while traveling</span></li>\n<li><span style=\"font-weight: 400;\">The belongings carried in those suitcases and travel bags </span></li>\n<li><span style=\"font-weight: 400;\">Military equipment and supplies that is moveable</span></li>\n<li><span style=\"font-weight: 400;\">Emotional residue from past experience</span></li>\n</ul>\n<h2>The Travelpro® Commitment to Quality</h2>\n<p class=\"content-description\">Whether we call it “luggage” vs. “baggage,”&nbsp;<span style=\"font-weight: 400;\">a </span><a aria-label=\"carry-on luggage\" href=\"https://travelpro.com/collections/carry-on-luggage\" title=\"carry-on luggage\"><span style=\"font-weight: 400;\">carry-on</span></a><span style=\"font-weight: 400;\">, </span><a aria-label=\"checked luggage\" href=\"https://travelpro.com/collections/checked-luggage\" title=\"checked luggage\"><span style=\"font-weight: 400;\">checked bag</span></a><span style=\"font-weight: 400;\">, </span><a aria-label=\"duffel bags\" href=\"https://travelpro.com/collections/duffel-bags\" title=\"duffel bags\"><span style=\"font-weight: 400;\">duffel bag</span></a><span style=\"font-weight: 400;\">, or your favorite travel companion, Travelpro® manufactures to the highest standards of quality with built-in durability and innovative features designed to make every trip the best it can be. Because how you get what you need where you are going is serious business, and nobody wants to have baggage about their luggage JK</span></p>`
//         }
//     },
//     "extensions": {
//         "client_context": {
//             "page_view_token": "b9581f5e-b5b0-47bf-b9c2-ed0c948e4ece",
//             "client_route_handle": "articles:update",
//             "client_pathname": "/store/mytravelpro/content/articles/555518394466",
//             "client_normalized_pathname": "/store/:storeHandle/content/articles/:id",
//             "shopify_session_token": "0486c85e-67ca-423a-84bc-6bf50304bc00",
//             "shopify_multitrack_token": "0a99087b-3763-44E2-ABB9-0440E27B3DFC"
//         }
//     },
//     "query": "mutation ArticleDetailsUpdate($id: ID!, $article: OnlineStoreArticleInput!, $blog: OnlineStoreArticleBlogInput) {\n  onlineStoreArticleUpdate(id: $id, article: $article, blog: $blog) {\n    userErrors {\n      field\n      message\n      __typename\n    }\n    article {\n      ...ArticleDetailsFragment\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ArticleDetailsFragment on OnlineStoreArticle {\n  id\n  title\n  body\n  handle\n  published\n  publishDate\n  summary\n  seo {\n    title\n    description\n    __typename\n  }\n  image {\n    id\n    altText\n    src: url\n    __typename\n  }\n  tags\n  author {\n    name\n    __typename\n  }\n  templateSuffix\n  __typename\n}\n"
// }



// author
// blogId
// handle
// publishDate
// published
// redirectNewHandle
// seo
// summary
// tags
// templateSuffix
// title


// reporting day 30072025
fetch("https://admin.shopify.com/api/shopify/jayesh-cirkle?operation=ArticleDetails&type=query", {
    "method": "POST",
    "headers": {
        "accept": "application/json",   
        "content-type": "application/json",
        "x-csrf-token": "zFUCEsPsfJ-6a3v2uBODEBfkO7pW_yGk36GeE0",
    },
    "body": "{\"operationName\":\"ArticleDetails\",\"variables\":{\"hasArticleId\":true,\"articleId\":\"gid://shopify/OnlineStoreArticle/569388662922\",\"blogsFirst\":150},\"query\":\"query ArticleDetails($articleId: ID!, $hasArticleId: Boolean!, $blogsFirst: Int!) {\\n  onlineStore {\\n    availableTemplateOptions(resourceType: ARTICLE)\\n    article(id: $articleId) @include(if: $hasArticleId) {\\n      ...ArticleDetailsFragment\\n      blog {\\n        id\\n        title\\n        handle\\n        commentPolicy\\n        __typename\\n      }\\n      defaultCursor\\n      relativeStorefrontPath\\n      __typename\\n    }\\n    blogs(first: $blogsFirst) {\\n      nodes {\\n        value: id\\n        label: title\\n        handle\\n        __typename\\n      }\\n      __typename\\n    }\\n    currentTheme {\\n      id\\n      __typename\\n    }\\n    __typename\\n  }\\n  shop {\\n    id\\n    storefrontURL: url\\n    features {\\n      storefront\\n      __typename\\n    }\\n    resourceLimits {\\n      redirectLimitReached\\n      __typename\\n    }\\n    showAppLinks: appLinks(type: ARTICLES, location: SHOW, resourceId: $articleId) @include(if: $hasArticleId) {\\n      ...AppLinksFragment\\n      __typename\\n    }\\n    newAppLinks: appLinks(type: ARTICLES, location: NEW) @skip(if: $hasArticleId) {\\n      ...AppLinksFragment\\n      __typename\\n    }\\n    __typename\\n  }\\n  currentUser: staffMember {\\n    id\\n    name\\n    __typename\\n  }\\n}\\n\\nfragment ArticleDetailsFragment on OnlineStoreArticle {\\n  id\\n  title\\n  body\\n  handle\\n  published\\n  publishDate\\n  summary\\n  seo {\\n    title\\n    description\\n    __typename\\n  }\\n  image {\\n    id\\n    altText\\n    src: url\\n    __typename\\n  }\\n  tags\\n  author {\\n    name\\n    __typename\\n  }\\n  templateSuffix\\n  __typename\\n}\\n\\nfragment AppLinksFragment on AppLink {\\n  id\\n  text\\n  url\\n  icon {\\n    id\\n    originalSrc: url\\n    __typename\\n  }\\n  __typename\\n}\\n\"}",
}).then(res => res.json()).then(data => {
    console.log(data)
})


// ================================ ====================================


fetch("https://api.appmate.io/v2/wishlists/mine/items", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "x-appmate-shp": "jayesh-cirkle.myshopify.com",
    "x-appmate-sid": "KyVogYFmBh",
    "x-appmate-src": "home",
    "x-appmate-vca": "true",
    "x-appmate-vcm": "true"
  },
  "referrer": "https://jayesh-cirkle.myshopify.com/",
  "body": "{\"productId\":8552076214410,\"variantId\":46259022135434}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});


fetch("https://api.appmate.io/v2/wishlists/mine/items", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "x-appmate-shp": "jayesh-cirkle.myshopify.com",
    "x-appmate-src": "home",
    "x-appmate-vca": "true",
    "x-appmate-vcm": "true" 
  },
  "referrer": "https://jayesh-cirkle.myshopify.com/",
  "body": "{\"productId\":8600702943370,\"variantId\":46418164842634}",
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});



KyVogYFmBh