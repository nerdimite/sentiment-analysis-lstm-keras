import { useState, useEffect } from "react";

export const Label = (props) => {
  return (
    <div className="text-md md:text-lg mb-1 text-gray-600 font-semibold">
      {props.children}
    </div>
  );
};

const inputHandler = (props) => {
  // in direct mapping the value of the textbox is set as input without any modifications
  if (props.mapping == "direct") {
    props.setInputs(props.value);
  } else {
    // default mapping is of type json
    props.setInputs({
      ...props.inputs,
      [props.id]: props.value,
    });
  }
};

// ============================================================================
// Input Components
// ============================================================================
export const Textbox = (props) => {
  return (
    <div id={props.id} className="mb-2">
      <Label>{props.label}</Label>
      <input
        id={`${props.id}-input`}
        type="text"
        className="w-full p-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-600 mb-3"
        placeholder={props.hint}
        defaultValue={props.example ? props.example : ""}
        onChange={(e) => {
          inputHandler({ ...props, value: e.target.value });
        }}
      />
    </div>
  );
};

export const Textarea = (props) => {
  return (
    <div id={props.id} className="mb-2">
      <Label>{props.label}</Label>
      <textarea
        id={`${props.id}-input`}
        type="text"
        className="w-full resize-none mt-1 p-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-600"
        rows={props.rows ? props.rows : "7"}
        placeholder={props.hint}
        defaultValue={props.example ? props.example : ""}
        onChange={(e) => {
          inputHandler({ ...props, value: e.target.value });
        }}
      />
    </div>
  );
};

export const FileUpload = (props) => {
  return (
    <div className="mb-2">
      <Label>{props.label}</Label>
      <div className="text-sm mb-1 text-gray-600">{props.hint}</div>

      <input
        id={`${props.id}-input`}
        type="file"
        // className="mb-3 border-solid focus:outline-none w-1/2"
        className="
        w-full
        rounded-l-sm
        rounded-r-lg
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-300 focus:outline-none"
        onChange={(event) => {
          let files = event.target.files;
          if (files.length > 0) {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
              let image_uri = e.target.result.split(",")[1];
              // set input payload
              inputHandler({ ...props, value: image_uri });
            };
          }
        }}
      />
    </div>
  );
};

export const ListTextbox = (props) => {
  const [items, setItems] = useState(props.example ? props.example : []);
  let tmpItem = "";

  useEffect(() => {
    // set input payload
    inputHandler({ ...props, value: items });
  }, [items]);

  return (
    <div id={props.id} className="mb-2">
      <Label>{props.label}</Label>
      <div className="flex items-center overflow-x-auto p-2 border rounded-md focus:outline-none focus:border-blue-600">
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{ whiteSpace: "nowrap" }}
            className="rounded-full p-2 bg-blue-200 mr-1 font-medium flex items-center gap-1"
          >
            <span className="text-blue-600">{item}</span>
            <button
              onClick={() => {
                // remove item from list
                let _items = [...items];
                _items = _items.filter((val) => val !== item);
                setItems(_items);
              }}
              className="rounded-full w-5 h-5 bg-blue-600 text-white"
            >
              ×
            </button>
          </div>
        ))}
        <input
          id={`${props.id}-input`}
          type="text"
          className="flex-grow focus:outline-none text-gray-700 "
          placeholder={
            props.hint
              ? props.hint
              : "Type and press enter to add an item to the list"
          }
          onKeyDown={(e) => {
            let inputElement = document.getElementById(`${props.id}-input`);
            // push item on enter
            if (e.key === "Enter" && tmpItem.length > 0) {
              setItems([...items, tmpItem]);
              tmpItem = "";
              inputElement.value = "";

              // pop item on backspace
            } else if (
              e.key === "Backspace" &&
              tmpItem === "" &&
              items.length > 0
            ) {
              let _items = [...items];
              inputElement.value = _items.pop();
              setItems(_items);
            }
          }}
          onChange={(e) => {
            tmpItem = e.target.value;
            // console.log(tmpItem);
          }}
        />
      </div>
    </div>
  );
};

// ============================================================================
// Output Components
// ============================================================================
export const Text = (props) => {
  return (
    <div className="text-md md:text-lg mb-4 text-gray-600">
      {typeof props.children === "object"
        ? JSON.stringify(props.children)
        : props.children}
    </div>
  );
};

export const Barchart = (props) => {
  const color_map = ["blue", "red", "indigo", "rose", "orange", "amber"];

  return (
    <div className="mb-4">
      {props.data.map((item, idx) => {
        idx = idx % color_map.length;
        let label = item[0];
        let value = item[1];

        if (props.transform && props.transform.type === "math") {
          let expr = props.transform.expression.replace("x", item[1]);
          value = eval(expr);
        }

        return (
          <div className="mb-2" key={idx}>
            <Badge
              label={`${label}: ${value.toFixed(2)}%`}
              color={color_map[idx]}
            />
            <Progress value={value} color={color_map[idx]} />
          </div>
        );
      })}
    </div>
  );
};

export const DisplayImage = (props) => {
  return (
    <div className="w-full md:w-2/3 flex items-center justify-center border-2 rounded-md overflow-hidden border-blue-600 mb-4">
      <img
        src={`data:image/png;base64,${props.data}`}
        alt="image"
        objectFit="contain"
      />
    </div>
  );
};

export const NERViz = (props) => {
  const bgColors = [
    "bg-orange-500",
    "bg-red-500",
    "bg-cyan-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-rose-500",
    "bg-indigo-500",
    "bg-amber-500",
    "bg-lime-500",
  ];
  const [colorMap, setColorMap] = useState({});

  useEffect(() => {
    let map = {};
    for (let i = 0; i < props.entities.length; i++) {
      map[props.entities[i]] = bgColors[i % bgColors.length];
    }
    setColorMap(map);
    // console.log(map);
  }, []);

  return (
    <div className="mb-4 mt-2 text-base flex flex-wrap gap-1.5">
      {Object.keys(colorMap).length === props.entities.length &&
        props.data.map((item, idx) => {
          let token = item[0];
          let label = item[1];

          if (label === "O") {
            return (
              <div key={idx} className="mb-4">
                {token}
              </div>
            );
          } else {
            return (
              <div key={idx} className="mb-4">
                <span
                  key={idx + 1}
                  className={"p-1.5 rounded-md text-white " + colorMap[label]}
                >
                  {token}
                  <span
                    key={idx + 2}
                    className="bg-white p-0.5 ml-1 rounded-sm text-gray-800 text-xs font-medium"
                  >
                    {label}
                  </span>
                </span>
              </div>
            );
          }
        })}
    </div>
  );
};

// ============================================================================
// ============================================================================
// Components which are used to build other components but not directly used
// ============================================================================
export const Progress = (props) => {
  const color_map = {
    blue: ["bg-blue-200", "bg-blue-600"],
    indigo: ["bg-indigo-200", "bg-indigo-600"],
    red: ["bg-red-200", "bg-red-600"],
    rose: ["bg-rose-200", "bg-rose-600"],
    orange: ["bg-orange-200", "bg-orange-600"],
    amber: ["bg-amber-200", "bg-amber-600"],
  };

  return (
    <div className="relative transition ease-in duration-500">
      <div
        className={`overflow-hidden h-3 text-xs flex rounded-full ${
          color_map[props.color][0]
        }`}
      >
        <div
          style={{ width: `${props.value}%` }}
          className={`shadow-none flex flex-col text-center rounded-full whitespace-nowrap text-white justify-center ${
            color_map[props.color][1]
          }`}
        ></div>
      </div>
    </div>
  );
};

export const Badge = (props) => {
  const color_map = {
    blue: "text-blue-600 bg-blue-200",
    indigo: "text-indigo-600 bg-indigo-200",
    red: "text-red-600 bg-red-200",
    rose: "text-rose-600 bg-rose-200",
    orange: "text-orange-600 bg-orange-200",
    amber: "text-amber-600 bg-amber-200",
  };

  return (
    <span
      className={`py-1 px-3 font-semibold inline-block rounded-full mt-2 mb-2 ${
        color_map[props.color]
      }`}
    >
      {props.label}
    </span>
  );
};
