import { useState } from 'react';
import { motion } from 'framer-motion';
import { Divider } from '../Divider';
import { Sparkles, Shield, Heart, Eye, Flag, PenLine } from 'lucide-react';

interface Step1Props {
  onAgree: () => void;
}

const RULES = [
  { icon: Heart, text: 'Speak with respect, even when opinions differ.' },
  { icon: Shield, text: 'Every reader deserves safety and dignity.' },
  { icon: Eye, text: 'Mark spoilers 🕯 and mature themes 🌙 with the symbols of the realm.' },
  { icon: Sparkles, text: 'Create and share as if others are listening, because they are.' },
  { icon: Flag, text: 'Guard the realm by reporting what breaks its balance.' },
];

export function Step1Guidelines({ onAgree }: Step1Props) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-baebles-gold/12 flex items-center justify-center">
          <Shield className="w-7 h-7 text-primary" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl bg-gradient-to-r from-primary via-baebles-gold to-primary bg-clip-text text-transparent tracking-wide mb-2">
          Code of Honor
        </h1>
        <p className="mt-3 text-muted-foreground italic font-body text-sm">
          This realm is woven from many voices.
        </p>
      </div>

      <Divider />

      {/* Rules Card */}
      <div className="baebles-card-simple mb-5">
        <ul className="space-y-3">
          {RULES.map((rule, i) => (
            <motion.li 
              key={i} 
              className="flex gap-3 items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--baebles-purple) / 0.15)' }}>
                <span className="text-baebles-purple text-sm">✦</span>
              </div>
              <span className="font-body text-sm text-foreground/90 pt-1">{rule.text}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Oath Card */}
      <div className="baebles-card-ornate">
        <div className="corner-br" />
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2" style={{ background: 'linear-gradient(135deg, hsl(var(--baebles-gold) / 0.2), hsl(var(--primary) / 0.1))' }}>
            <PenLine className="w-6 h-6 text-baebles-gold" />
          </div>
          <h2 className="font-display text-lg text-primary tracking-wide">
            The Reader's Oath
          </h2>
        </div>
        <p className="text-center text-muted-foreground font-body text-sm mb-5">
          Enter only if you are willing to uphold this oath.
        </p>

        {/* Checkbox */}
        <label className="flex items-center gap-3 cursor-pointer group mb-5 justify-center">
          <motion.div
            className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
              checked
                ? 'bg-primary'
                : 'border-2 border-primary/40 group-hover:border-primary/70'
            }`}
            onClick={() => setChecked(!checked)}
            whileTap={{ scale: 0.9 }}
          >
            {checked && <span className="text-primary-foreground text-sm">✓</span>}
          </motion.div>
          <input
            type="checkbox"
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            className="sr-only"
          />
          <span className="font-body text-sm text-foreground/90">
            I agree to honor the spirit of Baebles.
          </span>
        </label>

        <motion.button
          onClick={onAgree}
          disabled={!checked}
          className="baebles-btn-primary w-full flex items-center justify-center gap-2"
          whileTap={{ scale: 0.98 }}
        >
          Enter the Realm <Sparkles className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
