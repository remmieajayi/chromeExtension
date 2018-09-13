let consoleHistory = document.getElementById('consoleHistory'), historyDiv = document.getElementById('googleHistory');
  updateGoogleHistory()
function updateGoogleHistory(){
    historyDiv.innerHTML = ''
    let historItemsArray = [];
    chrome.history.search({'text': '', startTime: 1134784305395}, function(HistoryItems){
        chrome.history.getVisits({url: HistoryItems[0].url},function(results){
            console.log(results[0])
        })
            for (let i = 0; i<= HistoryItems.length-1; i++){
            let url = HistoryItems[i].url;
                if(url.includes('www.google.com.ng/search?q=')){
                    historItemsArray.push(HistoryItems[i])
                }
                
            }
//        getListDump(historItemsArray, historyDiv ); 
//        
//     function getListDump(urlArray, div){
//    let ul = document.createElement('ul');
//   urlArray.forEach(item => {
//       let li = document.createElement('li'), a = document.createElement('a'), text = document.createTextNode(item.title), href = document.createAttribute('href');
//      href.value = item.url;
//      a.setAttributeNode(href);
//       a.appendChild(text)
//      console.log(a)
//      li.appendChild(a);
//      console.log(li)
//      ul.appendChild(li);
//      console.log(ul);
//   })
//      
//  
//        div.appendChild(ul)
//        console.log(div)
//}
        getUpdate(historItemsArray)
    function getUpdate(urlArrar){
    let historyDiv = document.getElementById('googleHistory')
    let ul = document.createElement('ul'), header = new Date(parseInt(urlArrar[0].lastVisitTime)).toDateString(), h3 = document.createElement('h3'), headerContent = document.createTextNode(header);
    h3.appendChild(headerContent)
    ul.appendChild(h3)
// 	googleReferredDiv.appendChild(ul)
    urlArrar.forEach((urlobj, i, arr)=>{

			createLi(urlobj)
    function createLi(urlobj){
let itemDate = new Date(urlobj.lastVisitTime).toDateString();
console.log(itemDate)
        if (itemDate !== header){
	console.log('starting new list')
        if (ul.children.length == 0){
console.log('ul has no children, so chaging the ul,date.. automatically')
			console.log(ul.children.length)
            ul = document.createElement('ul'); header = new Date(urlobj.lastVisitTime).toDateString() ; h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
            h3.appendChild(headerContent);
            ul.appendChild(h3);
        }else{
		console.log('appennding ul to div')
            historyDiv.appendChild(ul);
             ul = document.createElement('ul'); header = new Date(urlobj.lastVisitTime).toDateString(); h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
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
            historyDiv.appendChild(ul);
             ul = document.createElement('ul'); header = new Date(parseInt(urlobj.lastVisitTime)).toDateString(); h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
            h3.appendChild(headerContent);
            ul.appendChild(h3);
}
    }
    })
    
}    
    });
 
};


function update(urlArrar){
    let googleReferredDiv = document.getElementById('googleReferred')
    let ul = document.createElement('ul'), header = new Date(parseInt(urlArrar[0].date)).toDateString(), h3 = document.createElement('h3'), headerContent = document.createTextNode(header);
    h3.appendChild(headerContent)
    ul.appendChild(h3)
// 	googleReferredDiv.appendChild(ul)
    urlArrar.forEach((urlobj, i, arr)=>{

			createLi(urlobj)
    function createLi(urlobj){
let itemDate = new Date(parseInt(urlobj.date)).toDateString();
console.log(itemDate)
        if (itemDate !== header){
	console.log('starting new list')
        if (ul.children.length == 0){
console.log('ul has no children, so chaging the ul,date.. automatically')
			console.log(ul.children.length)
            ul = document.createElement('ul'); header = new Date(parseInt(urlobj.date)).toDateString() ; h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
            h3.appendChild(headerContent);
            ul.appendChild(h3);
        }else{
		console.log('appennding ul to div')
            googleReferredDiv.appendChild(ul);
             ul = document.createElement('ul'); header = new Date(parseInt(urlobj.date)).toDateString(); h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
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
            googleReferredDiv.appendChild(ul);
             ul = document.createElement('ul'); header = new Date(parseInt(urlobj.date)).toDateString(); h3 = document.createElement('h3'); headerContent = document.createTextNode(header);
            h3.appendChild(headerContent);
            ul.appendChild(h3);
}
    }
    })
    
}
let activator = document.getElementById('googleLinkedActivator')
 chrome.storage.local.get(['googleVisitedUrls'], function(urlObject){
      update(urlObject.googleVisitedUrls);
    }) ;
activator.addEventListener('click',function(){
    console.log('i got it')
    document.getElementById('googleReferred').innerHTML = ''
  chrome.storage.local.get(['googleVisitedUrls'], function(urlObject){
      update(urlObject.googleVisitedUrls);
     })  
})
 chrome.runtime.onMessage.addListener(function(request, sender, sendRespaonse){
     if(request.updateOnStart === "update googe referred history"){
         console.log('received message to update google linked')
     chrome.locals.get(['googleVisitedUrls'], function(urlObject){
      update(urlObject.googleVisitedUrls);
    })
    }
})


