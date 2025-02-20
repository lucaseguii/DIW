// Variables elementos del menú de accesibilidad
const accessibilityIcon = document.getElementById('accessibility-icon');
const accessibilityMenu = document.getElementById('accessibility-menu');
const closeAccessibilityMenu = document.getElementById('close-accessibility-menu');


function toggleAccessibilityMenu() {
    const isMenuVisible = accessibilityMenu.style.display === 'block';
    accessibilityMenu.style.display = isMenuVisible ? 'none' : 'block';
}

// Boton de cerrar
closeAccessibilityMenu.addEventListener('click', () => {
    accessibilityMenu.style.display = 'none';
});

// Funciones para aplicar configuraciones de accesibilidad
function setContrast(type) {
    document.body.classList.remove('grayscale', 'dark', 'light', 'high-saturation', 'low-saturation');
    document.body.classList.add(type);
}

function setFontSize(value) {
    document.documentElement.style.fontSize = value + 'em';
}

function setLineSpacing(value) {
    document.body.style.lineHeight = value;
}

function setWordSpacing(value) {
    document.body.style.wordSpacing = value + 'em';
}

function setLetterSpacing(value) {
    document.body.style.letterSpacing = value + 'em';
}
