// Landing video controls: pause/play and sound on/off.
var video = document.getElementById("hero-video");
var playBtn = document.getElementById("playBtn");
var soundBtn = document.getElementById("soundBtn");

function updateButtons() {
  playBtn.textContent = video.paused ? "Play" : "Pause";
  playBtn.setAttribute("aria-pressed", String(video.paused));
  soundBtn.textContent = video.muted ? "Sound on" : "Sound off";
  soundBtn.setAttribute("aria-pressed", String(!video.muted));
}

playBtn.addEventListener("click", function () {
  if (video.paused) { video.play(); } else { video.pause(); }
  updateButtons();
});

soundBtn.addEventListener("click", function () {
  video.muted = !video.muted;
  updateButtons();
});

// Respect visitors who prefer reduced motion: start paused on the poster frame
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  video.pause();
}
updateButtons();
