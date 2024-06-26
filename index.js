const canvas = document.getElementById('sequenceCanvas');
const ctx = canvas.getContext('2d');
const sequenceSlider = document.getElementById('sequenceSlider');
const sliderValue = document.getElementById('sliderValue');

const scale = 10; // Scale factor for better visualization
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

// Provided sequence values
const sequence = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62,
    42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114, 77, 39, 78, 38,
    79, 37, 80, 36, 81, 35, 82, 34, 83, 33, 84, 32, 85, 31, 86, 30, 87, 29, 88, 28, 89, 27, 90, 26, 91
].map(item => item * scale);

// Colors array for alternating colors
const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33F9', '#F9FF33'];

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

// Function to draw the Recaman sequence on the canvas
function drawSequence(upToIndex) {
    clearCanvas();

    // Draw the horizontal line
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT / 2);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT / 2);
    ctx.stroke();

    // Draw the Recaman sequence
    ctx.lineWidth = 2;

    for (let i = 1; i <= upToIndex; i++) {
        const from = sequence[i - 1];
        const to = sequence[i];
        const radius = Math.abs(to - from) / 2;
        const centerX = (from + to) / 2;
        const centerY = CANVAS_HEIGHT / 2;

        // Alternate colors every 5 points
        const colorIndex = Math.floor(i / 5) % colors.length;
        ctx.strokeStyle = colors[colorIndex];

        ctx.beginPath();
        if (i % 2 === 0) {
            ctx.arc(centerX, centerY, radius, Math.PI, 0, true); // Top arc
        } else {
            ctx.arc(centerX, centerY, radius, 0, Math.PI, true); // Bottom arc
        }
        ctx.stroke();
    }
}

// Event listener for the slider input
sequenceSlider.addEventListener('input', function() {
    const value = parseInt(sequenceSlider.value);
    sliderValue.textContent = value;
    drawSequence(value);
});

// Initial draw with default slider value (65)
drawSequence(parseInt(sequenceSlider.value));
