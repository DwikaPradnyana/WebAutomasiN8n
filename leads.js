const N8N_LEADS_WEBHOOK = "https://popular-native-gnu.ngrok-free.app/webhook/leads"; // ganti URL n8n

document.getElementById("leadsForm")?.addEventListener("submit", async function(e) {
  e.preventDefault();

const payload = {
  name: document.getElementById("name").value,
  type: document.getElementById("type").value,
  totalRoom: document.getElementById("totalRoom").value,
  pic: document.getElementById("pic").value,
  email: document.getElementById("email").value,
  kontak: document.getElementById("kontak").value,
  tanggal: document.getElementById("tanggal").value,
  catatan: document.getElementById("catatan").value
};


  try {
    const res = await fetch(N8N_LEADS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Gagal kirim ke n8n");
    
    const msg = document.getElementById("statusMessage");
    msg.innerText = "✅ Leads sudah masuk!";
    msg.className = "status-message success";
    msg.style.display = "block";

  } catch (err) {
    const msg = document.getElementById("statusMessage");
    msg.innerText = "❌ Gagal kirim Leads ke n8n";
    msg.className = "status-message error";
    msg.style.display = "block";
  }
});
