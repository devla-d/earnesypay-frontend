"use strict";
window.addEventListener("load", () => {
    let viewportHeight = window.innerHeight;
    adjustHeight(viewportHeight);
});
window.addEventListener("resize", () => {
    let viewportHeight = window.innerHeight;
    adjustHeight(viewportHeight);
});
const adjustHeight = (height) => {
    const dataView = document.querySelectorAll("[data-height-viewport]");
    for (let index = 0; index < dataView.length; index++) {
        dataView[index].setAttribute("style", `min-height:${height}px`);
    }
};
