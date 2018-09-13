chrome.tabs.onUpdated.addListener(function(tab, info, tabinfo){
  if(info.status === 'loading'){
        console.log(info)
        presentDate = Date.now
  chrome.runtime.sendMessage({action: "get referrer", tabId: tab.toString(), title: tabinfo.title, dateVistied : Date.now().toString(), url: tabinfo.url});
        chrome.tabs.executeScript(tab, {code: 'var x = document.referrer; x;'}, function(result){
            console.log(result[0])
            if( result[0].includes('https://www.google.com') ){
                  console.log('result was referred from ' + result);
                    chrome.storage.local.get(['googleVisitedUrls'], function(urlobject){
                          if(Object.keys(urlobject).length === 0 ){
                              chrome.storage.local.set({googleVisitedUrls: [
                      {title: tabinfo.title, url: tabinfo.url, date: Date.now().toString()}
                  ]}, function(){
                      console.log(tabinfo.title+' '+ tabinfo.url+' '+ Date.now().toString())
                      chrome.storage.local.get(null, function(urlobject){
                          console.log(urlobject)
                      })
                  })}else{
                        let vistedUrlArray, urlObjectToBePushed;
                                  chrome.storage.local.get(['googleVisitedUrls'],function(urlobject){
                                      vistedUrlArray = urlobject.googleVisitedUrls;
                                      urlObjectToBePushed = {title: tabinfo.title, url: tabinfo.url, date:  Date.now().toString()};
                                      vistedUrlArray.push(urlObjectToBePushed);
                                      chrome.storage.local.set({googleVisitedUrls: vistedUrlArray}, function(){
                                          chrome.storage.local.get(['googleVisitedUrls'], function(urlobject){
                                              console.log(urlobject)
                                          })
                                      })
                                  })
                              }
                      })
              }
        })
  console.log('message sent');
    }  
});
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
chrome.runtime.onStartup.addListener(function(){
    let sidebarUrl = chrome.extension.getURL('sidebar.html')
let iframe = document.createElement('iframe'), sourceAttribute = document.createAttribute('src'), id = document.createAttribute('id');
sourceAttribute.value = sidebarUrl; id.value = 'customSearchSaverSidebar97'; iframe.setAttributeNode(sourceAttribute);  iframe.setAttributeNode(id)
document.getElementsByTagName('html')[0].appendChild(iframe)
}); 

chrome.tabs.onCreated.addListener(function(Tab){
    chrome.tabs.executeScript(Tab.id,{code: 'alert(5)'})
})












































//let waiting = function(){
//        return new Promise(function(resolve,reject){
//            if info.status
//        })
//    }