import { FormData } from "@/App";
import { useFormContext } from "react-hook-form";
import { StepHeader } from "../../StepHeader";
import { StepperFooter, StepperNextButton } from "../../Stepper";
import { Input } from "../../ui/Input";
import { Label } from "../../ui/Label";

export function AccountStep() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormData["accountStep"]>();

  return (
    <div>
      <StepHeader
        title="Conta"
        description="Seus dados de acesso a plataforma"
      />

      <fieldset className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" {...register("email")} />
          {errors?.email?.message && (
            <small className="text-destructive">{errors?.email?.message}</small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...register("password")} />

          {errors?.password && (
            <small className="text-destructive">
              {errors?.password?.message}
            </small>
          )}
        </div>
      </fieldset>

      <StepperFooter>
        <StepperNextButton
          preventDefault
          type="submit"
          disabled={isSubmitting}
        />
      </StepperFooter>
    </div>
  );
}
