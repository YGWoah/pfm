import { FC } from 'react';
const ArticleEditor: FC = () => {
  return (
    <div>
      <h1>Article Editor</h1>
      <textarea className="border-4 border-black" rows={8}></textarea>
    </div>
  );
};

export default ArticleEditor;
