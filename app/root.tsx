import {
  Links,
  LiveReload,
  Meta,
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
import { Navbar, Footer, Toast } from './components';
import { ToastProvider } from './context';
import { CommandBar, Layout, Layout, ShortcutError } from './modules';
import { Wrapper } from './ui';
import * as ToastPrimitive from '@radix-ui/react-toast'
import { PropsWithChildren, useEffect } from "react";

export const loader = async () => {
  return json({ gaTrackingId: process.env.GTM_ID });
};

const Document = ({ children }: PropsWithChildren) => {
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
        {!gaTrackingId ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}

        {children}
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

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <>
      <head>
        <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: getCssText() }} />
      </head>
      <body>
        <ToastProvider>
          <ToastPrimitive.Provider>
            <CommandBar>
              <Wrapper>
                <Navbar />
                <Layout>
                  {isRouteErrorResponse(error) ?
                    (
                      <ShortcutError code={error.status} />
                    )
                    : error instanceof Error ?
                      (
                       <ShortcutError />
                      ) :
                      <ShortcutError />
                  }
                </Layout>
                <Footer />
              </Wrapper>
              <Toast />
            </CommandBar>
          </ToastPrimitive.Provider>
        </ToastProvider>
      </body>
    </>
  )
};

export default App;
export { ErrorBoundary };
