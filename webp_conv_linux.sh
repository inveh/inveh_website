for i in *.jpg *.jpeg *.png; do
  case "$i" in
    *.jpg|*.jpeg|*.png)
      output="${i%.*}.webp"
      ffmpeg -i "$i" -c:v libwebp -q:v 80 "$output"
      ;;
  esac
done
