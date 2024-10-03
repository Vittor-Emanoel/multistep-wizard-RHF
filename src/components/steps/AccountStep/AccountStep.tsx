import { FormData } from "@/App";
import { useStepper } from "@/components/Stepper/useStepper";
import { useFormContext } from "react-hook-form";
import { StepHeader } from "../../StepHeader";
import { StepperFooter, StepperNextButton } from "../../Stepper";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";

export function AccountStep() {
  const { nextStep } = useStepper();
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext<FormData>();

  async function handleNextStep() {
    const isValidateValid = await trigger("accountStep");

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
        title="Conta"
        description="Seus dados de acesso a plataforma"
      />

      <fieldset className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" {...register("accountStep.email")} />
          {errors.accountStep && (
            <small className="text-destructive">
              {errors?.accountStep.email?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            {...register("accountStep.password")}
          />

          {errors.accountStep && (
            <small className="text-destructive">
              {errors?.accountStep.password?.message}
            </small>
          )}
        </div>
      </fieldset>

      <StepperFooter>
        <StepperNextButton onClick={handleNextStep} />
      </StepperFooter>
    </div>
  );
}
