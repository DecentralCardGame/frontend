export enum ButtonType {
  BLACK,
  RED,
  WHITE,
  YELLOW,
  TEAL,
  PUSSYRED,
}

export const getButtonColor = (t: ButtonType) => {
  switch (t) {
    case ButtonType.BLACK:
      return "bg-black";
    case ButtonType.YELLOW:
      return "bg-cc-yellow";
    case ButtonType.WHITE:
      return "bg-white";
    case ButtonType.TEAL:
      return "bg-[#40C1C7]";
    case ButtonType.RED:
      return "bg-cc-red";
    case ButtonType.PUSSYRED:
      return "bg-pussy-red";
  }
};

export const getTextColor = (t: ButtonType) => {
  switch (t) {
    case ButtonType.BLACK:
    case ButtonType.TEAL:
    case ButtonType.RED:
      return "text-white";
    default:
      return "text-black";
  }
};
