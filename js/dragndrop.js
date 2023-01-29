export function slist(target) {

    target.classList.add('slist');
    let items = target.getElementsByTagName('li'), current = null;

    // making list draggable and sortable
    for (let i of items) {
        // (B1) ATTACH DRAGGABLE
        i.draggable = true;

        // drag starting. Dropzone highlighted with yellow
        i.ondragstart = e => {
            current = i;
            for (let it of items) {
                if (it != current) { it.classList.add('hint'); }
            }
        };

        // drag enter. Dropzone highlighted with red
        i.ondragenter = e => {
            if (i != current) { i.classList.add('active'); }
        };

        // drag leave.
        i.ondragleave = () => i.classList.remove('active');

        // drag end.
        i.ondragend = () => {
            for (let it of items) {
                it.classList.remove('hint');
                it.classList.remove('active');
            }
        };

        // drag over.
        i.ondragover = e => e.preventDefault();

        // place after drag
        i.ondrop = e => {
            e.preventDefault();
            if (i != current) {
                let currentpos = 0, droppedpos = 0;
                for (let it = 0; it < items.length; it++) {
                    if (current == items[it]) { currentpos = it; }
                    if (i == items[it]) { droppedpos = it; }
                }
                if (currentpos < droppedpos) {
                    i.parentNode.insertBefore(current, i.nextSibling);
                } else {
                    i.parentNode.insertBefore(current, i);
                }
            }
        };
    }
}