interface StepIndicatorProps {
  currentStep: number
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="mb-6 flex justify-center space-x-4">
      {[1, 2].map((step) => (
        <div
          key={step}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white ${
            currentStep === step ? 'bg-blue-500' : 'bg-gray-300'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  )
}

export default StepIndicator
