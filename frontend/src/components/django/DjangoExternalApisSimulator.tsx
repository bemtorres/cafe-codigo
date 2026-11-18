import { useState } from 'react';

type ApiTab = 'weather' | 'rick' | 'pokemon';

interface WeatherCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  temp: number;
  wind: number;
  code: number;
  condition: string;
  icon: string;
}

const CITIES: WeatherCity[] = [
  { id: 'santiago', name: 'Santiago', country: 'Chile', lat: -33.45, lon: -70.66, temp: 24.5, wind: 14.2, code: 0, condition: 'Despejado', icon: '☀️' },
  { id: 'valdivia', name: 'Valdivia', country: 'Chile', lat: -39.81, lon: -73.24, temp: 13.8, wind: 19.6, code: 61, condition: 'Lluvia ligera', icon: '🌧️' },
  { id: 'cdmx', name: 'Ciudad de México', country: 'México', lat: 19.43, lon: -99.13, temp: 22.1, wind: 11.0, code: 2, condition: 'Parcialmente nublado', icon: '⛅' },
  { id: 'madrid', name: 'Madrid', country: 'España', lat: 40.41, lon: -3.70, temp: 18.4, wind: 9.5, code: 1, condition: 'Mayormente despejado', icon: '🌤️' },
];

interface RickChar {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  origin: string;
  image: string;
}

const RICK_CHARS: RickChar[] = [
  { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human', origin: 'Earth (C-137)', image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg' },
  { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human', origin: 'unknown', image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg' },
  { id: 3, name: 'Summer Smith', status: 'Alive', species: 'Human', origin: 'Earth (Replacement Dimension)', image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg' },
  { id: 4, name: 'Beth Smith', status: 'Alive', species: 'Human', origin: 'Earth (Replacement Dimension)', image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg' },
];

interface PokemonItem {
  slug: string;
  id: number;
  name: string;
  types: string[];
  weightKg: number;
  heightM: number;
  abilities: string[];
  sprite: string;
}

const POKEMONS: PokemonItem[] = [
  { slug: 'pikachu', id: 25, name: 'Pikachu', types: ['electric'], weightKg: 6.0, heightM: 0.4, abilities: ['static', 'lightning-rod'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
  { slug: 'charizard', id: 6, name: 'Charizard', types: ['fire', 'flying'], weightKg: 90.5, heightM: 1.7, abilities: ['blaze', 'solar-power'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png' },
  { slug: 'lucario', id: 448, name: 'Lucario', types: ['fighting', 'steel'], weightKg: 54.0, heightM: 1.2, abilities: ['steadfast', 'inner-focus', 'justified'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png' },
  { slug: 'gengar', id: 94, name: 'Gengar', types: ['ghost', 'poison'], weightKg: 40.5, heightM: 1.5, abilities: ['cursed-body'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png' },
];

export default function DjangoExternalApisSimulator() {
  const [activeTab, setActiveTab] = useState<ApiTab>('weather');
  const [cityId, setCityId] = useState<string>('santiago');
  const [rickId, setRickId] = useState<number>(1);
  const [pokeSlug, setPokeSlug] = useState<string>('pikachu');
  const [simulateTimeout, setSimulateTimeout] = useState<boolean>(false);

  const selectedCity = CITIES.find((c) => c.id === cityId) ?? CITIES[0];
  const selectedRick = RICK_CHARS.find((c) => c.id === rickId) ?? RICK_CHARS[0];
  const selectedPoke = POKEMONS.find((p) => p.slug === pokeSlug) ?? POKEMONS[0];

  let externalUrl = '';
  let externalJson: Record<string, unknown> = {};
  let djangoResponseJson: Record<string, unknown> = {};

  if (simulateTimeout) {
    djangoResponseJson = {
      ok: false,
      error: 'Error de conexión con la API externa (Timeout / RequestException)',
    };
  } else if (activeTab === 'weather') {
    externalUrl = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&current_weather=true`;
    externalJson = {
      latitude: selectedCity.lat,
      longitude: selectedCity.lon,
      current_weather: {
        temperature: selectedCity.temp,
        windspeed: selectedCity.wind,
        weathercode: selectedCity.code,
        time: '2026-11-18T15:00',
      },
    };
    djangoResponseJson = {
      ciudad: selectedCity.name,
      pais: selectedCity.country,
      temperatura_c: selectedCity.temp,
      viento_kmh: selectedCity.wind,
      condicion: selectedCity.condition,
      fuente: 'Open-Meteo API',
    };
  } else if (activeTab === 'rick') {
    externalUrl = `https://rickandmortyapi.com/api/character/${selectedRick.id}`;
    externalJson = {
      id: selectedRick.id,
      name: selectedRick.name,
      status: selectedRick.status,
      species: selectedRick.species,
      origin: { name: selectedRick.origin },
      image: selectedRick.image,
    };
    djangoResponseJson = {
      id: selectedRick.id,
      nombre: selectedRick.name,
      estado: selectedRick.status,
      especie: selectedRick.species,
      origen: selectedRick.origin,
      imagen: selectedRick.image,
    };
  } else {
    externalUrl = `https://pokeapi.co/api/v2/pokemon/${selectedPoke.slug}`;
    externalJson = {
      id: selectedPoke.id,
      name: selectedPoke.slug,
      height: Math.round(selectedPoke.heightM * 10),
      weight: Math.round(selectedPoke.weightKg * 10),
      types: selectedPoke.types.map((t) => ({ type: { name: t } })),
      abilities: selectedPoke.abilities.map((a) => ({ ability: { name: a } })),
    };
    djangoResponseJson = {
      numero_pokedex: selectedPoke.id,
      nombre: selectedPoke.name,
      tipos: selectedPoke.types,
      peso_kg: selectedPoke.weightKg,
      altura_m: selectedPoke.heightM,
      habilidades: selectedPoke.abilities,
      sprite: selectedPoke.sprite,
    };
  }

  return (
    <div className="my-6 rounded-3xl border-2 border-slate-900 bg-white shadow-[6px_6px_0px_#0f172a] overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 py-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>
          <span className="font-mono text-xs sm:text-sm font-black tracking-wide text-emerald-400">
            SIMULADOR DE CONSUMO DE APIs CON REQUESTS EN DJANGO
          </span>
        </div>
        <label className="inline-flex items-center gap-2 text-xs font-mono bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 cursor-pointer text-amber-300">
          <input
            type="checkbox"
            checked={simulateTimeout}
            onChange={(e) => setSimulateTimeout(e.target.checked)}
            className="rounded border-slate-600 text-rose-500"
          />
          Simular caída / Timeout (503)
        </label>
      </div>

      {/* Tabs */}
      <div className="p-3 bg-slate-100 border-b-2 border-slate-200 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('weather')}
          className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer border-2 transition-all flex items-center gap-2 ${
            activeTab === 'weather'
              ? 'bg-sky-600 text-white border-slate-900 shadow-[2px_2px_0px_#0f172a]'
              : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900'
          }`}
        >
          <span>🌦️ 1. API del Tiempo (Open-Meteo)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rick')}
          className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer border-2 transition-all flex items-center gap-2 ${
            activeTab === 'rick'
              ? 'bg-emerald-600 text-white border-slate-900 shadow-[2px_2px_0px_#0f172a]'
              : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900'
          }`}
        >
          <span>👽 2. API de Rick and Morty</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('pokemon')}
          className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer border-2 transition-all flex items-center gap-2 ${
            activeTab === 'pokemon'
              ? 'bg-amber-500 text-slate-950 border-slate-900 shadow-[2px_2px_0px_#0f172a]'
              : 'bg-white text-slate-800 border-slate-300 hover:border-slate-900'
          }`}
        >
          <span>⚡ 3. API de Pokémon (PokéAPI)</span>
        </button>
      </div>

      {/* Parameter Selector */}
      <div className="p-5 bg-slate-50 border-b-2 border-slate-200">
        {activeTab === 'weather' && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase text-sky-900 block mb-1">
                Selecciona una ciudad para consultar con <code>requests.get(url, params=...)</code>:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {CITIES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCityId(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer border ${
                      cityId === c.id
                        ? 'bg-sky-600 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {c.icon} {c.name} ({c.country})
                  </button>
                ))}
              </div>
            </div>
            <div className="text-right font-mono text-xs bg-white px-3.5 py-2 rounded-xl border border-slate-300">
              <div className="text-slate-500">Tu ruta en Django:</div>
              <div className="font-black text-slate-900">/api/clima/?ciudad={selectedCity.id}</div>
            </div>
          </div>
        )}

        {activeTab === 'rick' && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase text-emerald-900 block mb-1">
                Selecciona el ID del personaje de Rick &amp; Morty:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {RICK_CHARS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setRickId(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer border ${
                      rickId === c.id
                        ? 'bg-emerald-600 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    #{c.id} · {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-right font-mono text-xs bg-white px-3.5 py-2 rounded-xl border border-slate-300">
              <div className="text-slate-500">Tu ruta en Django:</div>
              <div className="font-black text-slate-900">/api/personaje/?id={selectedRick.id}</div>
            </div>
          </div>
        )}

        {activeTab === 'pokemon' && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black uppercase text-amber-900 block mb-1">
                Selecciona el nombre del Pokémon a buscar en PokéAPI:
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {POKEMONS.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => setPokeSlug(p.slug)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer border ${
                      pokeSlug === p.slug
                        ? 'bg-amber-500 text-slate-950 border-slate-900'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    #{p.id} · {p.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-right font-mono text-xs bg-white px-3.5 py-2 rounded-xl border border-slate-300">
              <div className="text-slate-500">Tu ruta en Django:</div>
              <div className="font-black text-slate-900">/api/pokemon/?nombre={selectedPoke.slug}</div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Visual Card + External API URL */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl border-2 border-slate-900 bg-slate-50">
            <div className="text-[11px] font-mono font-black uppercase text-slate-500 mb-1">
              1. Petición saliente de Django con requests.get():
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs break-all">
              GET {externalUrl || 'https://...'}
            </div>

            {/* Visual Preview Card */}
            <div className="mt-4 p-4 rounded-2xl bg-white border-2 border-slate-200">
              {simulateTimeout ? (
                <div className="text-center py-4 text-rose-700">
                  <div className="text-3xl mb-1">⚠️</div>
                  <div className="font-black text-sm">Excepción Capturada: RequestException</div>
                  <p className="!text-xs !text-slate-600 !mt-1 !mb-0">
                    Gracias al bloque <code>try / except requests.RequestException</code>, tu servidor Django no cae con Error 500 y devuelve un JSON controlado con estado <code>503</code>.
                  </p>
                </div>
              ) : activeTab === 'weather' ? (
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-sky-700 uppercase">{selectedCity.country}</span>
                    <h4 className="text-xl font-black text-slate-900 !m-0">{selectedCity.name}</h4>
                    <p className="!text-xs !text-slate-600 !mt-1 !mb-0">
                      {selectedCity.condition} · Viento: <strong>{selectedCity.wind} km/h</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl">{selectedCity.icon}</div>
                    <div className="text-2xl font-black text-slate-900">{selectedCity.temp}°C</div>
                  </div>
                </div>
              ) : activeTab === 'rick' ? (
                <div className="flex items-center gap-3.5">
                  <img
                    src={selectedRick.image}
                    alt={selectedRick.name}
                    className="w-16 h-16 rounded-xl border-2 border-slate-900 object-cover shrink-0"
                  />
                  <div>
                    <span className="inline-block text-[11px] font-mono font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 mb-1">
                      {selectedRick.status} · {selectedRick.species}
                    </span>
                    <h4 className="text-lg font-black text-slate-900 !m-0">{selectedRick.name}</h4>
                    <p className="!text-xs !text-slate-600 !mt-0.5 !mb-0">
                      Origen: {selectedRick.origin}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3.5">
                  <img
                    src={selectedPoke.sprite}
                    alt={selectedPoke.name}
                    className="w-16 h-16 rounded-xl bg-amber-50 p-1 border-2 border-slate-900 object-contain shrink-0"
                  />
                  <div>
                    <div className="flex gap-1 mb-1">
                      {selectedPoke.types.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-950"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-lg font-black text-slate-900 !m-0">
                      #{selectedPoke.id} {selectedPoke.name}
                    </h4>
                    <p className="!text-xs !text-slate-600 !mt-0.5 !mb-0">
                      Peso: <strong>{selectedPoke.weightKg} kg</strong> · Altura: <strong>{selectedPoke.heightM} m</strong>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: JSON Transformation (External Raw -> Django Clean Response) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-black uppercase text-slate-600 mb-1.5 flex items-center justify-between">
              <span>2. JSON Crudo de la API Externa</span>
              <span className="font-mono text-[11px] text-slate-500">respuesta.json()</span>
            </div>
            <pre className="p-3.5 rounded-2xl bg-slate-900 text-slate-300 font-mono text-xs overflow-x-auto border-2 border-slate-900 m-0 max-h-64">
              {simulateTimeout
                ? '// Sin respuesta del servidor externo\n// Timeout después de 5 segundos'
                : JSON.stringify(externalJson, null, 2)}
            </pre>
          </div>

          <div>
            <div className="text-xs font-black uppercase text-emerald-800 mb-1.5 flex items-center justify-between">
              <span>3. JSON Limpio que devuelve tu Django</span>
              <span
                className={`font-mono text-[11px] px-2 py-0.5 rounded font-bold ${
                  simulateTimeout ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-900'
                }`}
              >
                {simulateTimeout ? 'HTTP 503' : 'HTTP 200 OK'}
              </span>
            </div>
            <pre className="p-3.5 rounded-2xl bg-slate-950 text-emerald-300 font-mono text-xs overflow-x-auto border-2 border-slate-900 m-0 max-h-64">
              {JSON.stringify(djangoResponseJson, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
