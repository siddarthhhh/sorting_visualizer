const n = 20;
const arr = [];

init();

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
    
    gainNode.connect(audioctx.destination);
    
    osc.start();
    osc.stop(audioctx.currentTime + dur);
}

function init() {
    for (let i = 0; i < n; i++) {
        arr[i] = Math.random();
    }
    showbars();
}

function play() {
    const copy = [...arr];
    const moves = bubblesort(copy);
    animate(moves);
}

function animate(moves) {
    if (moves.length === 0) {
        showbars();
        return;
    }

    const move = moves.shift();
    const [i, j] = move.indices;

    if (move.type === "swap") {
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    playnote(200 + arr[i] * 500);
    playnote(200 + arr[j] * 500);
    showbars(move);

    setTimeout(() => {
        animate(moves);
    }, 200);
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

function showbars(move) {
    const container = document.getElementById('container');
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
