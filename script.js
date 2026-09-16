import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = 'https://lstwlclzwsuxhjsuvnww.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxzdHdsY2x6d3N1eGhqc3V2bnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwOTcxMzcsImV4cCI6MjEwMjY3MzEzN30.B2fAGw5SRdgY1UEGM1ZwSjph7G2NnFH7tyQg0T9CJkE'

const supabase = createClient(supabaseUrl, supabaseKey)

const { data: proyek, error } = await supabase
  .from('proyek')
  .select('*')
  .order('created_at', { ascending: false })

const proyekContainer = document.querySelector('#proyek-container')

if (error) {
  console.error('Gagal mengambil data:', error.message)
} else {
  proyek.forEach((item) => {
    const card = document.createElement('div')
    card.className = 'project-card'
    card.innerHTML = `
    <img src="${item.gambar_url}" alt="${item.judul}" class="project-image">
    <h3>${item.judul}</h3>
    <p>${item.deskripsi}</p>
  `
    proyekContainer.appendChild(card)
  })
}



// 1. Dark / Light Mode Toggle
const btn = document.querySelector("#toggleTheme");

btn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Mengubah ikon tombol berdasarkan mode yang aktif
  const isLight = document.body.classList.contains("light-mode");
  btn.textContent = isLight ? "☀️" : "🌙";
});

// 2. Render Skill Badge dari Array
const skills = ["HTML", "CSS", "JavaScript", "MySQL", "React", "Node.js", "Express", "MongoDB"
];

const skillContainer = document.querySelector("#skill-container");

skills.forEach((skill) => {
  const badge = document.createElement("span");
  badge.className = "skill-badge";
  badge.textContent = skill;
  skillContainer.appendChild(badge);
});

// 3. Form Kontak & Validasi
const form = document.querySelector("#formKontak");
const namaInput = document.querySelector("#namaInput");

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const nama = document.querySelector('#namaInput').value.trim()
  if (nama === '') {
    alert('Nama wajib diisi!')
    return
  }
  const { error } = await supabase
    .from('pesan')   // tabel baru, khusus pesan masuk
    .insert([{ nama: nama }])
  if (error) {
    console.error('Gagal menyimpan pesan:', error)
    alert('Gagal mengirim pesan: ' + error.message)
  } else {
    alert('Pesan terkirim, ' + nama + '!')
    form.reset()
  }
})
