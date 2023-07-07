"use client";
import { Step1, Step2, Step3, Step4 } from "./Steps";
import styles from "./Journey.module.scss";
import { useJourney } from "./useJourney";
import { useState } from "react";

export const Journey = () => {
  const [isComplete, setIsComplete] = useState(false);

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
  } = useJourney(JOURNEY_STEP_KEYS, JOURNEY_STEP_CONFIG, () =>
    setIsComplete(true)
  );

  return (
    <div className={styles["journey-container"]}>
      {isComplete ? (
        <h2>Complete!</h2>
      ) : (
        <>
          {currentStepIndex > 0 && (
            <button
              className={styles["back-button"]}
              onClick={() => showPreviousStep()}
            >
              Back
            </button>
          )}
          {getCurrentStep()}
        </>
      )}
    </div>
  );
};
