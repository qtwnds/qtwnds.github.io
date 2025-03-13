const beforetax = document.getElementById("beforetax");
const aftertax = document.getElementById("aftertax");
const rbxinput = document.getElementById("rbxinput");

rbxinput.addEventListener("input", function () {
  if (rbxinput.value == "e") {
    rbxinput.innerText = "";
  }
  const beforetaxV = rbxinput.value / 0.7;
  const aftertaxV = rbxinput.value * 0.7;
  aftertax.textContent = `${aftertaxV.toFixed()} RBX`;
  beforetax.textContent = `${beforetaxV.toFixed()} RBX`;
});
