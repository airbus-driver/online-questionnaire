export const calcScore = (answers, questions) => {
  let score = 0;
  answers.forEach((answer, index) => {
    const { value } = answer;
    if (questions[index].type === 'multi') {
      if (value.length === 1) {
        score += parseInt(value[0]) * 0.5;
      } else {
        const sum = value.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        score += sum;
      }
    } else {
      score += parseInt(value);
    }
  });
  return (score / questions.length / 10).toFixed();
}
