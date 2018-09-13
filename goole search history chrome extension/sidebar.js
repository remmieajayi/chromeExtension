let sidebarUrl = chrome.extension.getURL('sidebar.html')
let iframe = document.createElement('iframe'), sourceAttribute = document.createAttribute('src'), id = document.createAttribute('id');
sourceAttribute.value = sidebarUrl; id.value = 'customSearchSaverSidebar97'; iframe.setAttributeNode(sourceAttribute);  iframe.setAttributeNode(id)
document.getElementsByTagName('html')[0].appendChild(iframe)
