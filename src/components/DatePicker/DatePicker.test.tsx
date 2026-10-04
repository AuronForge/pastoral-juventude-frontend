import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { DatePicker } from "./DatePicker";

it("oferece calendário nativo, label e limites sem conversão de fuso", () => {
  const changed = vi.fn();
  const ref = createRef<HTMLInputElement>();
  render(
    <DatePicker
      label="Nascimento"
      defaultValue="2000-02-29"
      min="1900-01-01"
      max="2026-10-04"
      ref={ref}
      onChange={changed}
    />,
  );
  const input = screen.getByLabelText("Nascimento");
  expect(input).toHaveAttribute("type", "date");
  expect(input).toHaveValue("2000-02-29");
  expect(input).toHaveAttribute("min", "1900-01-01");
  expect(input).toHaveAttribute("max", "2026-10-04");
  expect(ref.current).toBe(input);
  fireEvent.change(input, { target: { value: "1999-12-31" } });
  expect(changed).toHaveBeenCalledOnce();
  expect(ref.current?.value).toBe("1999-12-31");
});
it("mantém obrigatoriedade, erro acessível e leitura durante processamento", () => {
  render(
    <DatePicker
      label="Nascimento"
      required
      readOnly
      errorMessage="Selecione uma data válida."
    />,
  );
  const input = screen.getByLabelText(/^Nascimento/);
  expect(input).toBeRequired();
  expect(input).toHaveAttribute("readonly");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveAccessibleDescription("Selecione uma data válida.");
});
it("impede edição quando desabilitado e rejeita datas inexistentes", () => {
  render(<DatePicker label="Nascimento" disabled />);
  const input = screen.getByLabelText("Nascimento");
  expect(input).toBeDisabled();
  fireEvent.change(input, { target: { value: "2001-02-29" } });
  expect(input).toHaveValue("");
});
