// 此声明允许 TypeScript 识别并将 Markdown (.md) 文件作为模块导入。
// 如果没有此声明，当尝试导入 Markdown 文件时，TypeScript 会抛出错误，
// 因为它本身不支持非代码文件的导入。

declare module "*.md";
