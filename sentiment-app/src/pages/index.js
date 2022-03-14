import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Container, Paper } from "../components/supportingUI";
import InferenceWidget from "../components/InferenceWidget";
import { blueprint } from "../components/blueprint";

export default function Home() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
  const key = process.env.NEXT_PUBLIC_API_KEY;

  const loadModel = async () => {
    setStatus(
      "🚧 Loading Model into Memory, Please Wait for around 30 seconds..."
    );
    setLoading(true);

    try {
      const raw_response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": key,
        },
        method: "GET",
      });
      const response = await raw_response.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setStatus("⚡ Model is Ready");
    setLoading(false);
  };

  useEffect(async () => {
    await loadModel();
  }, []);

  return (
    <div>
      <Head>
        <title>Sentiment Analysis with LSTM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl mt-4">
            <span className="font-bold text-blue-600">
              🙂Sentiment Analysis with LSTM☹️
            </span>{" "}
          </h1>
        </div>

        {/*HUDL Widget*/}
        <InferenceWidget
          apiKey={key}
          endpoint={endpoint}
          blueprint={blueprint}
          status={status}
          loading={loading}
        />
      </Container>
    </div>
  );
}
