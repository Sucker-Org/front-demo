/* function func() {
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
  console.log("change color");
  baiduTabs.forEach((tab) => {
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func,
      });
  });
}); */

function addToPage() {
  const button = document.createElement("button");
  button.innerText = "Click me";
  button.style.position = "fixed";
  button.style.top = "100px";
  button.style.right = "44px";
  button.style.zIndex = "90000";
  button.style.backgroundColor = '#4e6ef2';
  button.addEventListener("click", function () {
      // Handle click event
  });
  document.body.appendChild(button);
}


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^https:\/\/(www\.)?weibo\.com/.test(tab.url)) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: addToPage,
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  console.log("addListener");
  // Execute your script when the extension icon is clicked
});
