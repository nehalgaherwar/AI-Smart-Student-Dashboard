// LOGIN
function login(){
  if(user.value==="admin" && pass.value==="1234"){
    loginBox.classList.add("hidden");
    dashboard.classList.remove("hidden");
    toast("Login Successful 🔥");
  } else toast("Wrong Login ❌");
}
function logout(){ location.reload(); }

// CLOCK
setInterval(()=>clock.innerText=new Date().toLocaleTimeString(),1000);

// THEME
themeBtn.onclick=()=>{
 document.body.classList.toggle("dark");
 themeBtn.innerText=document.body.classList.contains("dark")
 ? "☀️ Light":"🌙 Dark";
};

// TOAST
function toast(msg){
  const t=document.getElementById("toast");
  t.innerText=msg;t.style.opacity=1;
  setTimeout(()=>t.style.opacity=0,2000);
}

// STUDENT
let bar,radar,attendance=JSON.parse(localStorage.getItem("att"))||[];
function rand(){return Math.floor(Math.random()*41)+60}

function generateStudent(){
  const roll=Math.floor(Math.random()*60)+1;
  const s={IT:rand(),"ENG-Math":rand(),CAD:rand(),"Web-Tech":rand(),Python:rand(),BEDE:rand()};
  student.innerHTML=`Roll No: <b>${roll}</b>`;
  const avg=Object.values(s).reduce((a,b)=>a+b)/6;
  grade.innerHTML=`Avg: ${avg.toFixed(1)} | Grade: ${avg>75?"A+ 🔥":avg>60?"A 😎":"B 🙂"}`;
  drawCharts(s); toast("Student Generated 💀");
}

// CHARTS
function drawCharts(s){
  if(bar)bar.destroy(); if(radar)radar.destroy();
  bar=new Chart(barChart,{type:'bar',
    data:{labels:Object.keys(s),datasets:[{data:Object.values(s),backgroundColor:'#6366f1'}]},
    options:{scales:{y:{max:100,beginAtZero:true}}}
  });
  radar=new Chart(radarChart,{type:'radar',
    data:{labels:Object.keys(s),datasets:[{data:Object.values(s),backgroundColor:'rgba(99,102,241,.4)'}]},
    options:{scales:{r:{max:100}}}
  });
}

// ATTENDANCE
function mark(v){
 attendance.push(v);localStorage.setItem("att",JSON.stringify(attendance));
 attendanceBox();
}
function attendanceBox(){
 const p=attendance.filter(x=>x==="P").length;
 const a=attendance.filter(x=>x==="A").length;
 attendanceEl.innerHTML=`Present: ${p} | Absent: ${a}`;
}
const attendanceEl=document.getElementById("attendance");
attendanceBox();
