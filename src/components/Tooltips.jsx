
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components';

const TooltipLarge = styled(ReactTooltip).attrs({
  className: "custom-tooltip",
})`
  &.custom-tooltip::before {
    border-right: 8px solid #555555 !important;
  }
  &.custom-tooltip {
      border-radius:8px;
      padding-top: 11px;
      padding-left: 11.5px;
      padding-right: 12.5px;
      padding-bottom: 12px;

      background: #252525;
      border: 2px solid #555555;
      z-index:5;
      pointer-events: auto !important; 
  }
`;

export { TooltipLarge }