"use client";
import styles from "./simpleArray.module.scss";
import { useState } from "react";

const NextButton = ({ showNextStep }) => (
  <button className={styles["button"]} onClick={() => showNextStep()}>
    Next
  </button>
);

const Step1 = ({ showNextStep }) => {
  return (
    <div className={styles["step-card"]}>
      <h3>1</h3>
      <NextButton showNextStep={showNextStep} />
    </div>
  );
};

const Step2 = ({ showNextStep }) => {
  return (
    <div className={styles["step-card"]}>
      <h3>2</h3>
      <NextButton showNextStep={showNextStep} />
    </div>
  );
};

const Step3 = ({ showNextStep }) => {
  return (
    <div className={styles["step-card"]}>
      <h3>3</h3>
      <NextButton showNextStep={showNextStep} />
    </div>
  );
};

const Step4 = ({ restartJourney }) => {
  return (
    <div className={styles["step-card"]}>
      <h3>4</h3>
      <button className={styles["button"]} onClick={() => restartJourney()}>
        Reset
      </button>
    </div>
  );
};

export const Journey = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const showNextStep = () => {
    setCurrentStepIndex(walkForwardFromIndex(currentStepIndex));
  };
  const showPreviousStep = () => {
    setCurrentStepIndex(walkBackwardFromIndex(currentStepIndex));
  };

  const walkForwardFromIndex = (index) => {
    for (let i = index + 1; i < JOURNEY_STEP_KEYS.length; i++) {
      const stepKey = JOURNEY_STEP_KEYS[i];
      if (showStep(stepKey) && currentStepIndex <= i) {
        return i;
      }
    }
    return JOURNEY_STEP_KEYS.length;
  };

  const walkBackwardFromIndex = (index) => {
    for (let i = index - 1; i >= 0; i--) {
      if (showStep(JOURNEY_STEP_KEYS[i])) {
        return i;
      }
    }
    return index;
  };

  const restartJourney = () => {
    if (showStep(JOURNEY_STEP_KEYS[0])) {
      setCurrentStepIndex(0);
    } else {
      setCurrentStepIndex(walkForwardFromIndex(0));
    }
  };

  const showStep = (stepKey) => JOURNEY_STEP_CONFIG[stepKey].showStep();

  const getCurrentStep = () =>
    JOURNEY_STEP_CONFIG[JOURNEY_STEP_KEYS[currentStepIndex]].component();

  const JOURNEY_STEP_KEYS = ["step1", "step2", "step3", "step4"];
  const JOURNEY_STEP_CONFIG = {
    step1: {
      component: () => <Step1 showNextStep={showNextStep} />,
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
      component: () => <Step4 restartJourney={restartJourney} />,
      showStep: () => true,
      text: "Step 4",
      analyticsEventName: "summary",
    },
  };

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
