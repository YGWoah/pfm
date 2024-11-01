import { Filter } from './bad-words/badwords';

const filter = new Filter();

let cleanText = (text: string) => {
  return filter.clean(text);
};

export default cleanText;
