const productos = [
  { nombre: "CARTUCHERA CREMALLERA", precio: 33660 },
  { nombre: "CARTUCHERA FULL", precio: 89760 },
  { nombre: "ESFEROS", precio: 2992 },
  { nombre: "CUADERNOS NUEVOS", precio: 8602 },
  { nombre: "CAJA DE COLORES 1", precio: 52360 },
  { nombre: "CAJA DE COLORES 2", precio: 44880 },
  { nombre: "LAPICES", precio: 4114 },
  { nombre: "TAJA LAPIZ SENCILLO", precio: 1870 },
  { nombre: "BORRADOR SENCILLO", precio: 2618 },
  { nombre: "CORRECTOR", precio: 7480 },
  { nombre: "RESALTADOR", precio: 7480 },
  { nombre: "MARCADOR", precio: 7480 },
  { nombre: "TAJA LAPIZ DOBLE", precio: 7480 },
  { nombre: "TAJA BORRADOR", precio: 14960 },
  { nombre: "TIJERAS", precio: 7480 }
];

const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");
const toggleBtn = document.getElementById("toggle-carrito");
const carritoContent = document.getElementById("carrito-content");

let total = 0;

productos.forEach((producto, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    ${producto.nombre} - $${producto.precio.toLocaleString()}
    <button onclick="agregarAlCarrito(${index})">+</button>
  `;
  listaProductos.appendChild(li);
});

function agregarAlCarrito(index) {
  const producto = productos[index];

  const li = document.createElement("li");
  li.classList.add("carrito-item");

  const texto = document.createElement("span");
  texto.textContent = `${producto.nombre} - $${producto.precio.toLocaleString()}`;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "–";
  btnEliminar.onclick = () => {
    listaCarrito.removeChild(li);
    total -= producto.precio;
    totalSpan.textContent = total.toLocaleString();
  };

  li.appendChild(texto);
  li.appendChild(btnEliminar);
  listaCarrito.appendChild(li);

  total += producto.precio;
  totalSpan.textContent = total.toLocaleString();
}

toggleBtn.addEventListener("click", () => {
  carritoContent.classList.toggle("oculto");
});
