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