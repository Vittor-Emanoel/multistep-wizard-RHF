import { Stepper } from "./components/Stepper";
import { AccountStep } from "./components/steps/AccountStep";
import { AddressStep } from "./components/steps/AddressStep";
import { PersonalDataStep } from "./components/steps/PersonalDataStep";

export function App() {
  return (
    <div className="min-h-screen flex justify-center pt-28">
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
    </div>
  );
}
