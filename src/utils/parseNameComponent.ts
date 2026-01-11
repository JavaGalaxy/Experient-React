import { type ParsedName } from '../types/user.ts';

export const parseNameComponent = (name: string): ParsedName => {
  const parts = name.split(' ');

  let title = '';
  let firstName = '';
  let middleParts = [];
  let lastName = '';
  let suffix: string | undefined = '';

  const titles = ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.'];
  if (titles.some((t) => parts[0]?.includes(t))) {
    title = parts[0];
    parts.shift();
  }

  const suffixes = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'V'];
  if (suffixes.some((s) => parts[parts.length - 1]?.includes(s))) {
    suffix = parts.pop();
  }

  firstName = parts[0];

  lastName = parts[parts.length - 1];

  middleParts = parts.slice(1, -1);

  return { title, firstName, middleParts, lastName, suffix };
};

export const getFormattedName = (name: string) => {
  const { title, firstName, middleParts, lastName, suffix } =
    parseNameComponent(name);

  let formattedLastName = [...middleParts, lastName].join(' ');

  if (suffix) {
    formattedLastName += ` ${suffix}`;
  }
  formattedLastName += `, ${firstName}`;
  if (title) {
    formattedLastName += ` (${title})`;
  }

  return formattedLastName;
};
