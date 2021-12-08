import React from "react";

export const DeliveredCheckmark: React.FC = () => (
  <svg
    width='9.5'
    height='7'
    viewBox='0 0 10 8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    style={{ marginRight: '3px', display: 'flex', alignSelf: 'center' }}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.47116 1.80482C9.73151 1.54447 9.73151 1.12236 9.47116 0.862011C9.21081 0.601661 8.7887 0.601661 8.52835 0.862011L3.66646 5.7239L1.47108 3.52851C1.21073 3.26816 0.788619 3.26816 0.52827 3.52851C0.26792 3.78886 0.26792 4.21097 0.52827 4.47132L3.18877 7.13182C3.19083 7.13394 3.19292 7.13605 3.19502 7.13815C3.45537 7.3985 3.87748 7.3985 4.13783 7.13815L9.47116 1.80482Z'
      fill='var(--text-low-emphasis)'
    />
  </svg>
);
