import React, { useState, useEffect } from "react";
import {
  Label,
  Text,
  Textbox,
  Textarea,
  ListTextbox,
  FileUpload,
  Barchart,
  DisplayImage,
  NERViz,
} from "./hudlUI";
import { Paper, Button } from "./supportingUI";

const InferenceWidget = (props) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(null);
  const [inputs, setInputs] = useState({});
  const [output, setOutput] = useState(null);

  // Set Default Example Inputs
  useEffect(() => {
    let _inputs = {};
    for (let i = 0; i < props.blueprint.inputs.length; i++) {
      let component = props.blueprint.inputs[i];
      if (component.example) {
        if (component.mapping == "direct") {
          _inputs = component.example;
        } else {
          _inputs[component.id] = component.example;
        }
      }
    }
    setInputs(_inputs);
  }, []);

  const predict = async () => {
    setStatus("⏳The model is performing inference");
    setLoading(true);

    let payload =
      props.blueprint.inputKeys && typeof inputs === "object"
        ? { ...inputs, ...props.blueprint.inputKeys }
        : inputs;

    console.log(payload);

    try {
      const raw_response = await fetch(props.endpoint, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-api-key": props.apiKey,
        },
        method: "POST",
        body: JSON.stringify(payload),
      });
      const response = await raw_response.json();
      console.log(response);
      setOutput(response.body.output);
    } catch (err) {
      console.log(err);
      alert("Something went wrong! Please try again.");
    }

    setStatus("⚡Model is Ready");
    setLoading(false);
  };

  return (
    <div>
      <Paper>
        {/* Description */}
        <p className="mb-2">{props.blueprint.description}</p>

        {/* Inputs */}
        {props.blueprint.inputs.map((component, idx) => {
          switch (component.type) {
            case "textbox":
              return (
                <Textbox
                  key={idx}
                  {...component}
                  setInputs={setInputs}
                  inputs={inputs}
                />
              );

            case "textarea":
              return (
                <Textarea
                  key={idx}
                  {...component}
                  setInputs={setInputs}
                  inputs={inputs}
                />
              );

            case "listbox":
              return (
                <ListTextbox
                  key={idx}
                  {...component}
                  setInputs={setInputs}
                  inputs={inputs}
                />
              );
            case "file":
              return (
                <FileUpload
                  key={idx}
                  {...component}
                  setInputs={setInputs}
                  inputs={inputs}
                />
              );
          }
        })}

        {/* Status and Predict Button */}
        <div className="flex justify-between items-center flex-wrap gap-1 mt-4 mb-4">
          <p className="border-2 border-blue-500 p-2 rounded-md">
            <span className="font-semibold text-gray-600">Status:</span>{" "}
            <span>{status ? status : props.status}</span>
          </p>
          <div className="flex items-center justify-center gap-2">
            <Button
              disabled={loading ? loading : props.loading}
              onClick={async () => {
                await predict();
              }}
            >
              Make Prediction 🔮
            </Button>
          </div>
        </div>

        {/* Outputs */}
        {output &&
          props.blueprint.outputs.map((component, idx) => {
            let componentOutput = output;

            // output mapping
            if (component.mapping) {
              switch (component.mapping.type) {
                case "dict":
                  componentOutput = output[component.mapping.key];
                  break;
                case "index":
                  if (Array.isArray(component.mapping.value)) {
                    componentOutput = output.slice(
                      component.mapping.value[0],
                      component.mapping.value[1]
                    );
                  } else {
                    componentOutput = output[component.mapping.value];
                  }
                  break;
              }
            }

            // render component
            let OutputComponent;
            switch (component.type) {
              case "text":
                OutputComponent = <Text key={idx}>{componentOutput}</Text>;
                break;
              case "barchart":
                OutputComponent = (
                  <Barchart key={idx} data={componentOutput} {...component} />
                );
                break;
              case "image":
                OutputComponent = (
                  <DisplayImage
                    key={idx}
                    data={componentOutput}
                    {...component}
                  />
                );
                break;
              case "ner":
                OutputComponent = (
                  <NERViz key={idx} data={componentOutput} {...component} />
                );
                break;
            }

            return (
              <div key={idx}>
                <Label>
                  {component.label ? component.label : "Predictions📊"}
                </Label>
                {OutputComponent}
              </div>
            );
          })}
      </Paper>
    </div>
  );
};

export default InferenceWidget;
