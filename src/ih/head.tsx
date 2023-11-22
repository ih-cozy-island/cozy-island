import { FaRedo, FaSave, FaTrashAlt } from "react-icons/fa";
import { Card, HeadRow, Row, ToggleButton } from "./elements";

export function Head(props: {
  profile: [string, string];
  profiles: string[];
  setProfile: React.Dispatch<React.SetStateAction<[string, string]>>;
  loadProfile: (name: string) => void;
  saveProfile: () => void;
  deleteProfile: (profileName: string) => void;
}) {
  const {
    profile,
    profiles,
    setProfile,
    loadProfile,
    saveProfile,
    deleteProfile,
  } = props;
  return (
    <Card>
      <HeadRow>
        <div style={{ fontSize: "1.5em", fontWeight: 700 }}>Cozy Island</div>
        <Row
          style={{
            position: "absolute",
            right: 0,
            gap: 8,
          }}
        >
          <ToggleButton on={false} onToggle={() => saveProfile()}>
            <FaSave />
          </ToggleButton>
          <ToggleButton on={false} onToggle={() => loadProfile(profile[0])}>
            <FaRedo />
          </ToggleButton>

          <input
            style={{ width: 100 }}
            list="browsers"
            name="browser"
            value={profile[0]}
            onChange={(e) => setProfile([e.target.value, e.target.value])}
            onFocus={() => setProfile((prev) => ["", prev[0]])}
            onBlur={() => setProfile((prev) => [prev[1], ""])}
          />
          <datalist id="browsers" defaultValue={"Firefox"}>
            {profiles.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
          <ToggleButton on={false} onToggle={() => deleteProfile(profile[0])}>
            <FaTrashAlt />
          </ToggleButton>
        </Row>
      </HeadRow>
    </Card>
  );
}
