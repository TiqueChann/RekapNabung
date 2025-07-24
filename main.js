const goal = 2000000;
let savings = JSON.parse(localStorage.getItem("savings")) || [];

function saveData() {
    localStorage.setItem("savings", JSON.stringify(savings));
}

function formatCurrency(num) {
    return "Rp" + num.toLocaleString("id-ID");
}

function updateUI() {
    const log = document.getElementById("log");
    const totalDisplay = document.getElementById("total");
    const fill = document.getElementById("progress-fill");

    log.innerHTML = "";
    let total = 0;

    savings.forEach((item, index) => {
        total += item.amount;

        const entry = document.createElement("div");
        entry.className = "entry";
        entry.innerHTML = `
        <strong>${formatCurrency(item.amount)}</strong><br>
        <small>${item.date}</small>
        <button class="delete-btn" onclick="deleteEntry(${index})"Hapus</button>
        `;
        log.prepend(entry);
    });

    const percent = Math.min((total / goal)* 100, 100).toFixed(1)
    fill.style.width = `${percent}%`;
    fill.innerText = `${percent}%`;
    totalDisplay.innerText = `Total Tabungan: ${formatCurrency(total)}`; 
}

function addSavings() {
    const amountInput = document.getElementById("amount");
    const dateInput = document.getElementById("date");
    const amount = parseInt(amountInput.value);
    const date = dateInput.value;

    if (!amount || amount <= 0 || !date) {
        alert("Isi jumlah dan tanggal yang valid!");
        return;
    }

    savings.push({ amount, date });
    saveData();
    updateUI();

    amountInput.value = "";
    dateInput.value = "";
}

function deleteEntry(index) {
    if (confirm("Yakin mau hapus entry ini?")) {
        savings.splice(index, 1);
        saveData();
        updateUI();
    }
}

function resetData() {
    if(confirm("Yakin mau reset semua data tabungan?")) {
        savings = [];
        saveData();
        updateUI();
    }
}

updateUI();
