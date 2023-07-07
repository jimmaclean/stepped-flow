"use client";
import styles from "./simpleArray.module.scss";
import { FunctionComponent, ReactNode, useState } from "react";

const NextButton: ({
  showNextStep,
}: {
  showNextStep: () => void;
}) => JSX.Element = ({ showNextStep }) => (
  <button className={styles["button"]} onClick={() => showNextStep()}>
    Next
  </button>
);

interface StepProps {
  showNextStep: () => void;
  showPreviousStep?: () => void;
  restartJourney?: () => void;
}

const Step1: FunctionComponent<StepProps> = ({ showNextStep }) => {
  return (
    <div className={styles["step-card"]}>
      <h3>1</h3>
      <NextButton showNextStep={showNextStep} />
    </div>
  );
};

const Step2: FunctionComponent<StepProps> = ({ showNextStep }) => {
  return (
    <div className={styles["step-card"]}>
      <h3>2</h3>
      <NextButton showNextStep={showNextStep} />
    </div>
  );
};

const Step3: FunctionComponent<StepProps> = ({ showNextStep }) => {
  return (
    <div className={styles["step-card"]}>
      <h3>3</h3>
      <NextButton showNextStep={showNextStep} />
    </div>
  );
};

const Step4: FunctionComponent<StepProps> = ({ restartJourney }) => {
  return (
    <div className={styles["step-card"]}>
      <h3>4</h3>
      {restartJourney && (
        <button className={styles["button"]} onClick={() => restartJourney()}>
          Reset
        </button>
      )}
    </div>
  );
};

type StepConfig = {
  component: ReactNode;
  showStep: () => boolean;
  text: string;
  analyticsEventName: string;
};

interface UseJourneyProps {
  keys: string[];
  key: StepConfig;
}
interface UseJourneyResult {}

const useJourney = (keys, config) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const showNextStep = () => {
    setCurrentStepIndex(walkForwardFromIndex(currentStepIndex));
  };
  const showPreviousStep = () => {
    setCurrentStepIndex(walkBackwardFromIndex(currentStepIndex));
  };

  const walkForwardFromIndex = (index: number) => {
    for (let i = index + 1; i < keys.length; i++) {
      const stepKey = keys[i];
      if (showStep(stepKey) && currentStepIndex <= i) {
        return i;
      }
    }
    return keys.length;
  };

  const walkBackwardFromIndex = (index: number) => {
    for (let i = index - 1; i >= 0; i--) {
      if (showStep(keys[i])) {
        return i;
      }
    }
    return index;
  };

  const restartJourney = () => {
    if (showStep(keys[0])) {
      setCurrentStepIndex(0);
    } else {
      setCurrentStepIndex(walkForwardFromIndex(0));
    }
  };

  const showStep: (stepKey: string) => boolean = (stepKey) =>
    config[stepKey].showStep();

  const getCurrentStep = () => config[keys[currentStepIndex]].component();

  return {
    currentStepIndex,
    getCurrentStep,
    showNextStep,
    showPreviousStep,
    restartJourney,
  };
};
export const SimpleArrayJourney = () => {
  const JOURNEY_STEP_KEYS = ["step1", "step2", "step3", "step4"];
  const JOURNEY_STEP_CONFIG = {
    step1: {
      component: () => <Step1 showNextStep={showNextStep()} />,
      showStep: () => true,
      text: "Step 1",
      analyticsEventName: "landing",
    },
    step2: {
      component: () => <Step2 showNextStep={showNextStep} />,
      showStep: () => true,
      text: "Step 2",
      analyticsEventName: "step-2",
    },
    step3: {
      component: () => <Step3 showNextStep={showNextStep} />,
      showStep: () => false,
      text: "Step 3",
      analyticsEventName: "step-3",
    },
    step4: {
      component: () => (
        <Step4 showNextStep={showNextStep} restartJourney={restartJourney} />
      ),
      showStep: () => true,
      text: "Step 4",
      analyticsEventName: "summary",
    },
  };

  const {
    currentStepIndex,
    getCurrentStep,
    showNextStep,
    showPreviousStep,
    restartJourney,
  } = useJourney(JOURNEY_STEP_KEYS, JOURNEY_STEP_CONFIG);

  return (
    <div className={styles["journey-container"]}>
      {currentStepIndex > 0 && (
        <button
          className={styles["back-button"]}
          onClick={() => showPreviousStep()}
        >
          Back
        </button>
      )}
      {getCurrentStep()}
    </div>
  );
};
