import React, { useState, useEffect } from "react";
import './Calculadora.css';
import { NumericFormat } from 'react-number-format';

function Calculator() {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);
  const [error, setError] = useState(false);
  const [isNegative, setIsNegative] = useState(false);



  const inputNum = (e) => {
    if (curState.length >= 9) return; //se ignora
  
    if (curState.includes(".") && e.target.textContent === ".") return;
  
    if (total) {
      setPreState("");

    }
  
    setCurState((prevState) => {
      const newState = prevState + e.target.textContent;
      console.log("curState:", newState);
      return newState;
    });
  
    setTotal(false);
  };
  
  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput(curState || "0");
  }, [curState]);
  

  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
  
    let Cal;
    switch (operator) {
      case "/":
        Cal = String(parseFloat(preState) / parseFloat(curState));
        break;
      case "+":
        Cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "X":
        Cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        Cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
  
    if (Cal < 0 || Cal > 999999999) {
        setError(true);
    } else {
        setError(false);
    }
      
  
    setInput("");
    setPreState(Cal);
    setCurState("");

  };
  
  const minusPlus = () => {
    if (curState === "0") return;
  
    setCurState((prevState) => {
      let newState;
      if (prevState.charAt(0) === "-") {
        newState = prevState.substring(1);
      } else {
        newState = "-" + prevState;
      }
      return newState;
    });
  };
  
   
  useEffect(() => {
    console.log("Después del cambio de signo:", curState);
  }, [curState]);
  
  const percent = () => {
    if (preState) {
      setCurState(String((parseFloat(curState) / 100) * parseFloat(preState)));
    } else {
      setCurState(String(parseFloat(curState) / 100));
    }
  };

  const reset = () => {
    setError(false);
    setPreState("");
    setCurState("");
    setInput("0");
    setIsNegative(false); // Agregar esta línea
    
  };
  
  return (
    
    <div className="Calculator-base">
      <div className="wrapper">
        <div className="screen">
        {error ? (
            "ERROR"
          ) : (
            <span>
              {isNegative ? "-" : null} {/* Mostrar el signo "-" basado en la variable de estado */}
              {input !== "" || input === "0" ? (
                <NumericFormat
                  value={input}
                  displayType="text"
                  thousandSeparator={true}
                />
              ) : (
                <NumericFormat
                  value={preState}
                  displayType="text"
                  thousandSeparator={true}
                />
              )}
            </span>
          )}
        </div>
        <div className="btn gray" onClick={reset}>
          AC
        </div>
        <div className="btn gray" onClick={percent}>
          %
        </div>
        <div className="btn gray" onClick={minusPlus}>
          +/-
        </div>
        <div className="btn orange" onClick={operatorType}>
          /
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>
        <div className="btn orange" onClick={operatorType}>
          X
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>
        <div className="btn orange" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn orange" onClick={operatorType}>
          -
        </div>
        <div className="btn zero" onClick={inputNum}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        <div className="btn" onClick={equals}>
          =
        </div>
      </div>


    </div>
  );
}

export default Calculator;
