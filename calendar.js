style = {
    "parag": {
        "color": "e0",
        "center": "",
        "resize": "",
        "userselect": "none"
    },
    "line": {
        "center": "",
        "resize": "",
        "userselect": "none"
    },
    "cline": {
        "center": "",
        "resize": "",
        "userselect": "none"
    },
    "hr": {
        "resize": "",
        "userselect": "none"
    },
    "br": {
        "userselect": "none"
    },
    "#userselect": {
        "userselect": "text"
    }
};

function page() {
    // LAYERING
    br(2);
    p(`███   █   █  ██  █     ███   ████  ████         █  ████
█  █  █   █  ██  █     █  █  █     █  █         █  █
███   █   █  ██  █     █  █  ████  ███          █   ██
█  █  █   █  ██  █     █  █  █     █  █         █     █
███    ███   ██  ████  ███   ████  █  █  ██  ████  ████`);
    br(2);
    hr(0);
    line("███            ███");
    line("███  Introduction  ███");
    line("███            ███");
    hr(0);
    br(2);
    line("This is a debug page.", {"id": "userselect"});
    br(2);
    hr(0);
    line("███            ███");
    line("███  Color Test  ███");
    line("███            ███");
    hr(0);
    br(1);
    var div = ndiv();
    div.style.width = "100%";
    div.appendChild(block("I am colorful!", {"color": "f0", "class": "cline"}));
    for (var i = 1; i < 16; i++) {
        var colorstr = "0" + Number(i).toString(16);
        div.appendChild(block("I am colorful!", {"color": colorstr, "class": "cline"}));
    }
}

build(page, style);