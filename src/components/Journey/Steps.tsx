import { FunctionComponent } from "react";
import styles from "./simpleArray.module.scss";
import { StepProps } from "./useJourney";

const NextButton: ({
  showNextStep,
}: {
  showNextStep: () => void;
}) => JSX.Element = ({ showNextStep }) => (
  <button className={styles["button"]} onClick={() => showNextStep()}>
    Next
  </button>
);

export const Step1: FunctionComponent<StepProps> = ({ showNextStep }) => {
  return (
    <div className={styles["step-card"]}>
      <h3>1</h3>
      <NextButton showNextStep={showNextStep} />
    </div>
  );
};

export const Step2: FunctionComponent<StepProps> = ({ showNextStep }) => {
  return (
    <div className={styles["step-card"]}>
      <h3>2</h3>
      <NextButton showNextStep={showNextStep} />
    </div>
  );
};

export const Step3: FunctionComponent<StepProps> = ({ showNextStep }) => {
  return (
    <div className={styles["step-card"]}>
      <h3>3</h3>
      <NextButton showNextStep={showNextStep} />
    </div>
  );
};

export const Step4: FunctionComponent<StepProps> = ({ restartJourney }) => {
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
