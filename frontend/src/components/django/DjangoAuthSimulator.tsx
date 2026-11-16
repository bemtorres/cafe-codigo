import React, { useState } from 'react';

type SimulatedUser = {
  id: number;
  username: string;
  email: string;
  nombreCompleto: string;
  rutDni: string;
  rol: 'LECTOR' | 'BIBLIOTECARIO' | 'ADMINISTRADOR' | 'CLIENTE' | 'CLIENTE_VIP';
  isStaff: boolean;
  isSuperuser: boolean;
  isActive: boolean;
  multasPendientes: number;
  estadoCuenta: 'ACTIVA' | 'SUSPENDIDA' | 'EN_MORA';
  creditoTienda?: number;
};

const INITIAL_USERS_BIBLIOTECA: SimulatedUser[] = [
  {
    id: 1,
    username: 'admin_central',
    email: 'admin@biblioteca.local',
    nombreCompleto: 'Beatriz González',
    rutDni: '15.420.912-3',
    rol: 'ADMINISTRADOR',
    isStaff: true,
    isSuperuser: true,
    isActive: true,
    multasPendientes: 0.00,
    estadoCuenta: 'ACTIVA'
  },
  {
    id: 2,
    username: 'carlos_bibliotecario',
    email: 'carlos@biblioteca.local',
    nombreCompleto: 'Carlos Mendoza',
    rutDni: '18.330.124-K',
    rol: 'BIBLIOTECARIO',
    isStaff: true,
    isSuperuser: false,
    isActive: true,
    multasPendientes: 0.00,
    estadoCuenta: 'ACTIVA'
  },
  {
    id: 3,
    username: 'laura_lectora',
    email: 'laura.dev@gmail.com',
    nombreCompleto: 'Laura Soto',
    rutDni: '20.105.882-1',
    rol: 'LECTOR',
    isStaff: false,
    isSuperuser: false,
    isActive: true,
    multasPendientes: 0.00,
    estadoCuenta: 'ACTIVA'
  },
  {
    id: 4,
    username: 'matias_moroso',
    email: 'matias.m@gmail.com',
    nombreCompleto: 'Matías Silva',
    rutDni: '19.890.312-7',
    rol: 'LECTOR',
    isStaff: false,
    isSuperuser: false,
    isActive: true,
    multasPendientes: 28.50,
    estadoCuenta: 'EN_MORA'
  },
  {
    id: 5,
    username: 'patricia_suspendida',
    email: 'patricia@gmail.com',
    nombreCompleto: 'Patricia Reyes',
    rutDni: '17.654.321-0',
    rol: 'LECTOR',
    isStaff: false,
    isSuperuser: false,
    isActive: false,
    multasPendientes: 45.00,
    estadoCuenta: 'SUSPENDIDA'
  }
];

const INITIAL_USERS_TIENDA: SimulatedUser[] = [
  {
    id: 101,
    username: 'admin_tienda',
    email: 'admin@tienda.com',
    nombreCompleto: 'Directora E-Commerce',
    rutDni: '14.990.111-2',
    rol: 'ADMINISTRADOR',
    isStaff: true,
    isSuperuser: true,
    isActive: true,
    multasPendientes: 0,
    estadoCuenta: 'ACTIVA',
    creditoTienda: 5000
  },
  {
    id: 102,
    username: 'ana_vip',
    email: 'ana@enterprise.io',
    nombreCompleto: 'Ana Martínez',
    rutDni: '16.789.012-4',
    rol: 'CLIENTE_VIP',
    isStaff: false,
    isSuperuser: false,
    isActive: true,
    multasPendientes: 0,
    estadoCuenta: 'ACTIVA',
    creditoTienda: 2500
  },
  {
    id: 103,
    username: 'diego_cliente',
    email: 'diego@gmail.com',
    nombreCompleto: 'Diego Alarcón',
    rutDni: '21.456.789-9',
    rol: 'CLIENTE',
    isStaff: false,
    isSuperuser: false,
    isActive: true,
    multasPendientes: 0,
    estadoCuenta: 'ACTIVA',
    creditoTienda: 300
  },
];

export default function DjangoAuthSimulator() {
  const [activeProject, setActiveProject] = useState<'biblioteca' | 'tienda'>('biblioteca');
  const [activeTab, setActiveTab] = useState<'session' | 'user-admin' | 'bulk-actions'>('session');

  const [usersBib, setUsersBib] = useState<SimulatedUser[]>(INITIAL_USERS_BIBLIOTECA);
  const [usersTienda, setUsersTienda] = useState<SimulatedUser[]>(INITIAL_USERS_TIENDA);

  const users = activeProject === 'biblioteca' ? usersBib : usersTienda;
  const setUsers = activeProject === 'biblioteca' ? setUsersBib : setUsersTienda;

  // Active Logged In User
  const [loggedUserId, setLoggedUserId] = useState<number>(1);
  const currentUser = users.find(u => u.id === loggedUserId) || users[0];

  // Protected Views Test
  const [testResult, setTestResult] = useState<{ status: 'ALLOW' | 'DENY'; message: string; code: string } | null>(null);

  // UserAdmin Edit Form Modal
  const [editingUser, setEditingUser] = useState<SimulatedUser | null>(null);
  const [formIsActive, setFormIsActive] = useState<boolean>(true);
  const [formIsStaff, setFormIsStaff] = useState<boolean>(false);
  const [formIsSuperuser, setFormIsSuperuser] = useState<boolean>(false);
  const [formRol, setFormRol] = useState<SimulatedUser['rol']>('LECTOR');
  const [formError, setFormError] = useState<string | null>(null);

  // Bulk Actions
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Test access to view
  const handleTestView = (viewType: 'catalogo' | 'prestar' | 'admin_panel' | 'reporte_gerencial') => {
    if (viewType === 'catalogo') {
      setTestResult({
        status: 'ALLOW',
        message: 'Acceso Permitido: Vista pública abierta a todos los visitantes.',
        code: 'def catalogo(request): # Vista pública sin decorador'
      });
      return;
    }

    if (!currentUser.isActive) {
      setTestResult({
        status: 'DENY',
        message: 'Acceso Denegado (403 Forbidden): La cuenta del usuario está inactiva o suspendida.',
        code: 'if not request.user.is_active: raise PermissionDenied()'
      });
      return;
    }

    if (viewType === 'prestar') {
      if (currentUser.multasPendientes > 0 || currentUser.estadoCuenta === 'EN_MORA') {
        setTestResult({
          status: 'DENY',
          message: `Acceso Denegado: Usuario bloqueado para nuevos préstamos por mora pendiente ($${currentUser.multasPendientes.toFixed(2)}).`,
          code: '@user_passes_test(lambda u: u.estado_cuenta == "ACTIVA" and u.multas_pendientes == 0)'
        });
      } else {
        setTestResult({
          status: 'ALLOW',
          message: 'Acceso Permitido (@login_required): El usuario está autenticado y al día con sus préstamos.',
          code: '@login_required\ndef solicitar_prestamo(request): ...'
        });
      }
      return;
    }

    if (viewType === 'admin_panel') {
      if (currentUser.isStaff) {
        setTestResult({
          status: 'ALLOW',
          message: 'Acceso Permitido a Django Admin: El usuario cuenta con is_staff = True.',
          code: 'admin.site.has_permission(request) -> True'
        });
      } else {
        setTestResult({
          status: 'DENY',
          message: 'Acceso Denegado: Requiere is_staff = True. Redirigiendo a /admin/login/?next=/admin/',
          code: 'if not request.user.is_staff: return redirect("admin:login")'
        });
      }
      return;
    }

    if (viewType === 'reporte_gerencial') {
      if (currentUser.isSuperuser || currentUser.rol === 'ADMINISTRADOR') {
        setTestResult({
          status: 'ALLOW',
          message: 'Acceso Permitido: Requiere rol ADMINISTRADOR o is_superuser = True.',
          code: '@permission_required("usuarios.view_reporte_gerencial")'
        });
      } else {
        setTestResult({
          status: 'DENY',
          message: 'Acceso Denegado (403): Solo administradores generales pueden auditar reportes financieros.',
          code: 'raise PermissionDenied("Permisos insuficientes")'
        });
      }
    }
  };

  // Open Edit UserAdmin
  const handleOpenEdit = (user: SimulatedUser) => {
    setEditingUser(user);
    setFormIsActive(user.isActive);
    setFormIsStaff(user.isStaff);
    setFormIsSuperuser(user.isSuperuser);
    setFormRol(user.rol);
    setFormError(null);
  };

  // Save Edit UserAdmin with Validations
  const handleSaveUserAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    // Critical Security Validation: Prevent superadmin self-deactivation
    if (editingUser.id === loggedUserId && (!formIsActive || !formIsSuperuser)) {
      setFormError(
        '⚠️ ValidationError en UserAdmin.clean(): No puedes desactivar tu propia cuenta de superusuario ni revocar tus privilegios mientras estás autenticado en esta sesión administrativa.'
      );
      return;
    }

    setUsers(users.map(u => {
      if (u.id === editingUser.id) {
        return {
          ...u,
          isActive: formIsActive,
          isStaff: formIsStaff || formIsSuperuser, // Superuser implies isStaff
          isSuperuser: formIsSuperuser,
          rol: formRol,
          estadoCuenta: formIsActive ? (u.multasPendientes > 0 ? 'EN_MORA' : 'ACTIVA') : 'SUSPENDIDA'
        };
      }
      return u;
    }));

    setActionMessage(`✔ Usuario "${editingUser.username}" actualizado en UserAdmin con éxito.`);
    setEditingUser(null);
  };

  // Bulk Actions
  const handleBulkAction = (action: 'suspender_mora' | 'promover_bibliotecario' | 'reactivar') => {
    if (selectedIds.length === 0) return;

    if (action === 'suspender_mora') {
      let count = 0;
      setUsers(users.map(u => {
        if (selectedIds.includes(u.id) && u.multasPendientes > 0) {
          count++;
          return { ...u, estadoCuenta: 'SUSPENDIDA', isActive: false };
        }
        return u;
      }));
      setActionMessage(
        count > 0
          ? `Acción Masiva: Se han suspendido ${count} usuario(s) por registrar multas pendientes de pago.`
          : 'Aviso: Ninguno de los usuarios seleccionados tenía multas pendientes para suspender.'
      );
    } else if (action === 'promover_bibliotecario') {
      setUsers(users.map(u => {
        if (selectedIds.includes(u.id)) {
          return { ...u, rol: 'BIBLIOTECARIO', isStaff: true };
        }
        return u;
      }));
      setActionMessage(`Acción Masiva: ${selectedIds.length} usuario(s) promovidos a Bibliotecario con permisos de Staff.`);
    } else if (action === 'reactivar') {
      setUsers(users.map(u => {
        if (selectedIds.includes(u.id)) {
          return { ...u, isActive: true, estadoCuenta: u.multasPendientes > 0 ? 'EN_MORA' : 'ACTIVA' };
        }
        return u;
      }));
      setActionMessage(`Acción Masiva: ${selectedIds.length} cuenta(s) reactivadas exitosamente.`);
    }
    setSelectedIds([]);
  };

  return (
    <div className="my-8 rounded-2xl border-[3px] border-slate-900 bg-slate-900 text-slate-100 shadow-[8px_8px_0px_#0f172a] overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="bg-slate-950 px-5 py-4 border-b-2 border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛡️</span>
          <div>
            <h3 className="text-lg font-black text-white m-0 tracking-wide font-mono">
              Django Auth & UserAdmin Simulator
            </h3>
            <p className="text-xs text-slate-400 m-0">
              Prueba usuarios extendidos (AbstractUser), roles, permisos y acciones del UserAdmin
            </p>
          </div>
        </div>

        {/* Project Switch */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => {
              setActiveProject('biblioteca');
              setLoggedUserId(1);
              setSelectedIds([]);
              setActionMessage(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
              activeProject === 'biblioteca'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            📚 Biblioteca Central
          </button>
          <button
            onClick={() => {
              setActiveProject('tienda');
              setLoggedUserId(101);
              setSelectedIds([]);
              setActionMessage(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors ${
              activeProject === 'tienda'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            🛒 Tienda E-Commerce
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-950/70 px-5 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('session')}
            className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-colors ${
              activeTab === 'session'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🔑 1. Sesión & request.user
          </button>
          <button
            onClick={() => setActiveTab('user-admin')}
            className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-colors ${
              activeTab === 'user-admin'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚙️ 2. Panel UserAdmin
          </button>
          <button
            onClick={() => setActiveTab('bulk-actions')}
            className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-colors ${
              activeTab === 'bulk-actions'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ 3. Acciones Masivas (@admin.action)
          </button>
        </div>

        {/* Current Active User Indicator */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg text-xs font-mono">
          <span className="text-slate-400">Usuario Activo:</span>
          <strong className="text-emerald-300">{currentUser.username}</strong>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 font-bold border border-slate-700">
            {currentUser.rol}
          </span>
        </div>
      </div>

      {/* Action Notification */}
      {actionMessage && (
        <div className="bg-emerald-950/70 border-b border-emerald-800 text-emerald-300 text-xs px-5 py-2 font-mono flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {/* TAB 1: SESSION AND REQUEST.USER INSPECTOR */}
        {activeTab === 'session' && (
          <div>
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-300 mb-1.5 font-mono">
                Simula iniciar sesión como otro usuario:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {users.map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setLoggedUserId(u.id);
                      setTestResult(null);
                    }}
                    className={`p-2 rounded-xl text-left border text-xs font-mono transition-all ${
                      loggedUserId === u.id
                        ? 'border-emerald-400 bg-slate-800 text-white ring-1 ring-emerald-400'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold truncate text-slate-200">{u.username}</div>
                    <div className="text-[10px] text-slate-500">{u.rol}</div>
                    <div className="mt-1">
                      <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                        u.isActive ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {u.isActive ? '● Activo' : '○ Inactivo'}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* User Object Inspector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                <div className="text-slate-400 font-bold mb-2 pb-1 border-b border-slate-800 flex items-center justify-between">
                  <span>Objeto `request.user` (AbstractUser)</span>
                  <span className="text-[10px] text-emerald-400">auth_user</span>
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div><span className="text-slate-500">username:</span> <span className="text-cyan-300 font-bold">"{currentUser.username}"</span></div>
                  <div><span className="text-slate-500">email:</span> <span className="text-slate-300">"{currentUser.email}"</span></div>
                  <div><span className="text-slate-500">nombre_completo:</span> <span className="text-slate-300">"{currentUser.nombreCompleto}"</span></div>
                  <div><span className="text-slate-500">rut_dni:</span> <span className="text-amber-300">"{currentUser.rutDni}"</span></div>
                  <div><span className="text-slate-500">rol:</span> <span className="text-emerald-400 font-bold">"{currentUser.rol}"</span></div>
                  <div><span className="text-slate-500">is_authenticated:</span> <span className="text-emerald-400 font-bold">True</span></div>
                  <div><span className="text-slate-500">is_staff:</span> <span className={currentUser.isStaff ? 'text-emerald-400 font-bold' : 'text-slate-500'}>{String(currentUser.isStaff)}</span></div>
                  <div><span className="text-slate-500">is_superuser:</span> <span className={currentUser.isSuperuser ? 'text-emerald-400 font-bold' : 'text-slate-500'}>{String(currentUser.isSuperuser)}</span></div>
                  <div><span className="text-slate-500">is_active:</span> <span className={currentUser.isActive ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{String(currentUser.isActive)}</span></div>
                  <div><span className="text-slate-500">multas_pendientes:</span> <span className="text-rose-300 font-bold">${currentUser.multasPendientes.toFixed(2)} USD</span></div>
                </div>
              </div>

              {/* Protected Views Test Runner */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                <div className="text-slate-400 font-bold mb-2 pb-1 border-b border-slate-800 flex items-center justify-between">
                  <span>Probar Vistas Protegidas con este Usuario</span>
                  <span className="text-[10px] text-cyan-400">Decoradores</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Haz clic para simular que <strong>{currentUser.username}</strong> intenta ingresar a diferentes endpoints:
                </p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    onClick={() => handleTestView('catalogo')}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left text-[11px] text-slate-200"
                  >
                    1. Catálogo Público
                  </button>
                  <button
                    onClick={() => handleTestView('prestar')}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left text-[11px] text-slate-200"
                  >
                    2. Solicitar Préstamo
                  </button>
                  <button
                    onClick={() => handleTestView('admin_panel')}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left text-[11px] text-slate-200"
                  >
                    3. Django Admin (/admin/)
                  </button>
                  <button
                    onClick={() => handleTestView('reporte_gerencial')}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left text-[11px] text-slate-200"
                  >
                    4. Auditoría / Reporte Fin.
                  </button>
                </div>

                {testResult && (
                  <div
                    className={`p-3 rounded-xl border text-[11px] ${
                      testResult.status === 'ALLOW'
                        ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-800 text-rose-200'
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center gap-1">
                      <span>{testResult.status === 'ALLOW' ? '✔' : '⛔'}</span>
                      <span>{testResult.message}</span>
                    </div>
                    <pre className="text-slate-400 bg-slate-900/80 p-1.5 rounded m-0 mt-1 text-[10px] overflow-x-auto">
                      {testResult.code}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USER ADMIN PANEL AND SECURITY VALIDATION */}
        {activeTab === 'user-admin' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wide">
                Listado de Usuarios Registrados en CustomUserAdmin
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">
                Total: {users.length} usuarios
              </span>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800 mb-4">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 text-[11px]">
                    <th className="p-2.5">ID</th>
                    <th className="p-2.5">Usuario (Username)</th>
                    <th className="p-2.5">RUT / DNI</th>
                    <th className="p-2.5">Rol</th>
                    <th className="p-2.5">Staff</th>
                    <th className="p-2.5">Superuser</th>
                    <th className="p-2.5">Estado</th>
                    <th className="p-2.5 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-slate-900/60 hover:bg-slate-900/40">
                      <td className="p-2.5 text-slate-500">#{u.id}</td>
                      <td className="p-2.5 font-bold text-slate-200">
                        {u.username}
                        {u.id === loggedUserId && (
                          <span className="ml-1.5 text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1 rounded">
                            TÚ
                          </span>
                        )}
                      </td>
                      <td className="p-2.5 text-amber-300">{u.rutDni}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px] font-bold">
                          {u.rol}
                        </span>
                      </td>
                      <td className="p-2.5">{u.isStaff ? '🟢 Sí' : '⚪ No'}</td>
                      <td className="p-2.5">{u.isSuperuser ? '👑 Sí' : '⚪ No'}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.isActive
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {u.estadoCuenta}
                        </span>
                      </td>
                      <td className="p-2.5 text-right">
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold transition-colors"
                        >
                          ✏️ Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Edit User Modal / Drawer */}
            {editingUser && (
              <div className="bg-slate-950 p-4 rounded-2xl border-2 border-emerald-500/60 font-mono text-xs max-w-xl mx-auto mb-4 animate-fade-in">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                  <h4 className="text-sm font-black text-emerald-400 m-0">
                    Formulario UserAdmin: {editingUser.username}
                  </h4>
                  <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-white">
                    ✕
                  </button>
                </div>

                {formError && (
                  <div className="bg-rose-950 border border-rose-800 text-rose-300 p-3 rounded-lg text-xs mb-3 leading-relaxed">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSaveUserAdmin} className="space-y-3">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Fieldset 1: Información Personal (Solo Lectura aquí)
                    </span>
                    <p className="text-slate-300 m-0">Nombre: <strong>{editingUser.nombreCompleto}</strong> | RUT/DNI: <strong>{editingUser.rutDni}</strong></p>
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                      Fieldset 2: Roles y Permisos de Django
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formIsActive}
                          onChange={(e) => setFormIsActive(e.target.checked)}
                        />
                        <span>is_active (Activo)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formIsStaff}
                          onChange={(e) => setFormIsStaff(e.target.checked)}
                        />
                        <span>is_staff (Panel)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formIsSuperuser}
                          onChange={(e) => setFormIsSuperuser(e.target.checked)}
                        />
                        <span>is_superuser</span>
                      </label>
                    </div>

                    <div className="mt-3">
                      <label className="block text-slate-400 mb-1 text-[11px]">Rol de Negocio:</label>
                      <select
                        value={formRol}
                        onChange={(e) => setFormRol(e.target.value as any)}
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs w-full"
                      >
                        <option value="LECTOR">LECTOR</option>
                        <option value="BIBLIOTECARIO">BIBLIOTECARIO</option>
                        <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                        <option value="CLIENTE">CLIENTE (Tienda)</option>
                        <option value="CLIENTE_VIP">CLIENTE_VIP (Tienda)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setEditingUser(null)}
                      className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black"
                    >
                      Guardar en UserAdmin
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BULK ADMIN ACTIONS */}
        {activeTab === 'bulk-actions' && (
          <div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4 font-mono text-xs">
              <div className="text-amber-400 font-bold mb-1.5 text-sm">
                ⚡ Acciones Masivas Personalizadas (@admin.action)
              </div>
              <p className="text-slate-300 text-[11px] mb-3 leading-relaxed">
                Selecciona uno o más usuarios de la tabla y ejecuta una acción masiva para ver cómo Django actualiza el QuerySet con <code>queryset.update()</code> y emite mensajes de estado con <code>modeladmin.message_user()</code>.
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleBulkAction('suspender_mora')}
                  disabled={selectedIds.length === 0}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold rounded-lg text-xs"
                >
                  🚫 Suspender Morosos ({selectedIds.length})
                </button>
                <button
                  onClick={() => handleBulkAction('promover_bibliotecario')}
                  disabled={selectedIds.length === 0}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold rounded-lg text-xs"
                >
                  🎖️ Promover a Staff ({selectedIds.length})
                </button>
                <button
                  onClick={() => handleBulkAction('reactivar')}
                  disabled={selectedIds.length === 0}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-lg text-xs"
                >
                  ✔ Reactivar Cuentas ({selectedIds.length})
                </button>
              </div>
            </div>

            {/* Selection Table */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 text-[11px]">
                    <th className="p-2.5 w-8">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === users.length && users.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedIds(users.map(u => u.id));
                          else setSelectedIds([]);
                        }}
                      />
                    </th>
                    <th className="p-2.5">Usuario</th>
                    <th className="p-2.5">RUT / DNI</th>
                    <th className="p-2.5">Rol</th>
                    <th className="p-2.5">Multas Pendientes</th>
                    <th className="p-2.5">Estado Cuenta</th>
                    <th className="p-2.5">Activo</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} className="border-b border-slate-900/60 hover:bg-slate-900/40">
                      <td className="p-2.5">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(u.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedIds([...selectedIds, u.id]);
                            else setSelectedIds(selectedIds.filter(id => id !== u.id));
                          }}
                        />
                      </td>
                      <td className="p-2.5 font-bold text-slate-200">{u.username}</td>
                      <td className="p-2.5 text-amber-300">{u.rutDni}</td>
                      <td className="p-2.5 text-cyan-300">{u.rol}</td>
                      <td className="p-2.5">
                        <span className={u.multasPendientes > 0 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                          ${u.multasPendientes.toFixed(2)}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          u.estadoCuenta === 'ACTIVA'
                            ? 'bg-emerald-950 text-emerald-300'
                            : u.estadoCuenta === 'EN_MORA'
                            ? 'bg-amber-950 text-amber-300'
                            : 'bg-rose-950 text-rose-300'
                        }`}>
                          {u.estadoCuenta}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className={u.isActive ? 'text-emerald-400' : 'text-rose-400'}>
                          {u.isActive ? '✔ Activo' : '✖ Suspendido'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
