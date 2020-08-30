import React, { useEffect } from 'react'
import { Layout } from '../components'
import AppDetectInstall from '../components/AppDetectInstall';

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
    }
  }, [])

  return (
    <Layout>
      <div className="my-12">
        <AppDetectInstall />
      </div>
    </Layout>
  )
}

export default Index;