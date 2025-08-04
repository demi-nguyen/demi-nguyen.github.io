import light from "../assets/light.png";

export default function LightButton({ isOn, toggleIsOn }) {
  return (
    <button
      className={`light-button${isOn ? " active" : ""}`}
      onClick={toggleIsOn}
    >
      <img src={light} />
    </button>
  );
}
