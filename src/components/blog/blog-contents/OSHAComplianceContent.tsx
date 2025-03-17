// src/components/blog/blog-contents/OSHAComplianceContent.tsx
import React from 'react';

export default function OSHAComplianceContent() {
  return (
    <div className="blog-content">
      <div className="mb-6">
        Ever heard the phrase <strong>"Safety first"</strong>? Well, in the world of forklifts, that's not just a friendly suggestion—it's the law. And the folks enforcing it? <strong>OSHA</strong> (a.k.a. the <strong>Occupational Safety and Health Administration</strong>).
      </div>
      
      <div className="mb-8">
        If you're running a warehouse, managing a fleet, or operating a forklift yourself, OSHA compliance isn't just about avoiding fines—it's about <strong>keeping people alive and businesses running smoothly</strong>. Let's break it down simply and figure out <strong>who's responsible, what the rules are, and why following them actually makes life easier for everyone</strong>.
      </div>

      <div className="mb-10">
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
          <span>🚨</span>
          <span>First Things First: Why OSHA Cares About Forklifts</span>
        </h2>
        
        <div className="ml-8 mb-6">
          Forklifts might be essential, but they're also <strong>dangerous when mishandled</strong>. How dangerous?
        </div>
        
        {/* Updated statistics section to horizontal layout */}
        <div className="ml-8 mb-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-4">
            <div className="flex flex-col">
              <div className="font-bold text-2xl">34,900</div>
              <div className="text-base"><strong>serious injuries</strong> involving forklifts occur annually</div>
            </div>
            
            <div className="flex flex-col">
              <div className="font-bold text-2xl">85</div>
              <div className="text-base"><strong>forklift-related deaths</strong> happen every year in the U.S.</div>
            </div>
            
            <div className="flex flex-col">
              <div className="font-bold text-2xl">70%</div>
              <div className="text-base"><strong>preventable</strong> with proper training</div>
            </div>
          </div>
          
          <p><strong>Forklifts weigh as much as 3 cars.</strong> They can crush, tip over, and cause serious damage if not operated properly. No wonder OSHA keeps a close eye on them.</p>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
          <span>🕵️</span>
          <span>Who's Responsible for OSHA Forklift Compliance?</span>
        </h2>
        
        <div className="ml-8 mb-4">
          OSHA doesn't care about passing the blame—they care about accountability. So, who's on the hook when things go wrong?
        </div>
        
        <div className="ml-8 mb-6">
          <h3 className="font-semibold text-xl mb-2">✅ <strong>Employers</strong> (a.k.a. Business Owners, Warehouse Managers, Safety Officers)</h3>
          <ul className="list-disc ml-6 space-y-2 mb-4">
            <li>Must provide <strong>proper forklift training & certification</strong> for every operator.</li>
            <li>Need to keep up with <strong>maintenance, inspections, and safety procedures</strong>.</li>
            <li>Are responsible for <strong>documenting</strong> compliance (which is where ForkU makes life easier 😉).</li>
          </ul>
          
          <h3 className="font-semibold text-xl mb-2">✅ <strong>Forklift Operators</strong> (a.k.a. YOU, the driver)</h3>
          <ul className="list-disc ml-6 space-y-2 mb-4">
            <li>Must be <strong>certified & trained</strong> before driving.</li>
            <li>Need to follow <strong>safety rules, speed limits, and proper load handling</strong>.</li>
            <li>Must <strong>inspect forklifts daily</strong> before starting a shift.</li>
          </ul>
          
          <h3 className="font-semibold text-xl mb-2">❌ <strong>Who's NOT responsible?</strong></h3>
          <p className="ml-6 mb-4"><strong>"I didn't know" isn't an excuse</strong>. OSHA fines <strong>both</strong> employers and operators when rules aren't followed. The average OSHA forklift safety violation fine? <strong>$14,502 per incident</strong>.</p>
          
          <p className="italic font-medium"><em>If you drive it, you need training. If you own it, you need to enforce safety rules. No shortcuts.</em></p>
        </div>
      </div>
      
      {/* Rest of the component remains unchanged */}
      <div className="mb-10">
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
          <span>🔑</span>
          <span>The ForkU Takeaway</span>
        </h2>
        
        <div className="ml-8 mb-6">
          <p className="mb-2">💡 <strong>OSHA compliance isn't a burden—it's a business advantage.</strong></p>
          <p className="mb-2">💡 <strong>Operators and employers BOTH have responsibilities.</strong></p>
          <p className="mb-4">💡 <strong>Fines are expensive, but safety is free (and ForkU makes it easy).</strong></p>
          
          <p>Want to <strong>make forklift compliance effortless</strong>?</p>
          <p><strong>Join the waitlist for ForkU's free OSHA tool and keep your fleet safe, legal, and accident-free.</strong> 🚜💨</p>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
          <span>💸</span>
          <span>The Cost of NOT Following OSHA Rules</span>
        </h2>
        
        <div className="ml-8 mb-6">
          <p className="mb-4">Ignoring OSHA rules isn't just unsafe—it's <strong>expensive</strong>.</p>
          
          <ul className="list-disc ml-6 space-y-2 mb-4">
            <li><strong>OSHA's base fine for non-compliance: $14,502 per violation</strong></li>
            <li><strong>Repeat or willful violations: Up to $145,027</strong></li>
            <li><strong>Accidents can cost businesses $100,000+ in lawsuits & downtime</strong></li>
          </ul>
          
          <p>💡 <strong>Compare that to a few hours of training and digital record-keeping.</strong> Seems like an easy choice, right?</p>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
          <span>📊</span>
          <span>The Correlation Between Compliance & Profitability</span>
        </h2>
        
        <div className="ml-8 mb-6">
          <p className="mb-4">OSHA compliance isn't just about <strong>avoiding penalties</strong>—it actually <strong>saves businesses money</strong>.</p>
          
          <p className="mb-2">📉 <strong>Companies with strong forklift safety programs see:</strong></p>
          
          <ul className="list-disc ml-6 space-y-2 mb-4">
            <li><strong>50% fewer workplace injuries</strong></li>
            <li><strong>25% less downtime</strong> due to accidents</li>
            <li><strong>Lower insurance premiums & worker's comp costs</strong></li>
            <li><strong>Higher retention rates</strong> (because good operators want to work in safe environments)</li>
          </ul>
          
          <p>💡 <strong>Translation: Safe businesses are more profitable businesses.</strong></p>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
          <span>🛠️</span>
          <span>How ForkU Makes OSHA Compliance Easy</span>
        </h2>
        
        <div className="ml-8 mb-6">
          <p className="mb-4">Instead of drowning in paperwork and manually tracking safety checks, businesses can use <strong>ForkU's free OSHA compliance tool</strong> to:</p>
          
          <p className="mb-2">✅ <strong>Automate daily forklift inspections</strong></p>
          <p className="mb-2">✅ <strong>Track operator certifications & training records</strong></p>
          <p className="mb-2">✅ <strong>Get real-time safety alerts</strong></p>
          <p className="mb-4">✅ <strong>Generate instant compliance reports for OSHA audits</strong></p>
          
          <p>🚀 <strong>No paperwork, no headaches—just compliance made easy.</strong></p>
        </div>
      </div>
    </div>
  );
}