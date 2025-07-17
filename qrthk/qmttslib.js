function staticScript(srcUrl, onloadMethod) {
    const script = document.createElement('script');
    script.src = srcUrl;
    script.onload = onloadMethod;
    document.body.appendChild(script);
}
function dynamicScript(srcUrl, onloadMethod) {
    const existingScript = document.querySelector('script[data-dynamic]');
    if (existingScript) {
        existingScript.remove();
    }
    const script = document.createElement('script');
    script.src = srcUrl;
    script.setAttribute('data-dynamic', 'true');
    script.onload = onloadMethod;
    document.body.appendChild(script);
}
function stringToHash(string) {
    return string.split('').reduce((hash, char) => {
        return char.charCodeAt(0) + ((hash << 5) - hash);
    }, 0);
}
