import React, { useState, useRef } from 'react';

//components
import FieldPopOver from '@/src/hooks/useFieldTips/FieldPopOver/FieldPopOver';
import Icon from '@/common/widgets/Icon/Icon';

//Styling
import styles from './useFieldTips.module.scss';

export const useFieldTips = tipData => {
  const [displayTip, setDisplayTip] = useState(false);

  const buttonRef = useRef();
  const popOverContainerRef = useRef();

  /* Pop over to be placed in a wanted component */
  const PopOver = () => {
    return displayTip ? (
      <div ref={popOverContainerRef} className="position-relative w-100">
        <FieldPopOver
          {...tipData}
          closingFunction={() => setDisplayTip(false)}
          buttonRef={buttonRef}
          containerRef={popOverContainerRef}
        />
      </div>
    ) : (
      <></>
    );
  };

  /* Button to be placed else where*/
  const TipButton = ({ title, icon, label }) => {
    return (
      <button
        title={title || ''}
        type="button"
        className={`d-flex flex-row align-items-center gap-1 mx-1 ${styles['info-button']}`}
        ref={buttonRef}
        onClick={() => setDisplayTip(!displayTip)}
      >
        {label && <span>{label}</span>}

        <Icon iconName={icon ?? 'question-circle'} className={`fs-4 ${styles['icon']}`} />
      </button>
    );
  };

  return {
    TipPopOver: PopOver,
    TipButton: TipButton,
  };
};
