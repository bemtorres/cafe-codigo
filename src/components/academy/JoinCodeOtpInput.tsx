import { OTPInput, REGEXP_ONLY_DIGITS_AND_CHARS, type SlotProps } from 'input-otp';

function FakeCaret() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="join-otp-caret-blink h-7 w-px bg-textPrimary" />
    </div>
  );
}

function OtpSlot(props: SlotProps) {
  const showPlaceholder = props.char == null && props.placeholderChar != null;
  return (
    <div
      className={`relative flex h-11 w-8 shrink-0 items-center justify-center rounded-lg border-[3px] bg-white font-mono text-base font-bold shadow-neo transition-colors sm:h-12 sm:w-10 ${
        props.isActive ? 'border-info ring-2 ring-info/25' : 'border-border'
      } ${showPlaceholder ? 'text-textMuted' : 'text-textPrimary'}`}
    >
      <span aria-hidden={showPlaceholder}>{props.char ?? props.placeholderChar}</span>
      {props.hasFakeCaret ? <FakeCaret /> : null}
    </div>
  );
}

export type JoinCodeOtpInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  'aria-describedby'?: string;
  disabled?: boolean;
};

export default function JoinCodeOtpInput({ id, value, onChange, 'aria-describedby': ariaDescribedBy, disabled }: JoinCodeOtpInputProps) {
  return (
    <OTPInput
      id={id}
      maxLength={8}
      value={value}
      onChange={onChange}
      disabled={disabled}
      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
      inputMode="text"
      autoComplete="off"
      spellCheck={false}
      pushPasswordManagerStrategy="none"
      pasteTransformer={(pasted) => pasted.replace(/[^A-Za-z0-9]/g, '').slice(0, 8)}
      containerClassName="group mt-2 flex max-w-full flex-wrap gap-1.5 sm:gap-2"
      aria-describedby={ariaDescribedBy}
      className="focus-visible:ring-0"
      render={({ slots }) => (
        <>
          {slots.map((slot, idx) => (
            <OtpSlot key={idx} {...slot} />
          ))}
        </>
      )}
    />
  );
}
