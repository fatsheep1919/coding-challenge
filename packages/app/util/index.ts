export const getShuffledArr = (arr: any[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[rand]] = [arr[rand], arr[i]];
  }
  return arr;
};

export const getRandomId = () => getShuffledArr([...Array(500)].map((v, i) => (v = i + 1)))[0];

export const getRandomPoolLiquidity = (len) => [...Array(len)].fill(undefined).map((_) => {
  return parseInt(
    getShuffledArr([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .toString()
      .replaceAll(",", "")
  );
});

export const getRandomMyLiquidity = (len) => [...Array(len)].fill(undefined).map((_) => {
  return parseInt(
    getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      .toString()
      .slice(0, 5)
      .replaceAll(",", "")
  );
});

export const getRandomAPR = (len) => [...Array(len)].fill(undefined).map((_) => {
  return (
    parseInt(
      getShuffledArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        .toString()
        .slice(0, 7)
        .replaceAll(",", "")
    ) / 100
  );
});