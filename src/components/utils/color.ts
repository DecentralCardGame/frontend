export enum Color {
  BLACK,
  RED,
  WHITE,
  YELLOW,
  TEAL,
  PUSSYRED,
}

export const getBgColor = (t: Color) => {
  switch (t) {
    case Color.BLACK:
      return "bg-black";
    case Color.YELLOW:
      return "bg-cc-yellow";
    case Color.WHITE:
      return "bg-white";
    case Color.TEAL:
      return "bg-[#40C1C7]";
    case Color.RED:
      return "bg-cc-red";
    case Color.PUSSYRED:
      return "bg-pussy-red";
  }
};

export const getTextColor = (t: Color) => {
  switch (t) {
    case Color.BLACK:
    case Color.TEAL:
    case Color.RED:
      return "text-white";
    case Color.PUSSYRED:
      return "text-white text-opacity-100";
    default:
      return "text-black";
  }
};
