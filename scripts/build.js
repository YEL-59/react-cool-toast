const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building react-cool-toast...');

try {
  // Clean dist directory
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
  }

  // Build the package
  execSync('npx rollup -c', { stdio: 'inherit' });

  // Copy package.json to dist
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const distPackageJson = {
    ...packageJson,
    main: './index.js',
    module: './index.esm.js',
    types: './index.d.ts',
    scripts: undefined,
    devDependencies: undefined,
  };
  
  fs.writeFileSync(
    'dist/package.json',
    JSON.stringify(distPackageJson, null, 2)
  );

  console.log('✅ Build completed successfully!');
  console.log('📦 Package ready for publishing');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
