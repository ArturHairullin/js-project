// простой пример util метода
export function isEqual(lhs, rhs) {
    return lhs === rhs;
}
export function card(url, text) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = url;
    let span = document.createElement('span');
    span.innerHTML = text;
    div.append(img,span);
    return div;
}
