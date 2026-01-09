import React from 'react';

function Header({ course }) {
  return <h1>{course}</h1>;
}

function Part({ part, exercises }) {
  return (
    <p>
      {part} {exercises}
    </p>
  );
}

function Content({ parts }) {
  return (
    <div>
      <Part part={parts[0].name} exercises={parts[0].exercises} />
      <Part part={parts[1].name} exercises={parts[1].exercises} />
      <Part part={parts[2].name} exercises={parts[2].exercises} />
    </div>
  );
}

function Total({ exercises }) {
  const totalExercises = exercises.reduce(
    (accumulator, current) => accumulator + current,
    0
  );
  return <p>Number of exercises {totalExercises}</p>;
}

function App() {
  const course = 'Half Stack application development';

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };
  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} />
      <Total exercises={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  );
}

export default App;
