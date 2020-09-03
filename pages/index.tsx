import Head from "next/head"
import { useRef } from "react"

export default function Home() {
  const stream = useRef<MediaStream | null>(null)
  const video = useRef<HTMLVideoElement | null>(null)
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const img = useRef<HTMLImageElement | null>(null)

  const getMedia = async () => {
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 250, height: 500 },
      })
      video.current!.srcObject = stream.current
      video.current?.play()
    } catch (err) {
      alert("getMedia error. Check console.")
      console.error(err)
    }
  }

  const takePicture = () => {
    const context = canvas.current!.getContext("2d") as CanvasRenderingContext2D
    if (video.current!.width && video.current!.height) {
      canvas.current!.width = video.current!.width
      canvas.current!.height = video.current!.height

      context.drawImage(
        video.current!,
        0,
        0,
        video.current!.width,
        video.current!.height
      )

      const data = canvas.current!.toDataURL("image/png")
      img.current!.setAttribute("src", data)
    }
  }

  return (
    <div>
      <Head>
        <title>Camera Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10">
        <div className="flex flex-col items-center">
          {JSON.stringify("<video/>")}
          <video ref={video} className="bg-purple-200" width={250} height={500}>
            Video stream not available.
          </video>
          <div className="py-10" />
          <div className="flex gap-x-10 justify-center">
            <button
              className="bg-indigo-400 w-40 h-10 text-white text-xl rounded hover:bg-indigo-500"
              onClick={getMedia}
            >
              Get media
            </button>
            <button
              className="bg-indigo-400 w-40 h-10 text-white text-xl rounded hover:bg-indigo-500"
              onClick={takePicture}
            >
              Take photo
            </button>
          </div>
          <div className="py-10" />

          <canvas ref={canvas} className="hidden" />

          {JSON.stringify("<img/>")}
          <img
            className="bg-pink-300 border-0"
            ref={img}
            width={video.current?.videoWidth}
            height={video.current?.videoHeight}
          />
        </div>
      </main>
      <footer />
    </div>
  )
}
