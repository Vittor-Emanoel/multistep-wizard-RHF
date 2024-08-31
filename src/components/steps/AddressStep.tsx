import { Label } from "@/components/ui/Label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StepHeader } from "../StepHeader";
import { StepperFooter, StepperPreviousButton } from "../Stepper";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const schema = z.object({
  state: z.string().min(1, "Informe o seu Estado"),
  city: z.string().min(1, "Informe a sua Cidade"),
  street: z.string().min(1, "Informe a sua Rua"),
});

type FormData = z.infer<typeof schema>;

export function AddressStep() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      state: "",
      city: "",
      street: "",
    },
  });

  // const { nextStep } = useStepper();

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    //redireciona
  });

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}
