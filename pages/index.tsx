import Head from "next/head"
import { useRef } from "react"

export default function Home() {
  const stream = useRef<MediaStream | null>(null)
  const video = useRef<HTMLVideoElement | null>(null)
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const img = useRef<HTMLImageElement | null>(null)

  const getMedia = async (facingMode: "user" | "environment") => {
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })
      video.current!.srcObject = stream.current
      video.current?.play()
    } catch (err) {
      alert(err)
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
          <video
            ref={video}
            className="bg-purple-200"
            width={1280}
            height={720}
          >
            Video stream not available.
          </video>
          <div className="py-10" />
          <div className="flex justify-center flex-wrap">
            <button
              className="bg-indigo-400 px-8 h-10 text-white text-xl rounded hover:bg-indigo-500"
              onClick={() => getMedia("user")}
            >
              Start Stream (Front)
            </button>
            <div className="px-4" />
            <button
              className="bg-indigo-400 px-8 h-10 text-white text-xl rounded hover:bg-indigo-500"
              onClick={() => getMedia("environment")}
            >
              Start Stream (Back)
            </button>
            <div className="px-4" />
            <button
              className="bg-orange-400 px-8 h-10 text-white text-xl rounded hover:bg-orange-500"
              onClick={() =>
                stream.current?.getTracks().forEach((track) => track.stop())
              }
            >
              Stop Stream
            </button>
            <div className="px-4" />
            <button
              className="bg-indigo-400 px-8 h-10 text-white text-xl rounded hover:bg-indigo-500"
              onClick={takePicture}
            >
              Take photo
            </button>
          </div>
          <div className="py-10" />
          <canvas ref={canvas} className="hidden" />
          <div className="py-10" />
          {JSON.stringify("<input capture=environment/>")}
          <input type="file" accept="image/*" capture="environment" />
          <div className="py-10" />
          {JSON.stringify("<input capture=user/>")}
          <input type="file" accept="image/*" capture="user" />

          <div className="text-sm pt-5">
            *capture environment:
            <a
              className="text-blue-700 font-medium"
              href="https://www.w3.org/TR/mediacapture-streams/#dom-videofacingmodeenum"
            >
              mediacapture-streams/#dom-videofacingmodeenum
            </a>
          </div>
          <div className="py-10" />
          {JSON.stringify("<img/>")}
          <div className=" bg-red-100">
            <img
              className="bg-pink-300 border-0"
              ref={img}
              width={"100%"}
              height={"100%"}
            />
          </div>
        </div>
      </main>
      <footer />
    </div>
  )
}
