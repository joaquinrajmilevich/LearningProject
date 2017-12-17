const colors = document.querySelectorAll('.c');

colors.forEach((e) => {
  $(e).mousedown(() => {
    $(e).addClass('contrast');
  });
  $(e).mouseup(() => {
    $(e).removeClass('contrast');
  });
});
