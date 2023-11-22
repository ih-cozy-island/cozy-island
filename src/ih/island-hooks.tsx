import { produce } from "immer";
import { useCallback, useEffect, useState } from "react";
import { costsFineRes, costsRes } from "./costs";
import { calcIslandCoziness } from "./coziness";
import { IHome, IIsland, ISpot, ResourceType } from "./types";

function saveState(state: IIsland, name: string) {
  const key = "profile-" + name;
  window.localStorage.setItem(key, JSON.stringify(state));
  window.localStorage.setItem("lastProfile", name);
}

function getLastProfile() {
  return window.localStorage.getItem("lastProfile") || "default";
}

function loadState(name: string): IIsland | null {
  const str = window.localStorage.getItem("profile-" + name);
  if (str) {
    const state = JSON.parse(str);
    return state;
  }
  return null;
}

function getResAmount(type: ResourceType, level?: number) {
  if (type == "Fine Wood" || type == "Hard Rock") {
    return costsFineRes[level ?? 0];
  } else {
    return costsRes[level ?? 0];
  }
}

function or0(val?: number) {
  return val ?? 0;
}

function createId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 12).padStart(12, " ")
  );
}

export function initHome(name: string): IHome {
  return {
    id: createId(),
    name: name,
    skin: false,
    spots: [
      initSpot("Wood", 0, false),
      initSpot("Rock", 0, false),
      initSpot("Iron", 0, false),
      initSpot("Fluorite", 0, false),
      initSpot("Fine Wood", 0, false),
      initSpot("Hard Rock", 0, false),
    ],
  };
}

export function initSpot(
  type: ResourceType,
  level: number,
  skin: boolean
): ISpot {
  return {
    type: type,
    level: level,
    active: true,
    skin: skin,
  };
}

export function useIslandHooks(initialState: IIsland) {
  const [state, setState] = useState<IIsland>(initialState);
  // onLoad
  useEffect(() => {
    const profileName = getLastProfile();
    const island = loadState(profileName);
    if (island) {
      setState(island);
    }
  }, []);

  const [profile, setProfile] = useState<[string, string]>([
    getLastProfile(),
    "",
  ]);

  const profiles = Object.keys(window.localStorage)
    .filter((p) => p.startsWith("profile-"))
    .map((p) => p.substring("profile-".length));

  const loadProfile = useCallback((name: string) => {
    const island = loadState(name);
    if (island) {
      setState(island);
    }
  }, []);

  const saveProfile = useCallback(() => {
    saveState(state, profile[0]);
  }, [state, profile[0]]);

  const deleteProfile = useCallback((profileName: string) => {
    window.localStorage.removeItem("profile-" + profileName);
    window.localStorage.setItem("lastProfile", "");
  }, []);

  const prof = {
    profile,
    setProfile,
    profiles,
    loadProfile,
    saveProfile,
    deleteProfile,
  };

  const changeLevel = useCallback(
    (homeIdx: number, spotIdx: number, newLevel?: number) => {
      setState((prev) => {
        const homeSpot = prev.homes?.[homeIdx].spots?.[spotIdx];
        if (!homeSpot) {
          return prev;
        }
        const costCurrent = getResAmount(homeSpot.type, homeSpot.level);
        const costNext = getResAmount(homeSpot.type, newLevel);

        return produce(prev, (draft) => {
          if (prev.homeMode == "default") {
            draft.resources[homeSpot.type] +=
              or0(costCurrent?.r) - or0(costNext?.r);
            draft.resources["Toolboxes"] +=
              or0(costCurrent?.tb) - or0(costNext?.tb);
            draft.resources["MTB"] +=
              or0(costCurrent?.mtb) - or0(costNext?.mtb);
          }

          draft.homes[homeIdx].spots[spotIdx].level = newLevel;

          if (prev.homeMode == "default") {
            draft.coziness = calcIslandCoziness(draft.homes);
          }
        });
      });
    },
    []
  );

  const changeResAmount = useCallback(
    (type: ResourceType, amount: number) =>
      setState((prev) =>
        produce(prev, (draft) => {
          draft.resources[type] = amount;
        })
      ),
    []
  );

  const toggleSkin = useCallback((homeIdx: number, value: boolean) => {
    setState((prev) => {
      const home = prev.homes?.[homeIdx];
      if (!home) {
        return prev;
      }
      return produce(prev, (draft) => {
        draft.homes[homeIdx].skin = value;
        draft.coziness = calcIslandCoziness(draft.homes);
      });
    });
  }, []);

  const toggleSpotSkin = useCallback(
    (homeIdx: number, spotIdx: number, value: boolean) => {
      setState((prev) => {
        const homeSpot = prev.homes?.[homeIdx].spots?.[spotIdx];
        if (!homeSpot) {
          return prev;
        }
        return produce(prev, (draft) => {
          draft.homes[homeIdx].spots[spotIdx].skin = value;
          draft.coziness = calcIslandCoziness(draft.homes);
        });
      });
    },
    []
  );

  const toggleHomeMode = useCallback(
    () =>
      setState((prev) =>
        produce(prev, (draft) => {
          draft.homeMode = prev.homeMode == "default" ? "edit" : "default";
          draft.coziness = calcIslandCoziness(draft.homes);
        })
      ),
    []
  );

  const toggleResMode = useCallback(
    () =>
      setState((prev) =>
        produce(prev, (draft) => {
          draft.resMode = prev.resMode == "default" ? "edit" : "default";
        })
      ),
    []
  );

  const addHome = useCallback(
    () =>
      setState((prev) => {
        return produce(prev, (draft) => {
          let newName = "Residence " + (draft.homes?.length + 1);
          const lastHome = draft.homes[draft.homes?.length - 1];
          if (lastHome) {
            const parts = lastHome.name.split(" ");
            const nr = parseInt(parts[parts?.length - 1]);
            if (!Number.isNaN(nr)) {
              newName = "Residence " + (nr + 1);
            }
          }
          const home = initHome(newName);
          draft.homes.push(home);
        });
      }),
    []
  );

  const deleteHome = useCallback(
    (id: string) =>
      setState((prev) => {
        return produce(prev, (draft) => {
          draft.homes = draft.homes.filter((h) => h.id != id);
        });
      }),
    []
  );
  return {
    state,
    changeLevel,
    changeResAmount,
    toggleSkin,
    toggleSpotSkin,
    toggleHomeMode,
    toggleResMode,
    addHome,
    deleteHome,
    prof,
  };
}
