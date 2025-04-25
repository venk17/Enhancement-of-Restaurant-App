import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {fetchMenuData} from '../../utils/api'
import {useCart} from '../../context/CartContext'
import Header from '../../components/Header'
import CategoryTabs from '../../components/CategoryTabs'
import DishCard from '../../components/DishCard'
import './styles.css'

const Home = () => {
  const history = useHistory()
  const [menuData, setMenuData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState(0)
  const {addCartItem, cartList} = useCart()

  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const data = await fetchMenuData()
        setMenuData(data[0])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadMenuData()
  }, [])

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const navigateToCart = () => {
    history.push('/cart')
  }

  const navigateToHome = () => {
    history.push('/')
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!menuData) return <div className="no-data">No menu data available</div>

  const {restaurantName, tableMenuList} = menuData

  return (
    <div className="home">
      <Header
        restaurantName={restaurantName}
        onCartClick={navigateToCart}
        onHomeClick={navigateToHome}
        onLogout={handleLogout}
      />

      <CategoryTabs
        categories={tableMenuList}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <div className="dishes-container">
        {tableMenuList[activeCategory]?.categoryDishes.map(dish => (
          <DishCard
            key={dish.dishId}
            dish={dish}
            onAddToCart={addCartItem}
            inCart={cartList.some(item => item.dishId === dish.dishId)}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
