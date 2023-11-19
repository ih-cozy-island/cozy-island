import { IHome, ISpot } from "./types";

function sum(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

function calcSpotCoziness(spot: ISpot) {
  return (spot.level || 0) * 50 + (spot.skin ? 250 : 0);
}

function spotSize(spot: ISpot) {
  if (spot.type == "Fine Wood") {
    return 9;
  } else {
    return 4;
  }
}

export function calcHomeCoziness(home: IHome) {
  const spotCoziness = sum(home.spots.map((s) => calcSpotCoziness(s)));
  const buildingSpots = sum(
    home.spots
      .filter((spot) => spot.level && spot.level > 0)
      .map((spot) => spotSize(spot))
  );
  const decoSpots = 12 * 14 - 12 - buildingSpots;

  return spotCoziness + (home.skin ? 2000 : 0) + decoSpots * 10;
}

export function calcIslandCoziness(homes: IHome[]) {
  return sum(homes.map((i) => calcHomeCoziness(i)));
}
