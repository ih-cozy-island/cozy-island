export type ResourceType =
  | "Wood"
  | "Rock"
  | "Iron"
  | "Fluorite"
  | "Fine Wood"
  | "Hard Rock"
  | "Toolboxes"
  | "MTB";

export type Mode = "default" | "edit";

export type ResourceMap = { [key in ResourceType]: number };

export interface ISpot {
  level?: number;
  active: boolean;
  skin: boolean;
  type: ResourceType;
}

export interface IHome {
  id: string;
  name: string;
  skin: boolean;
  spots: ISpot[];
}

export interface IIsland {
  id: string;
  coziness: number;
  homes: IHome[];
  resources: ResourceMap;
  homeMode: Mode;
  resMode: Mode;
}
