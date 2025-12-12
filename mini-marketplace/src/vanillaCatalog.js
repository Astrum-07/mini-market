

export async function initCatalog() {
  const grid = document.getElementById('products-grid');
  
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    
    grid.innerHTML = ''; 

    products.forEach(product => {

      const card = document.createElement('div');
      card.className = 'card';
      
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p class="price">$${product.price}</p>
      `;


      const btn = document.createElement('button');
      btn.textContent = 'Add to cart';
      

      btn.addEventListener('click', () => {
        const event = new CustomEvent('addToCart', { 
            detail: product 
        });
        window.dispatchEvent(event);
      });

      card.appendChild(btn);
      grid.appendChild(card);
    });

  } catch (error) {
    grid.innerHTML = '<p>Error loading products.</p>';
    console.error(error);
  }
}
