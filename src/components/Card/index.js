import React, { useRef, useContext } from 'react';
import { Container, Label } from './styles';
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '../Board/context';

export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      const draggedOffset = monitor.getClientOffset();
      /*distancia do ponto y do item atual para o top do item target para descobrir a distancia 
      que passou sobre o item alvo*/
      const draggedTop = draggedOffset.y - targetSize.top;
      /* Se o index do item arrastado for menor que o index do alvo
      e a posição do top do item arrastado for menor que o meio do alvo, não faz nada, 
      porque não moveu o sufiente para jogar para baixo*/
      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }
      /* Mesma coisa do de cima, so que para mover de baixo para cima */
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        { data.labels.map(label => <Label key={label} color={label}/> ) }
      </header>
      <p>{ data.content }</p>
      {data.user && <img src={data.user} alt="avatar"/>}
    </Container>
  );
}