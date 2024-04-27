// tab menu
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
    var line = document.querySelector(".line");
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    contents.forEach((content) => {
      content.classList.remove("active");
    });
    contents[index].classList.add("active");
  });
});

//array
let arrPeserta = [];

//class untuk objek peserta
class Peserta {
  constructor(nama, usia, uang_sangu) {
    this.nama = nama;
    this.usia = usia;
    this.uang_sangu = uang_sangu;
  }
}

//async function untuk menerima data submit dari form
async function submit_data(form) {
  let nama = document.getElementById("nama").value;
  let usia = document.getElementById("usia").value;
  let uang_sangu = document.getElementById("uang_sangu").value;

  let newPeserta = await new Peserta(nama, usia, uang_sangu);
  await arrPeserta.push({ nama: newPeserta.nama, usia: newPeserta.usia, uang_sangu: newPeserta.uang_sangu });
  console.log(arrPeserta);

  validation(nama, usia, uang_sangu);
}

// validation
function validation(nama, usia, uang_sangu) {
  let outputHTML = "";
  if (nama.length < 10 || usia < 25 || (uang_sangu < 100000 && uang_sangu > 100000)) {
    outputHTML += `<div class="alert alert-danger" role="alert">
    Data kurang tepat!<br/>
    1. Nama minimal 10 karakter <br/>
    2. Usia minimal 25 tahun <br/>
    3. Uang Sangu minimal 100.000 dan maksimal 1.000.000
  </div>`;
    document.getElementById("validation").innerHTML = outputHTML;
  } else {
    showTableData();
    average();
  }
}

//function untuk menampilkan isi dari array
function showTableData() {
  let outputHTML = "";
  outputHTML += `<table class="table table-striped table-hover">`;

  outputHTML += `<thead>
    <tr>
      <th scope="col">No. </th>
      <th scope="col">Nama</th>
      <th scope="col">Usia</th>
      <th scope="col">Uang Sangu</th>
    </tr>
  </thead>
  <tbody>
    <tr>`;

  //perulangan untuk menampilkan isi array
  console.log(arrPeserta.length);
  for (let i = 0; i < arrPeserta.length; i++) {
    console.log("ini jalan ga");
    outputHTML += `<tbody>
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${arrPeserta[i].nama}</td>
      <td>${arrPeserta[i].usia}</td>
      <td>${arrPeserta[i].uang_sangu}</td>
    </tr>
  </tbody>`;
  }

  outputHTML += "</table>";

  document.getElementById("table").innerHTML = outputHTML;
}

//function untuk menampilkan kesimpulan dari data yang telah di submit
function average() {
  let total_peserta = arrPeserta.length;
  let total_usia = 0;
  let total_uang = 0;
  let average_usia = 0;
  let average_uang = 0;
  var outputHTML = "";

  //for untuk menghitung total usia
  for (let i = 0; i < total_peserta; i++) {
    total_usia += parseInt(arrPeserta[i].usia);
  }
  //for untuk menghitung total uang sangu
  for (let i = 0; i < total_peserta; i++) {
    total_uang += parseInt(arrPeserta[i].uang_sangu);
  }

  average_usia = total_usia / total_peserta;
  average_uang = total_uang / total_peserta;
  console.log(`average usia: ${average_usia}`);
  console.log(`average usia: ${average_uang}`);
  outputHTML += `<div class="card">
  <div class="card-header">Kesimpulan</div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">`;
  outputHTML += `<p>Usia Rata-Rata dari Peserta adalah ${Math.floor(average_usia)} tahun dan rata-rata uang sangu yang diterima oleh peserta adalah  ${Math.floor(average_uang)}</p>`;
  outputHTML += `  </blockquote>
  </div>
</div>`;
  document.getElementById("resume").innerHTML = outputHTML;
}
