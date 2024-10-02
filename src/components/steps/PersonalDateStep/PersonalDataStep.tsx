import { FormData } from "@/App";
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
    formState: { errors, isSubmitting },
  } = useFormContext<FormData["personalStep"]>();

  return (
    <div>
      <StepHeader
        title="Dados pessoais"
        description="Conte-nos mais sobre voce"
      />

      <fieldset className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Primeiro nome</Label>
          <Input id="firstName" {...register("firstName")} />
          {errors.firstName?.message && (
            <small className="text-destructive">
              {errors.firstName?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Sobrenome</Label>
          <Input id="lastName" {...register("lastName")} />
          {errors.lastName?.message && (
            <small className="text-destructive">
              {errors.lastName?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="document">CPF</Label>
          <Input id="document" {...register("document")} />
          {errors.document?.message && (
            <small className="text-destructive">
              {errors.document?.message}
            </small>
          )}
        </div>
      </fieldset>

      <StepperFooter>
        <StepperPreviousButton />
        <StepperNextButton
          preventDefault
          type="submit"
          disabled={isSubmitting}
        />
      </StepperFooter>
    </div>
  );
}
