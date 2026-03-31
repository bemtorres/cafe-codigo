import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  COFFEECOIN_STORE_CATALOG,
  isCoffeeCoinStoreEnabledByEnv,
  MOCK_COFFEECOIN_TRANSACTIONS,
  mockCoffeeCoinBalance,
  readCoffeeCoinStoreUnlocked,
  tryUnlockCoffeeCoinStore,
} from '../../lib/coffeeCoin';

function shortHash(full: string, head = 10, tail = 6) {
  if (full.length <= head + tail + 3) return full;
  return `${full.slice(0, head)}…${full.slice(-tail)}`;
}

export default function CoffeeCoinStoreSection() {
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState('');
  const [codeErr, setCodeErr] = useState(false);
  const [codeOk, setCodeOk] = useState(false);

  const envOn = useMemo(() => isCoffeeCoinStoreEnabledByEnv(), []);

  useEffect(() => {
    setMounted(true);
    setUnlocked(readCoffeeCoinStoreUnlocked());
  }, []);

  const balance = mockCoffeeCoinBalance();

  const submitCode = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setCodeErr(false);
      setCodeOk(false);
      if (tryUnlockCoffeeCoinStore(code)) {
        setUnlocked(true);
        setCodeOk(true);
        setCode('');
      } else {
        setCodeErr(true);
      }
    },
    [code],
  );

  if (!mounted) {
    return (
      <section
        id="ingresar-codigo"
        className="scroll-mt-28 rounded-3xl border-[3px] border-border border-dashed bg-[#faf8f5] p-6 shadow-[4px_4px_0px_#1E1210] md:p-8"
        aria-hidden
      >
        <div className="h-32 animate-pulse rounded-2xl bg-black/5" />
      </section>
    );
  }

  if (!unlocked) {
    return (
      <section
        id="ingresar-codigo"
        className="scroll-mt-28 rounded-3xl border-[3px] border-border bg-gradient-to-br from-[#3d2a1f] via-[#2b1d18] to-[#1a1410] p-5 text-white shadow-[6px_6px_0px_#1E1210] md:p-8"
        aria-labelledby="coffeecoin-locked-title"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="m-0 font-nunito text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-[#d4a574]">
              Modo tienda · desactivado
            </p>
            <h2 id="coffeecoin-locked-title" className="mt-2 font-nunito text-xl font-black text-white md:text-2xl">
              CoffeeCoin · tienda
            </h2>
            <p className="mt-2 max-w-xl font-nunito text-sm font-[650] leading-relaxed text-[#e8dcc8]">
              Moneda virtual y tienda de funciones están en preparación. Activá la vista previa con el código secreto o
              pedí que habiliten el sitio (variable <code className="text-[#fbbf24]">PUBLIC_COFFEECOIN_STORE_ENABLED</code>
              ).
            </p>
          </div>
          <form
            onSubmit={submitCode}
            className="flex w-full flex-col gap-2 sm:max-w-xs md:shrink-0"
            autoComplete="off"
          >
            <label htmlFor="store-unlock-code" className="font-nunito text-xs font-extrabold text-[#d4a574]">
              Código de acceso
            </label>
            <input
              id="store-unlock-code"
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setCodeErr(false);
                setCodeOk(false);
              }}
              placeholder="••••••••"
              className="rounded-xl border-[3px] border-[#5c4033] bg-[#1f1612] px-3 py-2.5 font-nunito font-bold text-white placeholder:text-white/30 shadow-[2px_2px_0px_#1E1210] focus:border-[#d4a574] focus:outline-none"
            />
            {codeErr && (
              <p className="m-0 font-nunito text-xs font-bold text-[#fca5a5]">Código incorrecto.</p>
            )}
            {codeOk && (
              <p className="m-0 font-nunito text-xs font-bold text-[#86efac]">Listo. Ya podés ver la vista previa.</p>
            )}
            <button
              type="submit"
              className="rounded-xl border-[3px] border-[#1E1210] bg-[#d4a574] py-2.5 font-nunito text-sm font-black text-[#1E1210] shadow-[3px_3px_0px_#1E1210] transition-transform hover:-translate-y-0.5"
            >
              Activar vista previa
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section
      id="ingresar-codigo"
      className="scroll-mt-28 rounded-3xl border-[3px] border-border bg-gradient-to-br from-[#fff8ee] via-white to-[#e8fcf5] p-5 shadow-[6px_6px_0px_#1E1210] md:p-8"
      aria-labelledby="coffeecoin-open-title"
    >
      <div className="mb-6 flex flex-col gap-4 border-b-2 border-dashed border-border/40 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="m-0 font-nunito text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-textMuted">
            Vista previa · sin base de datos
          </p>
          <h2 id="coffeecoin-open-title" className="!mt-1 font-nunito text-xl font-black text-textPrimary md:text-2xl">
            CoffeeCoin · tienda
          </h2>
          <p className="mt-1 max-w-2xl font-nunito text-sm font-[650] text-textSecondary">
            Saldo y movimientos son datos de demostración. Más adelante se registrarán con tu cuenta.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
          <div
            className="flex items-center gap-3 rounded-2xl border-[3px] border-border bg-[#fef3c7] px-5 py-4 shadow-[4px_4px_0px_#1E1210]"
            role="status"
          >
            <span className="text-3xl" aria-hidden>
              ☕
            </span>
            <div>
              <p className="m-0 font-nunito text-[0.65rem] font-extrabold uppercase tracking-wide text-textMuted">
                Saldo
              </p>
              <p className="m-0 font-nunito text-3xl font-black tabular-nums leading-none text-textPrimary">
                {balance}
                <span className="ml-1.5 text-lg font-extrabold text-textSecondary">CC</span>
              </p>
            </div>
          </div>
          {envOn && (
            <span className="rounded-xl border-2 border-[#06D6A0]/40 bg-white px-3 py-2 text-center font-nunito text-xs font-bold text-textSecondary">
              Activo también por env
            </span>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="!mt-0 font-nunito text-lg font-black text-textPrimary">Transacciones (ejemplo)</h3>
        <p className="mt-1 font-nunito text-xs font-bold text-textMuted">
          Campos previstos: <code className="text-textSecondary">id</code>,{' '}
          <code className="text-textSecondary">hash_transaccion</code>, <code className="text-textSecondary">credit</code>
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border-[3px] border-border bg-white shadow-[3px_3px_0px_#1E1210]">
          <table className="w-full min-w-[32rem] border-collapse text-left font-nunito text-sm">
            <thead>
              <tr className="border-b-2 border-border bg-tertiary/40">
                <th className="px-3 py-3 font-black text-textPrimary md:px-4">ID</th>
                <th className="px-3 py-3 font-black text-textPrimary md:px-4">Hash</th>
                <th className="px-3 py-3 font-black text-textPrimary md:px-4">Crédito</th>
                <th className="hidden px-3 py-3 font-black text-textPrimary sm:table-cell md:px-4">Concepto</th>
                <th className="px-3 py-3 font-black text-textPrimary md:px-4">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_COFFEECOIN_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="border-b border-border/60 last:border-0">
                  <td className="px-3 py-3 font-mono text-xs font-bold text-textSecondary md:px-4">{tx.id}</td>
                  <td className="max-w-[12rem] px-3 py-3 font-mono text-[0.7rem] font-bold text-textPrimary md:px-4">
                    <span title={tx.hash_transaccion}>{shortHash(tx.hash_transaccion)}</span>
                  </td>
                  <td
                    className={`px-3 py-3 font-black tabular-nums md:px-4 ${
                      tx.credit >= 0 ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {tx.credit >= 0 ? '+' : ''}
                    {tx.credit} CC
                  </td>
                  <td className="hidden px-3 py-3 text-textSecondary sm:table-cell md:px-4">{tx.concepto}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-textMuted md:px-4">{tx.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="!mt-0 font-nunito text-lg font-black text-textPrimary">Tienda (próximamente)</h3>
        <p className="mt-1 font-nunito text-sm font-[650] text-textSecondary">
          Podrás canjear CoffeeCoin por funciones extra. Los precios son orientativos.
        </p>
        <ul className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2">
          {COFFEECOIN_STORE_CATALOG.map((item) => (
            <li
              key={item.id}
              className="flex flex-col rounded-2xl border-[3px] border-border bg-white p-4 shadow-[3px_3px_0px_#1E1210]"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <h4 className="m-0 font-nunito text-base font-black text-textPrimary">{item.name}</h4>
                <span className="shrink-0 rounded-lg border-2 border-border bg-[#fef3c7] px-2 py-px font-nunito text-xs font-black text-textPrimary">
                  {item.priceCoffeecoin} CC
                </span>
              </div>
              <p className="m-0 flex-1 font-nunito text-sm font-[650] leading-relaxed text-textSecondary">
                {item.description}
              </p>
              <button
                type="button"
                disabled
                className="mt-4 w-full cursor-not-allowed rounded-xl border-[3px] border-border bg-white px-4 py-2.5 font-nunito text-sm font-black text-textMuted opacity-80"
              >
                No disponible aún
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
