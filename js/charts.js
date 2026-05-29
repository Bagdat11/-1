const performanceData = {
  months: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
  gpa: [72, 85, 78, 88, 82, 90, 86, 91],
  passRate: [68, 80, 75, 84, 79, 87, 83, 89],
};

const facultyData = [
  { label: "Engineering", value: 32, color: "#2563eb" },
  { label: "Economics", value: 24, color: "#14b8a6" },
  { label: "IT & CS", value: 22, color: "#8b5cf6" },
  { label: "Medicine", value: 14, color: "#38bdf8" },
  { label: "Law", value: 8, color: "#f97316" },
];

function renderBarChart(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const w = 560;
  const h = 220;
  const pad = { top: 30, right: 20, bottom: 40, left: 40 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const n = performanceData.months.length;
  const groupW = chartW / n;
  const barW = groupW * 0.28;

  let rects = "";
  performanceData.months.forEach((month, i) => {
    const cx = pad.left + i * groupW + groupW / 2;
    const gpaH = (performanceData.gpa[i] / 100) * chartH;
    const passH = (performanceData.passRate[i] / 100) * chartH;
    const gpaX = cx - barW - 2;
    const passX = cx + 2;
    const gpaY = pad.top + chartH - gpaH;
    const passY = pad.top + chartH - passH;

    rects += `<rect x="${gpaX}" y="${gpaY}" width="${barW}" height="${gpaH}" fill="#1a2b4b" rx="3"/>`;
    rects += `<rect x="${passX}" y="${passY}" width="${barW}" height="${passH}" fill="#60a5fa" rx="3"/>`;
    rects += `<text x="${cx}" y="${pad.top + chartH + 22}" text-anchor="middle" font-size="11" fill="#6b7280">${month}</text>`;
    rects += `<text x="${cx}" y="${gpaY - 6}" text-anchor="middle" font-size="10" fill="#1a2b4b" font-weight="600">${performanceData.gpa[i]}%</text>`;
  });

  container.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" aria-label="Academic performance chart">
      <line x1="${pad.left}" y1="${pad.top + chartH}" x2="${w - pad.right}" y2="${pad.top + chartH}" stroke="#e5e7eb"/>
      ${rects}
    </svg>`;
}

function renderDonutChart(containerId, legendId) {
  const donut = document.getElementById(containerId);
  const legend = document.getElementById(legendId);
  if (!donut || !legend) return;

  let gradient = "conic-gradient(";
  let acc = 0;
  facultyData.forEach((item, i) => {
    const start = acc;
    acc += item.value;
    gradient += `${item.color} ${start}% ${acc}%`;
    if (i < facultyData.length - 1) gradient += ", ";
  });
  gradient += ")";
  donut.style.background = gradient;

  legend.innerHTML = facultyData
    .map(
      (item) => `
    <li>
      <span class="label"><span class="dot" style="background:${item.color}"></span>${item.label}</span>
      <strong>${item.value}%</strong>
    </li>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderBarChart("barChart");
  renderDonutChart("donutChart", "donutLegend");
});
