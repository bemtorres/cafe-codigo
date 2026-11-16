# Guía Técnica Maestra: Segundo Proyecto — Tienda Online / E-Commerce (`tienda`)

Esta guía complementa el proyecto principal **`biblioteca`** proporcionando un segundo ecosistema de aplicación completo, realista y orientado al comercio electrónico. Su propósito es permitir a los estudiantes transferir los conocimientos de **URLs**, **Vistas (FBV/CBV)**, **Modelos**, **Migraciones**, **ORM** y **Django Admin/CRUD** a un dominio transaccional y de inventario.

---

## 1. Estructura y Entorno del Proyecto

### 1.1 Localización en el Sistema
* **Directorio Raíz del Espacio de Trabajo:** `C:\proyectos\django`
* **Directorio del Proyecto:** `C:\proyectos\django\tienda`
* **Entorno Virtual:** `(venv)` en `C:\proyectos\django\venv`
* **Comandos de Creación e Inicialización:**

```cmd
C:\proyectos\django> .\venv\Scripts\activate
(venv) C:\proyectos\django> django-admin startproject tienda
(venv) C:\proyectos\django> cd tienda
(venv) C:\proyectos\django\tienda> python manage.py startapp catalogo
(venv) C:\proyectos\django\tienda> python manage.py startapp pedidos
```

### 1.2 Árbol de Directorios
```text
C:\proyectos\django\tienda\
├── manage.py
├── venv\
├── tienda\
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
├── catalogo\
│   ├── migrations\
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
└── pedidos\
    ├── migrations\
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── forms.py
    ├── models.py
    ├── urls.py
    └── views.py
```

---

## 2. Modelado de Datos (`catalogo` y `pedidos`)

### 2.1 Modelos de `catalogo/models.py`
```python
import uuid
from django.db import models
from django.utils.text import slugify
from django.core.validators import MinValueValidator, MaxValueValidator


class CategoriaProducto(models.Model):
    nombre = models.CharField(max_length=100, unique=True, verbose_name="Nombre de Categoría")
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    descripcion = models.TextField(blank=True, null=True, verbose_name="Descripción")
    activa = models.BooleanField(default=True, db_index=True)
    creada_el = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Categoría de Producto"
        verbose_name_plural = "Categorías de Productos"
        ordering = ['nombre']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    sku = models.CharField(max_length=30, unique=True, verbose_name="Código SKU")
    nombre = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    categoria = models.ForeignKey(
        CategoriaProducto,
        on_delete=models.PROTECT,
        related_name='productos',
        verbose_name="Categoría"
    )
    descripcion = models.TextField(blank=True)
    precio = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.01)],
        verbose_name="Precio Unitario (USD)"
    )
    costo = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0.00)],
        verbose_name="Costo de Adquisición (USD)"
    )
    stock = models.PositiveIntegerField(default=0, verbose_name="Stock Disponible")
    disponible = models.BooleanField(default=True, db_index=True)
    destacado = models.BooleanField(default=False)
    imagen = models.ImageField(upload_to='productos/%Y/%m/', blank=True, null=True)
    creado_el = models.DateTimeField(auto_now_add=True)
    actualizado_el = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ['-creado_el']
        constraints = [
            models.CheckConstraint(
                check=models.Q(precio__gte=models.F('costo')),
                name='chk_precio_mayor_o_igual_costo'
            ),
            models.CheckConstraint(
                check=models.Q(stock__gte=0),
                name='chk_stock_no_negativo'
            )
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        # Sincronizar disponibilidad con stock
        if self.stock == 0:
            self.disponible = False
        super().save(*args, **kwargs)

    @property
    def margen_ganancia(self):
        return self.precio - self.costo

    def __str__(self):
        return f"{self.nombre} (SKU: {self.sku}) - ${self.precio}"
```

### 2.2 Modelos de `pedidos/models.py`
```python
import uuid
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from catalogo.models import Producto


class Cliente(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='perfil_cliente')
    telefono = models.CharField(max_length=20, blank=True)
    direccion_envio = models.TextField(verbose_name="Dirección de Envío")
    es_vip = models.BooleanField(default=False, db_index=True)
    limite_credito = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Cliente: {self.user.get_full_name() or self.user.username} (VIP: {self.es_vip})"


class CuponDescuento(models.Model):
    codigo = models.CharField(max_length=25, unique=True)
    descuento_porcentaje = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(90)]
    )
    activo = models.BooleanField(default=True)
    valido_hasta = models.DateField()
    usos_maximos = models.PositiveIntegerField(default=100)
    usos_actuales = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Cupón {self.codigo} (-{self.descuento_porcentaje}%)"


class Pedido(models.Model):
    ESTADOS = [
        ('PENDIENTE', 'Pendiente de Pago'),
        ('PAGADO', 'Pagado - En Preparación'),
        ('ENVIADO', 'Enviado'),
        ('ENTREGADO', 'Entregado'),
        ('CANCELADO', 'Cancelado'),
    ]

    numero_seguimiento = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT, related_name='pedidos')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='PENDIENTE', db_index=True)
    cupon = models.ForeignKey(CuponDescuento, on_delete=models.SET_NULL, null=True, blank=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    descuento_total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    notas = models.TextField(blank=True)

    class Meta:
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"
        ordering = ['-fecha_creacion']

    def calcular_totales(self):
        suma_items = sum(item.subtotal for item in self.items.all())
        self.subtotal = suma_items
        if self.cupon and self.cupon.activo:
            self.descuento_total = (suma_items * self.cupon.descuento_porcentaje) / 100
        else:
            self.descuento_total = 0.00
        self.total = max(self.subtotal - self.descuento_total, 0.00)
        self.save()

    def __str__(self):
        return f"Pedido #{self.id} - {self.cliente} [{self.estado}] - Total: ${self.total}"


class ItemPedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='items')
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT, related_name='items_pedido')
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])

    @property
    def subtotal(self):
        return self.precio_unitario * self.cantidad

    def __str__(self):
        return f"{self.cantidad}x {self.producto.nombre} @ ${self.precio_unitario}"
```

---

## 3. URLs y Vistas Didácticas (`catalogo/views.py` y `pedidos/views.py`)

### 3.1 Vistas del Catálogo (FBV y CBV)
```python
# catalogo/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from .models import Producto, CategoriaProducto
from .forms import ProductoForm


# VISTA 1: Catálogo General (CBV ListView con filtros y paginación)
class CatalogoProductosView(ListView):
    model = Producto
    template_name = 'catalogo/catalogo.html'
    context_object_name = 'productos'
    paginate_by = 9

    def get_queryset(self):
        qs = Producto.objects.select_related('categoria').filter(disponible=True)
        q = self.request.GET.get('q')
        cat_slug = self.request.GET.get('categoria')
        precio_max = self.request.GET.get('precio_max')

        if q:
            qs = qs.filter(Q(nombre__icontains=q) | Q(descripcion__icontains=q))
        if cat_slug:
            qs = qs.filter(categoria__slug=cat_slug)
        if precio_max:
            qs = qs.filter(precio__lte=precio_max)

        return qs

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['categorias'] = CategoriaProducto.objects.filter(activa=True)
        ctx['busqueda_actual'] = self.request.GET.get('q', '')
        return ctx


# VISTA 2: Detalle de Producto (CBV DetailView con productos relacionados)
class DetalleProductoView(DetailView):
    model = Producto
    template_name = 'catalogo/detalle.html'
    context_object_name = 'producto'
    slug_field = 'slug'
    slug_url_kwarg = 'slug'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        # Traer hasta 4 productos relacionados de la misma categoría
        ctx['relacionados'] = Producto.objects.filter(
            categoria=self.object.categoria,
            disponible=True
        ).exclude(id=self.object.id)[:4]
        return ctx


# VISTA 3: Creación de Producto (CBV CreateView con ModelForm)
class CrearProductoView(CreateView):
    model = Producto
    form_class = ProductoForm
    template_name = 'catalogo/producto_form.html'
    success_url = reverse_lazy('catalogo:lista')

    def form_valid(self, form):
        messages.success(self.request, f"¡Producto '{form.instance.nombre}' creado exitosamente!")
        return super().form_valid(form)


# VISTA 4: Edición de Producto (CBV UpdateView)
class EditarProductoView(UpdateView):
    model = Producto
    form_class = ProductoForm
    template_name = 'catalogo/producto_form.html'
    success_url = reverse_lazy('catalogo:lista')

    def form_valid(self, form):
        messages.info(self.request, f"Producto '{form.instance.nombre}' actualizado correctamente.")
        return super().form_valid(form)


# VISTA 5: Eliminación de Producto (CBV DeleteView)
class EliminarProductoView(DeleteView):
    model = Producto
    template_name = 'catalogo/producto_confirm_delete.html'
    success_url = reverse_lazy('catalogo:lista')

    def delete(self, request, *args, **kwargs):
        obj = self.get_object()
        messages.warning(request, f"El producto '{obj.nombre}' ha sido eliminado.")
        return super().delete(request, *args, **kwargs)
```

### 3.2 Formularios con Validaciones de Negocio (`catalogo/forms.py`)
```python
from django import forms
from .models import Producto


class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['sku', 'nombre', 'categoria', 'descripcion', 'precio', 'costo', 'stock', 'destacado', 'imagen']
        widgets = {
            'descripcion': forms.Textarea(attrs={'rows': 4, 'class': 'form-textarea'}),
            'precio': forms.NumberInput(attrs={'step': '0.01', 'min': '0.01'}),
            'costo': forms.NumberInput(attrs={'step': '0.01', 'min': '0.00'}),
            'stock': forms.NumberInput(attrs={'min': '0'}),
        }

    def clean_sku(self):
        sku = self.cleaned_data.get('sku', '').strip().upper()
        if len(sku) < 4:
            raise forms.ValidationError("El código SKU debe tener al menos 4 caracteres.")
        return sku

    def clean(self):
        cleaned_data = super().clean()
        precio = cleaned_data.get('precio')
        costo = cleaned_data.get('costo')

        if precio is not None and costo is not None:
            if precio < costo:
                raise forms.ValidationError({
                    'precio': "El precio de venta no puede ser inferior al costo de adquisición."
                })
        return cleaned_data
```

---

## 4. Panel Django Admin Avanzado (`pedidos/admin.py`)
```python
from django.contrib import admin
from .models import Cliente, CuponDescuento, Pedido, ItemPedido


class ItemPedidoInline(admin.TabularInline):
    model = ItemPedido
    extra = 0
    raw_id_fields = ['producto']
    readonly_fields = ['subtotal_preview']

    def subtotal_preview(self, instance):
        if instance.pk:
            return f"${instance.subtotal:.2f}"
        return "-"
    subtotal_preview.short_description = "Subtotal"


@admin.action(description="Marcar pedidos seleccionados como ENVIADOS")
def marcar_como_enviado(modeladmin, request, queryset):
    actualizados = queryset.filter(estado='PAGADO').update(estado='ENVIADO')
    modeladmin.message_user(request, f"{actualizados} pedido(s) fueron marcados como enviados.")


@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ['id', 'numero_seguimiento', 'cliente', 'estado', 'subtotal', 'descuento_total', 'total', 'fecha_creacion']
    list_filter = ['estado', 'fecha_creacion', 'cupon']
    search_fields = ['id', 'numero_seguimiento', 'cliente__user__username', 'cliente__user__email']
    readonly_fields = ['numero_seguimiento', 'subtotal', 'descuento_total', 'total', 'fecha_creacion', 'fecha_actualizacion']
    inlines = [ItemPedidoInline]
    actions = [marcar_como_enviado]
    ordering = ['-fecha_creacion']
```

---

## 5. Retos ORM de Negocio para Estudiantes

| Reto | Enunciado de Negocio | Consulta Django ORM |
| :--- | :--- | :--- |
| **1. Stock Crítico** | Encontrar productos con stock menor o igual a 5 unidades | `Producto.objects.filter(stock__lte=5, disponible=True)` |
| **2. Clientes VIP Activos** | Clientes que hayan acumulado compras totales superiores a $1,000 | `Cliente.objects.annotate(gasto_total=Sum('pedidos__total')).filter(gasto_total__gt=1000)` |
| **3. Top 3 Más Vendidos** | Identificar los 3 productos con mayor cantidad física vendida | `Producto.objects.annotate(total_vendido=Sum('items_pedido__cantidad')).order_by('-total_vendido')[:3]` |
| **4. Ticket Promedio** | Calcular el promedio de compra de todos los pedidos pagados | `Pedido.objects.filter(estado='PAGADO').aggregate(promedio=Avg('total'))` |
| **5. Descuento Condicional** | Etiquetar dinámicamente pedidos según su volumen de compra | `Pedido.objects.annotate(clasificacion=Case(When(total__gte=500, then=Value('Mayorista')), default=Value('Minorista'), output_field=CharField()))` |

---

## 6. Usuario Cliente Extendido y UserAdmin de la Tienda

### 6.1 `pedidos/models.py` (PerfilCliente con Límite de Crédito)
```python
from django.db import models
from django.conf import settings


class PerfilCliente(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='perfil_tienda'
    )
    telefono = models.CharField(max_length=25, blank=True)
    direccion_envio = models.TextField()
    es_vip = models.BooleanField(default=False, db_index=True)
    limite_credito = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    bloqueado_por_fraude = models.BooleanField(default=False)

    def puede_comprar_a_credito(self, monto):
        if self.bloqueado_por_fraude:
            return False
        return self.limite_credito >= monto

    def __str__(self):
        return f"{self.user.username} (VIP: {self.es_vip})"
```

### 6.2 `pedidos/admin.py` (Acciones de Fidelización y Antifraude)
```python
from django.contrib import admin, messages
from .models import PerfilCliente


@admin.action(description="Promover clientes seleccionados a categoría VIP")
def promover_cliente_vip(modeladmin, request, queryset):
    actualizados = queryset.update(es_vip=True, limite_credito=2000.00)
    modeladmin.message_user(
        request,
        f"Se promovieron {actualizados} cliente(s) a VIP con línea de crédito de $2,000.",
        messages.SUCCESS
    )


@admin.action(description="Bloquear cuentas seleccionadas por sospecha de fraude")
def bloquear_por_fraude(modeladmin, request, queryset):
    actualizados = queryset.update(bloqueado_por_fraude=True, limite_credito=0.00)
    modeladmin.message_user(
        request,
        f"Se han bloqueado preventivamente {actualizados} cuenta(s).",
        messages.WARNING
    )


@admin.register(PerfilCliente)
class PerfilClienteAdmin(admin.ModelAdmin):
    list_display = ['user', 'telefono', 'es_vip', 'limite_credito', 'bloqueado_por_fraude']
    list_filter = ['es_vip', 'bloqueado_por_fraude']
    search_fields = ['user__username', 'user__email', 'telefono']
    actions = [promover_cliente_vip, bloquear_por_fraude]
```

