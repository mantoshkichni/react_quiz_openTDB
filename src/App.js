import { useState } from "react";
import "./styles.css";
import axios from "axios";
// import QuestionComponent from "./questioncomponent"
//#PROBLEM-- the problem i m facing is that whenever i try to put the value in question at usestate it intially  it take undefined and then every thng fucked...try to run these code once u well get a typeerror into th console but donot refresh the page and then again click on click button to see the result into the console....from the secoungd time u will to see the result .....can u help me out in this...from yeaterday i stack in this program....
export default function App() {
  //state to set the question
  const [currentQuestion, setnextquestion] = useState(0);
  const [question, setquestion] = useState();
  const [score, setscore] = useState(0);
  //status for ternary operator to toggle the button and the question screen currently it is not working for testing purpose
  const [status, setstatus] = useState(true);
  let jsondata;
  const getquestion = async () => {
    try {
      //calling the api to get the question
      // const data = await fetch(
      //   "https://opentdb.com/api.php?amount=20&category=23&difficulty=medium"
      // );
      //parsing the question to json format
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&category=9"
        // https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple
      );
      console.log(response.data.results);
      //setting the jsondata to the question in usestate
      setquestion(response.data.results);
      console.log("!@#$%^&^%$#@!");
      //for output the question fron question
      console.log(question?.category, 25);
    } catch (error) {
      console.log(error);
    }
    setstatus(!status);
  };
  function getscore(opt) {
    if (currentQuestion === 9) {
      alert("Your score=" + score);
      setstatus(!status);
      setnextquestion(0);
      setscore(0);
    } else if (opt === true) {
      setnextquestion(currentQuestion + 1);
      setscore(score + 1);
    } else {
      setnextquestion(currentQuestion + 1);
    }
  }
  return (
    <div className="App">
      {/* for toggeling the screen */}
      {status ? (
        <>
          <button
            className="btn-primary"
            style={{
              height: "100px",
              width: "300px",
              fontFamily: "cursive",
              fontSize: "50px",
              marginTop: "300px"
            }}
            onClick={getquestion}
          >
            StartQuiz
          </button>
        </>
      ) : (
        <div className="container">
          <div className="row">
            <h1 className="btn-success mt-5 rounded" style={{ height: "50px" }}>
              Score:{score}
            </h1>
            <h1
              className="bg-dark text-white mt-5 rounded"
              style={{ fontFamily: "cursive" }}
            >
              question:{currentQuestion}/10 <br></br>
              {question[currentQuestion].question}
            </h1>
          </div>

          {question[currentQuestion].incorrect_answers.map((item) => (
            <button
              onClick={() => getscore(false)}
              className="btn-primary col-5 mt-2 mx-2 col-xsm-8 rounded"
              style={{
                height: "70px",
                fontSize: "30px",
                fontFamily: "cursive"
              }}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => getscore(true)}
            className="btn-primary col col-5 mx-2 mt-2 col-xsm-8 rounded "
            style={{ height: "70px", fontSize: "30px", fontFamily: "cursive" }}
          >
            {question[currentQuestion].correct_answer}
          </button>
        </div>
      )}
      {/* {question?.map((items) => (
        <h1>{items.category}</h1>
      ))} */}
    </div>
  );
}
