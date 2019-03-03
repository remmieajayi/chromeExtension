
let consoleHistory = document.getElementById('consoleHistory'), historyDiv = document.getElementById('googleHistory')
  updateGoogleHistory()
function updateGoogleHistory(){
    historyDiv.innerHTML = ''
    let historyItemsArray = [];
    // search chrome's history for visited url's containing the google search url
    chrome.history.search({'text': '', startTime: 1134784305395}, function(HistoryItems){
            // containing goole search url ? push it to historyItemsArray
            HistoryItems.forEach(item => {
                if(item.url.includes("https://www.google.com/search?q")){
                     console.log(item)
                     historyItemsArray.push(item)
            }
            })
      
        getUpdate(historyItemsArray,historyDiv)

    
    });
 
};

function getUpdate(urlArray,targetDiv){
    let ul = document.createElement('ul'), header =  new Date(parseInt(urlArray[0].lastVisitTime)).toDateString(); h3 = document.createElement('h3'), headerContent = document.createTextNode(header);
    h3.appendChild(headerContent)
    ul.appendChild(h3)
    urlArray.forEach((urlobj, i, arr)=>{

			createLi(urlobj)
    function createLi(urlobj){
let itemDate = new Date(urlobj.lastVisitTime).toDateString();
console.log(itemDate)
        if (itemDate !== header){
	console.log('starting new list')
        if (ul.children.length == 0){
console.log('ul has no children, so chaging the ul,date.. automatically')
			console.log(ul.children.length)
            ul = document.createElement('ul'); header =  new Date(parseInt(urlArray[0].lastVisitTime)).toDateString() ;  h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
            h3.appendChild(headerContent);
            ul.appendChild(h3);
        }else{
		console.log('appennding ul to div')
            targetDiv.appendChild(ul);
             ul = document.createElement('ul'); header =  new Date(parseInt(urlArray[0].lastVisitTime)).toDateString(); h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
            h3.appendChild(headerContent);
            ul.appendChild(h3);
        }
        }
	console.log('creating li')
        let li = document.createElement('li'), a = document.createElement('a'), href = document.createAttribute('href'); title = document.createTextNode(urlobj.title)
        href.value = urlobj.url; 
        a.setAttributeNode(href);
        a.appendChild(title);
        li.appendChild(a);
        ul.appendChild(li)
        if(i === arr.length-1 ){
		console.log('appennding ul to last div')
            targetDiv.appendChild(ul);
             ul = document.createElement('ul'); header =  new Date(parseInt(urlArray[0].lastVisitTime)).toDateString(); h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
            h3.appendChild(headerContent);
            ul.appendChild(h3);
}
    }
    })
    
}    

let activator = document.getElementById('googleLinkedActivator')
 chrome.storage.local.get(['googleVisitedUrls'], function(urlObject){
        console.log(urlObject)
      getUpdate(urlObject.googleVisitedUrls, googleReferredDiv);
    }) ;
activator.addEventListener('click',function(){
    document.getElementById('googleReferred').innerHTML = ''
  chrome.storage.local.get(['googleVisitedUrls'], function(urlObject){
      console.log(urlObject)
    getUpdate(urlObject.googleVisitedUrls, googleReferredDiv);
     })  
})
 chrome.runtime.onMessage.addListener(function(request, sender, sendRespaonse){
     if(request.updateOnStart === "update googe referred history"){
         console.log('received message to update google linked')
     chrome.locals.get(['googleVisitedUrls'], function(urlObject){
        getUpdate(urlObject.googleVisitedUrls, googleReferredDiv);
    })
    }
})








































// function update(urlArray){
//     let googleReferredDiv = document.getElementById('googleReferred')
//     let ul = document.createElement('ul'), header = new Date(parseInt(urlArray[0].date)).toDateString(), h3 = document.createElement('h3'), headerContent = document.createTextNode(header);
//     h3.appendChild(headerContent)
//     ul.appendChild(h3)
// // 	googleReferredDiv.appendChild(ul)
//     urlArray.forEach((urlobj, i, arr)=>{

// 			createLi(urlobj)
//     function createLi(urlobj){
// let itemDate = new Date(parseInt(urlobj.date)).toDateString();
// console.log(itemDate)
//         if (itemDate !== header){
// 	console.log('starting new list')
//         if (ul.children.length == 0){
// console.log('ul has no children, so chaging the ul,date.. automatically')
// 			console.log(ul.children.length)
//             ul = document.createElement('ul'); header = new Date(parseInt(urlobj.date)).toDateString() ; h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
//             h3.appendChild(headerContent);
//             ul.appendChild(h3);
//         }else{
// 		console.log('appennding ul to div')
//             googleReferredDiv.appendChild(ul);
//              ul = document.createElement('ul'); header = new Date(parseInt(urlobj.date)).toDateString(); h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
//             h3.appendChild(headerContent);
//             ul.appendChild(h3);
//         }
//         }
// 	console.log('creating li')
//         let li = document.createElement('li'), a = document.createElement('a'), href = document.createAttribute('href'); title = document.createTextNode(urlobj.title)
//         href.value = urlobj.url; 
//         a.setAttributeNode(href);
//         a.appendChild(title);
//         li.appendChild(a);
//         ul.appendChild(li)
//         if(i === arr.length-1 ){
// 		console.log('appennding ul to last div')
//             googleReferredDiv.appendChild(ul);
//              ul = document.createElement('ul'); header = new Date(parseInt(urlobj.date)).toDateString(); h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
//             h3.appendChild(headerContent);
//             ul.appendChild(h3);
// }
//     }
//     })
    
// }