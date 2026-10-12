import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("exibe DD/MM/AAAA e entrega o valor em YYYY-MM-DD", () => {
    const onChange = vi.fn();
    const ref = createRef<HTMLInputElement>();
    render(
      <DatePicker
        defaultValue="2000-02-29"
        label="Nascimento"
        onChange={onChange}
        ref={ref}
      />,
    );

    const input = screen.getByLabelText("Nascimento");
    expect(ref.current).toBe(input);
    expect(input).toHaveValue("29/02/2000");
    fireEvent.change(input, { target: { value: "31121999" } });
    expect(input).toHaveValue("31/12/1999");
    expect(onChange).toHaveBeenLastCalledWith("1999-12-31");
  });

  it("rejeita datas inexistentes e fora dos limites", () => {
    const onChange = vi.fn();
    render(
      <DatePicker
        defaultValue="2000-01-01"
        label="Nascimento"
        max="2026-10-04"
        onChange={onChange}
      />,
    );

    const input = screen.getByLabelText("Nascimento");
    fireEvent.change(input, { target: { value: "29/02/2001" } });
    expect(onChange).toHaveBeenLastCalledWith("");
    fireEvent.change(input, { target: { value: "05/10/2026" } });
    expect(onChange).toHaveBeenLastCalledWith("");
  });

  it("mantém obrigatoriedade, erro acessível e somente leitura", () => {
    render(
      <DatePicker
        errorMessage="Selecione uma data válida."
        label="Nascimento"
        readOnly
        required
      />,
    );

    const input = screen.getByLabelText(/^Nascimento/);
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("readonly");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Selecione uma data válida.");
    expect(
      screen.getByRole("button", { name: "Abrir calendário" }),
    ).toBeDisabled();
  });

  it("seleciona pelo calendário com teclado e fecha com Escape", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker defaultValue="2026-09-15" label="Data" onChange={onChange} />,
    );

    const toggle = screen.getByRole("button", { name: "Abrir calendário" });
    await user.click(toggle);
    const dialog = screen.getByRole("dialog", { name: "Data" });
    expect(within(dialog).getByText("Setembro de 2026")).toBeInTheDocument();
    expect(
      within(dialog).getByRole("gridcell", { name: "15/09/2026" }),
    ).toHaveFocus();

    await user.keyboard("{ArrowRight}{Enter}");
    expect(onChange).toHaveBeenLastCalledWith("2026-09-16");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(toggle);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it("navega entre meses", async () => {
    const user = userEvent.setup();
    render(<DatePicker defaultValue="2026-09-15" label="Data" />);

    await user.click(screen.getByRole("button", { name: "Abrir calendário" }));
    await user.click(screen.getByRole("button", { name: "Próximo mês" }));
    expect(screen.getByText("Outubro de 2026")).toBeInTheDocument();
  });

  it("seleciona um intervalo inclusivo", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        defaultValue={{ start: "2026-09-15", end: "" }}
        label="Intervalo"
        mode="range"
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Abrir calendário" }));
    await user.click(screen.getByRole("gridcell", { name: "18/09/2026" }));
    expect(onChange).toHaveBeenLastCalledWith({
      start: "2026-09-15",
      end: "2026-09-18",
    });
    expect(screen.getByLabelText("Intervalo")).toHaveValue(
      "15/09/2026 – 18/09/2026",
    );
  });

  it("seleciona mês e ano", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        defaultValue="2026-09"
        label="Mês e ano"
        mode="monthYear"
        onChange={onChange}
      />,
    );

    expect(screen.getByLabelText("Mês e ano")).toHaveValue("09/2026");
    await user.click(screen.getByRole("button", { name: "Abrir calendário" }));
    await user.click(screen.getByRole("gridcell", { name: "Outubro de 2026" }));
    expect(onChange).toHaveBeenLastCalledWith("2026-10");
  });

  it("só completa data e hora com horário válido em 24 h", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DatePicker
        defaultValue="2026-09-15T14:30"
        label="Data e hora"
        mode="dateTime"
        onChange={onChange}
      />,
    );

    const input = screen.getByLabelText("Data e hora");
    expect(input).toHaveValue("15/09/2026 14:30");
    await user.click(screen.getByRole("button", { name: "Abrir calendário" }));
    const time = screen.getByLabelText("Hora");
    fireEvent.change(time, { target: { value: "25:00" } });
    expect(onChange).toHaveBeenLastCalledWith("");
    fireEvent.change(time, { target: { value: "0915" } });
    expect(onChange).toHaveBeenLastCalledWith("2026-09-15T09:15");
  });

  it("impede edição quando desabilitado", () => {
    render(<DatePicker disabled label="Nascimento" />);

    expect(screen.getByLabelText("Nascimento")).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Abrir calendário" }),
    ).toBeDisabled();
  });
});
