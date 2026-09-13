const mkStickyHeader = (id, text, width) => {
    var element = document.createElement("div");
    element.appendChild(document.createTextNode(text));
    element.setAttribute("class", "sticky-header monospace");
    element.style.width = width;
    element.style.visibility = "hidden";
    element.setAttribute("id", id);
    return element;
}

const stickilize = header => {
    var rect = header.getBoundingClientRect();
    width = rect.left + "px";
    id = header.getAttribute("id") + "__sticky";
    text = header.textContent
    return mkStickyHeader(id, text, width);
}

const adjustStickyHeader = (element, delta, nextDelta) => {
    const elementHeight = element.getBoundingClientRect().height;
    const scrollLen = 80;
    if (delta > 0) {
        element.style.top = -elementHeight + "px";
    } else if (delta < 0 && nextDelta > scrollLen) {
        const p = -delta / scrollLen;
        const t = p > 1 ? 1 : p;
        element.style.top = (t - 1) * elementHeight + "px";
    } else if (delta < 0) {

    }
    element.style.visibility = "visible";
}

const scrollHandler = () => {
    const getStickyHeader = headerId => {
        const id = headerId + "__sticky";
        var element = document.querySelector(id);
        if (element) {
            return element;
        } else {
            header = document.querySelector(headerId);
            element = stickilize(header);
            document.body.appendChild(element);
            return element;
        }
    }

    const headersId = ['#section-interests', '#section-publications', '#section-selected-projects']
    const n = headersId.length;

    const headers = headersId.map(x => document.querySelector(x));

    const left = headers[0].getBoundingClientRect().left;
    if (left < 100) return;

    const stickyHeaders = headersId.map(getStickyHeader);

    for (var i = 0; i < n; i++) {
        header = headers[i];
        stickyHeader = stickyHeaders[i];
        delta = header.getBoundingClientRect().bottom;
        adjustStickyHeader(stickyHeader, delta, 0);
    }
}

// document.addEventListener('scroll', pinElement)
// document.addEventListener('scroll', scrollHandler);

const resizeNewsWindow = () => {
    const newsWindow = document.querySelector('.news-scroll');
    if (!newsWindow) return;

    const newsItems = newsWindow.querySelectorAll('.custom-list > li');
    const visibleItemCount = Number.parseInt(newsWindow.dataset.visibleItems, 10) || 5;

    newsWindow.style.height = 'auto';

    if (newsItems.length <= visibleItemCount) return;

    const lastVisibleItem = newsItems[visibleItemCount - 1];
    const firstHiddenItem = newsItems[visibleItemCount];
    const windowStyle = window.getComputedStyle(newsWindow);
    const windowTop = newsWindow.getBoundingClientRect().top;
    const lastVisibleBottom = lastVisibleItem.getBoundingClientRect().bottom;
    const firstHiddenTop = firstHiddenItem.getBoundingClientRect().top;
    const gapMiddle = lastVisibleBottom + (firstHiddenTop - lastVisibleBottom) / 2;
    const bottomBorder = Number.parseFloat(windowStyle.borderBottomWidth);

    newsWindow.style.height = `${Math.floor(gapMiddle - windowTop + bottomBorder)}px`;
};

let newsResizeFrame;
window.addEventListener('resize', () => {
    window.cancelAnimationFrame(newsResizeFrame);
    newsResizeFrame = window.requestAnimationFrame(resizeNewsWindow);
});

window.addEventListener('DOMContentLoaded', resizeNewsWindow);

if (document.fonts) {
    document.fonts.ready.then(resizeNewsWindow);
}
