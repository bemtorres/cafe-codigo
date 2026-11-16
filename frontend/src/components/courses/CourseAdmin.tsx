import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, Folder, Plus } from 'lucide-react';
import { getModuleContents } from '../../data/courses/courseDocument';
import { catalogCategory, courseCategoryLabels, courseCategoryName, courseCategoryOrder } from '../../data/courseCategories';
import type { CourseDocumentJSON, CourseModule } from '../../data/courses/courseJsonTypes';
import { courseSlug, readLocalCourse, saveLocalCourse } from '../../lib/localCourseClient';
import './course-creator.css';
import './course-admin.css';

type CourseRow = { courseId: string; title: string; category: string; modules: number };
const adminHref = '/app/contenidos/administrar/';
const courseHref = (id: string) => adminHref + '?curso=' + encodeURIComponent(id);
const moduleHref = (id: string, module: string) => '/app/contenidos/ver/?' +
  new URLSearchParams({ id, modulo: module, gestionar: '1', edit: 'true' });
const categoryOptions = courseCategoryOrder.map((id) => <option key={id} value={id}>{courseCategoryLabels[id]}</option>);

export default function CourseAdmin({ courses }: { courses: CourseRow[] }) {
  const [route, setRoute] = useState<string>();
  const [loaded, setLoaded] = useState<{ course: CourseDocumentJSON; revision: string }>();
  const [addingCourse, setAddingCourse] = useState(false);
  const [addingModule, setAddingModule] = useState(false);
  const [editingCategory, setEditingCategory] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [status, setStatus] = useState<{ text: string; error?: boolean }>();
  const [retry, setRetry] = useState(0);

  useEffect(() => setRoute(new URLSearchParams(window.location.search).get('curso') ?? ''), []);
  useEffect(() => {
    if (!route) return;
    const controller = new AbortController();
    setLoadError('');
    readLocalCourse(route, controller.signal).then((value) => {
      if (!controller.signal.aborted) setLoaded(value);
    }).catch((error) => {
      if (!controller.signal.aborted) setLoadError(error.message);
    });
    return () => controller.abort();
  }, [route, retry]);

  const categories = [...new Set([...courseCategoryOrder.map((id) => courseCategoryLabels[id]), ...courses.map((entry) => entry.category)])];
  const visibleCategories = categoryFilter ? [categoryFilter] :
    categories.filter((category) => courses.some((entry) => entry.category === category));

  async function createCourse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const title = String(fields.get('title')).trim();
    const category = catalogCategory(String(fields.get('category') ?? ''));
    const id = courseSlug(title);
    if (!id || !category) {
      setStatus({ text: 'Escribe un nombre para el curso y elige una categoría.', error: true });
      return;
    }
    setStatus(undefined);
    setBusy(true);
    try {
      await saveLocalCourse({
        courseId: id, title, category, version: '1.0.0', institution: 'Café y Código',
        defaultBrandId: 'cafeycodigo', showScoreInBanner: false, modulos: [],
      }, null);
      window.location.assign(courseHref(id));
    } catch (error) {
      setStatus({ text: (error as Error).message, error: true });
      setBusy(false);
    }
  }

  async function createModule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!loaded) return;
    const title = String(new FormData(event.currentTarget).get('title')).trim();
    if (!title) {
      setStatus({ text: 'Escribe un nombre para el módulo.', error: true });
      return;
    }
    const id = 'modulo-' + crypto.randomUUID();
    const module: CourseModule = {
      id, title,
      lessions: [{ id: id + '-leccion', title: 'Contenido del módulo',
        secciones: [{ id: id + '-inicio', title: 'Introducción', contenidos: [] }] }],
    };
    const next = { ...loaded.course, modulos: [...loaded.course.modulos, module] };
    setStatus(undefined);
    setBusy(true);
    try {
      const revision = await saveLocalCourse(next, loaded.revision);
      setLoaded({ course: next, revision });
      setAddingModule(false);
      setStatus({ text: 'Módulo creado. Abre «Editar contenido» para añadir recursos.' });
    } catch (error) {
      setStatus({ text: (error as Error).message, error: true });
    } finally {
      setBusy(false);
    }
  }

  async function changeCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!loaded) return;
    const category = catalogCategory(String(new FormData(event.currentTarget).get('category') ?? ''));
    if (!category) {
      setStatus({ text: 'Elige una categoría del catálogo.', error: true });
      return;
    }
    const course = { ...loaded.course, category };
    setBusy(true);
    setStatus(undefined);
    try {
      const revision = await saveLocalCourse(course, loaded.revision);
      setLoaded({ course, revision });
      setEditingCategory(false);
      setStatus({ text: 'Categoría actualizada.' });
    } catch (error) {
      setStatus({ text: (error as Error).message, error: true });
    } finally {
      setBusy(false);
    }
  }

  const course = loaded?.course;
  return <div className="creator course-admin academy-wrap">
    <header className="creator-header">
      <div>
        <a href={route ? adminHref : '/app/contenidos/'}>{route ? '← Administrador de cursos' : '← Aula interactiva'}</a>
        <h1>{route ? course?.title ?? 'Curso' : 'Administrador de cursos'}</h1>
        <p>{route ? (course ? courseCategoryName(course.category) : '') : 'Organiza tus cursos por categoría y crea el contenido de cada módulo.'}</p>
      </div>
      {route === '' && !addingCourse && <button className="creator-primary" type="button"
        onClick={() => { setAddingCourse(true); setStatus(undefined); }}><Plus size={17} aria-hidden="true" /> Añadir curso</button>}
      {course && <div className="creator-actions">
        <button type="button" disabled={busy || editingCategory}
          onClick={() => { setEditingCategory(true); setAddingModule(false); setStatus(undefined); }}>Cambiar categoría</button>
        <button className="creator-primary" type="button" disabled={busy || addingModule}
          onClick={() => { setAddingModule(true); setEditingCategory(false); setStatus(undefined); }}><Plus size={17} aria-hidden="true" /> Añadir módulo</button>
      </div>}
    </header>

    {status && <p className="admin-status" role={status.error ? 'alert' : 'status'}>{status.text}</p>}
    {(route === undefined || (route && !course && !loadError)) && <p role="status">Cargando…</p>}
    {loadError && <div className="creator-library"><p role="alert">{loadError}</p>
      <button type="button" onClick={() => setRetry((value) => value + 1)}>Reintentar</button></div>}

    {route === '' && <>
      {addingCourse && <form className="creator-library admin-form" onSubmit={createCourse}>
        <h2>Nuevo curso</h2>
        <fieldset disabled={busy}>
          <label className="creator-field">Nombre del curso<input name="title" maxLength={120} required autoFocus /></label>
          <label className="creator-field">Categoría<select name="category" required defaultValue={catalogCategory(categoryFilter) ?? ''}>
            <option value="" disabled>Selecciona una categoría</option>
            {categoryOptions}
          </select></label>
          <div className="creator-actions">
            <button type="submit" className="admin-primary">{busy ? 'Guardando…' : 'Crear curso'}</button>
            <button type="button" onClick={() => { setAddingCourse(false); setStatus(undefined); }}>Cancelar</button>
          </div>
        </fieldset>
      </form>}
      {categories.length > 0 && <label className="creator-field admin-filter">Filtrar por categoría
        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
          <option value="">Todas las categorías</option>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
      </label>}
      {visibleCategories.map((category) => <section className="admin-group" key={category}>
        <h2><Folder size={18} aria-hidden="true" /> {category}</h2>
        {!courses.some((entry) => entry.category === category) && <p>Todavía no hay cursos en esta categoría.</p>}
        <ul>{courses.filter((entry) => entry.category === category).map((entry) => <li key={entry.courseId}>
          <div><strong>{entry.title}</strong><small>{entry.modules} {entry.modules === 1 ? 'módulo' : 'módulos'}</small></div>
          <a href={courseHref(entry.courseId)} aria-label={'Abrir curso: ' + entry.title}>Abrir curso <ArrowRight size={16} aria-hidden="true" /></a>
        </li>)}</ul>
      </section>)}
      {!courses.length && !categoryFilter && <p>Todavía no hay cursos. Añade el primero para empezar.</p>}
    </>}

    {course && <>
      {editingCategory && <form className="creator-library admin-form" onSubmit={changeCategory}>
        <h2>Categoría del curso</h2>
        <fieldset disabled={busy}>
          <label className="creator-field">Categoría<select name="category" required autoFocus defaultValue={catalogCategory(course.category) ?? ''}>
            <option value="" disabled>Selecciona una categoría</option>
            {categoryOptions}
          </select></label>
          <div className="creator-actions">
            <button type="submit" className="admin-primary">{busy ? 'Guardando…' : 'Guardar categoría'}</button>
            <button type="button" onClick={() => { setEditingCategory(false); setStatus(undefined); }}>Cancelar</button>
          </div>
        </fieldset>
      </form>}
      {addingModule && <form className="creator-library admin-form" onSubmit={createModule}>
        <h2>Nuevo módulo</h2>
        <fieldset disabled={busy}>
          <label className="creator-field">Nombre del módulo<input name="title" maxLength={120} required autoFocus /></label>
          <div className="creator-actions">
            <button type="submit" className="admin-primary">{busy ? 'Guardando…' : 'Crear módulo'}</button>
            <button type="button" onClick={() => { setAddingModule(false); setStatus(undefined); }}>Cancelar</button>
          </div>
        </fieldset>
      </form>}
      <section className="admin-group">
        <h2>Módulos</h2>
        {!course.modulos.length && <p>Este curso aún no tiene módulos. Añade uno para empezar a montar el contenido.</p>}
        <ol>{course.modulos.map((module) => {
          const count = getModuleContents(module).length;
          return <li key={module.id}>
            <div><strong>{module.title}</strong><small>{count} {count === 1 ? 'recurso' : 'recursos'}</small></div>
            <a href={moduleHref(course.courseId, module.id)} aria-label={'Editar contenido: ' + module.title}>
              Editar contenido <ArrowRight size={16} aria-hidden="true" />
            </a>
          </li>;
        })}</ol>
      </section>
    </>}
  </div>;
}
