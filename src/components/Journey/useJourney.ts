import { useState } from "react";

export interface StepProps {
  showNextStep: () => void;
  showPreviousStep?: () => void;
  restartJourney?: () => void;
}

type StepConfig = {
  [key: string]: {
    component: () => JSX.Element;
    showStep: () => boolean;
    text: string;
    analyticsEventName: string;
  };
};

interface UseJourneyProps {
  keys: string[];
  config: StepConfig;
}
interface UseJourneyResult {
  currentStepIndex: number;
  getCurrentStep: () => JSX.Element;
  showNextStep: () => void;
  showPreviousStep: () => void;
  restartJourney: () => void;
}

export const useJourney = (
  keys: string[],
  config: StepConfig
): UseJourneyResult => {
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
