import { calcHomeCoziness } from "./coziness";
import {
  Card,
  HLine,
  HeadRow,
  InputRow,
  Row,
  ToggleButton,
  parseIntOrUndef,
} from "./elements";
import { IHome, Mode, ResourceType } from "./types";

export function Homes(props: {
  homes: IHome[];
  changeLevel: (homeIdx: number, spotIdx: number, newLevel?: number) => void;
  toggleSpotSkin: (homeIdx: number, spotIdx: number, value: boolean) => void;
  toggleSkin: (homeIdx: number, value: boolean) => void;
  mode: Mode;
  toggleMode: () => void;
  addHome: () => void;
  deleteHome: (id: string) => void;
}) {
  return (
    <Card
      style={{
        backgroundColor: props.mode == "edit" ? "#ffeaea" : undefined,
        minWidth: 300,
      }}
    >
      <HeadRow>
        <Row style={{ position: "absolute", left: 0, gap: 4 }}>
          <ToggleButton on={props.mode == "edit"} onToggle={props.toggleMode}>
            E
          </ToggleButton>
          {props.mode == "edit" && (
            <ToggleButton on={props.mode == "edit"} onToggle={props.addHome}>
              +
            </ToggleButton>
          )}
        </Row>
        <div style={{ fontWeight: 700, padding: "12px 0px" }}>Homes</div>
      </HeadRow>

      <Row
        style={{
          flexWrap: "wrap",
          justifyContent: "start",
          gap: 8,
        }}
      >
        {props.homes.map((h, idx) => (
          <Home
            key={h.id}
            mode={props.mode}
            home={h}
            changeLevel={(spotIdx, newLevel) =>
              props.changeLevel(idx, spotIdx, newLevel)
            }
            toggleSkin={(value) => props.toggleSkin(idx, value)}
            toggleSpotSkin={(spotIdx, value) =>
              props.toggleSpotSkin(idx, spotIdx, value)
            }
            deleteHome={props.deleteHome}
          />
        ))}
      </Row>
    </Card>
  );
}

function Home(props: {
  home: IHome;
  mode: Mode;
  changeLevel: (spotIdx: number, newLevel?: number) => void;
  toggleSkin: (value: boolean) => void;
  toggleSpotSkin: (spotIdx: number, value: boolean) => void;
  deleteHome: (id: string) => void;
}) {
  return (
    <div
      style={{
        minWidth: 360,
        padding: 8,
        border: "1px solid #eee",
        backgroundColor: "#fff",
        borderRadius: 5,
      }}
    >
      <Row
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginBottom: 8,
        }}
      >
        {props.mode == "edit" && (
          <ToggleButton
            on={false}
            onToggle={() => props.deleteHome(props.home.id)}
            style={{ position: "absolute", left: 0 }}
          >
            X
          </ToggleButton>
        )}
        <div
          style={{
            backgroundColor: props.home.skin ? "#dddddd" : undefined,
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 2,
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => props.toggleSkin(!props.home.skin)}
        >
          {props.home.name}
        </div>
      </Row>
      <div>
        {props.home.spots.map((s, idx) => (
          <Spot
            key={s.type}
            name={spotNames[s.type] || "unknown"}
            level={s.level}
            skin={s.skin}
            changeLevel={(newLevel) => props.changeLevel(idx, newLevel)}
            toggleSkin={(value) => props.toggleSpotSkin(idx, value)}
          />
        ))}
      </div>
      <HLine />
      <Row style={{ justifyContent: "space-between" }}>
        <span>Coziness</span>
        <span>{calcHomeCoziness(props.home)}</span>
      </Row>
    </div>
  );
}

function Spot(props: {
  name: string;
  level?: number;
  skin: boolean;
  changeLevel: (newLevel?: number) => void;
  toggleSkin: (val: boolean) => void;
}) {
  const { name, level } = props;
  return (
    <InputRow style={{ height: 26 }}>
      <div>{name}</div>
      <div style={{ flexGrow: 1 }} />
      <ToggleButton
        on={props.skin}
        onToggle={() => props.toggleSkin(!props.skin)}
      >
        S
      </ToggleButton>
      <input
        value={level}
        type="number"
        min={0}
        max={100}
        onChange={(e) => {
          const value = parseIntOrUndef(e.target.value);
          props.changeLevel(value);
        }}
      />
    </InputRow>
  );
}
const spotNames: { [key in ResourceType]?: string } = {
  Wood: "Wheat Field",
  Rock: "Central Market",
  Iron: "Dining Table",
  Fluorite: "Spring Well",
  "Fine Wood": "Musical Fountain",
  "Hard Rock": "Flower Terrace",
};
