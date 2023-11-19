interface HSL {
  h: number;
  s: number;
  l: number;
}
interface RGB {
  r: number;
  g: number;
  b: number;
}
export function generateAnalogousColors(baseColor: string, count: number) {
  const baseHSL = hexToHSL(baseColor);
  const analogousColors = [];
  const interval = 360 / count;
  for (let i = 0; i < count; i++) {
    const analogousHue = (baseHSL.h + i * interval) % 360;
    const analogousColor = hslToHex({
      h: analogousHue,
      s: baseHSL.s,
      l: baseHSL.l,
    });
    analogousColors.push(analogousColor);
  }

  return analogousColors;
}

function hexToHSL(hex: string) {
  const rgb = hexToRGB(hex);
  return rgbToHSL(rgb);
}
function hexToRGB(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function RGBToHex(rgb: RGB) {
  return `#${((1 << 24) | (rgb.r << 16) | (rgb.g << 8) | rgb.b)
    .toString(16)
    .slice(1)}`;
}

function rgbToHSL(rgb: RGB) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// HSL 색상을 Hex로 변환하는 함수
function hslToHex(hsl: HSL) {
  const rgb = hslToRGB(hsl);
  return RGBToHex(rgb);
}

// HSL 색상을 RGB로 변환하는 함수
function hslToRGB(hsl: HSL) {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
