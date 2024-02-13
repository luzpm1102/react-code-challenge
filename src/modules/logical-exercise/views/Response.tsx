import React, { useState, useEffect } from "react";
import { generateRandomArray } from "../helpers";
import { fewerChangeSheets } from "../result";

const Response = () => {
  const [array, setArray] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const newArray = generateRandomArray();
    setArray(newArray);
    setResponse(fewerChangeSheets(newArray));
  }, []);

  console.log({ array, response });

  return (
    <div>
      <h2>Logical Exercise Response</h2>

      <p>
        The function <code>fewerChangeSheets()</code> received this array of numbers:{" "}
        <code>{JSON.stringify(array, null, 2)}</code>
      </p>

      <p>
        And the response is: <code>{response}</code>
      </p>
    </div>
  );
};

export default Response;
