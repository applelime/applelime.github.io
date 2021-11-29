function spread(count) {
    let submenu = document.getElementById('submenu-' + count);
    if (submenu) {
        // 평소에는 숨겼다가 마우스 들어오면 노출
        if (submenu.classList.contains('hide')) submenu.classList.remove('hide');
        else submenu.classList.add('hide');
    }

    let spreadIcon = document.getElementById('spread-icon-' + count);
    if (spreadIcon) {
        // 이것도 마찬가지로 마우스 들어오면 마우스변경
        if (spreadIcon.innerHTML == 'arrow_right') {
            spreadIcon.innerHTML = 'arrow_drop_down';
            spreadIcon.style.color = 'grey';
        } else {
            spreadIcon.innerHTML = 'arrow_right';
            spreadIcon.style.color = 'white';
        }
    }
}