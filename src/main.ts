const SVG_NS = "http://www.w3.org/2000/svg";

const portrait = document.querySelector<HTMLDivElement>("#portrait")!;
const spin = document.querySelector<HTMLButtonElement>("#spin")!;

// The prototype grew inline. Keep it this way until the refactoring checkpoint.
const face = document.createElementNS(SVG_NS, "svg");
face.setAttribute("viewBox", "0 0 200 200");
face.setAttribute("role", "img");
face.setAttribute(
  "aria-label",
  "A cheerful face with freckles on the forehead and cheeks",
);

const head = document.createElementNS(SVG_NS, "ellipse");
head.setAttribute("cx", "100");
head.setAttribute("cy", "100");
head.setAttribute("rx", "78");
head.setAttribute("ry", "86");
head.setAttribute("fill", "#f3cf87");
head.setAttribute("stroke", "#302c29");
head.setAttribute("stroke-width", "4");
face.append(head);

// Freckles are added right after the head so they sit on the background
// but below the eyes, nose, and mouth, which are appended later.
function addFreckle(x: number, y: number): void {
  const freckle = document.createElementNS(SVG_NS, "circle");
  freckle.setAttribute("cx", String(x));
  freckle.setAttribute("cy", String(y));
  freckle.setAttribute("r", "2");
  freckle.setAttribute("fill", "#b9773f");
  face.append(freckle);
}

for (let row = 0; row < 4; row++) {
  for (let col = 0; col < 10; col++) {
    addFreckle(58 + col * (84 / 9), 36 + row * 8);
  }
}

for (let row = 0; row < 5; row++) {
  for (let col = 0; col < 8; col++) {
    addFreckle(36 + col * 6, 100 + row * 6);
  }
}

for (let row = 0; row < 5; row++) {
  for (let col = 0; col < 8; col++) {
    addFreckle(122 + col * 6, 100 + row * 6);
  }
}

const leftEye = document.createElementNS(SVG_NS, "ellipse");
leftEye.setAttribute("cx", "72");
leftEye.setAttribute("cy", "82");
leftEye.setAttribute("rx", "6");
leftEye.setAttribute("ry", "9");
leftEye.setAttribute("fill", "#302c29");
face.append(leftEye);

const rightEye = document.createElementNS(SVG_NS, "ellipse");
rightEye.setAttribute("cx", "128");
rightEye.setAttribute("cy", "82");
rightEye.setAttribute("rx", "6");
rightEye.setAttribute("ry", "9");
rightEye.setAttribute("fill", "#302c29");
face.append(rightEye);

const nose = document.createElementNS(SVG_NS, "line");
nose.setAttribute("x1", "100");
nose.setAttribute("y1", "96");
nose.setAttribute("x2", "96");
nose.setAttribute("y2", "112");
nose.setAttribute("stroke", "#302c29");
nose.setAttribute("stroke-width", "4");
nose.setAttribute("stroke-linecap", "round");
face.append(nose);

const mouth = document.createElementNS(SVG_NS, "line");
mouth.setAttribute("x1", "75");
mouth.setAttribute("y1", "137");
mouth.setAttribute("x2", "125");
mouth.setAttribute("y2", "137");
mouth.setAttribute("stroke", "#302c29");
mouth.setAttribute("stroke-width", "4");
mouth.setAttribute("stroke-linecap", "round");
face.append(mouth);

portrait.append(face);

spin.addEventListener("click", () => {
  // Restart rather than accumulate simultaneous animations on repeated clicks.
  for (const animation of face.getAnimations()) animation.cancel();
  face.animate(
    [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
    { duration: 800, easing: "ease-in-out" },
  );
});
