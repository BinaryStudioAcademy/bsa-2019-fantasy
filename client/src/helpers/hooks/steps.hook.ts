import { useState } from 'react';

/**
 * Implements UI step logic (starting from 1 to `maxStep`)
 *
 * @param maxStep number of last step
 * @return object { step, nextStep, prevStep, navToStep }
 */
export const useSteps = (maxStep: number) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((s) => (s < maxStep ? s + 1 : maxStep));
  };

  const prevStep = () => {
    setStep((s) => (s > 1 ? s - 1 : 1));
  };

  const navToStep = (s: number) => {
    setStep(s >= 1 ? (s <= maxStep ? s : maxStep) : 1);
  };

  return {
    step,
    nextStep,
    prevStep,
    navToStep,
  };
};
