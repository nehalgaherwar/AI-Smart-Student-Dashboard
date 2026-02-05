// CLOCK
setInterval(() => {
    document.getElementById("clock").innerText =
        new Date().toLocaleTimeString();
}, 1000);

// THEME TOGGLE
const themeBtn = document.getElementById("themeBtn");
themeBtn.onclick = () => {
    document.body.classList.toggle("dark");
    themeBtn.innerText =
        document.body.classList.contains("dark")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
};

// STUDENT DATA
let chart;

function generateStudent() {
    const roll = Math.floor(Math.random() * 60) + 1;

    const subjects = {
        IT: rand(),
        "ENG-Math": rand(),
        CAD: rand(),
        "Web-Tech": rand(),
        Python: rand(),
        BEDE: rand()
    };

    document.getElementById("student").innerHTML =
        `<b>Roll No:</b> ${roll}`;

    const avg = Object.values(subjects)
        .reduce((a,b)=>a+b) / 6;

    let grade = "Fail 😬";
    if (avg >= 75) grade = "A+ 🔥";
    else if (avg >= 60) grade = "A 😎";
    else if (avg >= 45) grade = "B 🙂";

    document.getElementById("grade").innerHTML =
        `<b>Average:</b> ${avg.toFixed(1)} <br>
         <b>Grade:</b> ${grade}`;

    drawChart(subjects);
}

function rand() {
    return Math.floor(Math.random() * 41) + 60;
}

// CHART
function drawChart(subjects) {
    const ctx = document.getElementById('marksChart');

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(subjects),
            datasets: [{
                label: 'Marks',
                data: Object.values(subjects),
                backgroundColor: '#6366f1'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}
