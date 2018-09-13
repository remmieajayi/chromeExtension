/* Changes the background image based on the period of the day*/
let presentHourOfTheDay = new Date(Date.now()).getHours()
console.log(presentHourOfTheDay);
let body = document.getElementsByTagName('body')[0]
function returnPeriodOfTheDay(hourOfTheDay){
    console.log(hourOfTheDay)
let PeriodOfTheDay;
if (hourOfTheDay >= 5 && hourOfTheDay <= 11 ) {
  PeriodOfTheDay = "Morning"
}else if(hourOfTheDay >= 12 && hourOfTheDay <= 18 ){
	PeriodOfTheDay = "Afternoon"
}else if(  (hourOfTheDay >= 19 && hourOfTheDay <= 24) || (hourOfTheDay >= 1 && hourOfTheDay <= 4)   ){
	PeriodOfTheDay = "Night"
}
return PeriodOfTheDay
    console.log(PeriodOfTheDay)
}
let PeriodOfTheDay = returnPeriodOfTheDay(presentHourOfTheDay);
function changeBackgroundImage(PeriodOfTheDay){
    switch (PeriodOfTheDay){
        case "Morning":  body.style.backgroundImage = 'url(morning_background.jpg)' ;break;
        case "Afternoon": body.style.backgroundImage = 'url(afternoon_background.jpg)'; break;
        case "Night": body.style.backgroundImage = 'url(night_background.jpg)' ;break;
}
}
changeBackgroundImage(PeriodOfTheDay);
/*-------------------------------------------------------------------------------------------------------------------------------------*/




/* Working Digital Clock */
let time = document.getElementById('time');
window.setInterval(function(){
time.innerText = new Date(Date.now()).toLocaleTimeString()
}, 1000);
let dateCont = document.getElementById('date');
dateCont.innerText = new Date(Date.now()).toDateString()
/*--------------------------------------------------------------------------------------------------------------------------------*/




/* update Google History Divs*/
let googleReferredDiv = document.getElementById('googleReferred'), historyDiv = document.getElementById('googleHistory');
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
 updateGoogleHistory();
/*--------------------------------------------------------------------------------------------------------------------------------*/



/* update Google Referred Divs*/
function update(urlArrar){ 
    return new Promise(function(resolve,reject){
      let googleReferredDiv = document.getElementById('googleReferred');
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
            resolve( console.log('i just finished updating the divs'));
}
    }
    }
                    )
      
    }
                      )
    
}
  chrome.storage.local.get(['googleVisitedUrls'], function(urlObject){
      console.log(urlObject); console.log('i visited storage');
      update(urlObject.googleVisitedUrls).then( renderScrollBar());
    })
/*--------------------------------------------------------------------------------------------------------------------------------*/

/*custom scrollbar's slider height function*/
function renderScrollBar(){
  let gR = document.getElementById('googleReferred'), slider = document.getElementsByClassName('slider')[0];
    let gRDisplayHeight = gR.offsetHeight, gROriginHeight = gR.scrollHeight;console.log('gRDisplayHeight is  '+ gRDisplayHeight + 'gROriginHeight is '+ gROriginHeight);
    let sliderHeight = ((gRDisplayHeight/gROriginHeight) * 100) + '%';
    slider.style.height = sliderHeight;
    dragger()
}
/*-------------------------------------------------------------------------------------------------------------------------------------*/

/*custom scroll function + dragger*/
function dragger(){
    console.log('dragger called')
    let slider = document.getElementsByClassName('slider')[0], mouseDown = false, sliderTopPosition = slider.offsetTop, scrollBar = document.getElementsByClassName('scrollBar')[0], googleReferredDiv = document.getElementById('googleReferred')
    scrollBar.addEventListener('mousedown',function(){mouseDown = true});
    scrollBar.addEventListener('mouseup', function(){mouseDown = false})
    scrollBar.addEventListener('mouseout', function(){mouseDown = false})
    scrollBar.addEventListener('mousemove',function(e){
        if(mouseDown){
             let mousePosition = e.clientY; 
            let sliderNewPos = (mousePosition - sliderTopPosition);
            slider.style.marginTop = sliderNewPos;
        
        }else return                                      
                                                  });
    
    function parsePixels(px){
        let numString= ''
        for (i=0; i<=px.length-3; i++){
            numString += px[i]
        }
        return parseInt(numString)
    }
    googleReferredDiv.addEventListener('mousewheel', function(e){
        if(e.deltaY > 0){
            if(!slider.style.marginTop){
               slider.style.marginTop = "5px";
               googleReferredDiv.scrollBy(0,20)
            }else {
                slider.style.marginTop = (parsePixels(slider.style.marginTop) + 5) + 'px'
                googleReferredDiv.scrollBy(0,(parsePixels(slider.style.marginTop) + 5))
            }
        }else{
                if(slider.style.marginTop){
                    slider.style.marginTop = (parsePixels(slider.style.marginTop) - 5) + 'px';
                    googleReferredDiv.scrollBy(0,(parsePixels(slider.style.marginTop) + 5))
                }
        }
    })
}