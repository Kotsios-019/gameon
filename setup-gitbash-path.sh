#!/bin/bash
# Script to add Node.js to Git Bash PATH

# Convert Windows path to Git Bash format
NODE_PATH="/c/Program Files/nodejs"

# Check if Node.js path exists
if [ -d "$NODE_PATH" ]; then
    echo "✓ Found Node.js at: $NODE_PATH"
    
    # Add to .bashrc
    if [ ! -f ~/.bashrc ]; then
        touch ~/.bashrc
    fi
    
    # Check if already added
    if grep -q "Program Files/nodejs" ~/.bashrc; then
        echo "⚠ Node.js path already exists in ~/.bashrc"
    else
        echo "" >> ~/.bashrc
        echo "# Add Node.js to PATH" >> ~/.bashrc
        echo "export PATH=\"$NODE_PATH:\$PATH\"" >> ~/.bashrc
        echo "✓ Added Node.js to ~/.bashrc"
    fi
    
    # Also add to .bash_profile
    if [ ! -f ~/.bash_profile ]; then
        touch ~/.bash_profile
    fi
    
    if grep -q "Program Files/nodejs" ~/.bash_profile; then
        echo "⚠ Node.js path already exists in ~/.bash_profile"
    else
        echo "" >> ~/.bash_profile
        echo "# Add Node.js to PATH" >> ~/.bash_profile
        echo "export PATH=\"$NODE_PATH:\$PATH\"" >> ~/.bash_profile
        echo "✓ Added Node.js to ~/.bash_profile"
    fi
    
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "Now run: source ~/.bashrc"
    echo "Then test: node --version"
else
    echo "✗ Node.js not found at: $NODE_PATH"
    echo "Please check your Node.js installation path"
fi

