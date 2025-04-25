export const fetchMenuData = async () => {
  try {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching menu data:', error)
    throw error
  }
}

export const loginUser = async credentials => {
  try {
    const response = await fetch('https://apis.ccbp.in/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error_msg || 'Login failed')
    }

    return await response.json()
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}
