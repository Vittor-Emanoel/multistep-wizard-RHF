import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { StepHeader } from "../StepHeader";
import { StepperFooter, StepperNextButton } from "../Stepper";
import { useStepper } from "../Stepper/useStepper";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

const schema = z.object({
  email: z.string().email("Informe um email valido"),
  password: z.string().min(1, "Informe a senha"),
});

type FormData = z.infer<typeof schema>;

export function AccountStep() {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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
        title="Conta"
        description="Seus dados de acesso a plataforma"
      />

      <fieldset className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" {...register("email")} />
          {errors.email?.message && (
            <small className="text-destructive">{errors.email?.message}</small>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" {...register("password")} />

          {errors.password?.message && (
            <small className="text-destructive">
              {errors.password?.message}
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
    </form>
  );
}
