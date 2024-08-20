function func() {
    var isPink = false;
    document.body.style.background = isPink ? "red" : "pink";
    // isPink = !isPink;
}

function createButton() {
    const button = document.createElement("button");
    button.id = "hello";
    button.innerText = "Fuck";
    button.style.position = "absolute";
    button.style.top = "20px";
    button.style.right = "20px";
    document.body.appendChild(button);
}

document.getElementById("start").addEventListener("click", async () => {
    const baiduTabs = await chrome.tabs.query({
        url: "https://www.baidu.com/*",
    });

    console.log(baiduTabs);

    /*    chrome.scripting.executeScript({
        target: { tabId:baiduTabs[0].id },
        func
    }); */
    console.log("change color");
    baiduTabs.forEach((tab) => {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func,
        });
    });
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: addToPage,
    });
});

function addToPage() {
    const button = document.createElement("button");
    button.innerText = "Click me";
    button.addEventListener('click', function() {
        // Handle click event
    });
    document.body.appendChild(button);
}
