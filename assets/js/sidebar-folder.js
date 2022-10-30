function changeColor(count, on) {
    // 마우스 들어오면 화살표 색상변경
    let icon = document.getElementById('spread-icon-' + count);
    if (icon) {
        if (on) {
            icon.style.opacity = 0.7
        } else {
            icon.style.opacity = 1.0
        }
    }
}


// 서브메뉴 open/close 처리
function processSubMenu() {
document.body.addEventListener("click", (e) => {
    const buttons = document.querySelectorAll(".spread-btn");

    buttons.forEach((button) => {
    const icon = button.querySelector("span");
    const submenuId = `submenu-${icon.id.split("-")[2]}`;
    const submenu = document.getElementById(submenuId);

    // 화살표 버튼을 눌렀을 때
    if (button.contains(e.target)) {
        // 닫혀있으면 (hide 상태라면) 열어준다.
        if (submenu.classList.contains("hide")) {
        submenu.classList.remove("hide");
        if (icon) {
            icon.innerHTML = "arrow_drop_down";
        }
        } else { // 열려있으면 닫는다.
        submenu.classList.add("hide");
        if (icon) {
            icon.innerHTML = "arrow_right";
        }
        }
    } else { // 화살표가 아닌 다른 곳을 클릭하면 닫는다.
        submenu.classList.add("hide");
        if (icon) {
        icon.innerHTML = "arrow_right";
        }
    }
    });
});
}