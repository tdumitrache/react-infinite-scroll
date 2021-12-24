import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";;

function MyApp({ Component, pageProps }) {
  return (
  <ChakraProvider resetCss={false} theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
  )
}

export default MyApp
