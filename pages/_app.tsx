// pages/_app.tsx
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
