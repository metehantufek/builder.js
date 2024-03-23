// Values
const scaleArr = ["█", "▓", "▒", "░"];
let resizeArr = [];
let resizeOngoing = false;

window.onresize = function() {
    if (resizeOngoing || resizeArr.length == 0) {
        return;
    }
    for (var i = 0; i < resizeArr.length; i++) {
        resizeArr[i].resize();
        resizeOngoing = true;        
    }
    resizeOngoing = false;
}

// Color string deciphering
const colorPicker = {
    "0": '#0C0C0C',
    "1": '#767676', 
    "2": '#C50F1F', 
    "3": '#E74856', 
    "4": '#13A10E', 
    "5": '#16C60C', 
    "6": '#C19C00', 
    "7": '#F9F1A5', 
    "8": '#0037DA', 
    "9": '#3B78FF',
    "a": '#881798', 
    "b": '#B4009E', 
    "c": '#3A96DD', 
    "d": '#61D6D6', 
    "e": '#CCCCCC', 
    "f": '#F2F2F2'
};

// Utility functions
function calcWinLen() {
    return Math.floor(window.innerWidth / 9);
}
function calcWinHei() {
    return Math.floor(window.innerHeight / 16);
}

// Render settings
const DEFAULT = {
    "color": "e0",
};
function rendSet(element, settingdict) {
    for (var i = 0; i < Object.keys(settingdict).length; i++) {
        rendSetSingle(element, Object.keys(settingdict)[i], settingdict);
    }
    element.settingdict = settingdict;
}
function rendSetSingle(element, setting, settingdict) {
    switch(setting) {
        case "color":
            let color = settingdict["color"];
            element.style.color = colorPicker[color[0]];
            element.style.background = colorPicker[color[1]];
            break;
        case "class":
            element.classList = settingdict["class"];
            break;
        case "id":
            element.id = settingdict["id"];
            break;
        case "hovercolor": 
            let hcolor = settingdict["hovercolor"];
            const prehoverfg = element.style.color;
            const prehoverbg = element.style.background;
            element.onmouseenter = function() {
                element.style.color = colorPicker[hcolor[0]];
                element.style.background = colorPicker[hcolor[1]];
            }
            element.onmouseleave = function() {
                element.style.color = prehoverfg;
                element.style.background = prehoverbg;
            }
            break;
        case "margin":
            break;
        case "resize":
            resizeArr.push(element);
            break;
        case "center":
            if (element.parentNode != document.body) {
                function calcWinLen() {
                    return Math.floor(element.parentNode.style.width.replace("px", "") / 9);
                }
            }
            else {
                function calcWinLen() {
                    return Math.floor(window.innerWidth / 9);
                }
            }
            if (settingdict["center"] == "box") {
                console.log("hi");
                var width = element.style.width.replace("px", "");
                console.log(width);
                element.style.marginLeft = (calcWinLen() * 9 - width) / 2 + "px";
                break;
            }
            if (settingdict["center"] == "false") {
                break;
            }
            var innerText = element.innerText.split("\n");
            var newParag = [];
            var maxLength = 0;
            for (var i = 0; i < innerText.length; i++) {
                if (innerText[i].length > maxLength) {
                    maxLength = innerText[i].length;
                }
            }
            for (var i = 0; i < innerText.length; i++) {
                var whiteSpace = " ".repeat(Math.floor((calcWinLen() - maxLength) / 2));
                newParag.push(whiteSpace + innerText[i] + whiteSpace);
            }
            element.innerText = newParag.join("\n");
            newParag = [];
            element.resize = function() {
                newParag = [];
                for (var i = 0; i < innerText.length; i++) {
                    if (maxLength > calcWinLen()) {
                        element.innerText = innerText.join("\n");
                        return;
                    } 
                    var whiteSpace = " ".repeat(Math.floor((calcWinLen() - maxLength) / 2));
                    newParag.push(whiteSpace + innerText[i] + whiteSpace);
                }
                element.innerText = newParag.join("\n");        
            }
            break;
        case "userselect":
            element.style.userSelect = settingdict["userselect"];
            break;
        default:               
            break;
    }   
}

// Put things on screen
function line(str, settings={}) {
    let newline = document.createElement("p");
    newline.innerText = str;
    document.body.appendChild(newline);
    rendSet(newline, settings);
    rendSet(newline, {"class": "line"});
    return newline;
} 
function p(str, settings={}) {
    let newline = document.createElement("p");
    newline.innerText = str;
    document.body.appendChild(newline);
    rendSet(newline, settings);
    rendSet(newline, {"class": "parag"});
    return newline;
}
function block(str, setting={}) {
    let newline = document.createElement("p");
    newline.innerText = str;
    rendSet(newline, setting);
    return newline;
}
function hr(scale=0, settings={}) {
    if (scale == 0) {
        let newline = document.createElement("p");
        newline.innerText = " ";
        newline.style.background = "white";
        document.body.appendChild(newline);
        return newline;
    }
    let newline = document.createElement("p");
    newline.innerText = scaleArr[scale].repeat(calcWinLen());
    document.body.appendChild(newline);
    rendSet(newline, settings);
    rendSet(newline, {"class": "hr"});
    newline.resize = function() {
        this.innerText = scaleArr[scale].repeat(calcWinLen());
    }
    return newline;
}
function br(size=1, settings={}) {
    let newline = document.createElement("p");
    newline.innerText = "\n".repeat(size);
    document.body.appendChild(newline);
    rendSet(newline, settings);
    rendSet(newline, {"class": "br"});
    return newline;
}
function ndiv(settings={}) {
    let newdiv = document.createElement("div");
    document.body.appendChild(newdiv);
    rendSet(newdiv, settings);
    return newdiv;
}
function span(str, settings={}) {
    let newspan = document.createElement("span");
    newspan.innerText = str;
    rendSet(newspan, settings);
    return newspan;
}
function box(width, height, settings={}) {
    let newdiv = document.createElement("div");
    newdiv.style.width = 9 * width + "px";
    newdiv.style.height = 16 * height + "px"; 
    document.body.appendChild(newdiv);
    rendSet(newdiv, settings);
    return newdiv;
}
function fbox(width, height, posx, posy, settings={}) {
    let newdiv = document.createElement("div");
    newdiv.style.position = "absolute";
    newdiv.style.width = 9 * width + "px";
    newdiv.style.height = 16 * height + "px";
    newdiv.style.left = posx * 9 + "px";
    newdiv.style.top = posy * 16 + "px";
    document.body.appendChild(newdiv);
    rendSet(newdiv, settings);
    return newdiv;
}

// BSS: Builder.js Stylesheet
function BSS(dict) {
    let keys = Object.keys(dict);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i].startsWith("#")) {
            let kid = document.getElementById(keys[i].slice(1));
            rendSet(kid, dict[keys[i]]);
        }
        let kclass = document.getElementsByClassName(keys[i]);
        for (var j = 0; j < kclass.length; j++) {
            rendSet(kclass[j], dict[keys[i]]); // Lower priority than id & in page
        }
    }
    return;
}

// Layered Build

// Build
function build(page, style) {
    page();
    BSS(style);
}