import { FormData } from "@/App";
import { Label } from "@/components/ui/Label";
import { useFormContext } from "react-hook-form";
import { StepHeader } from "../../StepHeader";
import { StepperFooter, StepperPreviousButton } from "../../Stepper";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";

export function AddressStep() {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FormData>();

  return (
    <div>
      <StepHeader title="Endereco" description="De onde voce e ?" />

      <fieldset className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" {...register("addressStep.state")} />
          {errors.addressStep?.state?.message && (
            <small className="text-destructive">
              {errors.addressStep?.state?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" {...register("addressStep.city")} />
          {errors.addressStep?.city?.message && (
            <small className="text-destructive">
              {errors.addressStep?.city?.message}
            </small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Endereco</Label>
          <Input id="street" {...register("addressStep.street")} />
          {errors.addressStep?.street?.message && (
            <small className="text-destructive">
              {errors.addressStep?.street?.message}
            </small>
          )}
        </div>
      </fieldset>

      <StepperFooter>
        <StepperPreviousButton />
        <Button type="submit" size="sm" disabled={isSubmitting}>
          Finalizar
        </Button>
      </StepperFooter>
    </div>
  );
}
