import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import { getCssText } from '~/config';
import * as gtag from "~/lib/gtag";
import { Toast } from '@radix-ui/react-toast';
import { Navbar, Footer } from './components';
import { ToastProvider } from './context';
import { CommandBar } from './modules';
import { Wrapper } from './ui';
import * as ToastPrimitive from '@radix-ui/react-toast'
import { useEffect } from "react";


export const meta: MetaFunction = () => [{
  charset: "utf-8",
  title: "Remix with Stitches",
  viewport: "width=device-width,initial-scale=1",
}];

export const loader = async () => {
  return json({ gaTrackingId: process.env.GTM_ID });
};

const Document = (props: { children: React.ReactNode }) => {
  const location = useLocation();
  const { gaTrackingId } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageView(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.1.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <Meta />
        <Links />
        <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </head>
      <body>
        {props.children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
};

const App = () => (
  <Document>
    <ToastProvider>
      <ToastPrimitive.Provider>
        <CommandBar>
          <Wrapper>
            <Navbar />
            <Outlet />
            <Footer />
          </Wrapper>

          <Toast />
        </CommandBar>
      </ToastPrimitive.Provider>
    </ToastProvider>
  </Document>
);

const ErrorBoundary = (props: { error: Error }) => (
  <Document>
    <h1>This is the root route's ErrorBoundary</h1>
    <p>Error: {props.error.message}</p>
  </Document>
);

export default App;
export { ErrorBoundary };
