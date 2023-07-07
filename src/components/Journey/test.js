"use client";

import {
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  cloneElement,
  createContext,
  useEffect,
  useState,
} from "react";

const Step1 = ({ showNextStep }) => {
  return (
    <>
      <h3>Step 1</h3>
      <button onClick={() => showNextStep()}>Next</button>
    </>
  );
};

const Step2 = ({ showNextStep }) => {
  return (
    <>
      <h3>Step 2</h3>
      <button onClick={() => showNextStep()}>Next</button>
    </>
  );
};

const withJourneyProps = (Component, props) => (
  <Component {...Component.props} {...props} />
);

const Journey = ({ children }) => {
  return <>{children}</>;
};

export const NamedJourneyTest = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const showNextStep = () => {
    setCurrentStepIndex(currentStepIndex + 1);
  };
  return (
    <Journey>
      <Step1 showNextStep={showNextStep} />
      <Step2 showNextStep={showNextStep} />
    </Journey>
  );
};

const GetStarted = ({ showNextStep }) => (
  <>
    <h3>Get started</h3>
    <button onClick={() => showNextStep()}>Next</button>
  </>
);

const GetStartedStep = ({ journeyContext }) => {};

// Next thing to try is to
// look at the Requirments HOC
// the solution will need an array of step objects
// A container will need to decide which component from the array to render
// then render it and pass the functions to recalculate the current step

// When the components are first defined in a config object they will have to have the journey props (e.g. `nextStep()`) passed in.
// If a step in the journey requires additinoal props not defined as a JourneyStep type then it will have to be applied and returned by the journey step

// Jounery will take an array of objects setup the hook on the object and render the first step that the showStep function returns true on
