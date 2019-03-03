let searchLink = document.getElementById('searchLink'), googleReferredDiv = document.getElementById('googleReferred'), fromGooglrLink = document.getElementById('visitedFromGoogleLink'), googleHistoryDiv= document.getElementById('googleHistory')
    searchLink.addEventListener('click',function(){
           
           googleReferredDiv.style.left = '400px'
           googleHistoryDiv.style.right = '0';
         googleHistoryDiv.style.height = 'auto'
           searchLink.classList.add('active-link');
           fromGooglrLink.classList.remove('active-link')
       });
fromGooglrLink.addEventListener('click',function(){
    
    googleHistoryDiv.style.right = '400px';
    googleReferredDiv.style.left = '0';
    googleReferredDiv.style.height = 'auto'
    fromGooglrLink.classList.add('active-link');
    searchLink.classList.remove('active-link')
})
googleHistoryDiv.addEventListener('transitionend',function(){
    if(googleHistoryDiv.style.right === '400px'){
        googleHistoryDiv.style.height = "0"
    }
});
googleReferredDiv.addEventListener('transitionend',function(){
    if(googleReferredDiv.style.left === '400px'){
        googleReferredDiv.style.height = '0'
    }
})