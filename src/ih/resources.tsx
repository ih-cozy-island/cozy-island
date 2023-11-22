import { FaEdit } from "react-icons/fa";
import {
  Card,
  Column,
  HLine,
  HeadRow,
  Row,
  ToggleButton,
  parseIntOrUndef,
} from "./elements";
import { Mode, ResourceMap, ResourceType } from "./types";

export function AvailableResources(props: {
  resources: ResourceMap;
  coziness: number;
  mode: Mode;
  toggleMode: () => void;
  changeResAmount: (type: ResourceType, amount: number) => void;
}) {
  return (
    <Card style={{ minWidth: 300, maxWidth: 500, height: "100%" }}>
      <HeadRow style={{ marginBottom: 40 }}>
        <div style={{ fontWeight: 700, padding: "12px 0px" }}>Resources</div>
        <ToggleButton
          on={props.mode == "edit"}
          onToggle={props.toggleMode}
          style={{ position: "absolute", left: 0 }}
        >
          <FaEdit />
        </ToggleButton>
      </HeadRow>
      <Column>
        <div>
          <ResAmount
            resType="Wood"
            map={props.resources}
            mode={props.mode}
            changeAmount={props.changeResAmount}
          />
          <ResAmount
            resType="Rock"
            map={props.resources}
            mode={props.mode}
            changeAmount={props.changeResAmount}
          />
          <ResAmount
            resType="Iron"
            map={props.resources}
            mode={props.mode}
            changeAmount={props.changeResAmount}
          />
          <ResAmount
            resType="Fluorite"
            map={props.resources}
            mode={props.mode}
            changeAmount={props.changeResAmount}
          />
          <ResAmount
            resType="Fine Wood"
            map={props.resources}
            mode={props.mode}
            changeAmount={props.changeResAmount}
          />
          <ResAmount
            resType="Hard Rock"
            map={props.resources}
            mode={props.mode}
            changeAmount={props.changeResAmount}
          />
        </div>
        <HLine color={"gray"} width={60} />
        <ResAmount
          resType="Toolboxes"
          map={props.resources}
          mode={props.mode}
          changeAmount={props.changeResAmount}
        />
        <ResAmount
          resType="MTB"
          map={props.resources}
          mode={props.mode}
          changeAmount={props.changeResAmount}
        />
        <HLine />
        <Row style={{ justifyContent: "space-between" }}>
          <span>Coziness</span>
          <span>{props.coziness}</span>
        </Row>
      </Column>
    </Card>
  );
}

export function ResAmount(props: {
  resType: ResourceType;
  map: ResourceMap;
  mode: Mode;
  changeAmount: (type: ResourceType, amount: number) => void;
}) {
  const value = props.map[props.resType];
  return (
    <Row
      className="input"
      style={{ justifyContent: "space-between", height: 26 }}
    >
      <span>{props.resType}</span>
      {props.mode == "edit" ? (
        <input style={{width: 120}}
          value={value ?? ""}
          type="number"
          min={0}
          onChange={(e) => {
            const value = parseIntOrUndef(e.target.value);
            props.changeAmount(props.resType, value || 0);
          }}
        />
      ) : (
        <span style={{ color: value < 0 ? "red" : "black" }}>
          {formatter.format(value)}
        </span>
      )}
    </Row>
  );
}

const formatter = new Intl.NumberFormat();
