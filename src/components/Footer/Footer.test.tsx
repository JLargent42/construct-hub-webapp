import { render, cleanup } from "@testing-library/react";
import { Footer, testIds } from "./Footer";

describe("<Footer />", () => {
  afterEach(cleanup);

  it("renders footer links & dislcaimer", () => {
    const { getByTestId } = render(<Footer />);

    Object.values(testIds).forEach((testId) => {
      expect(getByTestId(testId)).not.toBeNull();
    });
  });
});