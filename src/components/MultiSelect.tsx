import { DEFAULT_DATA } from "../DEFAULT_DATA";

interface Props {
  selectedItems: string[];
  toggleOpen: boolean;
  handleToggle: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MultiSelect = ({
  selectedItems,
  toggleOpen,
  handleToggle,
  handleChange,
}: Props) => {
  const placeholderText = selectedItems.length
    ? `${selectedItems.length} ${
        selectedItems.length === 1 ? "item" : "items"
      } selected`
    : "Choose at least one item";

  return (
    <div>
      <div className="multi-select" onClick={handleToggle}>
        <div className="placeholder">{placeholderText}</div>
        <div
          className={`icon ${toggleOpen ? "triangle-up" : "triangle-down"}`}
        />
      </div>
      {toggleOpen && (
        <div className="dropdown">
          <div>
            {DEFAULT_DATA.map((d) => (
              <div key={d} className="dropdown-item">
                <input
                  type="checkbox"
                  id={d}
                  name={d}
                  value={d}
                  onChange={handleChange}
                  checked={selectedItems.includes(d)}
                />
                <label htmlFor={d} className="label">
                  {d}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
