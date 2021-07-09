import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Item from '../services/Item';

const List = () => {
  const [items, setItems] = useState([]);
  const [listId, setListId] = useState("");

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const itemsArray = Array.from(items);
    const [reorderedItem] = itemsArray.splice(result.source.index, 1);
    itemsArray.splice(result.destination.index, 0, reorderedItem);

    setItems(itemsArray);

    await Item.reorder(
      listId, 
      result.draggableId, 
      parseInt(result.destination.index),
    );
  };

  useEffect(() => {
    Item.all()
      .then(list => {
        if (list) {
          setListId(list._id);
          setItems(list.items);
        }
      });
  }, []);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}> 
      <Droppable droppableId="items">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {items && items.map((item, i) => (
              <Draggable key={item} draggableId={item} index={i}>
                {(provided) => (
                  <Card 
                    className='mt-3' 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                  >
                    <Card.Body>
                      <Card.Text>{item}</Card.Text>
                    </Card.Body>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
