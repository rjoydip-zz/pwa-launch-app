import React, { useEffect } from 'react'
import { Layout } from '../components'
import { log } from '../utils'

declare global {
  interface Window {
    NDEFReader: any;
    NDEFWriter: any;
  }
}

const Index = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((_) => {
            console.log('service worker registration successful')
          })
          .catch((err) => {
            console.warn('service worker registration failed', err.message)
          })
      }
      if (!("NDEFReader" in window))
        console.error(
          "Web NFC is not available.\n" +
          'Please make sure the "Experimental Web Platform features" flag is enabled on Android.'
        );
    }
  }, [])

  const scan = async () => {
    log("User clicked scan button");

    try {
      const reader = new NDEFReader();
      await reader.scan();
      log("> Scan started");

      reader.addEventListener("error", (event: { message: any }) => {
        log(`Argh! ${event.message}`);
      });

      reader.addEventListener("reading", ({ message, serialNumber }: any) => {
        log(`> Serial Number: ${serialNumber}`);
        log(`> Records: (${message.records.length})`);
      });
    } catch (error) {
      log("Argh! " + error);
    }
  }

  const write = async () => {
    log("User clicked write button");

    try {
      const writer = new NDEFWriter();
      await writer.write("Hello world!");
      log("> Message written");
    } catch (error) {
      log("Argh! " + error);
    }
  }

  return (
    <Layout>
      <button onClick={scan}>Scan</button>
      <button onClick={write}>Write</button>
    </Layout>
  )
}

export default Index;