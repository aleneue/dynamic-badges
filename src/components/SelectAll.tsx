interface Props {
  checked: boolean;
  onChange: () => void;
}

const SelectAll = ({ checked, onChange }: Props) => (
  <div className="select-container">
    <input
      type="checkbox"
      id="select-all"
      name="select-all"
      value="select-all"
      onChange={onChange}
      checked={checked}
    />
    <label htmlFor="select-all" className="label">
      Select all
    </label>
  </div>
);

export default SelectAll;
