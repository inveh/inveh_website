#!/bin/bash

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null
then
    echo "Error: 'webp' (cwebp) is not installed."
    echo "Install it using: sudo apt install webp (Ubuntu) or brew install webp (Mac)"
    exit 1
fi

echo "Starting conversion to WebP..."

# Loop through common image formats
for file in *.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    # Skip the loop if no files matching the extension are found
    [ -e "$file" ] || continue

    # Get the filename without the extension
    filename="${file%.*}"

    echo "Converting: $file"
    
    # Convert with 80% quality (balanced for web)
    cwebp -q 80 "$file" -o "${filename}.webp"
done

echo "---"
echo "All conversions complete!"
