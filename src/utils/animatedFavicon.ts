const GIF_URL =
  "https://wsimbrjfhuxgoiernzmz.supabase.co/storage/v1/object/public/images/iY0zgLxT.gif";

export function startAnimatedFavicon() {
  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  fetch(GIF_URL)
    .then((r) => r.blob())
    .then((blob) => {
      const objectUrl = URL.createObjectURL(blob);

      // Keep the img in the DOM so Chrome continues animating the GIF frames.
      const img = document.createElement("img");
      img.style.cssText =
        "position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;top:-1px;left:-1px;";
      document.body.appendChild(img);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext("2d")!;

        function drawFrame() {
          ctx.clearRect(0, 0, 32, 32);
          ctx.drawImage(img, 0, 0, 32, 32);
          link!.href = canvas.toDataURL("image/png");
          requestAnimationFrame(drawFrame);
        }

        drawFrame();
      };

      img.src = objectUrl;
    })
    .catch(() => {
      // Network unavailable — static favicon in <link> remains as fallback.
    });
}
