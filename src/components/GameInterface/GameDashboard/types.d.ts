export interface IGameDashboardProps {
  currAccount: string | null;
  handleCopyToClipboard(str: string): void;
  handleClaim(amount: number): void;
}

export interface IGameDashboardBodyItemProps {
  title: string;
  value: string;
  handleCopyToClipboard(str: string): void;
}
