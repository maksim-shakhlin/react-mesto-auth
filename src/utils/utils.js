export function handleError(error) {
  console.error(error);
}

export function cleanSpaces(string) {
  return string.replace(/\s+/g, ' ').trim();
}

export function cleanData(object) {
  const obj = { ...object };
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = cleanSpaces(obj[key]);
    }
  }
  return obj;
}

export function validateLength(input) {
  const realLength = cleanSpaces(input.value).length;
  const minLength = input.getAttribute('minlength') || +input.required;

  if (input.value.length >= minLength && realLength < minLength) {
    return `Минимальное число значащих символов — ${minLength}.`;
  }

  return '';
}
