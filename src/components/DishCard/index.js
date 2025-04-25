import './styles.css'

const DishCard = ({dish, onAddToCart, inCart}) => {
  const {
    dishName,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishCalories,
    dishImage,
    dishAvailability,
    addonCat,
  } = dish

  const handleAddToCart = () => {
    if (dishAvailability) {
      onAddToCart(dish)
    }
  }

  return (
    <div className={`dish-card ${!dishAvailability ? 'unavailable' : ''}`}>
      <div className="dish-info">
        <div className="dish-details">
          <h3 className="dish-name">{dishName}</h3>
          <p className="dish-price" data-testid="dish-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-description">{dishDescription}</p>

          {addonCat && addonCat.length > 0 && (
            <p className="customization">Customizations available</p>
          )}

          {!dishAvailability && <p className="availability">Not available</p>}

          <p className="dish-calories">{dishCalories} calories</p>
        </div>

        <div className="dish-image-container">
          {dishImage && (
            <img
              src={dishImage}
              alt={dishName}
              className="dish-image"
              data-testid="dish-image"
            />
          )}

          {dishAvailability && (
            <button
              onClick={handleAddToCart}
              className={`add-to-cart ${inCart ? 'in-cart' : ''}`}
              type="button"
              data-testid="add-to-cart-button"
            >
              {inCart ? 'ADDED TO CART' : 'ADD TO CART'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default DishCard
