#!/bin/bash

echo "🚀 Deploying React Cool Toast Demo to Vercel..."

# Create a temporary directory for deployment
TEMP_DIR="temp-demo-deploy"
rm -rf $TEMP_DIR
mkdir $TEMP_DIR

# Copy demo files
cp -r demo-vercel/* $TEMP_DIR/

# Navigate to temp directory
cd $TEMP_DIR

# Initialize git if not exists
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "Initial commit for demo deployment"
fi

echo "📦 Demo files ready for deployment!"
echo "📁 Files in $TEMP_DIR:"
ls -la

echo ""
echo "🎯 Next steps:"
echo "1. Push the $TEMP_DIR folder to a new GitHub repository"
echo "2. Connect the repository to Vercel"
echo "3. Deploy automatically"
echo ""
echo "Or run: vercel --prod (if you have Vercel CLI installed)"

cd ..
