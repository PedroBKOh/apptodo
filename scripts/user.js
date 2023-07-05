//----------


// função abre janela

var btnCloseRef = document.getElementById('btnClose')

// let myWindow = JSON.parse(localStorage.getItem('userWindow'))

function closeWin() {
  window.close();

}

btnCloseRef.addEventListener('click', () => closeWin())

