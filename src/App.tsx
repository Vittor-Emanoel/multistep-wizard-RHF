import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Stepper } from "./components/Stepper";
import { AccountStep } from "./components/steps/AccountStep/AccountStep";
import { accountStepSchema } from "./components/steps/AccountStep/schema";
import { AddressStep } from "./components/steps/AddressStep/AddressStep";
import { addressStepSchema } from "./components/steps/AddressStep/schema";
import { PersonalDataStep } from "./components/steps/PersonalDateStep/PersonalDataStep";
import { personalDataStepSchema } from "./components/steps/PersonalDateStep/schema";

const schema = z.object({
  accountStep: accountStepSchema,
  addressStep: addressStepSchema,
  personalStep: personalDataStepSchema,
});

export type FormData = z.infer<typeof schema>;

export function App() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      accountStep: {
        email: "",
        password: "",
      },
      addressStep: {
        city: "",
        state: "",
        street: "",
      },
      personalStep: {
        document: "",
        firstName: "",
        lastName: "",
      },
    },
  });

  const handleSubmit = form.handleSubmit((formData) => {
    console.log(formData);
  });

  return (
    <div className="min-h-screen flex justify-center pt-28">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <Stepper
            steps={[
              {
                label: "Conta",
                content: <AccountStep />,
              },
              {
                label: "Dados pessoais",
                content: <PersonalDataStep />,
              },
              {
                label: "Endereco",
                content: <AddressStep />,
              },
            ]}
          />
        </form>
      </FormProvider>
    </div>
  );
}
