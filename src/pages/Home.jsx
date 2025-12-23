import { useState, useRef } from "react"

export function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/scary background music.mp3")
      audioRef.current.loop = true
    }

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <button className="scary-btn" onClick={toggleMusic}>
      {isPlaying ? "Stop Scary Music" : "Play Scary Music"}
    </button>
  )
}

export function Home() {
  return (
    <section className="home">
      <h1 className="home-title">Toys R Us!</h1>
      <MusicButton />
      <div className="home-cover"></div>
      <div className="nightmare-banner">BEGIN YOUR NIGHTMARE</div>
    </section>
  )
}
