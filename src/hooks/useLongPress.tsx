import React, { useCallback, useRef, useState } from 'react';

const useLongPress = (
  onLongPress: React.EventHandler<React.SyntheticEvent>,
  onClick: React.EventHandler<React.SyntheticEvent>,
  { shouldPreventDefault = true, delay = 300 } = {}
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<NodeJS.Timeout>();
  const timeoutLongPress = useRef<NodeJS.Timeout>();
  const target = useRef<EventTarget>();

  const start = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener(
          'touchend',
          (e) => preventDefault(e as MouseEvent | TouchEvent),
          {
            passive: false
          }
        );
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        timeoutLongPress.current = setInterval(() => onLongPress(event), 100);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault]
  );

  const clear = useCallback(
    (event: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current);
      timeoutLongPress.current && clearTimeout(timeoutLongPress.current);
      shouldTriggerClick && !longPressTriggered && onClick(event);
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', (e) =>
          preventDefault(e as MouseEvent | TouchEvent)
        );
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered]
  );

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent) => clear(e)
  };
};

const isTouchEvent = (event: MouseEvent | TouchEvent) => {
  return 'touches' in event;
};

const preventDefault = (event: MouseEvent | TouchEvent) => {
  if (!isTouchEvent(event)) return;
  event = event as TouchEvent;
  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
