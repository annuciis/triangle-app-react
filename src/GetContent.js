import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import triangleType from "./triangleType";

const GetContent = () => {
  //values for each side
  const [values, setValues] = useState({
    AB: "",
    BC: "",
    AC: "",
  });

  //error checking
  const ErrorCheck = () => {
    if (
      parseInt(values.AB, 10) === 0 ||
      parseInt(values.BC, 10) === 0 ||
      parseInt(values.AC, 10) === 0
    ) {
      return 0;
    }
    if (
      parseInt(values.AB, 10) <= 0 ||
      parseInt(values.BC, 10) <= 0 ||
      parseInt(values.AC, 10) <= 0
    ) {
      return 0;
    }

    if (values.AB === "" || values.BC === "" || values.AC === "") {
      return 0;
    }

    return 1;
  };

  //replacing old values of each side(empty strings) to new values
  const set = (side_len) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [side_len]: value }));
    };
  };

  //counter for times, when user clicks on the button
  const [count, setCount] = useState(0);

  //Canvas component <Canvas />
  const Canvas = (props) => {
    const canvasRef = useRef(null);

    //converting to integer type
    if (values.AB && values.BC && values.AC) {
      values.AB = parseInt(values.AB, 10);
      values.BC = parseInt(values.BC, 10);
      values.AC = parseInt(values.AC, 10);
    }

    //multiply each side to 10 to make each side more visible on canvas
    let AB = values.AB * 10;
    let BC = values.BC * 10;
    let AC = values.AC * 10;

    //setting X coordinates to third point in order to know where it should be draw
    let Cx = (AC * AC - BC * BC + AB * AB) / (2 * AB);

    //draw function to draw the canvas

    const draw = (ctx) => {
      const drawCanvas = () => {
        let path = new Path2D();
        ctx.strokeStyle = "black";
        path.moveTo(120, 20);
        path.lineTo(AB + 120, 20);
        path.lineTo(Cx + 120, Math.sqrt(AC * AC - Cx * Cx) + 20);
        path.lineTo(120, 20);

        ctx.fillStyle = "white";
        ctx.fill(path);
        ctx.stroke(path);

        //canvas text

        ctx.font = "900 20px Verdana";
        ctx.fillStyle = "black";
        ctx.fillText(triangleType(AB, BC, AC), 90, 130);
      };

      //if all input fields are filled and if the values are valid and if user clicks on the button, then canvas is drawing
      if (
        values.AB &&
        values.BC &&
        values.AC &&
        ErrorCheck() === 1 &&
        count >= 1
      ) {
        drawCanvas();
      }

      if (
        values.AB &&
        values.BC &&
        values.AC &&
        ErrorCheck() === 0 &&
        count >= 1
      ) {
        setCount(0);
        alert("Input values are not valid");
      }

      if (ErrorCheck() === 0 && count >= 1) {
        alert("Input values cannot be 0 or empty");
        setCount(0);
      }
    };

    //section for drawing canvas
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      draw(context);
    }, [draw]);

    //visible code
    return <canvas ref={canvasRef} {...props} />;
  };

  //page content
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div id="container" className="col-lg-4 col-md-6 col-sm-9 col-11">
          <Canvas />

          <fieldset>
            <legend>A side</legend>
            <input
              type="number"
              required
              min="1"
              value={values.AB}
              onChange={set("AB")}
            />
          </fieldset>

          <fieldset>
            <legend>B side</legend>
            <input
              type="number"
              required
              min="1"
              value={values.BC}
              onChange={set("BC")}
            />
          </fieldset>

          <fieldset>
            <legend>C side</legend>
            <input
              type="number"
              required
              min="1"
              value={values.AC}
              onChange={set("AC")}
            />
          </fieldset>

          <button
            id="calculate-btn"
            className="btn btn-sm btn-dark calculate-btn"
            onClick={ErrorCheck}
            onClick={() => setCount(count + 1)}
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetContent;
