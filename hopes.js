var zIndex = 1;
var container = document.getElementById("container");
var paperWidth = 150,
    paperHeight = 40;
var vWidth = document.documentElement.clientWidth,
    vHeight = document.documentElement.clientHeight;
var input = document.getElementsByTagName("input")[0];
var span = document.getElementsByTagName("span");
//拖拽功能
window.onmousedown = function (e) {
    var div = getMoveDiv(e.target);
    if (!div) {
        return;
    }
    div.style.zIndex = zIndex;
    zIndex++;
    var style = getComputedStyle(div);
    var divLeft = parseFloat(style.left),
        divTop = parseFloat(style.top);
    // console.log(divLeft,divTop);
    window.onmousemove = function (e) {
        // console.log(e.movementX);
        divLeft += e.movementX;
        divTop += e.movementY;
        if(divLeft < 0) {
            divLeft = 0;
        }
        div.style.left = divLeft + "px";
        div.style.top = divTop + "px";
        
    }
    window.onmouseup = window.onmouseleave = function () {
        window.onmousemove = null;
    }
}
//得到可移动的div
function getMoveDiv(dom) {
    if (dom.className === "paper") {
        return dom;
    } else if (dom.parentElement && dom.parentElement.className === "paper" && dom.tagName === "P") {
        return dom.parentElement;
    }
}

//创建一个愿望
function CreatWish(words) {
    var div = document.createElement("div");
    div.className = "paper";
    div.innerHTML = `<p>${words}</p><span>X</span>`;
    //颜色随机
    div.style.backgroundColor = `rgb(${getRandom(100, 200)}, ${getRandom(100, 200)}, ${getRandom(100, 200)})`;
    //位置随机
    var maxLeft = document.documentElement.clientWidth - paperWidth,
        maxTop = document.documentElement.clientHeight - paperHeight - 250;
    div.style.left = getRandom(0, maxLeft) + "px";
    div.style.top = getRandom(0, maxTop) + "px";
    container.appendChild(div);
    //随机函数
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }
}

function createInitPapers() {
    var arr = ["周恒发", "王佳怡", "啦啦啦"];
    arr.forEach(function (item) {
        CreatWish(item);
    })
}
//当窗口尺寸发生变化时，重新调整paper的位置
window.onresize = function () {
    var disX = document.documentElement.clientWidth - vWidth,
        disY = document.documentElement.clientHeight - vHeight;

    // console.log(disX, disY);
    for (var i = 0; i < container.children.length; i++) {
        var paper = container.children[i];
        //改变paper的left值
        var left = parseFloat(paper.style.left),
            right = vWidth - paperWidth - left;
        var newLeft = left + left / (left + right) * disX;
        paper.style.left = newLeft + "px";
        //改变paper的top值
        var top = parseFloat(paper.style.top),
            bottom = vHeight - paperHeight - top;
        var newTop = top + top / (top + bottom) * disY;
        paper.style.top = newTop + "px";
    }
    vWidth = document.documentElement.clientWidth;
    vHeight = document.documentElement.clientHeight;
}

input.onkeypress = function (e) {
    if (e.key === "Enter") {
        if (this.value) {
            CreatWish(this.value);
            this.value = "";
        }
    }
}

//关闭功能
window.onclick = function (e) {
    if(e.target.parentElement && e.target.parentElement.className === "paper" && e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
}

createInitPapers();