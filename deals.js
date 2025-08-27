document.getElementById("product").addEventListener("change", hitungTotal);
document.getElementById("productInitiation").addEventListener("change", hitungTotal);

function hitungTotal() {
  const product = document.getElementById("product").value;
  const initiation = document.getElementById("productInitiation").value;

  let total = 0;
  if (product) total += parseInt(product.split(":")[1]);
  if (initiation) total += parseInt(initiation.split(":")[1]);

  document.getElementById("totalHarga").value = "IDR " + total.toLocaleString("id-ID");
}

document.getElementById("dealsForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const now = new Date();
  const durasiInput = document.getElementById("durasi").value || "1 Bulan";

  // hitung tanggal selesai
  let tglSelesai = new Date(now);
  if (durasiInput.includes("Bulan")) {
    let bulan = parseInt(durasiInput) || 1;
    tglSelesai.setMonth(now.getMonth() + bulan);
  } else if (durasiInput.includes("Hari")) {
    let hari = parseInt(durasiInput) || 1;
    tglSelesai.setDate(now.getDate() + hari);
  }

  const data = {
    namaKlien: document.getElementById("namaklien").value,
    alamat: document.getElementById("alamat").value,
    nomor: document.getElementById("nomor").value,
    email: document.getElementById("email").value,
    namaProperty: document.getElementById("namaProperty").value,
    product: document.getElementById("product").value.split(":")[0],
    productInitiation: document.getElementById("productInitiation").value.split(":")[0],
    totalHarga: document.getElementById("totalHarga").value,
    durasi: durasiInput,
    ketentuan: document.getElementById("ketentuan").value || "-",
    tanggalMulai: now.toISOString().split("T")[0],
    tanggalSelesai: tglSelesai.toISOString().split("T")[0]
  };

  fetch("https://popular-native-gnu.ngrok-free.app/webhook/deals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    document.getElementById("statusMessage").textContent = "Deal berhasil disimpan!";
    document.getElementById("statusMessage").style.display = "block";

    console.log(result)
      document.getElementById("docsLink").innerHTML = `<a href="${result.docsLink}" target="_blank">📄 Link Docs</a>`;
      document.getElementById("docsLink").style.display = "block";

      document.getElementById("pdfLink").innerHTML = `<a href="${result.pdfLink}" target="_blank">📑 Link PDF</a>`;
      document.getElementById("pdfLink").style.display = "block";

  })
  .catch(err => alert("Gagal mengirim data: " + err));
});
