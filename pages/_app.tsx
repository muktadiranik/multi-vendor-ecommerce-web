import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Layout from "../components/Layout.js";
import { client } from "../graphql/apolloClient.js";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store/store.js";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-day-picker/dist/style.css";
import { ToastContainer, toast } from "react-toastify";
export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="favicon.png" />
      </Head>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
}
