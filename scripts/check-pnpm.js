if (!process.env.npm_execpath || !process.env.npm_execpath.includes('pnpm')) {
  console.error('\n🚫 This repo uses pnpm. Please use `pnpm install`, not npm.\n');
  process.exit(1);
}
