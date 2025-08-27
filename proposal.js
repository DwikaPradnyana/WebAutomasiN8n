document.getElementById("proposalForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    nomorSurat: document.getElementById("nomorSurat").value,
    tanggal: document.getElementById("tanggal").value,
    namaPerusahaan: document.getElementById("namaPerusahaan").value,
    alamat: document.getElementById("alamat").value,
    catatan: document.getElementById("catatan").value,
  };

  fetch("https://popular-native-gnu.ngrok-free.app/webhook/proposal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(result => {
    document.getElementById("statusMessage").textContent = "Proposal berhasil dikirim!";
    document.getElementById("statusMessage").style.display = "block";
    
    console.log(result)
      document.getElementById("docsLink").innerHTML = `<a href="${result.docsLink}" target="_blank">Link Docs</a>`;
      document.getElementById("docsLink").style.display = "block";

      document.getElementById("pdfLink").innerHTML = `<a href="${result.pdfLink}" target="_blank">Link PDF</a>`;
      document.getElementById("pdfLink").style.display = "block";   
  })
  .catch(err => {
    document.getElementById("statusMessage").textContent = "Terjadi kesalahan saat mengirim proposal.";
  });
});
