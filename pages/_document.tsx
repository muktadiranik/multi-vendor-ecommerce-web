import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css"
        rel="stylesheet"></link>
      <script src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>

      <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
      <link
        rel="stylesheet"
        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css"
        type="text/css"></link>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
