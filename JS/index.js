// generates random number in array
function generateRandomArray(n) {
  const arr = Array.from({ length: n }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// generate puzzle checklist == for check Completion of puzzle
var counter = 0;
function puzzleCheckList() {
  const newLis = $("#sortable").children();
  const iniArr = [];
  for (let i = 1; i <= newLis.length; i++) {
    const num = i.toString();
    iniArr.push(num);
  }
  window.iniArr = iniArr;
}

// list Generation and Styling
function listGen(item) {
  return (
    `<li class="h-32 border-2 border-blue-400 bg-blue-700 py-12 text-center text-2xl text-white">
      ${item}
    </li>`
  );
}

// generates a puzzle of n size
function createPuzzle(n) {
  counter = 0;
  $("#counter").html(counter)
  $("#sortable").html(generateRandomArray(n).map(listGen))
  puzzleCheckList();
}

// Switch Class
$(function () {
  $('button#easy').on('click', function () {
    $('#sortable').switchClass('grid-cols-4 grid-cols-5', 'grid-cols-3', 0);
  });

  $('button#medium').on('click', function () {
    $('#sortable').switchClass('grid-cols-3 grid-cols-5', 'grid-cols-4', 0);
  });

  $('button#hard').on('click', function () {
    $('#sortable').switchClass('grid-cols-3 grid-cols-4', 'grid-cols-5', 0);
  });
});

// Counting and Puzzle Checking
$(function () {
  $('#sortable').sortable({
    update: function (event, ui) {
      $("#counter").html(++counter)
      const lis = $("#sortable").children()
      const arr = [];
      for (let i = 0; i < lis.length; i++) {
        arr.push(lis[i].innerText);
      }
      if (arr.toString() === iniArr.toString()) {
        alert('Congratulations! Puzzle Solved.');
      }
    },
  });
});
