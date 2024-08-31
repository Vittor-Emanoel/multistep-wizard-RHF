import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StepHeader } from "../StepHeader";
import {
  StepperFooter,
  StepperNextButton,
  StepperPreviousButton,
} from "../Stepper";
import { useStepper } from "../Stepper/useStepper";
import { Input } from "../ui/Input";

const schema = z.object({
  firstName: z.string().min(1, "Informe o seu primeiro nome"),
  lastName: z.string().min(1, "Informe o seu sobrenome"),
  document: z.string().min(1, "Informe o CPF"),
});

type FormData = z.infer<typeof schema>;

export function PersonalDataStep() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      document: "",
      firstName: "",
      lastName: "",
    },
  });

  const { nextStep } = useStepper();

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    nextStep();
  });

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
}
