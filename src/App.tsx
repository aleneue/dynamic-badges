import React, {
  RefObject,
  createRef,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import { DEFAULT_DATA } from "./DEFAULT_DATA";
import MultiSelect from "./components/MultiSelect";
import { useLayoutWindowSize } from "./hooks/useLayoutWindowSize";

const App = () => {
  const [toggleOpen, setToggleOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const rightDivRef = useRef<HTMLInputElement>(null);
  const leftDivRef = useRef<HTMLInputElement>(null);

  const [displayedBadges, setDisplayedBadges] = useState(selectedItems);
  const [badgeRefs, setBadgeRefs] = useState<RefObject<any>[]>([]);
  const { width } = useLayoutWindowSize();

  const WIDTH_RESERVED_FOR_LAST_BADGE = 100;

  useLayoutEffect(() => {
    setBadgeRefs(selectedItems.map(() => createRef()));
    setDisplayedBadges(selectedItems);
  }, [selectedItems, width]);

  useLayoutEffect(() => {
    if (badgeRefs.length) {
      const badge = document.getElementsByClassName("badge")[0];
      const badgeStyle = window.getComputedStyle(badge);

      const rightContainer =
        document.getElementsByClassName("right-container")[0];
      const rightContainerStyle = window.getComputedStyle(rightContainer);
      const rightContainerXMargin = parseInt(
        rightContainerStyle.margin.split(" ")[1]
      );

      let availableContainerWidth =
        (rightDivRef?.current?.offsetWidth ?? 0) -
        (leftDivRef?.current?.offsetWidth ?? 0) -
        rightContainerXMargin -
        WIDTH_RESERVED_FOR_LAST_BADGE;

      let counter = 0;

      const badgesToDisplay = [];

      while (counter < badgeRefs.length) {
        const index = badgeRefs.length - counter - 1;
        const badgeRef = badgeRefs[index];
        if (availableContainerWidth > badgeRef?.current?.offsetWidth) {
          availableContainerWidth -=
            badgeRef?.current?.offsetWidth + parseInt(badgeStyle.marginRight);
          badgesToDisplay.push(selectedItems[index]);
          counter++;
          continue;
        } else {
          break;
        }
      }

      setDisplayedBadges(badgesToDisplay);
    }
  }, [badgeRefs]);

  const leftBadgesCount = selectedItems.length - displayedBadges.length;

  const isSelectAllOn = DEFAULT_DATA.length === selectedItems.length;

  const handleSelectAll = () =>
    setSelectedItems(isSelectAllOn ? [] : DEFAULT_DATA);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedItem = event.target.value;

    let updatedItems = [...selectedItems];

    if (selectedItems.includes(selectedItem)) {
      updatedItems = selectedItems.filter((item) => item !== selectedItem);
    } else {
      updatedItems.push(selectedItem);
    }

    setSelectedItems(updatedItems);
  };

  const SelectAll = () => (
    <div className="select-container">
      <input
        type="checkbox"
        id="select-all"
        name="select-all"
        value="select-all"
        onChange={handleSelectAll}
        checked={isSelectAllOn}
      />
      <label htmlFor="select-all" className="label">
        Select all
      </label>
    </div>
  );

  return (
    <div className="container">
      <div ref={leftDivRef}>
        <SelectAll />
        <MultiSelect
          selectedItems={selectedItems}
          toggleOpen={toggleOpen}
          handleToggle={() => setToggleOpen((toggle) => !toggle)}
          handleChange={handleChange}
        />
      </div>
      <div className="right-container" ref={rightDivRef}>
        {!!displayedBadges.length && (
          <div className="badge-container">
            {displayedBadges.map((item, i) => (
              <div key={`${item}-${i}`} className="badge" ref={badgeRefs[i]}>
                {item}
              </div>
            ))}
          </div>
        )}
        {!!leftBadgesCount && <div className="badge">+ {leftBadgesCount}</div>}
      </div>
    </div>
  );
};

export default App;
