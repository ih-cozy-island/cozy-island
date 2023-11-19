import { IIsland } from "./types";

import { Homes } from "./homes";
import { initHome, useIslandHooks } from "./island-hooks";
import { AvailableResources } from "./resources";

const initialState: IIsland = {
  id: "island1",
  coziness: 0,
  homes: [initHome("Residence 1")],
  resources: {
    Wood: 0,
    Rock: 0,
    Iron: 0,
    Fluorite: 0,
    "Fine Wood": 0,
    "Hard Rock": 0,
    Toolboxes: 0,
    MTB: 0,
  },
  homeMode: "default",
  resMode: "default",
};

export function CloudIsland() {
  const {
    state,
    changeLevel,
    changeResAmount,
    toggleHomeMode,
    toggleResMode,
    toggleSkin,
    toggleSpotSkin,
    addHome,
    deleteHome,
  } = useIslandHooks(initialState);

  return (
    <div>
      <div style={{ display: "flex", gap: 12 }}>
        <AvailableResources
          resources={state.resources}
          coziness={state.coziness}
          mode={state.resMode}
          toggleMode={toggleResMode}
          changeResAmount={changeResAmount}
        />
        <Homes
          homes={state.homes}
          changeLevel={changeLevel}
          toggleSpotSkin={toggleSpotSkin}
          toggleSkin={toggleSkin}
          mode={state.homeMode}
          toggleMode={toggleHomeMode}
          addHome={addHome}
          deleteHome={deleteHome}
        />
      </div>
    </div>
  );
}
