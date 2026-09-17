import {
  initialSystemState,
  setInitialized,
  systemReducer,
} from "./systemSlice";

describe("systemSlice", () => {
  it("marca a aplicação como inicializada", () => {
    expect(systemReducer(initialSystemState, setInitialized(true))).toEqual({
      initialized: true,
    });
  });
});
