export interface TicketProps extends TicketProgressBarProps, TicketButtonsProps {
  title: string;
  cover: `https://source.unsplash.com/${string}`;
  content: TicketContentProps;
}

export interface TicketButtonsProps {
  disabled: boolean;
  handleClick: (tokenAddr: string, decimals: number) => void;
}

export interface TicketContentProps {
  intro: string;
  heading: string;
  winOutcome: string;
  loseOutcome: string;
  entryPrice: number;
  prevPrice: string;
}

export interface TicketProgressBarProps {
  minParticipants: number;
  currParticipants: number;
}
