export const shopping = (req, res) => {
    const category = req.query.category || "all";
    
    const products = [ { id: 1, title: "Product 1", price: 49000, discount: 50, category: "fashion", imageUrl: "/images/product1.jpg" },
        { id: 2, title: "Product 2", price: 34800, discount: 51, category: "fashion", imageUrl: "/images/product2.jpg" },
        { id: 3, title: "Product 3", price: 279000, discount: 0, category: "equipment", imageUrl: "/images/product3.jpg" },
        // Add more products as needed
      // 하드코딩된 제품 데이터
    ];
  
    let filteredProducts = products;
    if (category !== "all") {
      filteredProducts = products.filter(product => product.category === category);
    }
  
    res.render("shopping", { pageTitle: "Shopping", products: filteredProducts, category });
  };
  