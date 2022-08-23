interface IResponse {
  min: number;
  sec: number;
}
export const secondsToMinutes = (seconds: number): IResponse => {
  const division = seconds / 60;
  const min = Math.trunc(division);
  const sec = Math.trunc(seconds - min * 60);

  return {
    min,
    sec,
  };
};
