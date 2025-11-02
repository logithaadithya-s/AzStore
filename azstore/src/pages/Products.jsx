import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getAllProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import './Products.css';

const ITEMS_PER_PAGE = 12;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      
      const matchesPrice =
        product.price >= priceRange.min && product.price <= priceRange.max;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchQuery, selectedCategory, priceRange]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePriceRangeChange = (field, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="products-page">
      <div className="products-container">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <h3 className="filters-title">Filters</h3>
          
          {/* Search */}
          <div className="filter-section">
            <label className="filter-label">Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <label className="filter-label">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="category-select"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <label className="filter-label">Price Range</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                className="price-input"
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                className="price-input"
              />
            </div>
          </div>

          <div className="results-count">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </div>
        </aside>

        {/* Products Grid */}
        <main className="products-main">
          {paginatedProducts.length === 0 ? (
            <motion.div
              className="no-products"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p>No products found matching your criteria.</p>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="products-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {paginatedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  className="pagination"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                    whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                  >
                    Previous
                  </motion.button>
                  <motion.div
                    className="pagination-info"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    Page {currentPage} of {totalPages}
                  </motion.div>
                  <motion.button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                    whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                  >
                    Next
                  </motion.button>
                </motion.div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;

