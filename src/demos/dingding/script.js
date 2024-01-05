const animationCard = document.getElementById("animation-card");
const dom = document.querySelector(".dom");
const list = document.querySelector(".list");

const animation = (scrollStart,scrollEnd) => {
    const opacity = (x)=>{
        // 根据x的值来计算opacity的值，opacity的值在0.5-1之间
        return (x+100)/200+0.5;
    };
    return opacity;
//   animationCard.style.transition = "all 0.5s ease";
//   animationCard.style.transform = `translateX(${x}px)`;
};
