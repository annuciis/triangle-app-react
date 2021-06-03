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
    if (parseInt(values.AB, 10) === 0 || parseInt(values.BC, 10) === 0 || parseInt(values.AC, 10) === 0) 
    {
      return 2; //if one of the input value is 0
    }

    if (parseInt(values.AB, 10) < 0 || parseInt(values.BC, 10) < 0 || parseInt(values.AC, 10) < 0)
    {
      return 0; //if one of the input value is less than 0
    }

    if (values.AB === "" || values.BC === "" || values.AC === "") 
    {
      return 3; //if one of the input value is not written
    }

    return 1; // in other cases
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
    if (values.AB && values.BC && values.AC)
    {
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
        //function, which is specially for drawing the lines, defining styles, color to the canvas
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
      if (values.AB && values.BC && values.AC && ErrorCheck() === 1 && count >= 1)
      {
        drawCanvas();
        setCount(2); //this function allows to edit the fields without getting error that the field is empty, when editing the value
      }

      if (values.AB && values.BC && values.AC && ErrorCheck() === 0 && count >= 1) //if user writes negative value(-1, -2 etc)
      {
        setCount(0);
        alert("Input values cannot be negative numbers");
      } else if (ErrorCheck() === 2 && count >= 1) { //this shows up, if user writes value 0
        setCount(0);
        alert("Input values cannot be 0");
      } else if (ErrorCheck() === 3 && count === 2) { //so in this case(if user is editing the field and it's empty) there won't be the error message
        setCount(0);
      } else if (ErrorCheck() === 3 && count === 1) { //here, if the calculate button is clicked and then the fields are empty, the message shows up
        alert("Input values cannot be empty");
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
            <input type="number" required min="1" value={values.AB} onChange={set("AB")}/>
          </fieldset>

          <fieldset>
            <legend>B side</legend>
            <input type="number" required min="1" value={values.BC} onChange={set("BC")}/>
          </fieldset>

          <fieldset>
            <legend>C side</legend>
            <input type="number" required min="1" value={values.AC} onChange={set("AC")}/>
          </fieldset>

          <button id="calculate-btn" className="btn btn-sm btn-dark calculate-btn" onClick={ErrorCheck} onClick={() => setCount(count + 1)}>
            Calculate
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetContent;
