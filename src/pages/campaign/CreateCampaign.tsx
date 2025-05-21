import { useState } from 'react';
import Step1Describe from '../../components/campaign/Step1Describe';
import Step2Audience from '../../components/campaign/Step2Audience';
import Step3Preview from '../../components/campaign/Step3Preview';
import StepError from '../../components/campaign/StepError';

const CreateCampaign = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    description: '',
    website: '',
    audience: '',
    objective: '',
    emailContent: '',
    error: ''
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);
  const goToStep = (n: number) => setStep(n);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {step === 1 && (
          <Step1Describe
            value={formData}
            onChange={setFormData}
            onNext={nextStep}
          />
        )}
        {step === 2 && (
          <Step2Audience
            value={formData}
            onChange={setFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        {step === 3 && (
          <Step3Preview
            value={formData}
            onChange={setFormData}
            onBack={prevStep}
            onError={() => goToStep(4)}
          />
        )}
        {step === 4 && (
          <StepError onRetry={() => goToStep(3)} />
        )}
      </div>
    </div>
  );
};

export default CreateCampaign; 