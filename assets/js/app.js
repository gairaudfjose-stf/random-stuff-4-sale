// Configuración
const WHATSAPP_PHONE = "50670962156"; // REPLACE_WHATSAPP_NUMBER (Formato: PAIS+NUMERO sin +)
const PRODUCTS_URL = "./products.json";
const BASE_URL = "https://gairaudfjose-stf.github.io/randomstuff4sale-site/products.json";

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    fetch(PRODUCTS_URL)
        .then(response => response.json())
        .then(products => {
            initApp(products);
        })
        .catch(err => console.error('Error cargando drops:', err));
});

function initApp(products) {
    const pageId = document.body.id;

    if (pageId === 'home-page') {
        renderFeatured(products);
    } else if (pageId === 'shop-page') {
        renderShop(products);
    } else if (pageId === 'product-page') {
        renderSingleProduct(products);
    }
}

// Renderizar Home (Últimos 4)
function renderFeatured(products) {
    const container = document.getElementById('featured-drops');
    if (!container) return;
    
    // Tomamos los primeros 4
    products.slice(0, 4).forEach(product => {
        container.innerHTML += createProductCard(product);
    });
}

// Renderizar Tienda Completa con Filtros
function renderShop(products) {
    const container = document.getElementById('shop-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Render inicial
    renderGrid(products, container);

    // Filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Estilos activos
            filterBtns.forEach(b => b.classList.remove('bg-black', 'text-white'));
            e.target.classList.add('bg-black', 'text-white');
            
            const category = e.target.dataset.category;
            const filtered = category === 'all' 
                ? products 
                : products.filter(p => p.category === category);
            
            renderGrid(filtered, container);
        });
    });
}

function renderGrid(list, container) {
    container.innerHTML = '';
    if(list.length === 0) {
        container.innerHTML = '<p class="text-xl col-span-full text-center">No hay nada en este drop por ahora.</p>';
        return;
    }
    list.forEach(p => container.innerHTML += createProductCard(p));
}

// Renderizar Producto Individual (URL param logic)
function renderSingleProduct(products) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const product = products.find(p => p.slug === slug);

    if (!product) {
        document.getElementById('product-detail').innerHTML = '<h2 class="text-3xl text-center mt-20">Este drop ya no existe (404).</h2>';
        return;
    }

    // Actualizar SEO y Título dinámicamente
    document.title = `${product.name} | Random Stuff 4 Sale`;
    
    // Inyectar contenido
    document.getElementById('prod-img').src = product.image;
    document.getElementById('prod-img').alt = product.name;
    document.getElementById('prod-title').innerText = product.name;
    document.getElementById('prod-price').innerText = `$${product.price.toFixed(2)}`;
    document.getElementById('prod-desc').innerText = product.description;
    document.getElementById('prod-condition').innerText = product.condition;
    document.getElementById('prod-size').innerText = product.size;

    // Generar JSON-LD para este producto
    injectProductSchema(product);

    // Configurar Botón Snipcart
    const btnCart = document.getElementById('btn-add-cart');
    btnCart.dataset.itemId = product.id;
    btnCart.dataset.itemPrice = product.price;
    btnCart.dataset.itemUrl = BASE_URL;
    btnCart.dataset.itemDescription = product.description;
    btnCart.dataset.itemImage = product.image;
    btnCart.dataset.itemName = product.name;

    // Configurar Botón WhatsApp
    const btnWa = document.getElementById('btn-whatsapp');
    const msg = `Hola Stuffy, me interesa el drop: ${product.name} (Ref: ${product.id}). ¿Sigue disponible?`;
    btnWa.href = `https://wa.me/${70962156}/?text=${encodeURIComponent(msg)}`;
}

// HTML Component: Card
function createProductCard(product) {
    return `
    <div class="border-2 border-black bg-white p-4 relative hover:shadow-lg transition-shadow">
        ${product.tags.includes('1/1') ? '<span class="absolute top-2 right-2 bg-[#E74C3C] text-white text-xs font-heading px-2 py-1 uppercase border border-black transform rotate-2">1/1 Rare</span>' : ''}
        <a href="producto.html?slug=${product.slug}">
            <div class="aspect-square bg-gray-200 mb-4 overflow-hidden border border-black">
                <img src="${product.image}" alt="${product.name}" loading="lazy" class="object-cover w-full h-full hover:scale-105 transition-transform duration-500">
            </div>
            <h3 class="text-xl font-heading leading-tight mb-1">${product.name}</h3>
        </a>
        <div class="flex justify-between items-end mt-2 border-t border-black pt-2">
            <div>
                <p class="text-sm text-gray-600 font-body">Talla: <span class="font-bold">${product.size}</span></p>
                <p class="text-lg font-bold font-heading">$${product.price.toFixed(2)}</p>
            </div>
            <button class="snipcart-add-item btn-stuffy bg-black text-white px-3 py-1 text-sm font-heading uppercase"
                data-item-id="${product.id}"
                data-item-price="${product.price}"
                data-item-url="${BASE_URL}" 
                data-item-description="${product.description}"
                data-item-image="${product.image}"
                data-item-name="${product.name}">
                Al Carrito
            </button>
        </div>
    </div>
    `;
}

// SEO Injection
function injectProductSchema(product) {
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Random Stuff 4 Sale"
        },
        "offers": {
            "@type": "Offer",
            "url": window.location.href,
            "priceCurrency": "USD",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/UsedCondition"
        }
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}

