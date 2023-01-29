//Tooltip code
export function datatooltip(last_item) {
    let tooltipElem;

    document.onmouseover = function (event) {
        let target = event.target;

        // Is there is data-tooltip, then stop
        let tooltipHtml = target.dataset.tooltip;
        if (!tooltipHtml) return;

        // Creating element for tooltip

        tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        tooltipElem.innerHTML = tooltipHtml;
        document.body.append(tooltipElem);

        // Calculating position of tooltip
        let coords = target.getBoundingClientRect();

        let left = coords.left + target.offsetWidth + 10;
        if (left < 0) left = 0;

        let top = coords.top + window.scrollY;
        if (target.id > last_item-2) { // Fix for last element for correct view
          top -= target.offsetHeight;
        }

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
        tooltipElem.style.position = 'absolute';
    };

    document.onmouseout = function (e) {
        if (tooltipElem) {
            tooltipElem.remove();
            tooltipElem = null;
        }
    };
}