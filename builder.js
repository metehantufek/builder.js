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

// String functions
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
    // Apply defaults first
    element.style.color = colorPicker[DEFAULT["color"][0]];
    element.style.background = colorPicker[DEFAULT["color"][1]];
    element.style.userSelect = "none";
    for (var i = 0; i < Object.keys(settingdict).length; i++) {
        rendSetSingle(element, Object.keys(settingdict)[i], settingdict)
    }
}
function rendSetSingle(element, setting, settingdict) {
    switch(setting) {
        case "color":
            let color = settingdict[setting];
            element.style.color = colorPicker[color[0]];
            element.style.background = colorPicker[color[1]];
            break;
        case "hovercolor": 
            let hcolor = settingdict[setting];
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
            var innerText = element.innerText;
            if (innerText.length > calcWinLen()) {
                element.innerText = innerText;
                return;
            } 
            var whiteSpace = " ".repeat(Math.floor((calcWinLen() - innerText.length) / 2));
            element.innerText =  whiteSpace + innerText + whiteSpace;    
            element.resize = function() {
                if (innerText.length > calcWinLen()) {
                    element.innerText = innerText;
                    return;
                } 
                var whiteSpace = " ".repeat(Math.floor((calcWinLen() - innerText.length) / 2));
                element.innerText =  whiteSpace + innerText + whiteSpace;
            }
            break;
        case "centerp":
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
            element.style.userSelect = "text";
            break;
        default:               
            break;
    }   
}

// Put things on screen
function addLine(str, settings={}) {
    let newline = document.createElement("p");
    newline.innerText = str;
    document.body.appendChild(newline);
    rendSet(newline, settings);
    return newline;
} 
function addPara(str, settings={}) {
    let newline = document.createElement("p");
    newline.innerText = str;
    document.body.appendChild(newline);
    rendSet(newline, settings);
    return newline;
}
function addBreakerLine(scale=0, settings={}) {
    let newline = document.createElement("p");
    newline.innerText = scaleArr[scale].repeat(calcWinLen());
    document.body.appendChild(newline);
    rendSet(newline,settings);
    newline.resize = function() {
        this.innerText = scaleArr[scale].repeat(calcWinLen());
    }
    return newline;
}
function addBreak(size=1) {
    addLine("\n".repeat(size));
}