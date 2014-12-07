//Background Script
//This will run in background of browser, persistently across all pages
chrome.runtime.onMessage.addListener(function(input, sender, output) {

    //Switching the functionality based on request type
    switch (input.action) {

        //On getting new tab creation request
        case "createTab":
            //Opening new tab
            chrome.tabs.create({url: input.url});
            break;
    }

});

//Extension ICON action handler
chrome.browserAction.onClicked.addListener(function(tab) {
    //Telling the content script to process the imgur links and open new tabs
    chrome.tabs.sendMessage(tab.id, {action: "process_links"});
});