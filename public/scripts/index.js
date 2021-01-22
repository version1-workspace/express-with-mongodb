let modal = document.getElementById("myModal");
let btn = document.getElementById("openModal");
let span = document.getElementsByClassName("close")[0];

btn.onclick = () => {
  modal.style.display = "block";
}
span.onclick = () => {
  modal.style.display = "none";
}

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}