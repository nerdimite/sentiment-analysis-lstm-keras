export const blueprint = {
  description:
    "A LSTM-based Sentiment Analyser trained on a twitter dataset that contains 1.6 million tweets with their sentiment. Provide some text and hit predict to get back the sentiment of the text. As it is trained on tweets it can only make predictions on upto 40 words.",
  inputs: [
    {
      id: "text",
      type: "textbox",
      label: "Text📜",
      hint: "Enter the text you want to analyse the sentiment of",
      mapping: "direct",
    },
  ],
  outputs: [
    {
      id: "sentiment",
      type: "barchart",
      label: "🙂Sentiment☹️",
      // input format of bar chart data (pair | axis | dict)
      format: "pair",
    },
  ],
};
