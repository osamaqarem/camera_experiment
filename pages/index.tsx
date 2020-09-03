import Head from "next/head"

export default function Home() {
  const getMedia = async () => {
    let stream = null

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      })
      /* use the stream */
    } catch (err) {
      /* handle the error */
    }
  }

  return (
    <div>
      <Head>
        <title>Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10">
        <button
          className="bg-indigo-400 w-64 h-10 text-white text-xl rounded hover:bg-indigo-500"
          onClick={getMedia}
        >
          Get media
        </button>
      </main>
      <footer />
    </div>
  )
}
