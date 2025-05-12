const productos = [
  { nombre: "CARTUCHERA CREMALLERA", proveedor: "I. ADVENTISTA", puntos: 250, precio: 33660 },
  { nombre: "CARTUCHERA FULL", proveedor: "OTRO PROVEEDOR", puntos: 300, precio: 89760 },
  { nombre: "ESFEROS", proveedor: "I. ADVENTISTA", puntos: 50, precio: 2992 },
  // Puedes agregar el resto con su proveedor y puntos reales...
];

const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");
const toggleBtn = document.getElementById("toggle-carrito");
const carritoContent = document.getElementById("carrito-content");
const puntosContainer = document.createElement("div");

let total = 0;
let puntosPorProveedor = {}; // ejemplo: { "I. ADVENTISTA": 250 }

productos.forEach((producto, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    ${producto.nombre} - ${producto.proveedor} - $${producto.precio.toLocaleString()}
    <button onclick="agregarAlCarrito(${index})">+</button>
  `;
  listaProductos.appendChild(li);
});

function agregarAlCarrito(index) {
  const producto = productos[index];

  const li = document.createElement("li");
  li.classList.add("carrito-item");

  const texto = document.createElement("span");
  texto.textContent = `${producto.nombre} (${producto.proveedor}) - $${producto.precio.toLocaleString()}`;

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "–";
  btnEliminar.onclick = () => {
    listaCarrito.removeChild(li);
    total -= producto.precio;
    totalSpan.textContent = total.toLocaleString();

    puntosPorProveedor[producto.proveedor] -= producto.puntos;
    if (puntosPorProveedor[producto.proveedor] <= 0) {
      delete puntosPorProveedor[producto.proveedor];
    }
    actualizarVistaPuntos();
  };

  li.appendChild(texto);
  li.appendChild(btnEliminar);
  listaCarrito.appendChild(li);

  total += producto.precio;
  totalSpan.textContent = total.toLocaleString();

  puntosPorProveedor[producto.proveedor] = (puntosPorProveedor[producto.proveedor] || 0) + producto.puntos;
  actualizarVistaPuntos();
}

function actualizarVistaPuntos() {
  puntosContainer.innerHTML = "<h4>Puntos por Proveedor:</h4>";
  const ul = document.createElement("ul");
  for (let prov in puntosPorProveedor) {
    const li = document.createElement("li");
    li.textContent = `${prov}: ${puntosPorProveedor[prov]} puntos`;
    ul.appendChild(li);
  }
  puntosContainer.appendChild(ul);
}

// Insertamos los puntos debajo del total
carritoContent.appendChild(puntosContainer);

toggleBtn.addEventListener("click", () => {
  carritoContent.classList.toggle("oculto");
});
