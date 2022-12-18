const crt_content = document.querySelector("[js-crt-content]");

const writeToDisplay = (text) => {
    crt_content.innerHTML += text.replace("\n", "<br>");
}

/**
 * @param {string} text 
 * @param {*} interval 
 * @param {(() => any) | null} whenDone
 */
const animateTextToDisplay = (text, interval, whenDone) => {

    if(text.length <= 0) {
        if(whenDone && whenDone());
        return;
    }

    writeToDisplay(text.charAt(0));
    text = text.substring(1);

    setTimeout(() => animateTextToDisplay(text, interval, whenDone), interval);
};

let click_count = 0;

let cases = new Map([
    [0, "Did the cursor make You think You can write something?\n"],
    [1, "Probably yes.\n"],
    [2, "I don't really know, because I have no idea what you are typing.\n"],
    [3, "Literally no clue.\n"],
    [11, "Why are You still here?\n"],
    [30, "You won't magically gain access to my output.\n"],
    [100, "Oh my God, You won't stop, will You?\n"],
    [150, "Okey. You win. Now you can write.\n"],
    [151, "Sike! You can't.\n"],
    [200, "Okey. I'm done.\n"]
])

let interval = 20;
let doneTyping = true;

document.body.addEventListener("keypress", e => {

    if(!doneTyping) return;

    let text = cases.get(click_count) ?? "";
    click_count++;

    doneTyping = false;
    animateTextToDisplay(text, interval, () => doneTyping = true);

});