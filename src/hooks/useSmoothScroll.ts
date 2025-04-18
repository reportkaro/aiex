import { useCallback } from 'react';

type ScrollOptions = {
  offset?: number;
  behavior?: ScrollBehavior;
  onComplete?: () => void;
};

/**
 * A custom hook that provides smooth scrolling functionality
 * 
 * @returns A function to trigger smooth scrolling to various targets
 */
export const useSmoothScroll = () => {
  /**
   * Scrolls smoothly to the specified target
   * 
   * @param target - ID of the element, element reference, or 'top'/'bottom'
   * @param options - Optional configuration
   */
  const scrollTo = useCallback((
    target: string | HTMLElement | 'top' | 'bottom',
    options: ScrollOptions = {}
  ) => {
    const { 
      offset = 0, 
      behavior = 'smooth', 
      onComplete 
    } = options;

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      let element: HTMLElement | null = null;
      let top = 0;

      if (target === 'top') {
        top = 0;
      } else if (target === 'bottom') {
        top = document.body.scrollHeight;
      } else if (typeof target === 'string') {
        // Target is an element ID
        element = document.getElementById(target);
        if (!element) {
          console.warn(`Element with ID "${target}" not found.`);
          return;
        }
        top = element.getBoundingClientRect().top + window.pageYOffset;
      } else {
        // Target is an HTMLElement
        element = target;
        top = element.getBoundingClientRect().top + window.pageYOffset;
      }

      // Apply offset
      top += offset;

      // Perform the scroll
      window.scrollTo({
        top,
        behavior,
      });

      // Call onComplete callback after the scroll animation
      if (onComplete) {
        // Approximate scroll animation completion based on distance
        const scrollDistance = Math.abs(window.pageYOffset - top);
        const animationTime = Math.min(Math.max(scrollDistance / 3, 300), 1000);
        
        setTimeout(onComplete, animationTime);
      }
    }, 10);
  }, []);

  return { scrollTo };
};

export default useSmoothScroll; 