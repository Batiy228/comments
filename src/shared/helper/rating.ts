export const getRating = (up: number, down: number, action: "+" | "-" | "") => {
  if (action === "+") {
    return up - down + 1;
  } else if (action === "-") {
    return up - down - 1;
  } else return up - down;
};
