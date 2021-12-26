let currentSpreadSubMenu = 0;

function spread(count) {
    // 마우스 클릭하면 서브메뉴 노출 변경
    let submenu = document.getElementById('submenu-' + count);
    let icon = document.getElementById('spread-icon-' + count);

    if (submenu) {        
        if (submenu.classList.contains('hide')) {
            submenu.classList.remove('hide');
            currentSpreadSubMenu = count;
            if (icon) {
                icon.innerHTML = 'arrow_drop_down';
            }
        }        
        else {
            submenu.classList.add('hide');
            currentSpreadSubMenu = 0;
            if (icon) {
                icon.innerHTML = 'arrow_right'
            }
        }
    }
}

function cover() {
    if (0 == currentSpreadSubMenu)
    {
        return;
    }

    let submenu = document.getElementById('submenu-' + currentSpreadSubMenu);
    let icon = document.getElementById('spread-icon-' + currentSpreadSubMenu);

    if (submenu) {        
        submenu.classList.add('hide');
        currentSpreadSubMenu = 0;
        if (icon) {
            icon.innerHTML = 'arrow_right'
        }
    }
}

function changeColor(count, on) {
    // 마우스 들어오면 화살표 색상변경
    let icon = document.getElementById('spread-icon-' + count);
    if (icon) {
        if (on) {
            icon.style.color = 'grey';
        } else {
            icon.style.color = 'white';
        }
    }
}