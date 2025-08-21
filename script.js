const terminal = document.getElementById('terminal');
const PROMPT_TEXT = 'mahdi@portfolio:~$';

const splash = document.getElementById('splash');
const splashText = document.getElementById('splash-text');
const splashMessage = 'Starting...';

// Typing animation function
function typeText(element, text, typingMs = 100) {
  return new Promise((resolve) => {
    element.textContent = '';
    let i = 0;
    
    const timer = setInterval(() => {
      element.textContent += text[i];

      if (element.parentElement) {
        element.parentElement.scrollTop = element.parentElement.scrollHeight;
      }
      
      i += 1;
      
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, typingMs);
  });
}

// Available commands
const commands = {
  help: () => (
    "Available commands:\n" +
    "- welcome: tampilkan sambutan\n" +
    "- about: tentang saya\n" +
    "- education: riwayat pendidikan\n" +
    "- projects: daftar proyek\n" +
    "- contact: kontak\n" +
    "- clear: bersihkan layar"
  ),
  
  welcome: () => (
    "Hi, I'm Mahdi Jamaludin, a Student Binus@Malang Computer Science.\n\n" +
    "Welcome to my interactive portfolio terminal!\n" +
    "Type 'help' to see available commands."
  ),
  
  about: () => (
   "Saya Mahdi dari Binus@Malang, berfokus pada pengembangan aplikasi web dan mobile, serta automasi menggunakan teknologi AI."
  ),
  
  education: () => (
    "Education:\n- BINUS @ Malang — Computer Science"
  ),
  
  projects: () => (
    `Projects:
  - SaveBite
    SaveBite adalah aplikasi manajemen makanan yang hadir di dua platform, yaitu web dan mobile.
    Untuk versi web, SaveBite dibangun menggunakan Laravel untuk frontend Web dan React untuk frontend Mobile, dengan backend Golang 
    sehingga memberikan pengalaman pengguna yang interaktif dan responsif di browser. 

  - Management Freezer
    Sistem ini digunakan untuk memeriksa dan mengelola barang yang ada di freezer, termasuk informasi freezer mana yang menyimpan barang tersebut.
    Aplikasi ini dibangun menggunakan React Native dengan Expo untuk mobile, dan backend Golang untuk logika dan database.
    Memudahkan pemilik toko Habib dalam mengelola stok frozen food dengan lebih akurat dan efisien.
  
  - WebSocket Chat Anonymous
    Aplikasi chat real-time yang memungkinkan pengguna berkomunikasi secara anonim tanpa perlu login atau identitas.
    Menggunakan teknologi WebSocket dengan backend Golang dan frontend HTML, CSS, dan JavaScript.
    Memungkinkan pengiriman dan penerimaan pesan secara langsung dan cepat untuk percakapan anonim yang mudah diakses.
  `
  ),
  
  contact: () => ({
    type: 'contact',
    data: {
      email: 'asikmahdi@gmail.com',
      github: 'https://github.com/MahDryyy'
    }
  }),
};

// Output functions
function appendOutput(text) {
  const pre = document.createElement('pre');
  pre.textContent = text;
  pre.classList.add('output');
  terminal.appendChild(pre);
  scrollToBottom();
}

function appendOutputTyped(text, typingMs = 15) {
  const pre = document.createElement('pre');
  pre.classList.add('output');
  terminal.appendChild(pre);
  return typeText(pre, text, typingMs).then(() => scrollToBottom());
}

function appendOutputWithLinks(outputData, typingMs = 15) {
  const pre = document.createElement('pre');
  pre.classList.add('output');
  terminal.appendChild(pre);
  
  if (outputData.type === 'contact') {
    pre.innerHTML = `
Contact:
Email: <a href="mailto:${outputData.data.email}" class="terminal-link">${outputData.data.email}</a>
GitHub: <a href="${outputData.data.github}" target="_blank" class="terminal-link">${outputData.data.github}</a>
    `;
    scrollToBottom();
    return Promise.resolve();
  }
  
  
  return typeText(pre, JSON.stringify(outputData), typingMs).then(() => scrollToBottom());
}

function appendPromptOnly(cmdText) {
  const line = document.createElement('div');
  line.classList.add('line');
  
  const prompt = document.createElement('span');
  prompt.classList.add('prompt');
  prompt.textContent = PROMPT_TEXT;
  
  line.appendChild(prompt);
  
  if (cmdText && cmdText.length > 0) {
    const commandSpan = document.createElement('span');
    commandSpan.classList.add('command');
    commandSpan.textContent = ' ' + cmdText;
    line.appendChild(commandSpan);
  }
  
  terminal.appendChild(line);
}

function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

// Command handling
function showWelcome() {
  appendPromptOnly('welcome');
  return appendOutputTyped(commands.welcome());
}

async function handleCommand(rawValue) {
  const value = rawValue.trim();
  if (!value) return;

  if (value === 'clear') {
    terminal.innerHTML = '';
    await showWelcome();
    return;
  }

  const handler = commands[value];
  
  if (typeof handler === 'function') {
    const result = handler();
    if (typeof result === 'object' && result.type === 'contact') {
      await appendOutputWithLinks(result);
    } else {
      await appendOutputTyped(result);
    }
  } else {
    await appendOutputTyped('Command not found. Type "help" to see available commands.');
  }
}

// Terminal line creation
function newLine() {
  const line = document.createElement('div');
  line.classList.add('line');

  const prompt = document.createElement('span');
  prompt.classList.add('prompt');
  prompt.textContent = PROMPT_TEXT;

  const input = document.createElement('input');
  
  input.addEventListener('keydown', async function (e) {
    if (e.key === 'Enter') {
      const value = input.value;

      const commandSpan = document.createElement('span');
      commandSpan.classList.add('command');
      commandSpan.textContent = ' ' + value;

      input.remove();
      line.appendChild(commandSpan);

      await handleCommand(value);
      newLine();
    }
  });

  line.appendChild(prompt);
  line.appendChild(input);
  terminal.appendChild(line);
  input.focus();
  scrollToBottom();
}

// Boot sequence
async function boot() {
  if (splash && splashText) {
    await typeText(splashText, splashMessage, 100);
    await new Promise(r => setTimeout(r, 400));
    splash.classList.add('hidden');
  }

  await showWelcome();
  newLine();
}

// Initialize the terminal
boot();
