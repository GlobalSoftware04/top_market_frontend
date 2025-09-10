import { useEffect } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

const useBootstrapTooltip = (deps = []) => {
  useEffect(() => {
    if (bootstrap?.Tooltip) {
      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
      );

      const validTooltipTriggers = [...tooltipTriggerList].filter(
        (el) => el && el.getAttribute('title')
      );

      const tooltipList = validTooltipTriggers.map(
        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl, {
          delay: { show: 250, hide: 100 }  // 1 second delay on show, quick hide
        })
      );

      return () => {
        tooltipList.forEach((tooltip) => tooltip.dispose());
      };
    }
  }, deps);
};

export default useBootstrapTooltip;
