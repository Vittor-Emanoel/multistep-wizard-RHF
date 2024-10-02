import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { safeSessionStorageGetItem } from "@/lib/utils";
import { useEffect } from "react";
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
  const initialValue = safeSessionStorageGetItem<FormData>("account-step");

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    disabled: !!initialValue,
    resolver: zodResolver(schema),
    defaultValues: {
      email: initialValue?.email ?? "",
      password: initialValue?.password ?? "",
    },
  });

  const { nextStep } = useStepper();

  useEffect(() => {
    if (isDirty) {
      window.onbeforeunload = () => {
        return "";
      };
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [isDirty]);

  const handleSubmit = hookFormSubmit(async (formData) => {
    if (!initialValue) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      sessionStorage.setItem(
        "account-step",
        JSON.stringify({
          ...formData,
          password: "*".repeat(formData.password.length),
        }),
      );
    }

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
