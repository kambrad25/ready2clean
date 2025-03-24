const { assert, error, log } = console;


let header404 = document.querySelector(".error-status");
let header404Span = document.querySelectorAll(".error-status > span");


function style (target, style, value) {
    return target.style[style] = value;
}

function animate (_span) {
    if (typeof _span != "object") 
    {
        _span = document.querySelectorAll(".error-status > span");
    }

    const spanLen = _span.length;

    let spanDelay, spanPos = 0;
    for (let i = 0; i < spanLen; ++i) {
        switch (i) {
            case 0 : {
                spanDelay = "0ms";
                style(_span[i], "top", spanPos);
                style(_span[i], "transitionDelay", spanDelay)
                break;
            }
            case 1: {
                spanDelay = "150ms";
                style(_span[i], "top", spanPos);
                style(_span[i], "transitionDelay", spanDelay)
                break;
            }
            case 2: {
                spanDelay = "300ms";
                style(_span[i], "top", spanPos);
                style(_span[i], "transitionDelay", spanDelay)
                break;
            }
            default:
                break;
        }
    }
}
this.addEventListener("load", () => {
    animate(header404Span);
})

