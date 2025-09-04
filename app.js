// Ganti dengan webhook URL dari n8n
const N8N_WEBHOOK = "https://popular-native-gnu.ngrok-free.app/webhook/scraping";

document.getElementById("btnCari").addEventListener("click", sendData);

async function sendData(){
  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const jumlah = document.getElementById("jumlah").value;
  const payload = { name, location, jumlah };
  try {
    const res = await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    const tbody = document.getElementById("result-table");
    tbody.innerHTML = "";

    data.forEach(item=>{
      const row = `<tr>
        <td>${item.title || item['Nama Hotel']}</td>
        <td>${item.address || item['Alamat']}</td>
        <td>${item.phone || item['Nomor Telepon']}</td>
        <td><a href="${item.website}" target="_blank">${item.website||""}</a></td>
        <td>${item.hotelStars||item['Star']}</td>
      </tr>`;
      tbody.innerHTML += row;
    });
  } catch(err){
    alert("Gagal ambil data dari n8n");
    console.error(err);
  }
}

