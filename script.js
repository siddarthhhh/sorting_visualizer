const n = 20;
let bubbleArr = [];
let insertionArr = [];

let audioctx = null;

function playnote(freq) {
    if (audioctx === null) {
        audioctx = new (
            AudioContext ||
            webkitAudioContext ||
            window.webkitAudioContext
        )();
    }

    const dur = 0.1;
    const osc = audioctx.createOscillator();
    const gainNode = audioctx.createGain();

    osc.frequency.value = freq;
    osc.connect(gainNode);
    gainNode.gain.value = 0.1;
    gainNode.gain.linearRampToValueAtTime(
        0,audioctx.currentTime+dur
    )
    gainNode.connect(audioctx.destination);

    osc.start();
    osc.stop(audioctx.currentTime + dur);
}

function init() {
    bubbleArr = [];
    insertionArr = [];
    for (let i = 0; i < n; i++) {
        const randomValue = Math.random();
        bubbleArr.push(randomValue);
        insertionArr.push(randomValue);
    }
    showbars(bubbleArr, 'bubble-container');
    showbars(insertionArr, 'insertion-container');
}

function playBubbleSort() {
    const copy = [...bubbleArr];
    const moves = bubblesort(copy);
    animate(moves, bubbleArr, 'bubble-container');
}

function playInsertionSort() {
    const copy = [...insertionArr];
    const moves = insertionsort(copy);
    animate(moves, insertionArr, 'insertion-container');
}

function animate(moves, arr, containerId) {
    if (moves.length === 0) {
        showbars(arr, containerId);
        return;
    }

    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type === "swap") {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    playnote(200 + arr[i] * 500);
    playnote(200 + arr[j] * 500);
    showbars(arr, containerId, move);

    setTimeout(() => {
        animate(moves, arr, containerId);
    }, 20);
}

function bubblesort(arr) {
    const moves = [];
    do {
        var swapped = false;
        for (let i = 1; i < arr.length; i++) {
            moves.push({
                indices: [i - 1, i], type: "comp"
            });
            if (arr[i - 1] > arr[i]) {
                swapped = true;
                moves.push({
                    indices: [i - 1, i], type: "swap"
                });
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
            }
        }
    } while (swapped);
    return moves;
}

function insertionsort(arr) {
    const moves = [];
    for (let i = 1; i < arr.length; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            moves.push({
                indices: [j - 1, j], type: "comp"
            });
            moves.push({
                indices: [j - 1, j], type: "swap"
            });
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
            j--;
        }
    }
    return moves;
}

function showbars(arr, containerId, move) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = arr[i] * 100 + "%";
        bar.classList.add("bar");

        if (move && move.indices.includes(i)) {
            bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
        }
        container.appendChild(bar);
    }
}
