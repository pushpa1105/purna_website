export const existingCartItems = ({ prevCartItems, nextCartItem }) => {
  return prevCartItems.find((cartItem) => cartItem.id === nextCartItem.id);
};

export const handleAddToCart = ({ prevCartItems, nextCartItem }) => {
  const quantityIncrement = 1;
  const cartItemExists = existingCartItems({ prevCartItems, nextCartItem });
  if (cartItemExists) {
    return prevCartItems.map((cartItem) =>
      cartItem.id === nextCartItem.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + quantityIncrement,
          }
        : cartItem
    );
  }

  return [...prevCartItems, { ...nextCartItem, quantity: quantityIncrement }];
};

export const handleReduceCartItem = ({ prevCartItems, cartItemToReduce }) => {
  const existingCartItem = prevCartItems.find(
    (cartItem) => cartItem.id === cartItemToReduce.id
  );

  if (existingCartItem.quantity === 1) {
    return prevCartItems.filter(
      (cartItem) => cartItem.id !== existingCartItem.id
    );
  }
  return prevCartItems.map((cartItem) =>
    cartItem.id === existingCartItem.id
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};
