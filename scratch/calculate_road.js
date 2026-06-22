function bezier(t, p0, p1, p2, p3) {
  const mt = 1 - t;
  return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
}

function findTForX(xTarget, p0, p1, p2, p3) {
  // Binary search for t
  let low = 0, high = 1;
  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const x = bezier(mid, p0, p1, p2, p3);
    if (x < xTarget) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return (low + high) / 2;
}

// Segment 1: (60,170) -> (220,70) -> (340,270) -> (500,170)
// Segment 2: (500,170) -> (660,70) -> (820,70) -> (980,170)
// Segment 3: (980,170) -> (1140,270) -> (1220,270) -> (1340,170)

const segments = [
  { p0: {x:60, y:170}, p1: {x:220, y:70}, p2: {x:340, y:270}, p3: {x:500, y:170} },
  { p0: {x:500, y:170}, p1: {x:660, y:70}, p2: {x:820, y:70}, p3: {x:980, y:170} },
  { p0: {x:980, y:170}, p1: {x:1140, y:270}, p2: {x:1220, y:270}, p3: {x:1340, y:170} }
];

const targetXs = [
  1400 * 0.08, // 112
  1400 * 0.30, // 420
  1400 * 0.50, // 700
  1400 * 0.70, // 980
  1400 * 0.88  // 1232
];

targetXs.forEach((x, index) => {
  // Find which segment contains x
  let seg = null;
  if (x >= 60 && x <= 500) seg = segments[0];
  else if (x > 500 && x <= 980) seg = segments[1];
  else if (x > 980 && x <= 1340) seg = segments[2];

  if (seg) {
    const t = findTForX(x, seg.p0.x, seg.p1.x, seg.p2.x, seg.p3.x);
    const y = bezier(t, seg.p0.y, seg.p1.y, seg.p2.y, seg.p3.y);
    console.log(`Milestone ${index} (x=${x}): t=${t.toFixed(4)}, y=${y.toFixed(2)}, scaled_y_pixel=${(220 + y * 1.12).toFixed(2)}`);
  } else {
    console.log(`Milestone ${index} (x=${x}): Out of range`);
  }
});
