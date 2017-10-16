$(document).ready(keydown);

function keydown() {
    var input = event.which;
    if (input === 37) {
        $('.carousel').carousel('next');
    } else if (input === 39) {
        $('.carousel').carousel('prev');
    }
}