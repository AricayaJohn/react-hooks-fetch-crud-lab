import React, {useState} from "react";

function QuestionItem({ question, onDeleteQuestion }) {
  const { id, prompt, answers, correctIndex } = question;
  const [ selectedCorrectAnswerIndex, setSelectedCorrectAnswerIndex ] = useState(correctIndex)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleCorrectIndexChange(event) {
    const newCorrectIndex = parseInt(event.target.value);
    setSelectedCorrectAnswerIndex(newCorrectIndex);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correctIndex: newCorrectIndex,
    })
  })
    .then((response) => {
      if (response.ok) {
        console.log("correct answer updated")
      } else {
        console.error ("failed to update correctly")
      }
    })
    .catch((error) => console.log("Error updating", error))
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if ( response.ok) {
        onDeleteQuestion(id);
      } else {
        console.error("failed to delete");
      }
    })
    .catch((error) => console.error("error deleting Question", error))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedCorrectAnswerIndex} onChange={handleCorrectIndexChange}>
          {options}
          </select>
      </label>
      <button onClick = {handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
