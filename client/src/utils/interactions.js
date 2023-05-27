export function handleMouseDown(event, setPosition, setIsDragging, setDragOffset, position) {
    setIsDragging(true);
    const offsetX = event.clientX - position.x;
    const offsetY = event.clientY - position.y;
    setDragOffset({ x: offsetX, y: offsetY });
  }
  
  export function handleMouseMove(event, isDragging, setPosition, dragOffset) {
    if (!isDragging) return;
    setPosition({
      x: event.clientX - dragOffset.x,
      y: event.clientY - dragOffset.y,
    });
  }
  
  export function handleMouseUp(setIsDragging) {
    setIsDragging(false);
  }