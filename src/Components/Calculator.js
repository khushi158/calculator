import React, { useState } from "react";
import "./cal.css";

const Calculator = () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [res, setRes] = useState('');
    const [ansR, setAnsr] = useState();
    const [firstrun, setFirstRun] = useState(false);

    function handleChange1(e) {
        setValue1(e.target.value);
    }

    function handleChange2(e) {
        setValue2(e.target.value);
    }

    function checkBothInteger(value1, value2) {
        if (!isValidNumber(value1)) {
            return { 'bool': false, 'str': 'Input1 is not a valid number ' };
        }
        if (!isValidNumber(value2)) {
            return { 'bool': false, 'str': 'Input2 is not a valid number ' };
        }
        return { 'bool': true, 'str': '' };
    }

    function isValidNumber(value) {
        if (value.trim() === '') {
            return false;
        }
        const num = Number(value);
        return !isNaN(num);
    }

    function calculation(value1, value2, arith) {
        let ans;
        value1 = Number.parseInt(value1);
        value2 = Number.parseInt(value2);  
        if (arith === '+') {
            ans = value1 + value2;
        } else if (arith === '-') {
            ans = value1 - value2;
        } else if (arith === '*') {
            ans = value1 * value2;
        } else {
            ans = value1 / value2;
        }
        return ans;
    }

    function handleBtnClick(e) {
        if (!firstrun) setFirstRun(true);

        if (value1 === "" || value2 === "") {
            setAnsr(false);
            setRes("Input field is empty");
        } else {
            const checkResult = checkBothInteger(value1, value2);
            if (checkResult.bool) {
                const arith = e.target.value;
                const ans = calculation(value1, value2, arith);
                setRes(ans);
                setAnsr(true);
            } else {
                setRes(checkResult.str);
                setAnsr(false);
            }
        }
    }

    return (
        <div class="main">
            <div id ="child">
            <h1>React Calculator</h1>
            <input value={value1} onChange={handleChange1} type="text" placeholder="Enter first number" />
            <input value={value2} onChange={handleChange2} type="text" placeholder="Enter second number" />
            <div>
                <button value={'+'} onClick={handleBtnClick}>+</button>
                <button value={'-'} onClick={handleBtnClick}>-</button>
                <button value={'*'} onClick={handleBtnClick}>*</button>
                <button value={'/'} onClick={handleBtnClick}>/</button>
            </div>
            {firstrun && 
                <div className={ansR ? 'correct' : 'incorrect'}>
                    {ansR ? `Success 💁‍♂️ ${res}` : `Error 🚩 ${res}`}
                </div>
            }
            </div>
        </div>
    );
}

export default Calculator;
