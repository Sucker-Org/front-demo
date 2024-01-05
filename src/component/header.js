/*
 * @Email: allen0101stanton@outlook.com
 * @Author: Eric
 * @Description: 
 */
const header = () => {
    const header = document.createElement("div");
    header.id = "header";
    header.innerHTML = `<div class="header">
    <div class="header__logo">
        <a href="index.html" style="color:#fff">
           Sucker
        </a>
    </div>`;
    document.body.appendChild(header);
    const script = document.createElement("script");
    script.innerHTML = `fetch("header.html").then((response) => response.text()).then((data) => {document.getElementById("header").innerHTML = data;});`;
    document.body.appendChild(script);
}
header();


