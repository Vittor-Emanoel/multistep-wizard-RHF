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
  } = useFormContext<FormData["addressStep"]>();

  return (
    <div>
      <StepHeader title="Endereco" description="De onde voce e ?" />

      <fieldset className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" {...register("state")} />
          {errors.state?.message && (
            <small className="text-destructive">{errors.state?.message}</small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" {...register("city")} />
          {errors.city?.message && (
            <small className="text-destructive">{errors.city?.message}</small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Endereco</Label>
          <Input id="street" {...register("street")} />
          {errors.street?.message && (
            <small className="text-destructive">{errors.street?.message}</small>
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
