export type Extras = {
  value: boolean;
  type: ExtrasType;
};
export type Dismissed = {
  value: boolean;
  type: WicketType;
};

export type ExtrasType = "no" | "wide";
export type WicketType =
  | "bold"
  | "caught"
  | "run out"
  | "stumped"
  | "hit wicket"
  | "boundary out"
  | "others";

export type TeamPlayerType = {
  id: number;
  teamId: number;
  playerId: number;
  isCaptain: boolean;
  player: {
    id: number;
    name: string;
  };
};
