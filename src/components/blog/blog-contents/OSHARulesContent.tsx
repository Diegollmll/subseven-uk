// src/components/blog/blog-contents/OSHARulesContent.tsx
import React from 'react';

export default function OSHARulesContent() {
  return (
    <div className="blog-content">
      <div className="mb-4 text-lg">
        You could read OSHA's <strong>75-page</strong> forklift safety regulations... or you could just check out this <strong>quick hit list</strong>:
      </div>

      <div className="mt-8 space-y-8">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold mb-3">
            <span>🚦</span>
            <span>1. Only trained & certified operators can drive a forklift (29 CFR 1910.178(l))</span>
          </h2>
          <p className="ml-8">
            No training? No driving. OSHA requires <strong>formal instruction, practical training, and evaluation</strong> before an operator can get behind the wheel.
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold mb-3">
            <span>🔍</span>
            <span>2. Forklifts must be inspected daily (29 CFR 1910.178(q)(7))</span>
          </h2>
          <p className="ml-8">
            <strong>Before each shift</strong>, operators must check for issues like <strong>brake problems, tire wear, or hydraulic leaks</strong>. If something's wrong, <strong>it needs to be fixed before use</strong>.
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold mb-3">
            <span>📦</span>
            <span>3. Load handling must follow safety protocols (29 CFR 1910.178(o))</span>
          </h2>
          <p className="ml-8">
            Overloading = <strong>bad idea</strong>. Operators must keep loads <strong>balanced, secured, and within weight limits</strong>.
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold mb-3">
            <span>🚷</span>
            <span>4. Pedestrian safety is a must (29 CFR 1910.178(n)(4))</span>
          </h2>
          <p className="ml-8">
            Forklifts must have <strong>horns, lights, and clear traffic routes</strong> to avoid hitting workers on foot.
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold mb-3">
            <span>🔄</span>
            <span>5. Refueling & battery charging must be done safely (29 CFR 1910.178(f))</span>
          </h2>
          <p className="ml-8">
            No smoking, no open flames, and proper ventilation required.
          </p>
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold mb-3">
            <span>💡</span>
            <span>Shortcut to Compliance</span>
          </h2>
          <p className="ml-8">
            <strong>ForkU's app automatically logs forklift inspections, operator training, and safety violations to keep businesses OSHA-ready.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}