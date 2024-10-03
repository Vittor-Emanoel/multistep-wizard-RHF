import { FormData } from "@/App";
import { useStepper } from "@/components/Stepper/useStepper";
import { Label } from "@radix-ui/react-label";
import { useFormContext } from "react-hook-form";
import { StepHeader } from "../../StepHeader";
import {
  StepperFooter,
  StepperNextButton,
  StepperPreviousButton,
} from "../../Stepper";
import { Input } from "../../ui/Input";

export function PersonalDataStep() {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<FormData>();

  const { nextStep } = useStepper();

  async function handleNextStep() {
    const isValidateValid = await trigger("personalStep");

    if (isValidateValid) {
      nextStep();
    }

    console.log(isValidateValid);

    console.log("adwd");

    console.log(errors);
  }

  return (
    <div>
      <StepHeader
        title="Dados pessoais"
        description="Conte-nos mais sobre voce"
      />

      <fieldset className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Primeiro nome</Label>
          <Input id="firstName" {...register("personalStep.firstName")} />
          {errors.personalStep?.firstName?.message && (
            <small className="text-destructive">
              {errors.personalStep?.firstName?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" {...register("personalStep.lastName")} />
          {errors.personalStep?.lastName?.message && (
            <small className="text-destructive">
              {errors.personalStep?.lastName?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="document">CPF</Label>
          <Input id="document" {...register("personalStep.document")} />
          {errors.personalStep?.document?.message && (
            <small className="text-destructive">
              {errors.personalStep?.document?.message}
            </small>
          )}
        </div>
      </fieldset>

      <StepperFooter>
        <StepperPreviousButton />
        <StepperNextButton onClick={handleNextStep} />
      </StepperFooter>
    </div>
  );
}
