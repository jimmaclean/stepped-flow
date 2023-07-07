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

export type Props = PropsWithChildren<{
  className?: string;
  steps: JourneyStep[];
  renderStep: (
    step: ReactNode,
    showStep: boolean,
    showNextStep: () => void
  ) => ReactNode;
}>;

type JourneyStep = {
  showStep: () => boolean;
  onComplete?: () => void;
  content: ReactNode;
};

export const Journey: FunctionComponent<Props> = ({ steps, renderStep }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const showNextStep = () => {
    setCurrentStepIndex(currentStepIndex + 1);
  };
  // Run through each step and check if it should be shown
  // If it should be shown, show it
  // If it should not be shown, skip it
  // If it should be shown and is the last step, show it and mark the journey as complete
  // If it should be shown and is not the last step, show it and mark the journey as incomplete

  return (
    <>
      {steps.map((step, index) => {
        const showStep = index === currentStepIndex;
        return renderStep(step.content, showStep, showNextStep);
      })}
    </>
  );
};

const Step1Content = ({ showNextStep }) => {
  return (
    <>
      <h3>Step 1</h3>
      <button onClick={() => showNextStep()}>Next</button>
    </>
  );
};
const Step1: JourneyStep = {
  showStep: () => true,
  content: <Step1Content />,
};
const Step2: JourneyStep = {
  showStep: () => true,
  content: <div>Step 2</div>,
};

const Step3: JourneyStep = {
  showStep: () => true,
  content: <div>Step 3</div>,
};

export const TestJourney = () => {
  return (
    <Journey
      steps={[Step1, Step2, Step3]}
      renderStep={(step, showStep, showNextStep) => {
        return <>{showStep && cloneElement(step, { showNextStep })}</>;
      }}
    />
  );
};
