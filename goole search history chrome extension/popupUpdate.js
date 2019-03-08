{
  let historyDiv = document.getElementById("googleHistory"),
    googleReferredDiv = document.getElementById("googleReferred");

  //  update required div with google search history
  updateGoogleHistory();

  // get google visted urls from chrome's local storage && update required div
  chrome.storage.local.get(["googleVisitedUrls"], function(urlObject) {
    console.log(urlObject);
    getUpdate(urlObject.googleVisitedUrls.reverse(), googleReferredDiv);
  });

  // refresh visited from google div when navigated to
  let activator = document.getElementById("googleLinkedActivator");
  activator.addEventListener("click", function() {
    document.getElementById("googleReferred").innerHTML = "";
    chrome.storage.local.get(["googleVisitedUrls"], function(urlObject) {
      getUpdate(urlObject.googleVisitedUrls, googleReferredDiv);
    });
  });

  function updateGoogleHistory() {
    historyDiv.innerHTML = "";
    let historyItemsArray = [];
    // search chrome's history for visited url's containing the google search url
    chrome.history.search({ text: "", startTime: 1134784305395 }, function(
      HistoryItems
    ) {
      // containing goole search url ? push it to historyItemsArray
      HistoryItems.forEach(item => {
        if (item.url.includes("https://www.google.com/search?q")) {
          historyItemsArray.push(item);
        }
      });

      getUpdate(historyItemsArray, historyDiv);
    });
  }
  function getUpdate(urlArray, targetDiv) {
    generateHeaderDate = dateItem => {
      let dateString;
      dateItem.lastVisitTime
        ? (dateString = new Date(
            parseInt(dateItem.lastVisitTime)
          ).toDateString())
        : (dateString = new Date(parseInt(dateItem.date)).toDateString());
      return dateString;
    };
    let ul = document.createElement("ul"),
      header = generateHeaderDate(urlArray[0]);
    (h3 = document.createElement("h3")),
      (headerContent = document.createTextNode(header));
    h3.appendChild(headerContent);
    ul.appendChild(h3);
    urlArray.forEach((urlobj, i, arr) => {
      createLi(urlobj);
      function createLi(urlobj) {
        let itemDate = generateHeaderDate(urlobj);
        console.log(itemDate);
        if (itemDate !== header) {
          console.log("starting new list");
          if (ul.children.length == 0) {
            console.log(
              "ul has no children, so chaging the ul,date.. automatically"
            );
            console.log(ul.children.length);
            ul = document.createElement("ul");
            header = generateHeaderDate(urlobj);
            h3 = document.createElement("h3");
            headerContent = document.createTextNode(header);
            h3.appendChild(headerContent);
            ul.appendChild(h3);
          } else {
            console.log("appennding ul to div");
            targetDiv.appendChild(ul);
            ul = document.createElement("ul");
            header = generateHeaderDate(urlobj);
            h3 = document.createElement("h3");
            headerContent = document.createTextNode(header);
            h3.appendChild(headerContent);
            ul.appendChild(h3);
          }
        }
        console.log("creating li");
        let li = document.createElement("li"),
          img = document.createElement("img"),
          favsrc = document.createAttribute("src"),
          a = document.createElement("a"),
          href = document.createAttribute("href");
        (title = document.createTextNode(urlobj.title)),
          (faviconUri = urlobj.url.includes("https://www.google.com/search?q")
            ? "../assets/icons/googleSearch.png"
            : `https://www.google.com/s2/favicons?domain=${urlobj.url}`);
        favsrc.value = faviconUri;
        img.setAttributeNode(favsrc);
        href.value = urlobj.url;
        a.setAttributeNode(href);
        a.appendChild(title);
        li.appendChild(img);
        li.appendChild(a);
        ul.appendChild(li);
        if (i === arr.length - 1) {
          console.log("appennding ul to last div");
          targetDiv.appendChild(ul);
          ul = document.createElement("ul");
          header = generateHeaderDate(urlobj);
          h3 = document.createElement("h3");
          headerContent = document.createTextNode(header);
          h3.appendChild(headerContent);
          ul.appendChild(h3);
        }
      }
    });
  }
}


