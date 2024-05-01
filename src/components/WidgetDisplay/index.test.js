import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DisplayWidget from ".";

describe("WidgetDisplay", () => {
  const widget = {
    description: "German movie star",
    name: "Widget von Hammersmark",
    price: 19.45,
  };
  const onSaveMock = jest.fn();
  const handleRemoveMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("lists widget data", async () => {
    render(<DisplayWidget widget={widget} />);
    expect(screen.queryByText(widget.name, { exact: false })).toBeInTheDocument();
    expect(
      screen.queryByText(widget.description, { exact: false })
    ).toBeInTheDocument();
    expect(screen.queryByText(widget.price, { exact: false })).toBeInTheDocument();
  });
  it("saves data when clicking save on edit mode", async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(
      <DisplayWidget
        widget={widget}
        onSave={onSaveMock}
        handleRemove={handleRemoveMock}
      />
    );

    fireEvent.click(getByTestId("edit-button"));
    const descriptionInput = getByPlaceholderText("Description");
    fireEvent.change(descriptionInput, {
      target: { value: "Modified description" },
    });
    const priceInput = getByPlaceholderText("Price");
    fireEvent.change(priceInput, { target: { value: "20.00" } });
    fireEvent.click(getByText("Save"));
    await waitFor(async () => {
      expect(onSaveMock).toHaveBeenCalledWith({
        ...widget,
        description: "Modified description",
        price: "20.00",
      });
    });
  });

  it("deletes widget when clicking on delete icon", async () => {
    const { getByTestId } = render(
      <DisplayWidget
        widget={widget}
        onSave={onSaveMock}
        handleRemove={handleRemoveMock}
      />
    );

    fireEvent.click(getByTestId("delete-button"));
    await waitFor(async () => {
      expect(handleRemoveMock).toHaveBeenCalledWith(widget.name);
    });
  });
});
