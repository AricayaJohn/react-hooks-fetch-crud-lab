import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [ questions, setQuestions] = useState ([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((questions) => {
      console.log("Fetched questions", questions);
      setQuestions(questions);
    }) 
    .catch((error) => console.error("Error fetching", error))
  }, [])

  function handleDeleteQuestion(id) {
    setQuestions(questions.filter((question) => question.id !== id));
  }

  const questionsToDisplay = questions.map((question) => (
    <QuestionItem 
        key = {question.id}
        question = {question}
        onDeleteQuestion={handleDeleteQuestion}
        />
  ));
 

  return (
    <section>
      <h1>Quiz Questions</h1>
      {/* display QuestionItem components here after fetching */}
      <ul className = "Questions" >
          {questionsToDisplay}
       </ul>
    </section>
  );
}

export default QuestionList;
