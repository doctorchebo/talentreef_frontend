import { render, waitFor } from "@testing-library/react";
import WidgetList from ".";
import * as apiConnect from "../../lib/apiConnect";
import WidgetDisplay from "../WidgetDisplay";

jest.mock("../../lib/apiConnect");
jest.mock("../WidgetDisplay");
describe("WidgetList", () => {
  it("Lists all widgets", async () => {
    const widgets = [
      { name: "Scarface", description: "Great action movie", price: 20.0 },
      {
        name: "There will be blood",
        description: "Eye-catching thriller",
        price: 30.0,
      },
    ];

    apiConnect.fetchAllWidgets = jest.fn().mockResolvedValue(widgets);

    render(<WidgetList />);

    await waitFor(async () => {
      expect(WidgetDisplay).toHaveBeenCalledWith(
        expect.objectContaining({ widget: widgets[0] }),
        {}
      );
      expect(WidgetDisplay).toHaveBeenCalledWith(
        expect.objectContaining({ widget: widgets[1] }),
        {}
      );
    });
  });
});
