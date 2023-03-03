const schedule = [
  ["A*", "D*", "C", "D", "A"],
  ["B", "F", "B*", "A*", "D"],
  ["F", "B", "D", "B", "C*"],
  ["C", "C", "A", "C", "F"],
  ["B*", "C*", "F", "A", "창"],
  ["E", "A", "D*", "E", "창"],
  ["E", "D", "B", "E", "창"],
];
let number = localStorage.getItem("number") | "";
if (list4[number]) {
  draw();
  document.querySelector("#back").style.backgroundImage = "url(" + "img/" + number + ".jpg" + ")";
}
document.querySelector("form").addEventListener("submit", (el) => {
  el.preventDefault();
  number = el.target.number.value;
  if (!isNaN(Number(number)) && number.length == 4) number = number[0] + "0" + number[1] + number[2] + number[3];

  if (!list4[number]) {
    const a = Object.keys(student).filter((el) => {
      return student[el] == number;
    });
    if (a[0]) number = a[0];
    else return;
  }
  localStorage.setItem("number", number);
  draw();
});
/***
 * a:단위수
 */
function whatSet(a, set) {
  if (a == 2) return list2[number][set] ? set : list2[number][set + 1] ? set + 1 : set + 2;
  else return list4[number][set] ? set : list4[number][set + 1] ? set + 1 : set + 2;
}

function draw() {
  const set4 = document.querySelectorAll(".set4-tr td");
  const set2 = document.querySelectorAll(".set2-tr td");
  const subject2 = document.querySelectorAll(".subject2-tr td");
  const subject4 = document.querySelectorAll(".subject4-tr td");
  const teacher4 = document.querySelectorAll(".teacher4-tr td");
  const teacher2 = document.querySelectorAll(".teacher2-tr td");

  document.querySelector(".name").innerHTML = number + " / 이름: " + student[number];

  //4단위
  subject4.forEach((sub, index) => {
    // .log(list4[number]);
    sub.innerHTML = list4[number][whatSet(4, set4[index].innerText)];
  });
  teacher4.forEach((tch, index) => {
    const a = whoTeacher(subject4[index].innerText, whatSet(4, set4[index].innerText));
    tch.innerHTML = "<span>" + a + "</span>" + "<br/>" + where[a];
  });
  //2단위
  subject2.forEach((sub, index) => {
    if (list2[number][whatSet(2, set2[index].innerText)])
      sub.innerHTML = list2[number][whatSet(2, set2[index].innerText)];
  });
  teacher2.forEach((tch, index) => {
    if (list2[number][whatSet(2, set2[index].innerText)])
      tch.innerHTML =
        "<span>" +
        whoTeacher(subject2[index].innerText, whatSet(2, set2[index].innerText)) +
        "</span>" +
        "<br/>" +
        where[whoTeacher(subject2[index].innerText, whatSet(2, set2[index].innerText))];
  });

  const scheTr = document.querySelectorAll("#own-schedule tr");
  let now = new Date();
  let day = now.getDay();
  scheTr.forEach((tr, i) => {
    if (i != 0) {
      const td = tr.querySelectorAll("td");
      td.forEach((td, j) => {
        if (j != 0) {
          let a = schedule[i - 1][j - 1]; //시간표 세트가져오기

          //4단위라면
          if (a.length == 1) {
            if (list4[number][whatSet(4, a)]) {
              const subj = list4[number][whatSet(4, a)];
              const div = document.createElement("div");
              div.innerHTML = subj + "<br/>" + "(" + whoTeacher(subj, whatSet(4, a)) + "T)";
              div.title = "위치: " + where[whoTeacher(subj, whatSet(4, a))];
              td.innerText = "";
              td.append(div);
              td.classList.add(a);
              // if (day == j) td.classList.add("today");
            }
          }

          //2단위라면
          if (a.length == 2) {
            a = a.replace("*", "");
            if (true) {
              let subH = list2[number][whatSet(2, a)];
              const div = document.createElement("div");
              div.innerHTML = subH + "<br/>" + "(" + whoTeacher(subH, whatSet(2, a)) + "T)";
              div.title = "위치: " + where[whoTeacher(subH, whatSet(2, a))];
              td.innerText = "";
              td.append(div);
              // if (day == j) td.classList.add("today");
            }
            td.classList.add(a + a);
          }
        }
      });
    }
  });
}

function whoTeacher(sub, set) {
  if (teacher[sub]) return teacher[sub];
  if (teacher[sub + set]) return teacher[sub + set];
  console.log(number, "errrrrorrrrr", sub, set);
  return undefined;
}

// Object.keys(list4).forEach((key) => {
//   number = key;
//   draw();
// });

const remainTime = document.querySelector("#hi");

function diffDay() {
  let masTime = new Date("2023-3-23");
  if (number == 20807) {
    masTime = new Date("2023-7-31");
  }
  const todayTime = new Date();

  const diff = masTime - todayTime;

  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const diffMin = Math.floor((diff / (1000 * 60)) % 60);
  const diffSec = Math.floor((diff / 1000) % 60);
  const diffMS = Math.floor((diff / 100) % 60);

  if (number == 20807) {
    remainTime.innerText = `사관까지 ${diffDay}일${diffHour}시간${diffMin}분${diffSec}초`;
  } else {
    remainTime.innerText = `3모까지 ${diffDay}일${diffHour}시간${diffMin}분${diffSec}초`;
  }
}

diffDay();
setInterval(diffDay, 1000);
