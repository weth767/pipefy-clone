import styled from 'styled-components';

export const Container = styled.div`
    padding: 0 15px;
    height: 100%;
    flex: 0 0 320px;
    // flex-grow: 0 - Determina o quanto um componente estica, com 0, determina sua largura como fixa
    // caso fosse 1, ele esticaria para o conteudo caber nele, caso fosse 2, ele ocuparia 2* o tamanho dos 
    // componentes irmãos dele

    // flex-shrink: 0 - Determina o quanto um componente encolhe, com 0, determina o tamanho como fixo e gera
    // barra de rolagem caso encolha a tela

    //flex-basis: 320px - Determina o tamanho base do elemento, se o componente que envolve ele tem display flex
    // com a flex-direction: row, ele determina largura, se for column, determina altura, por default, display flex
    // é row
    opacity: ${props => props.done ? 0.6 : 1};

    & + div { // estilizar toda div que tem uma div ante dela
        border-left: 1px solid rgba(0, 0, 0, 0.05);
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 42px;

        h2 {
            font-weight: 500;
            font-size: 16px;
            padding: 0 10px;
        }

        button {
            width: 42px;
            height: 42px;
            border-radius: 18px;
            background: #3b5bfd;
            border: 0;
            cursor: pointer;
        }
    }

    ul {
        margin-top: 30px;
    }
`;
