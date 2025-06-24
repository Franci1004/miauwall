const cats = [
  { img: 'images/cat_1-removebg-preview.png', sound: 'sounds/dunkelmiau.mp3' },
  { img: 'images/cat_2-removebg-preview.png', sound: 'sounds/rosagraumiau.mp3' },
  { img: 'images/cat_3-removebg-preview.png', sound: 'sounds/orangemiau.mp3' },
  { img: 'images/cat_4-removebg-preview.png', sound: 'sounds/weißgraumiau.mp3' }
];

const socket = io();

function spawnCat(cat) {
  const img = document.createElement('img');
  img.src = cat.img;
  img.className = 'cat';
  document.body.appendChild(img);

  const sound = new Audio(cat.sound);
  sound.volume = 0.8;
  sound.play();

  setTimeout(() => {
    img.remove();
  }, 8000);
}

function spawnCatAndSend() {
  const cat = cats[Math.floor(Math.random() * cats.length)];
  spawnCat(cat);
  socket.emit('spawnCat', cat);
}

window.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-audio');
  const muteButton = document.getElementById('mute-button');
  audio.volume = 0.5;

  let isPlaying = false;

  muteButton.addEventListener('click', () => {
    if (!isPlaying) {
      audio.play();
      isPlaying = true;
      muteButton.textContent = '🔇 Stop Music 🍓';
    } else {
      audio.pause();
      isPlaying = false;
      muteButton.textContent = '🔊 Play Music 🍓';
    }
  });

  // Nur noch: spawnCatAndSend()
  document.body.addEventListener('click', (e) => {
    if (e.target.id !== 'mute-button') {
      spawnCatAndSend();
    }
  });
});

// Empfange fremde Katzen
socket.on('spawnCat', (cat) => {
  spawnCat(cat);
});
