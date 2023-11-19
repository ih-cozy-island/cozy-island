import React from "react";
import "./elements.css";

export function Card(props: {
  children: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
}) {
  return (
    <Column
      style={{
        padding: 8,
        border: "1px solid #eee",
        backgroundColor: "#fdfdfd",
        borderRadius: 5,
        ...props.style,
      }}
    >
      {props.children}
    </Column>
  );
}

export function Column(props: {
  children: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
}) {
  return (
    <div className={"column"} style={props.style}>
      {props.children}
    </div>
  );
}

export function Row(props: {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}) {
  const clsName = ["row", props.className].join(" ");
  return (
    <div className={clsName} style={props.style}>
      {props.children}
    </div>
  );
}

export function InputRow(props: {
  children: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
}) {
  return (
    <div className="row input" style={props.style}>
      {props.children}
    </div>
  );
}

export function HeadRow(props: {
  children: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
}) {
  return (
    <Row
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        ...props.style,
      }}
    >
      {props.children}
    </Row>
  );
}

export function ToggleButton(props: {
  children: React.ReactNode;
  on: boolean;
  onToggle: () => void;
  style?: React.CSSProperties;
}) {
  const clsName = "toggle-button" + (props.on ? " on" : "");

  return (
    <div className={clsName} style={props.style} onClick={props.onToggle}>
      {props.children}
    </div>
  );
}

export function HLine(props: { color?: string; width?: number }) {
  return (
    <div
      style={{
        width: (props.width || 100) + "%",
        height: 1,
        backgroundColor: props.color || "black",
        marginTop: 8,
        marginBottom: 8,
        alignSelf: "center",
      }}
    />
  );
}

export function parseIntOrUndef(str: string) {
  const val = parseInt(str);
  return Number.isNaN(val) ? undefined : val;
}
