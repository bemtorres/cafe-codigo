import type { Slide } from '../../../types/slides';

export const modeloBdLibrarySlides: Slide[] = [
  {
    id: 1,
    type: 'cover',
    title: '5.2 Caso Práctico: Biblioteca, Relaciones y Consultas ORM 📚',
    subtitle: 'ForeignKey, ManyToMany, optimización con select_related y consultas avanzadas',
    badge: 'Django · Lección 5.2',
    content: 'Aprende a modelar un dominio relacional completo de Biblioteca (Libros, Autores, Categorías, Préstamos) y a exprimir el ORM de Django con consultas de alto rendimiento.',
    bulletPoints: [
      '🔗 Relaciones relacionales: 1:N (ForeignKey), N:M (ManyToManyField) y on_delete',
      '🔍 Consultas ORM: filter(), exclude(), order_by() y lookups relacionales',
      '⚡ El problema de las N+1 consultas y cómo resolverlo con select_related()',
      '📊 Agregaciones y anotaciones: Count, Sum y Avg sin escribir SQL crudo'
    ],
    keyTakeaway: 'Un buen esquema de modelos ahorra miles de líneas de código y previene la inconsistencia de datos en producción.'
  },
  {
    id: 2,
    type: 'concept',
    title: 'El Dominio de la Biblioteca: Modelos y Cardinalidad',
    badge: 'Diseño Relacional',
    content: 'En este caso práctico modelamos las relaciones del mundo real entre los actores de una biblioteca:',
    visualChart: {
      headers: ['Relación', 'Tipo en Django', 'Entidades Involucradas', 'Regla de Integridad'],
      rows: [
        ['Autor → Libros', '`ForeignKey (1 a N)`', 'Un Autor escribe muchos Libros; cada Libro tiene un Autor principal', '`on_delete=models.CASCADE` o `PROTECT`'],
        ['Categoría → Libros', '`ForeignKey (1 a N)`', 'Una Categoría agrupa muchos Libros', '`on_delete=models.SET_NULL, null=True`'],
        ['Libro ↔ Tags', '`ManyToManyField (N a M)`', 'Un Libro tiene varios Tags (ej: #ciencia, #ia); un Tag pertenece a varios Libros', 'Crea tabla intermedia automática'],
        ['Libro ↔ Préstamos', '`ForeignKey (1 a N)`', 'Un Libro puede tener un histórico de muchas solicitudes de préstamo', '`related_name="prestamos"`']
      ]
    },
    keyTakeaway: 'El parámetro related_name permite navegar la relación en sentido inverso (ej: autor.libros.all()).'
  },
  {
    id: 3,
    type: 'code',
    title: 'Definición de Modelos con Buenas Prácticas',
    badge: 'Código models.py',
    content: 'Observa la definición de los modelos Autor, Categoria y Libro con relaciones e índices:',
    codeSnippet: {
      filename: 'biblioteca/models.py',
      lang: 'python',
      code: `from django.db import models

class Autor(models.Model):
    nombre = models.CharField(max_length=120)
    nacionalidad = models.CharField(max_length=60, blank=True)
    biografia = models.TextField(blank=True)

    def __str__(self):
        return self.nombre

class Libro(models.Model):
    titulo = models.CharField(max_length=200, db_index=True)
    isbn = models.CharField(max_length=13, unique=True)
    precio = models.DecimalField(max_digits=7, decimal_places=2)
    stock = models.PositiveIntegerField(default=1)
    disponible = models.BooleanField(default=True)
    
    # Claves foráneas con nombres reversos claros
    autor = models.ForeignKey(Autor, on_delete=models.PROTECT, related_name='libros')
    
    class Meta:
        ordering = ['titulo']
        verbose_name_plural = "Libros"

    def __str__(self):
        return f"{self.titulo} - {self.autor.nombre}"`,
      explanation: 'on_delete=models.PROTECT impide borrar accidentalmente a un autor si todavía tiene libros registrados en el catálogo.'
    },
    keyTakeaway: 'Usa PROTECT para entidades críticas: evita la pérdida catastrófica de datos por borrados en cascada.'
  },
  {
    id: 4,
    type: 'comparison',
    title: 'El Asombroso Catálogo de Field Lookups del ORM',
    badge: 'Filtrado Avanzado',
    content: 'Django utiliza la sintaxis de doble guion bajo (__) para realizar búsquedas complejas traducidas a SQL:',
    visualChart: {
      headers: ['Consulta ORM', 'Equivalente SQL', '¿Qué hace?'],
      rows: [
        ['`Libro.objects.filter(titulo__icontains="python")`', '`WHERE LOWER(titulo) LIKE \'%python%\'`', 'Búsqueda insensible a mayúsculas/minúsculas'],
        ['`Libro.objects.filter(precio__gte=50.00)`', '`WHERE precio >= 50.00`', 'Mayor o igual que (Greater Than or Equal)'],
        ['`Libro.objects.filter(autor__nombre="García Márquez")`', '`JOIN biblioteca_autor ... WHERE nombre = ...`', '¡Filtra a través de la relación de clave foránea!'],
        ['`Libro.objects.filter(stock__exact=0)`', '`WHERE stock = 0`', 'Coincidencia exacta'],
        ['`Libro.objects.exclude(disponible=False)`', '`WHERE NOT (disponible = 0)`', 'Excluye registros que cumplan la condición']
      ]
    },
    keyTakeaway: 'La sintaxis de doble guion bajo (__) te permite consultar campos de tablas relacionadas sin escribir JOINs manuales.'
  },
  {
    id: 5,
    type: 'concept',
    title: 'El Gran Enemigo del Rendimiento: El Problema de las N+1 Consultas',
    badge: 'Optimización de Base de Datos',
    content: 'Si muestras una lista de 50 libros con el nombre de su autor sin optimizar, Django ejecutará 51 consultas SQL:',
    visualChart: {
      headers: ['Método', 'Consultas SQL Ejecutadas', '¿Cómo funciona?'],
      rows: [
        ['`Libro.objects.all()` (Sin optimizar)', '1 (para los 50 libros) + 50 (una para cada autor) = 51 queries SQL', '💥 Lento: sobrecarga la base de datos y satura la conexión'],
        ['`Libro.objects.select_related("autor")`', '¡Exactamente 1 sola consulta SQL con INNER JOIN!', '⚡ Ultra rápido: descarga libros y autores en un solo viaje']
      ]
    },
    keyTakeaway: 'Regla de oro de rendimiento: Para relaciones ForeignKey y OneToOne usa select_related(); para ManyToMany usa prefetch_related().'
  },
  {
    id: 6,
    type: 'code',
    title: 'Código Optimizado: select_related en Acción',
    badge: 'Buenas Prácticas ORM',
    content: 'Observa la diferencia de rendimiento en el código de tu vista:',
    codeSnippet: {
      filename: 'biblioteca/views.py',
      lang: 'python',
      code: `from django.shortcuts import render
from .models import Libro

# ❌ LENTO (51 consultas a la base de datos):
def catalogo_lento(request):
    libros = Libro.objects.all()  # Cada vez que el template lee libro.autor, ¡hace un query!
    return render(request, 'catalogo.html', {'libros': libros})

# ✅ ULTRA OPTIMIZADO (1 sola consulta SQL con JOIN):
def catalogo_veloz(request):
    # Trae de inmediato los datos del Autor en la misma consulta
    libros = Libro.objects.select_related('autor').filter(disponible=True)
    return render(request, 'catalogo.html', {'libros': libros})`,
      explanation: 'select_related("autor") le indica a Django que realice un INNER JOIN a nivel de base de datos SQL.'
    },
    keyTakeaway: 'Usar select_related() puede acelerar tu aplicación web hasta 10 veces en páginas con catálogos y listados.'
  },
  {
    id: 7,
    type: 'summary',
    title: 'Resumen de la Lección: Maestría en Relaciones y ORM',
    badge: 'Resultados del Módulo',
    content: 'Has aprendido a modelar y optimizar bases de datos como un desarrollador senior:',
    bulletPoints: [
      '✅ Diseñas relaciones 1:N (ForeignKey) y N:M (ManyToManyField) seguras.',
      '✅ Proteges la integridad de datos con on_delete=models.PROTECT.',
      '✅ Filtras datos con field lookups (__icontains, __gte, __in).',
      '✅ Eliminas el problema de las N+1 consultas con select_related y prefetch_related.'
    ],
    keyTakeaway: 'En la siguiente lección (6. Django Admin y CRUD) construiremos la interfaz de administración para gestionar estos modelos.'
  }
];
