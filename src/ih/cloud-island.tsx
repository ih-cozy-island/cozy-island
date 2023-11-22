import { Column, Row } from "./elements";
import { Head } from "./head";
import { Homes } from "./homes";
import { initHome, useIslandHooks } from "./island-hooks";
import { AvailableResources } from "./resources";
import { IIsland } from "./types";

const initialState: IIsland = {
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
    prof,
  } = useIslandHooks(initialState);

  return (
    <Column style={{ gap: 12 }}>
      <Head {...prof} />
      <Row style={{ gap: 12 }}>
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
      </Row>
    </Column>
  );
}
