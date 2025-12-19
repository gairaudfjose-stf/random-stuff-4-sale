// Configuración
const WHATSAPP_PHONE = "50670962156"; // REPLACE_WHATSAPP_NUMBER (Formato: PAIS+NUMERO sin +)
const PRODUCTS_URL = "./products.json";
const BASE_URL = "https://gairaudfjose-stf.github.io/random-stuff-4-sale/products.json";

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

function renderSingleProduct(products) {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const product = products.find(p => p.slug === slug);

    if (!product) {
        document.getElementById('product-detail').innerHTML = '<h2 class="text-3xl text-center mt-20">Este drop ya no existe (404).</h2>';
        return;
    }

    document.title = `${product.name} | Random Stuff 4 Sale`;
    
    // Inyectar contenido
    document.getElementById('prod-img').src = product.image;
    document.getElementById('prod-img').alt = product.name;
    document.getElementById('prod-title').innerText = product.name;
    
    // CAMBIO: Formato Colones (sin decimales .00 visualmente si es entero)
    document.getElementById('prod-price').innerText = `₡${product.price.toLocaleString('es-CR')}`;
    
    document.getElementById('prod-desc').innerText = product.description;
    document.getElementById('prod-condition').innerText = product.condition;
    document.getElementById('prod-size').innerText = product.size;
    // Medidas (si existen)
    if(document.getElementById('prod-measurements')) {
        document.getElementById('prod-measurements').innerText = product.measurements || "Consultar al DM";
    }

    if (typeof injectProductSchema === "function") injectProductSchema(product);

    // Configurar Botón Snipcart
    const btnCart = document.getElementById('btn-add-cart');
    btnCart.dataset.itemId = product.id;
    btnCart.dataset.itemPrice = product.price;
    btnCart.dataset.itemUrl = BASE_URL; 
    btnCart.dataset.itemDescription = product.description;
    btnCart.dataset.itemImage = product.image;
    btnCart.dataset.itemName = product.name;
    
    // IMPORTANTE: Definimos la moneda aquí
    btnCart.dataset.itemCurrency = "CRC"; 

    // WhatsApp
    const btnWa = document.getElementById('btn-whatsapp');
    const msg = `Hola Stuffy, me interesa el drop: ${product.name} (Ref: ${product.id}). ¿Sigue disponible?`;
    btnWa.href = `https://wa.me/${WHATSAPP_PHONE}/?text=${encodeURIComponent(msg)}`;
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
    document.getElementById('prod-measurements').innerText = product.measurements || "Consultar al DM";


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
    const rareLabel = product.tags.includes('1/1') 
        ? `<span class="absolute top-2 right-2 bg-[#E74C3C] text-white text-xs font-heading px-2 py-1 uppercase border border-black transform rotate-2 z-10">1/1 Rare</span>` 
        : '';
        
    // CAMBIO: Formato Colones visual
    const precioFormateado = product.price.toLocaleString('es-CR');

    return `
    <article class="product-card border-2 border-black bg-white p-4 relative flex flex-col h-full">
        ${rareLabel}
        <a href="producto.html?slug=${product.slug}" class="block overflow-hidden border border-black mb-4 aspect-square bg-gray-100">
            <img src="${product.image}" alt="${product.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
        </a>
        
        <div class="flex-grow">
            <h3 class="text-xl font-heading leading-tight mb-2 uppercase">
                <a href="producto.html?slug=${product.slug}" class="hover:text-[#E74C3C]">${product.name}</a>
            </h3>
        </div>

        <div class="mt-4 border-t-2 border-black border-dashed pt-3 flex justify-between items-end">
            <div>
                <span class="block text-xs font-body text-gray-500">Talla: ${product.size}</span>
                <span class="block text-xl font-bold font-heading text-[#E74C3C]">₡${precioFormateado}</span>
            </div>
            <button class="snipcart-add-item btn-stuffy bg-black text-white px-3 py-1 text-sm font-heading uppercase"
                data-item-id="${product.id}"
                data-item-price="${product.price}"
                data-item-url="${BASE_URL}" 
                data-item-description="${product.description}"
                data-item-image="${product.image}"
                data-item-name="${product.name}"
                data-item-currency="CRC"> <!-- AQUI AGREGAMOS LA MONEDA -->
                + Cart
            </button>
        </div>
    </article>
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

