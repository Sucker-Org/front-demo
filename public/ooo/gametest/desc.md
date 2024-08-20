{
  // Required - 通俗易懂
  "manifest_version": 3,
  "name": "My Extension",
  "version": "versionString",

   // 『重点』action配置项主要用于点击图标弹出框，对于弹出框接受的是html文件
  "action": {
     "default_title": "Click to view a popup",
   	 "default_popup": "popup.html"
   }
    
  // 通俗易懂
  "default_locale": "en",
  "description": "A plain text description",
  "icons": {...},
  "author": ...,

  // 『重点』下面将出现的background.js 配置service work
  "background": {
    // Required
    "service_worker": "service-worker.js",
  },

    // 『重点』下面将出现content_script.js 应用于所有页面上下文的js
  "content_scripts": [
     {
       "matches": ["https://*.nytimes.com/*"],
       "css": ["my-styles.css"],
       "js": ["content-script.js"]
     }
   ],

    // 使用/添加devtools中的功能
  "devtools_page": "devtools.html",


    /**
    * 三个permission
    * host_permissions - 允许使用扩展的域名
    * permissions - 包含已知字符串列表中的项目 【只需一次弹框要求允许】
    * optional_permissions - 与常规类似permissions，但由扩展的用户在运行时授予，而不是提前授予【安全】
    * 列出常见选项
    * {
    *		activeTab: 当扩展卡选项被改变需要重新获取新的权限
    *		tabs: 操作选项卡api（改变位置等）
    *		downloads: 访问chrome.downloads API 的权限 便于下载但还是会受到跨域影响
    *		history: history api权限
    *		storage: 访问localstorage/sessionStorage权限
    * }
    */
  "host_permissions": ["http://*/*", "https://*/*"],
  "permissions": ["tabs"],
  "optional_permissions": ["downloads"],

    // 内部弹出可选页面 - 见fehelper操作页
  "options_page": "options.html",
  "options_ui": {
    "chrome_style": true,
    "page": "options.html"
  },
}
