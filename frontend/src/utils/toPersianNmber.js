function toPersianNumber(number) {
  const newNumber = [];
  const str = String(number);

  str
    .split("")
    .reverse()
    .map((el, index) => {
      if (index % 3 == 0 && index !== 0) {
        newNumber.push(",");
      }
      newNumber.push(el);
    });
  return newNumber.reverse().join("");
}

export { toPersianNumber };
