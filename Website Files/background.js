try{

    chrome.tabs.onUpdate.addListener(function(tabId, changeInfo, tab)
    {
        if(changeInfo.status == 'complete')
        {
            chrome.scripting.executeScript({
                files: ['detector.js'],
                target: {tabId: tab.id}
            });
        }
    });

} catch(e)
{
    console.log(e);
}

