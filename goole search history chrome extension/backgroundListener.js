chrome.tabs.onUpdated.addListener(function(tab, info, tabinfo){
    if(tabinfo.url.includes("chrome:// ") || tabinfo.url.includes("chrome-extension:// ")) return
  if(info.status === 'loading'){
        console.log(info)
        presentDate = Date.now
  chrome.runtime.sendMessage({action: "get referrer", tabId: tab.toString(), title: tabinfo.title, dateVistied : Date.now().toString(), url: tabinfo.url});
        chrome.tabs.executeScript(tab, {code: 'var x = {referrer : document.referrer, title: document.title };  x;'}, function(result){
            console.log(result)
            if(!result) return
            if( result[0].referrer.includes('https://www.google.com') ){
                  console.log('result was referred from ' + result[0].referrer);
                    chrome.storage.local.get(['googleVisitedUrls'], function(urlobject){
                          if(Object.keys(urlobject).length === 0 ){
                              chrome.storage.local.set({googleVisitedUrls: [
                      {title: result[0].title, url: tabinfo.url, date: Date.now().toString()}
                  ]}, function(){
                      console.log(result[0].title+' '+ tabinfo.url+' '+ Date.now().toString())
                      chrome.storage.local.get(null, function(urlobject){
                          console.log(urlobject)
                      })
                  })}else{
                        let vistedUrlArray, urlObjectToBePushed;
                                  chrome.storage.local.get(['googleVisitedUrls'],function(urlobject){
                                      vistedUrlArray = urlobject.googleVisitedUrls;
                                      urlObjectToBePushed = {title: result[0].title, url: tabinfo.url, date:  Date.now().toString()};
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

















































//let waiting = function(){
//        return new Promise(function(resolve,reject){
//            if info.status
//        })
//    }