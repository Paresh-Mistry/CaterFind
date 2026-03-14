import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export default function SuccessScreen({ onReset, onBrowse }: { onReset: () => void; onBrowse: () => void }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#F5F0E8]">
      <div className="w-full max-w-md text-center">
        <div className="relative inline-flex mb-8">
          <div className="w-24 h-24 rounded-full bg-[#1C2E20] flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-[#D49A72]" />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#C4865C] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4865C] mb-3">
          Listing Submitted
        </p>
        <h2
          className="text-[2.5rem] text-[#1C2E20] leading-[1.05] tracking-[-0.02em] mb-4"
          style={{ fontFamily: 'var(--font-display, "DM Serif Display", Georgia, serif)' }}
        >
          You&apos;re listed!
        </h2>
        <p className="text-sm text-[#8A8278] leading-[1.85] mb-10 max-w-sm mx-auto">
          Your catering service has been submitted and will be visible to event
          planners on CaterFind after a quick review.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onBrowse}
            className="flex items-center gap-2 bg-[#1C2E20] hover:bg-[#243828] text-[#F5F0E8] px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(28,46,32,0.35)]"
          >
            Browse caterers <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 border border-[#C8BEA8] bg-white hover:border-[#C4865C] hover:text-[#C4865C] text-[#1C2E20] px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200"
          >
            Add another
          </button>
        </div>
      </div>
    </div>
  );
}