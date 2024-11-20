const soundCache: { [key: string]: HTMLAudioElement } = {}

export const preloadSounds = () => {
  const sounds = [
    'new_puzzle',
    'select',
    'swap',
    'hint',
    'puzzle_solved',
    'incorrect',
    'challenge_unlocked'
  ]

  sounds.forEach(sound => {
    const audio = new Audio(`/sounds/${sound}.mp3`)
    audio.load()
    soundCache[sound] = audio
  })
}

export const playSound = (soundName: string) => {
  const audio = soundCache[soundName]
  if (audio) {
    audio.currentTime = 0
    audio.play().catch(() => {
      // Ignore errors - some browsers block autoplay
    })
  }
}