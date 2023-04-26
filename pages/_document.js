import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="/assets/css/login.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/css/registration.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/css/notification.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/css/profile.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/assets/css/StoryModal.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <body style={{ backgroundColor: "#eff3f6" }}>
        <Main />
        <NextScript />

        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
          integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"
          integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD"
          crossOrigin="anonymous"
        ></script>
      </body>
    </Html>
  );
}
