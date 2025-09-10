// utils/playNewAudioUtil.js
let currentlyPlayingAudio = null;

export const playNewAudio = (newAudioRef, setIsPlayingCallback) => {
  // If another audio is playing, pause it and reset its UI
  if (currentlyPlayingAudio && currentlyPlayingAudio !== newAudioRef.current) {
    currentlyPlayingAudio.pause();
    currentlyPlayingAudio.currentTime = 0;
    currentlyPlayingAudio.dispatchEvent(new Event("forcePause"));
  }

  // Update reference
  currentlyPlayingAudio = newAudioRef.current;

  // Play new audio
  const playPromise = newAudioRef.current.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        setIsPlayingCallback(true);
      })
      .catch((error) => {
        console.error("Audio play failed:", error);
      });
  }
};

export const stopAllAudio = () => {
  if (currentlyPlayingAudio) {
    currentlyPlayingAudio.pause();
    currentlyPlayingAudio.currentTime = 0;
    currentlyPlayingAudio.dispatchEvent(new Event("forcePause"));
    currentlyPlayingAudio = null;
  }
};
