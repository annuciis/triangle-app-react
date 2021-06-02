import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

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
      alert("Side length cannot be 0");
      return 0;
    }
    if (
      parseInt(values.AB, 10) < 0 ||
      parseInt(values.BC, 10) < 0 ||
      parseInt(values.AC, 10) < 0
    ) {
      alert("Side length cannot be less than 0");
      return 0;
    }

    if (values.AB === "" || values.BC === "" || values.AC === "") {
      alert("Please, enter all values");
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

  //Canvas component <Canvas />
  const Canvas = (props) => {
    //converting to integer type
    const canvasRef = useRef(null);
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
      if (values.AB && values.BC && values.AC && ErrorCheck() === 1) {
        let path = new Path2D();
        ctx.strokeStyle = "black";
        path.moveTo(120, 20);
        path.lineTo(AB + 120, 20);
        path.lineTo(Cx + 120, Math.sqrt(AC * AC - Cx * Cx) + 20);
        path.lineTo(120, 20);

        ctx.fillStyle = "white";
        ctx.fill(path);
        ctx.stroke(path);

        //
        const triangleType = (side1, side2, side3) => {
          //check, if exists
          if (
            side1 + side2 <= side3 ||
            side1 + side3 <= side2 ||
            side2 + side3 <= side1
          ) {
            return "Non existing";
          }

          if (side1 === side2 && side2 === side3) {
            return "Equilateral";
          }

          if (side1 === side2 || side1 === side3 || side2 === side3) {
            return "Isosceles";
          }

          return "Scalene";
        };

        //canvas text
        if (values.AB && values.BC && values.AC) {
          ctx.font = "900 20px Verdana";
          ctx.fillStyle = "black";
          ctx.fillText(triangleType(AB, BC, AC), 90, 130);
        }
      }
    };
    //section for drawing canvas
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      //canvas is drawing

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
          >
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <GetContent />
    </div>
  );
}
