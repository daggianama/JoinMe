export function handleMouseDown(event, setPosition, setIsDragging, setDragOffset, position) {
    setIsDragging(true);
    const offsetX = event.clientX - position.x;
    const offsetY = event.clientY - position.y;
    setDragOffset({ x: offsetX, y: offsetY });
}
  
  
  export function handleMouseMove(event, isDragging, setPosition, dragOffset) {
    if (!isDragging) return;
    const clampedX = Math.min(Math.max(event.clientX - dragOffset.x, 0));
    const clampedY = Math.min(Math.max(event.clientY - dragOffset.y, 0));
  
    setPosition({ x: clampedX, y: clampedY });
  }
  
  export function handleMouseUp(setIsDragging) {
    setIsDragging(false);
  }