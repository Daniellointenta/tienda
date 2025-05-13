const productos = [
  { nombre: "CARTUCHERA CREMALLERA", proveedor: "I. Adventista", puntos: 200, precio: 33660 },
  { nombre: "CARTUCHERA FULL", proveedor: "I. Adventista", puntos: 400, precio: 89760 },
  { nombre: "ESFEROS", proveedor: "VACIO", puntos: 0, precio: 2992 },
  { nombre: "CUADERNOS NUEVOS", proveedor: "VACIO", puntos: 0, precio: 8602 },
  { nombre: "CAJA DE COLORES", proveedor: "VACIO", puntos: 0, precio: 52360 },
  { nombre: "CAJA DE COLORES", proveedor: "VACIO", puntos: 0, precio: 44880 },
  { nombre: "LAPICES", proveedor: "VACIO", puntos: 0, precio: 4114 },
  { nombre: "TAJA LAPIZ SENCILLO", proveedor: "VACIO", puntos: 0, precio: 1870 },
  { nombre: "BORRADOR SENCILLO", proveedor: "VACIO", puntos: 0, precio: 2618 },
  { nombre: "CORRECTOR", proveedor: "VACIO", puntos: 0, precio: 7480 },
  { nombre: "RESALTADOR", proveedor: "VACIO", puntos: 0, precio: 7480 },
  { nombre: "MARCADOR", proveedor: "VACIO", puntos: 0, precio: 7480 },
  { nombre: "TAJA LAPIZ DOBLE", proveedor: "VACIO", puntos: 0, precio: 7480 },
  { nombre: "TAJA BORRADOR", proveedor: "VACIO", puntos: 0, precio: 14960 },
  { nombre: "TIJERAS", proveedor: "VACIO", puntos: 0, precio: 7480 }
];

const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");
const toggleBtn = document.getElementById("toggle-carrito");
const carritoContent = document.getElementById("carrito-content");
const vaciarBtn = document.getElementById("vaciar-carrito");

let carrito = [];

// Mostrar productos
function mostrarProductos() {
  listaProductos.innerHTML = '';
  productos.forEach((producto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} - $${producto.precio.toLocaleString()}
      <button onclick="agregarAlCarrito(${index})">+</button>
    `;
    listaProductos.appendChild(li);
  });
}

// Agregar producto al carrito
function agregarAlCarrito(index) {
  const producto = productos[index];
  const itemEnCarrito = carrito.find(item => item.nombre === producto.nombre && item.precio === producto.precio);

  if (itemEnCarrito) {
    itemEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
}

// Actualizar carrito
function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.classList.add("carrito-item");

    const texto = document.createElement("span");
    const subtotal = producto.precio * producto.cantidad;
    texto.textContent = `${producto.nombre} x${producto.cantidad} - $${subtotal.toLocaleString()}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "–";
    btnEliminar.onclick = () => {
      if (producto.cantidad > 1) {
        producto.cantidad -= 1;
      } else {
        carrito.splice(index, 1);
      }
      actualizarCarrito();
    };

    li.appendChild(texto);
    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);

    total += subtotal;
  });

  totalSpan.textContent = total.toLocaleString();
}

// Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

// Eventos
toggleBtn.addEventListener("click", () => {
  carritoContent.classList.toggle("oculto");
});

vaciarBtn.addEventListener("click", vaciarCarrito);

// Inicialización
mostrarProductos();
