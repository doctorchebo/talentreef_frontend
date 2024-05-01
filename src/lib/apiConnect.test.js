import axios from "axios";

import { editWidget, fetchAllWidgets } from "./apiConnect";

jest.mock("axios");

describe("fetchAllWidgets", () => {
  it("returns response data", async () => {
    const widgetList = [
      { description: "Keeps a diary", name: "Widget Jones", price: 9.95 },
    ];
    axios.get = jest.fn().mockResolvedValueOnce({ data: widgetList });

    const result = await fetchAllWidgets();

    expect(result).toEqual(widgetList);
  });

  it("errors on reject", async () => {
    axios.get = jest.fn().mockRejectedValueOnce({});

    expect(fetchAllWidgets()).rejects.toBeTruthy();
  });
});

describe("editWidget", () => {
  it("returns response data", async () => {
    const widget = {
      description: "Keeps a diary",
      name: "Widget Jones",
      price: 9.95,
    };

    axios.post = jest.fn().mockResolvedValueOnce({ data: widget });
    const result = await editWidget(widget);
    expect(result).toEqual(widget);
  });

  it("errors on reject", () => {
    const widget = {
      description: "Keeps a diary",
      name: "Widget Jones",
      price: 9.95,
    };

    axios.post = jest.fn().mockRejectedValueOnce({});
    expect(editWidget(widget)).rejects.toBeTruthy();
  });
});
