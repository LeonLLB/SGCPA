import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react';

import 'material-icons/iconfont/material-icons.css';
import '../styles/tailwind.css';
import Navbar from '../components/ui/Navbar';

export default function MyApp({ Component, pageProps }) {

  const [BlurBackdrop, setBlurBackdrop] = useState(false);  

  return (
      <div className="flex flex-col scroll-smooth"> 
        <Head>
          <title>Leonard's portfolio</title>
          <link rel="shortcut icon" href="/LLB logo.svg" type="image/x-icon" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Navbar/>
        <div className='mt-24 md:mt-16 mx-8 scroll-smooth'>
          <Component {...pageProps} />    
        </div>
      </div>
  )
}